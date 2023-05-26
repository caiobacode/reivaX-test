from enum import Enum


class ResponseStatus(str, Enum):
    invalid_token = "invalid_token"
    not_authorized = "not_authorized"
    timeout = "timeout"
    rejected = "rejected"
    accepted = "accepted"
    invalid_payload = "invalid_payload"
