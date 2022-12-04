FROM node:19-alpine

ENV YEAR=2022

COPY ./$YEAR/ /home
WORKDIR /home

ENTRYPOINT ["node"]
