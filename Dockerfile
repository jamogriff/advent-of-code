FROM node:19-alpine

ENV YEAR=2022

COPY ./docker-entrypoint.sh /home/
RUN chmod +x /home/docker-entrypoint.sh
COPY ./$YEAR /home/
WORKDIR /home/

ENTRYPOINT ["./docker-entrypoint.sh"]
CMD ["node"]
