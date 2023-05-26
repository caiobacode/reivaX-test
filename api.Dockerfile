FROM python:3.8-slim-buster AS base-image
LABEL author="VSZ/Reivax"

FROM base-image AS api
LABEL description="ECCO API container"
COPY ./api /usr/src/app
WORKDIR /usr/src/app
RUN pip install -r ./requirements.txt
ENTRYPOINT ["sh", "docker-entrypoint.sh"]
