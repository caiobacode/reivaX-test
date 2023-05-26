import os

app_dir = os.path.abspath(os.path.dirname(__file__))


class BaseConfig(object):
    # Flask config
    SECRET_KEY = os.environ.get("API_SECRET_KEY") or "A SECRET KEY"

    # JWT config
    JWT_SECRET_KEY = os.environ.get("JWT_SECRET_KEY") or "A SECRET KEY"
    JWT_ACCESS_TOKEN_EXPIRES = int(os.environ.get("JWT_ACCESS_TOKEN_EXPIRES", 450))
    JWT_REFRESH_TOKEN_EXPIRES = int(os.environ.get("JWT_REFRESH_TOKEN_EXPIRES", 900))
    JWT_TOKEN_LOCATION = ["json"]
    JWT_COOKIE_SECURE = False
    DEBUG = True
