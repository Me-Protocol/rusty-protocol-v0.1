// import { consts } from './utils/constants'
// import { bnArg, expect, getSigners } from './utils/helpers'
// import BN from 'bn.js'
// import { ApiPromise , WsProvider} from '@polkadot/api'
// import bountyConstructor from '../../typechain-generated/constructors/bounty'
// import bountyContract from '../../typechain-generated/contracts/bounty'
// import rewardConstructor from '../../typechain-generated/constructors/reward'
// import rewardContract from '../../typechain-generated/contracts/reward'

// describe( "Bounty Test", () => {

//     let bounty_fixture = async() => { 
//         // const api = await ApiPromise.create()

//         const substrateNodeUrl = process.env.SUBSTRATE_NODE_URL || 'ws://127.0.0.1:9944';

//         // initialise a provider with a specific endpoint
//         const provider = new WsProvider(substrateNodeUrl)

//         // initialise via isReady & new with specific provider
//         const api = await new ApiPromise({ provider: provider, initWasm: false }).isReady;
//         const signers = getSigners()
//         const admin = signers[0]
//         const user = signers[1]

//         const rewardFactory = new rewardConstructor(api, admin)
//         const rewardAddress = (await rewardFactory.new(admin.address,"A","A",2,10000)).address
//         const reward = new rewardContract(rewardAddress, admin, api)
//         const bountyFactory = new bountyConstructor(api, admin)
//         const bountyAddress = (await bountyFactory.new(rewardAddress)).address
//         const bounty = new bountyContract(bountyAddress, admin, api)

        
//         return {
//           api,
//           admin,
//           reward,
//           bounty,
//           user,
//           close: async () => {
//             await api.disconnect()
//           }
//         }
//     }


//     describe("recordDepositedBountyRewards", function () {
        
//         it('Should successfully record bounty amount', async () => {
//             const {reward, bounty, admin, close } = await bounty_fixture();
     
//             await reward.tx.transfer(bounty.address, 100, []);
     
//              let rewardBal = await reward.query.balanceOf(bounty.address)
     
//              let resss = await rewardBal.value.unwrapRecursively().rawNumber.toString()
     
//             console.log("balance of bounty", resss)
            
//             expect(await bounty.withSigner(admin).tx.depositBounty(reward.address, 100, admin.address)).to.ok
     
//             await close();
//           });
     
     
//           it("Should fail because your are trying to record an amount you didn't deposit", async () => {
//              const {reward, bounty, admin, close } = await bounty_fixture();
      
//               let rewardBal = await reward.query.balanceOf(bounty.address)
      
//               let resss = await rewardBal.value.unwrapRecursively().rawNumber.toString()
      
//              console.log("balance of bounty", resss)
             
//              await expect(bounty.withSigner(admin).tx.depositBounty(reward.address, 100, admin.address)).to.eventually.be.rejected
     
//              await close()
     
//          });
//     });


//     describe("withdrawBountyRewards", function () {
//         it("Should successfully withdraw from bounty pool", async function () {
          
//             const {reward, bounty, admin, close } = await bounty_fixture();
     
//             await reward.tx.transfer(bounty.address, 100, []);
            
//             await bounty.withSigner(admin).tx.depositBounty(reward.address, 100, admin.address)
            
//             let rewardBal = await reward.query.balanceOf(admin.address)
    
//             let balanceBeforeWithdrawal = await rewardBal.value.unwrapRecursively().rawNumber.toString()
    
//             console.log("balance of bounty before withdrawal", balanceBeforeWithdrawal)
        
//             await bounty.withSigner(admin).tx.withdrawBounty(reward.address, 100, admin.address, admin.address)

//             let balanceAfterWithdraw = await reward.query.balanceOf(admin.address)

//             expect(Number(balanceAfterWithdraw.value.unwrapRecursively().rawNumber.toString())).to.eq(Number(balanceBeforeWithdrawal) + 100)
            
//             await close()
//         });

//         it("Should fail because caller is not a me-protocol admin", async function () {
            
//             const {reward, bounty, admin, user,close } = await bounty_fixture();
     
//             await reward.withSigner(admin).tx.transfer(bounty.address, 100, []);
            
//             await bounty.withSigner(admin).tx.depositBounty(reward.address, 100, admin.address)

//             await expect( bounty.withSigner(user).tx.depositBounty(reward.address, 100, admin.address)).to.eventually.be.rejected
            
//             await close()
//         });

//         it("Should fail because caller is trying to withdraw out of range", async function () {
          
//             const {reward, bounty, admin, close } = await bounty_fixture();
     
//             await reward.tx.transfer(bounty.address, 100, []);
            
//             await bounty.withSigner(admin).tx.depositBounty(reward.address, 100, admin.address)
  
//             await expect( bounty.withSigner(admin).tx.withdrawBounty(reward.address, 1000, admin.address, admin.address)).to.eventually.be.rejected

//             await close()
//         });
//     });


//     describe("setBountyTriggerLimit", function () {
//         it("Should successfully set bounty_reward trigger limit", async function () {
//             const {reward, bounty, admin, close } = await bounty_fixture();

//             await reward.tx.transfer(bounty.address, 100, []);
     
//             let rewardBal = await reward.query.balanceOf(bounty.address)
    
//             let resss = await rewardBal.value.unwrapRecursively().rawNumber.toString()
    
//            console.log("balance of bounty", resss)
           
//            await bounty.withSigner(admin).tx.depositBounty(reward.address, 100, admin.address)

//            expect(await bounty.withSigner(admin).tx.setTriggerLimit(reward.address, 100, admin.address)).to.ok
//         });

//         it("Should fail because caller is not protocol", async function () {
            
//             const {reward, bounty, admin,user, close } = await bounty_fixture();

//             await reward.tx.transfer(bounty.address, 100, []);
     
//             let rewardBal = await reward.query.balanceOf(bounty.address)
    
//             let resss = await rewardBal.value.unwrapRecursively().rawNumber.toString()
    
//            console.log("balance of bounty", resss)
           
//            await bounty.withSigner(admin).tx.depositBounty(reward.address, 100, admin.address)

//            await expect( bounty.withSigner(user).tx.setTriggerLimit(reward.address, 100, admin.address)).to.eventually.be.rejected
//         });

//     });


// })