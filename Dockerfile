# This Dockerfile uses a multi-stage build. Only the first stage requires
# all dependencies, the final image will contain only the output files

# First stage: Build project
FROM node as build

# Install pandoc
RUN wget -O pandoc-amd64.deb https://github.com/jgm/pandoc/releases/download/2.2.2.1/pandoc-2.2.2.1-1-amd64.deb
RUN dpkg -i pandoc-amd64.deb
RUN rm pandoc-amd64.deb

# Copy files and install dependencies
COPY ./ /
RUN npm install
RUN npm audit fix

# Build project
RUN npm run build


# Second stage: Server to deliver files
FROM node:alpine

# Install http server
RUN npm install --global --no-save http-server

# Port 8080 can be used as non root
EXPOSE 8080

# Create user with home directory and no password
RUN adduser -Dh /public server
USER server
WORKDIR /public

# Copy files from first stage
COPY --from=build /dist /public
# Serve index.html for every file which is not found on the server
RUN cp ./index.html ./404.html

# Run server (-g will automatically serve the gzipped files if possible)
CMD ["/usr/local/bin/http-server", "-g", "/public"]
