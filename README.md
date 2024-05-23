# Demo Chat

This is an example of an api for a chat application using microservice architecture. You may see some not quite right decisions and incomplete work here, but it doesn't matter. Happy path.

[Logs](apps%2Flogs%2FREADME.md), [Otps](apps%2Fotps%2FREADME.md), [Files](apps%2Ffiles%2FREADME.md),
[Emails](apps%2Femails%2FREADME.md), [Users](apps%2Fusers%2FREADME.md), [Auth](apps%2Fauth%2FREADME.md),
[Chats](apps%2Fchats%2FREADME.md), [Members](apps%2Fmembers%2FREADME.md), [Messages](apps%2Fmessages%2FREADME.md),
[Search](apps%2Fsearch%2FREADME.md), [Gateway](apps%2Fgateway%2FREADME.md).

## Running (~8.5 GB/RAM)

1. Install dependencies.
```shell
npm ci
```

2. Run the required apps with docker compose.
```shell
docker compose up -d
```

3. Run project apps.
```shell
nx run-many --parallel --target=serve --projects=auth,chats,emails,files,members,messages,otps,search,users,gateway,logs --maxParallel=11
```

4. Open the Apollo Studio.
```
http://localhost:3333/graphql
```

5. Open emails.
```
http://localhost:1080
```

## Packages:
“@golevelup/nestjs-rabbitmq” on “^5.3.0” has the error “AmqpConnection Received message with invalid routing key”, so use “4.1.0”.
