import { consts } from './utils/constants'
import { bnArg, expect, getSigners } from './utils/helpers'
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
        const rewardAAddress = (await rewardFactory.new(brandA.address,"A","A",2,10000)).address
        const rewardBAddress = (await rewardFactory.new(brandB.address,"B","B",2,10000)).address
        const  meAddress = (await rewardFactory.new(admin.address,"Me","Me",2,10000)).address
        const rewardA = new rewardContract(rewardAAddress, brandA, api)
        const rewardB = new rewardContract(rewardBAddress, brandB, api)
        const me = new rewardContract(meAddress, admin, api)
        const poolFactory = new poolConstructor(api, admin);

       

        const poolAAddress = (await poolFactory.new(rewardAAddress, meAddress,
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
            const poolBAddress = (await poolFactory.new(rewardBAddress, meAddress,
                {   rOptimal: 0,
                    maximumRLimit: 0,
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



              // it('should start open rewards with correct R value and Signer', async () => {
              //   const { poolA, rewardA, me, brandA, brandB, admin, close } = await pool_fixture();
            
              //   await  rewardA.withSigner(brandA).tx.transfer(poolA.address, 100, []);

              //   await  rewardA.withSigner(brandA).query.transfer(poolA.address, 100, []);
               
              //   await me.withSigner(brandA).tx.transfer(poolA.address, 100, []);
                
              //   let result =  await poolA.withSigner(admin).tx.startOpenRewards();
        
              //    await close();
              // });


             
              // it('should pause open rewards with correct Signer and State', async () => {
              //   const { poolA, rewardA, me, brandA, brandB, admin, close } = await pool_fixture();
            
              //   await  rewardA.withSigner(brandA).tx.transfer(poolA.address, 100, []);

              //   await  rewardA.withSigner(brandA).query.transfer(poolA.address, 100, []);
               
              //   await me.withSigner(brandA).tx.transfer(poolA.address, 100, []);
                
              //   await poolA.withSigner(admin).tx.startOpenRewards();

              //   await poolA.withSigner(admin).tx.pauseOpenRewards();

              //   let result = await poolA.query.getOpenRewardsState();

              //   await expect((await poolA.query.getOpenRewardsState()).value.unwrapRecursively()).to.be.eq(false)
              //    await close();
              // });


              // it('should resume open rewards with correct Signer and State', async () => {
              //   const { poolA, rewardA, me, brandA, brandB, admin, close } = await pool_fixture();
            
              //   await  rewardA.withSigner(brandA).tx.transfer(poolA.address, 100, []);

              //   await  rewardA.withSigner(brandA).query.transfer(poolA.address, 100, []);
               
              //   await me.withSigner(brandA).tx.transfer(poolA.address, 100, []);
                
              //   await poolA.withSigner(admin).tx.startOpenRewards();

              //   await poolA.withSigner(admin).tx.pauseOpenRewards();

              //   await poolA.withSigner(admin).tx.resumeOpenRewards();

              //   let result = await poolA.query.getOpenRewardsState();

              //   await expect((await poolA.query.getOpenRewardsState()).value.unwrapRecursively()).to.be.eq(true)
              //    await close();
              // });


              // it('should provide open rewards state', async () => {
              //   const { poolA, rewardA, me, brandA, brandB, admin, close } = await pool_fixture();
            
              //   await  rewardA.withSigner(brandA).tx.transfer(poolA.address, 100, []);

              //   await  rewardA.withSigner(brandA).query.transfer(poolA.address, 100, []);
               
              //   await me.withSigner(brandA).tx.transfer(poolA.address, 100, []);
                
              //   await poolA.withSigner(admin).tx.startOpenRewards();

              //   let result = (await poolA.query.providePoolState()).value.unwrapRecursively();
              //   console.log(result)

              //   await close();
              // });



              it('should record the liqudity the pool state', async () => {
                const { poolA, rewardA, me, brandA, brandB, admin, close } = await pool_fixture();
            
                await  rewardA.withSigner(brandA).tx.transfer(poolA.address, 100, []);

                await  rewardA.withSigner(brandA).query.transfer(poolA.address, 100, []);
               
                await me.withSigner(brandA).tx.transfer(poolA.address, 100, []);
                
                await poolA.withSigner(admin).tx.startOpenRewards();

                await poolA.tx.recordLiquidityProvided(0,100,100,brandA.address,brandA.address);

                let position = (await poolA.query.getAllPositions(brandA.address))

                console.log(position);
                
                let result = (await poolA.query.getPositionData(1)).value.unwrapRecursively();

              
                
                expect([result[0].rawNumber.toString(), result[1].rawNumber.toString()].toString()).to.be.eq(["100","100"].toString())
                await close();
              });


              // it('should withdraw the liqudity provided', async () => {
              //   const { poolA, rewardA, me, brandA, brandB, admin, close } = await pool_fixture();
            
              //   await  rewardA.withSigner(brandA).tx.transfer(poolA.address, 100, []);

              //   await  rewardA.withSigner(brandA).query.transfer(poolA.address, 100, []);
               
              //   await me.withSigner(brandA).tx.transfer(poolA.address, 100, []);
                
              //   await poolA.withSigner(admin).tx.startOpenRewards();

              //   await poolA.tx.recordLiquidityProvided(0,100,100,brandA.address,brandA.address);
                
               
                
        
              //   await close();
              // });

     }
);