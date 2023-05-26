import os
from time import sleep

async_mode = os.environ.get("ASYNC_MODE", "threading")

if async_mode == "eventlet":
    import eventlet

    eventlet.monkey_patch()
elif async_mode == "gevent":
    from gevent import monkey

    monkey.patch_all()

import logging
from flask import Flask
from flask_jwt_extended import JWTManager
from flask_socketio import SocketIO


jwt = JWTManager()
socketio = SocketIO()


def create_app(config):
    """Create an application."""
    # Folders

    app = Flask(__name__)
    logger = logging.getLogger("app")
    app.logger.handlers = logger.handlers
    app.logger.setLevel(logger.level)
    app.config.from_object(config)

    # Initialize all extensions
    jwt.init_app(app)
    socketio.init_app(app, async_mode=async_mode, cors_allowed_origins="*")

    # Register blueprint
    from .main import main as main_blueprint

    app.register_blueprint(main_blueprint)

    return app
