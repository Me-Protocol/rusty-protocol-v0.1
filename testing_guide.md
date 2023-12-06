### Guide to runing the Test 

Install all dependencies from cargo.toml and package.json

## Running the Unit test 

To run the unit test, run the following command ```cargo test```, your unit test should be running by now.

## Running the e2e test on your local machine 

1. Run the following command to run the test ``` npx mocha --require @babel/register --require ts-node/register --recursive ./tests --extension \".ts\" --exit --timeout 20000 ``` . 

## Running the Docker file for the e2e Test

1. Ensure you have the substrate-contract node running in the background.

2. Enusre you have your docker application running.

3. Run the following command ```docker build -t my-rust-environment:v1 . ```. The following command would build the docker image. 

4. Run the folowing comand to finally run the test from docker ```docker run -p 9944:9944 my-rust-environment:v1 ```.

Your E2E test should be running sucessfully now.


