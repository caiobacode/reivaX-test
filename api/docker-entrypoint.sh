#!/bin/bash
exec gunicorn -k geventwebsocket.gunicorn.workers.GeventWebSocketWorker -w 1 -b "0.0.0.0:5000" --reload --log-config ./logging.conf runner:app
