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
FROM nginx:1.15-alpine

# Copy files from first stage
COPY --from=build /dist /var/www

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf
