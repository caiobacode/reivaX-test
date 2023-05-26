from datetime import datetime
from collections import deque
import logging
from time import sleep
from random import choice, uniform
from flask_jwt_extended import get_jwt_identity

from flask_socketio import (
    ConnectionRefusedError,
)
from flask import request
from flask import current_app as app

from .. import socketio
from ..enums import ResponseStatus

from ..decorators import (
    jwt_required,
)

from ..utils import (
    create_tokens,
)

# Background tasks
data_task_thread = None

# Global variable
data = deque(maxlen=200)


def data_task(context):
    """Simple background task that is creating new data points and emtiting the
    'data' event. This runs indefinitely after the first user connects to the server.
    If desired, the user can alter the parameters here to make it more interesting."""
    logger: logging = context.app.logger
    global data
    while True:
        data.appendleft(
            dict(
                type=choice(["type1", "type2", "type3"]),
                timestamp=datetime.now().isoformat(),
                param1=uniform(10.0, 15.0),
                param2=uniform(25.0, 35.0),
            )
        )
        # logger.debug(data)
        socketio.emit(
            "data",
            data=list(data),
            namespace="/api",
        )
        sleep(uniform(0.50, 1.50))


## Connect and disconnect events
@socketio.on("connect", namespace="/api")
def on_connect():
    """Standard socketio connect event for the controlled namespace `/api`.
    When a new user connects, check the request headers for a `X-Username` and
    `X-Password` field. To authenticate, both username and password must be the
    same.

    After validating the connection, the backend emits `access_token` and
    `refresh_token` data to the user on the event `credentials`.

    The `access_token` is used for sending commands, such as the `clear` event.
    The `refresh_token` is used to request a new pair of tokens when the
    `access_token` has expired. Note that the `refresh_token` is valid for a longer
    period of time."""
    sid = request.sid
    authenticated = False

    # Checks for username and pwd in headers
    username = request.headers.get("X-Username")
    password = request.headers.get("X-Password")

    if not username or not password:
        app.logger.warning("Connection refused, missing headers")
        raise ConnectionRefusedError("connection_error_missing_headers")

    # User is authenticated if username is the same as password
    authenticated = username == password
    if authenticated:
        app.logger.debug(f"User {username} authenticated with password.")
    else:
        raise ConnectionRefusedError("connection_error_auth_failed")

    tokens = create_tokens(username=username, fresh=True)

    # Emit the credentials
    response = {"status": ResponseStatus.accepted, **tokens}
    socketio.emit("credentials", response, namespace="/api", to=sid)

    # Start the redis background task
    global data_task_thread
    if not data_task_thread:
        data_task_thread = socketio.start_background_task(data_task, app.app_context())


@socketio.on("disconnect", namespace="/api")
def on_disconnect():
    """Standard disconnect socketio event."""
    sid = request.sid
    app.logger.info(f"user id {sid} disconnected")


## Clear command event
@socketio.on("clear", namespace="/api")
@jwt_required()
def clear(*args, **kwargs):
    """This event is used to clear the data list. The command will only be accepted if
    a valid `access_token` is sent as a JSON payload to this event as such:
    {
        "token": <access_token>
    }
    """
    user = get_jwt_identity()
    app.logger.debug(f"clear command sent by user {user}")
    global data
    data.clear()
    return {"status": ResponseStatus.accepted}


## Refresh tokens event
@socketio.on("refresh_tokens", namespace="/api")
@jwt_required(refresh=True)
def refresh_tokens(data):
    """This event is used to request a new pair of tokens when the `access_token` has
    expired. As with `clear` event, the refresh token must be sent as a JSON to this
    endpoint:
    {
        "token": <refresh_token>
    }
    This event returns a pair of tokens in the same format as the one sent on the user
    connection on the event `credentials`.
    """
    user = get_jwt_identity()
    app.logger.debug(f"refresh_tokens command sent by user {user}")
    tokens = create_tokens(username=user)
    return {"status": ResponseStatus.accepted, **tokens}
