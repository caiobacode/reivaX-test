from flask import request
from flask import _request_ctx_stack
from flask_jwt_extended import create_access_token, create_refresh_token
from flask_jwt_extended.config import config
from flask_jwt_extended.view_decorators import _load_user
from flask_jwt_extended.view_decorators import _verify_token_is_fresh
from flask_jwt_extended.exceptions import NoAuthorizationError
from flask_jwt_extended.utils import decode_token
from flask_jwt_extended.utils import get_unverified_jwt_headers
from flask_jwt_extended.internal_utils import custom_verification_for_token
from flask_jwt_extended.internal_utils import verify_token_not_blocklisted
from flask_jwt_extended.internal_utils import verify_token_type


def create_tokens(username, fresh=False, additional_claims=None):
    return {
        "access_token": create_access_token(
            identity=username, fresh=fresh, additional_claims=additional_claims
        ),
        "refresh_token": create_refresh_token(
            identity=username, additional_claims=additional_claims
        ),
    }


def verify_jwt_in_payload(payload, optional=False, fresh=False, refresh=False):
    """
    Verify that a valid JWT is present in the request, unless ``optional=True`` in
    which case no JWT is also considered valid. The token must be under the key `token`
    in the payload dictionary.

    :param optional:
        If ``True``, do not raise an error if no JWT is present in the request.
        Defaults to ``False``.

    :param fresh:
        If ``True``, require a JWT marked as ``fresh`` in order to be verified.
        Defaults to ``False``.

    :param refresh:
        If ``True``, require a refresh JWT to be verified.

    :param locations:
        A location or list of locations to look for the JWT in this request, for
        example ``'headers'`` or ``['headers', 'cookies']``. Defaults to ``None``
        which indicates that JWTs will be looked for in the locations defined by the
        ``JWT_TOKEN_LOCATION`` configuration option.
    """
    if request.method in config.exempt_methods:
        return

    try:
        if refresh:
            jwt_data, jwt_header, jwt_location = _decode_jwt_from_payload(
                payload, fresh, refresh=True
            )
        else:
            jwt_data, jwt_header, jwt_location = _decode_jwt_from_payload(
                payload, fresh
            )
    except NoAuthorizationError:
        if not optional:
            raise
        _request_ctx_stack.top.jwt = {}
        _request_ctx_stack.top.jwt_header = {}
        _request_ctx_stack.top.jwt_user = {"loaded_user": None}
        _request_ctx_stack.top.jwt_location = None
        return

    # Save these at the very end so that they are only saved in the requet
    # context if the token is valid and all callbacks succeed
    _request_ctx_stack.top.jwt_user = _load_user(jwt_header, jwt_data)
    _request_ctx_stack.top.jwt_header = jwt_header
    _request_ctx_stack.top.jwt = jwt_data
    _request_ctx_stack.top.jwt_location = jwt_location

    return jwt_header, jwt_data


def _decode_jwt_from_payload(payload, fresh, refresh=False):
    """Decodes a token in the payload dictionary. The token must be under the `token`
    key in the dictionary."""
    errors = []
    decoded_token = None
    jwt_header = None
    jwt_location = None
    try:
        encoded_token, csrf_token = _get_encoded_token_from_payload(payload)
        decoded_token = decode_token(encoded_token, csrf_token)
        jwt_location = "payload"
        jwt_header = get_unverified_jwt_headers(encoded_token)
    except NoAuthorizationError as e:
        errors.append(str(e))

    # Do some work to make a helpful and human readable error message if no
    # token was found in any of the expected locations.
    if not decoded_token:
        raise NoAuthorizationError(errors[0])

    # Additional verifications provided by this extension
    verify_token_type(decoded_token, refresh)
    if fresh:
        _verify_token_is_fresh(jwt_header, decoded_token)
    verify_token_not_blocklisted(jwt_header, decoded_token)
    custom_verification_for_token(jwt_header, decoded_token)

    return decoded_token, jwt_header, jwt_location


def _get_encoded_token_from_payload(payload):
    """Looks for the key `token` in the payload dictionary"""
    key = "token"
    try:
        token = payload.pop(key)
    except KeyError:
        raise NoAuthorizationError(f"Event payload has no '{key}' key")
    else:
        return token, None
