# signalling_server
A basic websockets signalling server (well, eventually)


# Development mode

`
docker-compose -f docker-compose.dev.yml up
`

# Production mode

`
docker-compose up
`

# Deploying

Make sure your production "version" works by running `docker-compose up`.

If you don't see your changes remember to `docker-compose down` and delete the existing image (since the production version COPIES the files).
