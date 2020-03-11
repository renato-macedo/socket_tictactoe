FROM node:12-stretch AS project
WORKDIR /project
COPY ./web/package-lock.json ./web/package.json ./
RUN npm ci
COPY ./web .
RUN npm run build

FROM golang:1.13-alpine3.11

RUN mkdir /socket-tic-tac-toe


COPY . /socket-tic-tac-toe

WORKDIR /socket-tic-tac-toe

COPY --from=project ./project/dist /socket-tic-tac-toe/web/dist/

RUN  go mod download

RUN go build -o main 

CMD ["/socket-tic-tac-toe/main"]