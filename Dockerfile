FROM node:16.15.1

# Set a default value for the SUBSTRATE_NODE_URL environment variable
ENV SUBSTRATE_NODE_URL=ws://host.docker.internal:9944

# Copy your application code to the container
COPY ./typechain-generated /app/typechain-generated
COPY package.json /app/package.json
COPY tsconfig.json /app/tsconfig.json

# Copy your tests to the container
COPY ./tests /app/tests

# Set the working directory in the container
WORKDIR /app

# Install yarn dependencies
RUN yarn install --non-interactive --frozen-lockfile

# Command to run tests
CMD ["npx", "mocha", "--require", "@babel/register", "--require", "ts-node/register", "--recursive", "./tests", "--extension", ".ts", "--exit", "--timeout", "20000"]

