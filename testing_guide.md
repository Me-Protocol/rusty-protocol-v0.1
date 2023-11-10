### Guide to runing the Test 

## Running the Docker file for the e2e Test

1. Ensure you have the substrate node running in the background.

2. Run the following command ```docker build -t my-rust-environment . ```. The following command would build the docker image. 

3. Run the folowing comand to finally run the test from docker ```d docker run -p 9944:9944 my-rust-environment:v1 ```.

Your E2E test should be running sucessfully now.

## Running the Unit test 

To run the unit test, run the following command ```cargo test```, your unit test should be running by now.