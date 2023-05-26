from flask_jwt_extended.exceptions import (
    NoAuthorizationError,
    JWTDecodeError,
    WrongTokenError,
    FreshTokenRequired,
    RevokedTokenError,
)
from jwt import ExpiredSignatureError, DecodeError
from functools import wraps
from flask import current_app as app

from .enums import ResponseStatus
from .utils import verify_jwt_in_payload


def jwt_required(optional=False, fresh=False, refresh=False):
    """
    A decorator to protect a Flask socketio event with JSON Web Tokens.

    The token is required in this case to be under the key `token` in the payload
    dictionary.

    Any event decorated with this will require a valid JWT to be present in the
    request (unless optional=True, in which case no JWT is also valid) before the
    endpoint can be called.

    :param optional:
        If ``True``, allow the decorated endpoint to be if no JWT is present in the
        request. Defaults to ``False``.

    :param fresh:
        If ``True``, require a JWT marked with ``fresh`` to be able to access this
        endpoint. Defaults to ``False``.

    :param refresh:
        If ``True``, requires a refresh JWT to access this endpoint. If ``False``,
        requires an access JWT to access this endpoint. Defaults to ``False``.

    """

    def wrapper(fn):
        @wraps(fn)
        def decorator(payload):
            try:
                verify_jwt_in_payload(
                    payload, optional=optional, fresh=fresh, refresh=refresh
                )
            except (JWTDecodeError, DecodeError) as exc:
                app.logger.warning(f"Token decode error on event {fn.__name__}")
                return {
                    "status": ResponseStatus.invalid_token,
                    "message": "connection_error_decode_token",
                }
            except RevokedTokenError as exc:
                app.logger.warning(f"Token blacklisted for event {fn.__name__}: {exc}")
                return {
                    "status": ResponseStatus.invalid_token,
                    "message": "connection_error_blacklisted_token",
                }
            except NoAuthorizationError as exc:
                app.logger.warning(f"Not authorized for event {fn.__name__}")
                return {
                    "status": ResponseStatus.not_authorized,
                    "message": "connection_error_not_authorized",
                }
            except WrongTokenError as exc:
                app.logger.warning(f"Wrong token type on event {fn.__name__}: {exc}")
                return {
                    "status": ResponseStatus.not_authorized,
                    "message": "connection_error_wrong_token_type",
                }
            except FreshTokenRequired as exc:
                app.logger.warning(f"Token is not fresh on event {fn.__name__}: {exc}")
                return {
                    "status": ResponseStatus.not_authorized,
                    "message": "connection_error_token_not_fresh",
                }

            except ExpiredSignatureError as exc:
                app.logger.warning(f"Expired token on event {fn.__name__}")
                return {
                    "status": ResponseStatus.invalid_token,
                    "message": "connection_error_expired_token",
                }
            except Exception as exc:
                app.logger.warning(f"Error with token on event: {exc}")
                return {
                    "status": ResponseStatus.invalid_token,
                    "message": "conecetion_error_token_unexpected",
                }

            # Compatibility with flask < 2.0
            try:
                return app.ensure_sync(fn)(payload)
            except AttributeError as e:  # pragma: no cover
                if str(e) != "'Flask' object has no attribute 'ensure_sync'":
                    raise
                return fn(payload)

        return decorator

    return wrapper
