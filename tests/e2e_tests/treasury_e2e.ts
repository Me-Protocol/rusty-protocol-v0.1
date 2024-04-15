// import { consts } from './utils/constants'
// import { bnArg, expect, getSigners } from './utils/helpers'
// import BN from 'bn.js'
// import { ApiPromise, WsProvider } from '@polkadot/api'
// import treasuryConstructor from '../../typechain-generated/constructors/treasury'
// import treasuryContract from '../../typechain-generated/contracts/treasury'
// import rewardConstructor from '../../typechain-generated/constructors/reward'
// import rewardContract from '../../typechain-generated/contracts/reward'

// describe( "Treasury Test", () => {

//     let treasury_fixture = async() => { 
      
//         const substrateNodeUrl = process.env.SUBSTRATE_NODE_URL || 'ws://127.0.0.1:9944';

//         // initialise a provider with a specific endpoint
//         const provider = new WsProvider(substrateNodeUrl)

//         // initialise via isReady & new with specific provider
//         const api = await new ApiPromise({ provider: provider, initWasm: false }).isReady;
//         const signers = getSigners()
//         const admin = signers[0]
//         const brandA = signers[1]
//         const protocol = signers[2]
//         const user1 = signers[3]
//         const brandId : number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];;


//         const rewardFactory = new rewardConstructor(api, admin)
//         const rewardAAddress = (await rewardFactory.new(brandA.address,"A","A",2,10000)).address
//         const rewardBAddress = (await rewardFactory.new(protocol.address,"B","B",2,10000)).address
//         const  meAddress = (await rewardFactory.new(admin.address,"Me","Me",2,10000)).address
//         const rewardA = new rewardContract(rewardAAddress, brandA, api)
//         const rewardB = new rewardContract(rewardBAddress, protocol, api)
//         const me = new rewardContract(meAddress, admin, api)
//         const treasuryFactory = new treasuryConstructor(api, admin)
//         const treasuryAddress = (await treasuryFactory.new(meAddress)).address
//         const treasury = new treasuryContract(treasuryAddress, admin, api)

     
//         return {
//           api,
//           admin,
//           rewardA,
//           rewardB,
//           brandA,
//           protocol,
//           brandId,
//           me,
//           treasury,
//           user1,
//           close: async () => {
//             await api.disconnect()
//           }
//         }
//     }


//     describe("recordDepositedRewardAndOrMe", function () {

//         it("Should successfully deposit tokens to the treasury", async function () {
//             const { treasury, rewardA, rewardB, brandA, protocol, brandId,admin,me, close } = await treasury_fixture();

//             await rewardA.tx.transfer(treasury.address, 100, []);

//             await me.tx.transfer(treasury.address, 100, []);

//             const treasuryMeBal = await me.query.balanceOf(treasury.address)

//             const treasuryRewardBal = await rewardA.query.balanceOf(treasury.address)

//             console.log(`me balance is ${treasuryMeBal.value.unwrapRecursively().rawNumber.toString()}, reward balance is ${treasuryRewardBal.value.unwrapRecursively().rawNumber.toString()}`)

//             expect(await treasury.withSigner(admin).tx.depositRewardAndOrMe(rewardA.address,100,100,brandId, admin.address, "metadata" )).to.be.ok

     
//         });


//         it("Should fail because you are trying to deposit zero tokens", async function () {
            
//             const { treasury, rewardA, rewardB, brandA, protocol, brandId,admin,me, close } = await treasury_fixture();

//             const treasuryMeBal = await me.query.balanceOf(treasury.address)

//             const treasuryRewardBal = await rewardA.query.balanceOf(treasury.address)

//             console.log(`me balance is ${treasuryMeBal.value.unwrapRecursively().rawNumber.toString()}, reward balance is ${treasuryRewardBal.value.unwrapRecursively().rawNumber.toString()}`)

//             await expect(treasury.withSigner(admin).tx.depositRewardAndOrMe(rewardA.address,0,0,brandId, admin.address, "metadata" )).to.eventually.be.rejected

//         });


//         it("Should fail because you are trying to record less me tokens than deposited", async function () {
           
//             const { treasury, rewardA, rewardB, brandA, protocol, brandId,admin,me, close } = await treasury_fixture();

//             await rewardA.tx.transfer(treasury.address, 100, []);

//             await me.tx.transfer(treasury.address, 50, []);

//             const treasuryMeBal = await me.query.balanceOf(treasury.address)

//             const treasuryRewardBal = await rewardA.query.balanceOf(treasury.address)

//             await expect(treasury.withSigner(admin).tx.depositRewardAndOrMe(rewardA.address,100,100,brandId, admin.address, "metadata" )).to.eventually.be.rejected

//         });


//         it("Should fail because you are trying to record less reward tokens than deposited", async function () {
          
//             const { treasury, rewardA, rewardB, brandA, protocol, brandId,admin,me, close } = await treasury_fixture();

//             await rewardA.tx.transfer(treasury.address, 50, []);

//             await me.tx.transfer(treasury.address, 100, []);

//             const treasuryMeBal = await me.query.balanceOf(treasury.address)

//             const treasuryRewardBal = await rewardA.query.balanceOf(treasury.address)

//             await expect(treasury.withSigner(admin).tx.depositRewardAndOrMe(rewardA.address,100,100,brandId, admin.address, "metadata" )).to.eventually.be.rejected

//         });
//     });


//     describe("recordDepositedCai", function () {

//         it("Should successfully call the recordDepositedCai to record tokens deposited into the treasury", async function () {
            
//             const { treasury, brandId,admin,me, close } = await treasury_fixture();

//             await me.tx.transfer(treasury.address, 100, []);

//             expect(await treasury.tx.receiveCai(100, brandId, admin.address, "metadata")).to.be.ok

//         });

//         it("Should fail because you are trying to record zero me tokens", async function () {
            
             
//             const { treasury, brandId,admin,me, close } = await treasury_fixture();

//             await me.tx.transfer(treasury.address, 100, []);

//             await expect(treasury.tx.receiveCai(0, brandId, admin.address, "metadata")).to.be.eventually.rejected
//         });

//         it("Should fail because you are trying to record less me tokens than deposited", async function () {
                 
//             const { treasury, brandId,admin,me, close } = await treasury_fixture();

//             await me.tx.transfer(treasury.address, 50, []);

//             await expect(treasury.tx.receiveCai(100, brandId, admin.address, "metadata")).to.be.eventually.rejected
       
//         });
//     });


//     describe("withdrawRewardAndOrMe", function () {
//         it("Should successfully withdraw tokens from the treasury after depositing", async function () {
             
//             const { treasury, rewardA, rewardB, brandA, protocol, brandId,admin,me, close } = await treasury_fixture();

//             await rewardA.tx.transfer(treasury.address, 100, []);

//             await me.tx.transfer(treasury.address, 100, []);

//             const treasuryMeBal = await me.query.balanceOf(treasury.address)

//             const treasuryRewardBal = await rewardA.query.balanceOf(treasury.address)

//             console.log(`me balance is ${treasuryMeBal.value.unwrapRecursively().rawNumber.toString()}, reward balance is ${treasuryRewardBal.value.unwrapRecursively().rawNumber.toString()}`)

//             await treasury.withSigner(admin).tx.depositRewardAndOrMe(rewardA.address,100,100,brandId, admin.address, "metadata")

//             let rewardBalMe = await rewardA.query.balanceOf(admin.address)
    
//             let balanceBeforeWithdrawalMe = await rewardBalMe.value.unwrapRecursively().rawNumber.toString()
  
//             let rewardBal = await rewardA.query.balanceOf(admin.address)
    
//             let balanceBeforeWithdrawal = await rewardBalMe.value.unwrapRecursively().rawNumber.toString()
  
//             await treasury.withSigner(admin).tx.withdrawRewardAndOrMe(rewardA.address,100,100,brandId, admin.address, admin.address)

//             let balanceAfterWithdrawMe = await rewardA.query.balanceOf(admin.address)

//             let balanceAfterWithdrawReward = await rewardA.query.balanceOf(admin.address)

//             expect(Number(balanceAfterWithdrawMe.value.unwrapRecursively().rawNumber.toString())).to.eq(Number(balanceBeforeWithdrawalMe) + 100)
            
//             expect(Number(balanceAfterWithdrawReward.value.unwrapRecursively().rawNumber.toString())).to.eq(Number(balanceBeforeWithdrawal) + 100)
            

//         });

//         it("Should fail because you are trying to withdraw zero tokens", async function () {
           
//             const { treasury, rewardA, brandId,admin,me, close } = await treasury_fixture();

//             await rewardA.tx.transfer(treasury.address, 100, []);

//             await me.tx.transfer(treasury.address, 100, []);

//             await treasury.withSigner(admin).tx.depositRewardAndOrMe(rewardA.address,100,100,brandId, admin.address, "metadata")

//             await expect(treasury.withSigner(admin).tx.withdrawRewardAndOrMe(rewardA.address,0,0,brandId, admin.address, admin.address)).to.be.eventually.rejected

//        });

//         it("Should fail because you are trying to withdraw more me tokens than deposited", async function () {
            
//             const { treasury, rewardA, brandId,admin,me, close } = await treasury_fixture();

//             await rewardA.tx.transfer(treasury.address, 100, []);

//             await me.tx.transfer(treasury.address, 50, []);

//             await treasury.withSigner(admin).tx.depositRewardAndOrMe(rewardA.address,100,50,brandId, admin.address, "metadata")

//             await expect(treasury.withSigner(admin).tx.withdrawRewardAndOrMe(rewardA.address,100,100,brandId, admin.address, admin.address)).to.be.eventually.rejected

//         });

//         it("Should fail because you are trying to withdraw less reward tokens than deposited", async function () {
//             const { treasury, rewardA, brandId,admin,me, close } = await treasury_fixture();

//             await rewardA.tx.transfer(treasury.address, 50, []);

//             await me.tx.transfer(treasury.address, 100, []);

//             await treasury.withSigner(admin).tx.depositRewardAndOrMe(rewardA.address,50,100,brandId, admin.address, "metadata")

//             await expect(treasury.withSigner(admin).tx.withdrawRewardAndOrMe(rewardA.address,100,100,brandId, admin.address, admin.address)).to.be.eventually.rejected

//         });

//         it("Should fail because caller is not allowed to make this call (not admin)", async function () {
           
//             const { treasury, rewardA, brandA,brandId,admin,me, close } = await treasury_fixture();

//             await rewardA.tx.transfer(treasury.address, 50, []);

//             await me.tx.transfer(treasury.address, 100, []);

//             await treasury.withSigner(admin).tx.depositRewardAndOrMe(rewardA.address,50,100,brandId, admin.address, "metadata")

//             await expect(treasury.withSigner(brandA).tx.withdrawRewardAndOrMe(rewardA.address,100,100,brandId, admin.address, admin.address)).to.be.eventually.rejected

//         });
//     });


//     describe("payForSomeCosts", function () {
        
//         it("Should successfully deposit tokens and pay for some cost (something)", async function () {
            
//             const { treasury, rewardA, brandA,brandId,admin,me, close, protocol } = await treasury_fixture();

//             await rewardA.tx.transfer(treasury.address, 100, []);

//             await me.tx.transfer(treasury.address, 100, []);

//             await treasury.withSigner(admin).tx.depositRewardAndOrMe(rewardA.address,100,100,brandId, admin.address, "metadata")
            
//             await treasury.withSigner(admin).tx.payForSomeCosts(rewardA.address,protocol.address, 50, 50, brandId,admin.address,"metadata" )

//             let protocolBalance = await me.query.balanceOf(protocol.address)

//             expect(protocolBalance.value.unwrapRecursively().rawNumber.toString()).to.eq('50')

//         });

//         it("Should fail because you are trying to deposit zero me tokens", async function () {
            
//             const { treasury, rewardA, brandA,brandId,admin,me, close, protocol } = await treasury_fixture();

//             await rewardA.tx.transfer(treasury.address, 100, []);

//             await me.tx.transfer(treasury.address, 100, []);

//             await treasury.withSigner(admin).tx.depositRewardAndOrMe(rewardA.address,100,100,brandId, admin.address, "metadata")
            
//             await expect(treasury.withSigner(admin).tx.payForSomeCosts(rewardA.address,protocol.address, 0, 0, brandId,admin.address,"metadata" )).to.be.eventually.rejected

//         });

//         it("Should fail because you are trying to pay more me tokens than the deposited", async function () {
            
//             const { treasury, rewardA, brandA,brandId,admin,me, close, protocol } = await treasury_fixture();

//             await rewardA.tx.transfer(treasury.address, 100, []);

//             await me.tx.transfer(treasury.address, 100, []);

//             await treasury.withSigner(admin).tx.depositRewardAndOrMe(rewardA.address,100,100,brandId, admin.address, "metadata")
            
//             await expect(treasury.withSigner(admin).tx.payForSomeCosts(rewardA.address,protocol.address, 1000, 1000, brandId,admin.address,"metadata" )).to.be.eventually.rejected

//         });

//         it("Should fail because you are not an admin", async function () {
//             const { treasury, rewardA, brandA,brandId,admin,me, close, protocol } = await treasury_fixture();

//             await rewardA.tx.transfer(treasury.address, 100, []);

//             await me.tx.transfer(treasury.address, 100, []);

//             await treasury.withSigner(admin).tx.depositRewardAndOrMe(rewardA.address,100,100,brandId, admin.address, "metadata")
            
//             await expect(treasury.withSigner(protocol).tx.payForSomeCosts(rewardA.address,protocol.address, 100, 100, brandId,admin.address,"metadata" )).to.be.eventually.rejected

//         });
//     });


// })