# Install the app dependencies in a full Node docker image
FROM node:12

# RUN mkdir -p /app
WORKDIR /app

# Install OS updates
RUN apt-get update
RUN apt-get dist-upgrade -y
RUN apt-get clean
RUN echo 'Finished installing dependencies'

# Copy package.json and package-lock.json
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the dependencies into a Slim Node docker image
FROM node:12-slim
WORKDIR /app

# Install OS updates
RUN apt-get update
RUN apt-get dist-upgrade -y
RUN apt-get clean
RUN echo 'Finished installing dependencies'

# Install app dependencies
COPY --from=0 /app/node_modules /app/node_modules
COPY . /app

ENV NODE_ENV sales-cloud
ENV PORT 3000
USER node
EXPOSE 3000
CMD ["npm","start"]
