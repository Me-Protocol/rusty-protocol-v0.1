import { consts } from './utils/constants'
import { expect, getSigners } from './utils/helpers'
import BN from 'bn.js'
import { ApiPromise } from '@polkadot/api'
import poolConstructor from '../../typechain-generated/constructors/pool'
import poolContract from '../../typechain-generated/contracts/pool'
import rewardConstructor from '../../typechain-generated/constructors/reward'
import rewardContract from '../../typechain-generated/contracts/reward'


describe( "Pool Test", () => {

    let pool_fixture = async() => { 
        const api = await ApiPromise.create()
        const signers = getSigners()
        const admin = signers[0]
        const brandA = signers[1]
        const brandB = signers[2]

     
        const rewardFactory = new rewardConstructor(api, admin)
        const rewardAAddress = (await rewardFactory.new(brandA.address,["A"],["A"],2,10000)).address
        const rewardBAddress = (await rewardFactory.new(brandB.address,["B"],["B"],2,10000)).address
        const  meAddress = (await rewardFactory.new(admin.address,["Me"],["Me"],2,10000)).address
        const rewardA = new rewardContract(rewardAAddress, brandA, api)
        const rewardB = new rewardContract(rewardBAddress, brandB, api)
        const me = new rewardContract(meAddress, admin, api)
        const poolFactory = new poolConstructor(api, admin);

       

        const poolAAddress = (await poolFactory.new(admin.address, rewardAAddress, meAddress,
            {   rOptimal: 1000000,
                maximumRLimit: 10000000,
                minimumRewardAmountForConversation: 0,
                minimumMeAmountForConversation: 0,
                notifyRewardAmount: 0,
                notifyMeAmount: 0,
                defaultSlippageInPrecision: 0,
                allowInternalSwap: false
            }
            )).address;
            const poolBAddress = (await poolFactory.new(admin.address, rewardBAddress, meAddress,
                {   rOptimal: 0,
                    maximumRLimit: 10,
                    minimumRewardAmountForConversation: 0,
                    minimumMeAmountForConversation: 0,
                    notifyRewardAmount: 0,
                    notifyMeAmount: 0,
                    defaultSlippageInPrecision: 0,
                    allowInternalSwap: false
                }
                )).address;
        const poolA = new poolContract(poolAAddress, admin, api)
        const poolB = new poolContract(poolBAddress, admin, api)
        me.tx.transfer(brandA.address, 1000, []);
        me.tx.transfer(brandB.address, 1000, []);

        return {
          api,
          admin,
          brandA,
          brandB,
          poolA,
          poolB,
          rewardA,
          rewardB,
          me,
          close: async () => {
            await api.disconnect()
          }
        }
    }


    it('should give pool tokens', async () => {
                const { poolA, rewardA, me, brandA, admin, close } = await pool_fixture();
            
                await  rewardA.withSigner(brandA).tx.transfer(poolA.address, 100, []);

                await  rewardA.withSigner(brandA).query.transfer(poolA.address, 100, []);
                await me.withSigner(brandA).tx.transfer(poolA.address, 100, []);

                await poolA.tx.startAllowingConversations(brandA.address);
                
                // try {
                //     let output =  await rewardA.query.transfer(poolA.address, 100000000, []);
                //     console.log(output)
                // }catch(error){
                //     console.log(error)
                // }
               
                 
                 await close();
              });


              it('should start conversation', async () => {
                const { poolA, rewardA, me, brandA, admin, close } = await pool_fixture();
            
                await  rewardA.withSigner(brandA).tx.transfer(poolA.address, 100, []);

                await  rewardA.withSigner(brandA).query.transfer(poolA.address, 100, []);
                await me.withSigner(brandA).tx.transfer(poolA.address, 100, []);

                await poolA.withSigner(brandA).tx.startAllowingConversations(brandA.address);
                
                // try {
                //     let output =  await rewardA.query.transfer(poolA.address, 100000000, []);
                //     console.log(output)
                // }catch(error){
                //     console.log(error)
                // }
               
                 
                 await close();
              });


     }
);