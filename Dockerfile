FROM golang:1.14.0-alpine3.11

RUN mkdir /socket-tic-tac-toe

COPY . /socket-tic-tac-toe

WORKDIR /socket-tic-tac-toe

RUN  go mod download

RUN go build -o main ./...

CMD ["/socket-tic-tac-toe/main"]