FROM node:18.17.1

# Install the necessary Node.js packages
RUN npm install -g mocha typescript ts-node

# Switch to Rust image
FROM rust

# Set the working directory inside the container
WORKDIR /app

# Copy the TypeChain-generated directory into the container
COPY ./typechain-generated /app/typechain-generated
COPY package.json /app/package.json
COPY tsconfig.json /app/tsconfig.json
COPY ./contracts /app/contracts

# Copy your tests to the container
COPY ./tests /app/tests

# Install Rust tools
RUN curl -sSf https://sh.rustup.rs | sh -s -- -y
RUN rustup component add rust-src
RUN rustup target add wasm32-unknown-unknown
RUN cargo install cargo-dylint dylint-link

# Install protobuf-compiler (protoc)
RUN apt-get update
RUN apt-get install -y protobuf-compiler

# Install contract tools
RUN cargo install cargo-contract --version 4.0.0-alpha --force
RUN cargo install contracts-node --git https://github.com/paritytech/substrate-contracts-node.git --force --locked

# Define the command to run the tests using ts-node
CMD ["ts-node", "node_modules/.bin/mocha", "--require", "@babel/register", "--require", "ts-node/register", "--recursive", "./tests", "--extension", ".ts", "--exit", "--timeout", "20000"]
