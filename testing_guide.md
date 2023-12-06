### Guide to runing the Test 

Install all dependencies from cargo.toml and package.json

## Running the Unit test 

To run the unit test, run the following command ```cargo test```, your unit test should be running by now.

## Running the e2e test on your local machine 

1. Go into the modules folder, enter into each of the following folders (deployables, peripherals and services) and cargo run ```cargo contract build``` in each of the follwing (deployables -> {pool, pool_initiator, reward, reward_iniitiator}, peripheral -> {bounty, treasury}, services -> {oracle and payment})

2. Get the contract_name.contract and contract_name.json for each of them inside the ink folder in the target folder for each of them. Create an artifact folder, then paste all of them inside inside it. 

3. Then run the following command ``` npx @727-ventures/typechain-polkadot --in artifacts --out ./typechain-generated ```, to create the typechain. 

4. Then run the following command to run the test ``` npx mocha --require @babel/register --require ts-node/register --recursive ./tests --extension \".ts\" --exit --timeout 20000 ``` . 

## Running the Docker file for the e2e Test

1. Ensure you have the substrate-contract node running in the background.

2. Enusre you have your docker application running.

3. Run the following command ```docker build -t my-rust-environment:v1 . ```. The following command would build the docker image. 

4. Run the folowing comand to finally run the test from docker ```docker run -p 9944:9944 my-rust-environment:v1 ```.

Your E2E test should be running sucessfully now.


docker tag my-rust-environment:latest  haryomite/me_protocol:0.1
docker login
docker push  haryomite/me_protocol:0.1