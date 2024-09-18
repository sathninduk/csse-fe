# ---- Base Node ----
FROM node:14-alpine AS base
WORKDIR /app
COPY package*.json ./

# ---- Dependencies ----
FROM base AS dependencies
RUN npm ci

# ---- Copy Files/Build ----
FROM dependencies AS build
COPY . .
RUN npm run build

# --- Release with Apache ----
FROM httpd:2.4 AS release
# Copy the build output to replace the default Apache contents.
COPY --from=build /app/out /usr/local/apache2/htdocs/
# Copy the Apache configuration file
COPY ./dpacks-fe-httpd.conf /usr/local/apache2/conf/httpd.conf