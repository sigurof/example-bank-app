# Example App ("Banky Bank")

This is a simple project for illustrating how to use Docker for local application development, such as for backend database or containerising your frontend dev server.

## To run

### In development mode

```bash
$ docker compose up
$ docker compose watch browser
```

### In distribution mode
```bash
docker compose -f docker-compose.yml -f docker-compose-dist.yml up
```
