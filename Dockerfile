FROM node:latest
RUN mkdir /app
ADD . /app
WORKDIR /app
RUN npm install
EXPOSE 3001
CMD ["node", "server"]
# TO BUILD DOCKER IMAGE:
# docker build -t kilgoretrout9/sdc_products1 .
