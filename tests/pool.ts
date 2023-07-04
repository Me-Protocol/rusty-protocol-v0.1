
// // import poolConstructor from '../types/constructors/pool';
// // import poolContract from '../../typechain-generated/contracts/pool'
// // import rewardConstructor from '../../typechain-generated/constructors/reward'
// // import rewardContract from '../../typechain-generated/contracts/reward'
// // import { expect } from '@jest/globals';
// // import { encodeAddress } from '@polkadot/keyring';
// // import BN from 'bn.js';
// // import Factory_factory from '../types/constructors/factory_contract';
// // import Pair_factory from '../types/constructors/pair_contract';
// // import Token_factory from '../types/constructors/psp22_token';
// // import Wnative_factory from '../types/constructors/wnative_contract';
// // import Router_factory from '../types/constructors/router_contract';
// // import Factory from '../types/contracts/factory_contract';
// // import Pair from '../types/contracts/pair_contract';
// // import Token from '../types/contracts/psp22_token';
// // import Wnative from '../types/contracts/wnative_contract';
// // import Router from '../types/contracts/router_contract';
// // import { AccountId, Hash } from 'types-arguments/factory_contract';
// import { ApiPromise } from '@polkadot/api';
// import { KeyringPair } from '@polkadot/keyring/types';
// // import { emit, revertedWith } from './testHelpers';
// import type { WeightV2 } from '@polkadot/types/interfaces'
// // import { scaleWeightV2 } from './utils';


// describe( "Pool Test", () => {

//     let pool_fixture = async() => { 
//         const api = await ApiPromise.create()
//         const signers = getSigners()
//         const admin = signers[0]
//         const brandA = signers[1]
//         const brandB = signers[2]

     
//         const rewardFactory = new rewardConstructor(api, admin)
//         const rewardAAddress = (await rewardFactory.new(brandA.address,["A"],["A"],2,10000)).address
//         const rewardBAddress = (await rewardFactory.new(brandB.address,["B"],["B"],2,10000)).address
//         const  meAddress = (await rewardFactory.new(admin.address,["Me"],["Me"],2,10000)).address
//         const rewardA = new rewardContract(rewardAAddress, brandA, api)
//         const rewardB = new rewardContract(rewardBAddress, brandB, api)
//         const me = new rewardContract(meAddress, admin, api)
//         const poolFactory = new poolConstructor(api, admin);

       

//         const poolAAddress = (await poolFactory.new(admin.address, rewardAAddress, meAddress,
//             {   rOptimal: 1000000,
//                 maximumRLimit: 1,
//                 minimumRewardAmountForConversation: 0,
//                 minimumMeAmountForConversation: 0,
//                 notifyRewardAmount: 0,
//                 notifyMeAmount: 0,
//                 defaultSlippageInPrecision: 0,
//                 allowInternalSwap: false
//             }
//             )).address;
//             const poolBAddress = (await poolFactory.new(admin.address, rewardBAddress, meAddress,
//                 {   rOptimal: 0,
//                     maximumRLimit: 0,
//                     minimumRewardAmountForConversation: 0,
//                     minimumMeAmountForConversation: 0,
//                     notifyRewardAmount: 0,
//                     notifyMeAmount: 0,
//                     defaultSlippageInPrecision: 0,
//                     allowInternalSwap: false
//                 }
//                 )).address;
//         const poolA = new poolContract(poolAAddress, admin, api)
//         const poolB = new poolContract(poolBAddress, admin, api)
//         me.tx.transfer(brandA.address, 1000, []);
//         me.tx.transfer(brandB.address, 1000, []);

//         return {
//           api,
//           admin,
//           brandA,
//           brandB,
//           poolA,
//           poolB,
//           rewardA,
//           rewardB,
//           me,
//           close: async () => {
//             await api.disconnect()
//           }
//         }
//     }


//     // it('should give pool tokens', async () => {
//     //             const { poolA, rewardA, me, brandA, admin, close } = await pool_fixture();
            
//     //             await  rewardA.withSigner(brandA).tx.transfer(poolA.address, 100, []);

//     //             await  rewardA.withSigner(brandA).query.transfer(poolA.address, 100, []);
//     //             await me.withSigner(brandA).tx.transfer(poolA.address, 100, []);

//     //             await poolA.tx.startAllowingConversations(brandA.address);
    
                 
//     //              await close();
//     //           });


//               it('should start conversation', async () => {
//                 const { poolA, rewardA, me, brandA, admin, close } = await pool_fixture();
            
//                 await  rewardA.withSigner(brandA).tx.transfer(poolA.address, 100, []);

//                 await  rewardA.withSigner(brandA).query.transfer(poolA.address, 100, []);
               
//                 await me.withSigner(brandA).tx.transfer(poolA.address, 100, []);
                
//                 let result =  await poolA.withSigner(brandA).query.startAllowingConversations(brandA.address);
//                 console.log(result.value.err)
//                  await close();
//               });


//      }
// );