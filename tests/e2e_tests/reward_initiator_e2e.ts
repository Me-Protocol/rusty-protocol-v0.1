// import { consts } from './utils/constants'
// import { bnArg, expect, getSigners } from './utils/helpers'
// import BN from 'bn.js'
// import { ApiPromise, WsProvider } from '@polkadot/api'
// import rewardInitiatorConstructor from '../../typechain-generated/constructors/reward_initiator'
// import rewardInitiatorContract from '../../typechain-generated/contracts/reward_initiator'
// import rewardConstructor from '../../typechain-generated/constructors/reward'
// import rewardContract from '../../typechain-generated/contracts/reward'


// describe( "reward inititiator Test", () => {

//     let reward_fixture = async() => { 

//         const substrateNodeUrl = process.env.SUBSTRATE_NODE_URL || 'ws://127.0.0.1:9944';

//         // initialise a provider with a specific endpoint
//         const provider = new WsProvider(substrateNodeUrl)

//         // initialise via isReady & new with specific provider
//         const api = await new ApiPromise({ provider: provider, initWasm: false }).isReady;
//         const signers = getSigners()
//         const admin = signers[0]
//         const user = signers[1]


     
//         const rewardFactory = new rewardConstructor(api, admin)
//         const rewardAddress = (await rewardFactory.new(admin.address,"","",2,10000)).address
//         const reward = new rewardContract(rewardAddress, admin, api)
//         const rewardInitiatorFactory = new rewardInitiatorConstructor(api, admin);
  
//         const rewardInititatorAddress = (await rewardInitiatorFactory.new(reward.abi.info.source.wasmHash.toString())).address

//         const rewardInitiator = new rewardInitiatorContract(rewardInititatorAddress, admin, api)
   
//         const brand = [1,2,3,4,5,6,7,8,9,0]

//         return {
//           api,
//           admin, 
//           rewardAddress,
//           rewardInitiator,
//           user,
//           brand,
//           close: async () => {
//             await api.disconnect()
//           }
//         }
//     }


//             it('Should be able to create a new ', async () => {
//                 const {admin, rewardInitiator, brand, close } = await reward_fixture();
            
//                 expect(await rewardInitiator.tx.createNewReward( admin.address,"rewardA","rewardA",2,10000, [0xDE, 0xAD, 0xBE, 0xEF], brand)).to.be.ok
//             });


//             it('Should reject when called by none admin ', async () => {
//                 const { admin, rewardInitiator, brand,user, close } = await reward_fixture();

//                 await  expect(rewardInitiator.withSigner(user).tx.createNewReward( admin.address,"rewardA","rewardA",2,10000, [0xDE, 0xAD, 0xBE, 0xEF], brand)).to.be.rejected
                        
//             });

//             it('Should store the new contract address successfully ', async () => {
//                 const { admin, rewardInitiator, brand,user, close } = await reward_fixture();

//                 await rewardInitiator.tx.createNewReward( admin.address,"rewardA","rewardA",2,10000, [0xDE, 0xAD, 0xBE, 0xEF], brand)

//                 let res = (await rewardInitiator.query.getBrandReward(brand)).value.unwrapRecursively().length

//                 expect (res).to.be.eq(48)    
//             });


//             it('Should return the array of all newly created rewards ', async () => {
//                 const { admin, rewardInitiator, brand,user, close } = await reward_fixture();

//                 await rewardInitiator.tx.createNewReward( admin.address,"rewardA","rewardA",2,10000, [0xDE, 0xAD, 0xBE, 0xEF], brand)
                
//                 // let res = (await rewardInitiator.query.getAllBrandRewards()).value.unwrapRecursively().length
//                 let res = (await rewardInitiator.query.getAllBrandRewards()).value.unwrapRecursively()
//                 await rewardInitiator.withSigner(admin).tx.createNewReward( admin.address,"rewardb","rewardb",2,10000, [0xDE, 0xAD, 0xBE, 0xEF], brand)
                
//                 res = (await rewardInitiator.query.getAllBrandRewards()).value.unwrapRecursively()
//                 console.log(res)

//                 expect (res.length).to.be.eq(2)    
//             });






//             })