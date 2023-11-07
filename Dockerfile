FROM node:18.17.1

# Set the working directory inside the container
WORKDIR /app

# Copy the TypeChain-generated directory into the container
COPY ./typechain-generated /app/typechain-generated
COPY package.json /app/package.json
COPY tsconfig.json /app/tsconfig.json
COPY typechain.config.json /app/typechain.config.json

# Install necessary packages from package.json
RUN npm install

RUN npm i --save-dev @types/mocha

RUN npm install -g ts-node

# Copy your tests to the container
COPY ./tests /app/tests

# EXPOSE 

# Define the command to run the tests using ts-node
CMD ["ts-node", "node_modules/.bin/mocha", "--require", "@babel/register", "--require", "ts-node/register", "--recursive", "./tests", "--extension", ".ts", "--exit", "--timeout", "20000"]

