import { consts } from './utils/constants'
import { bnArg, expect, getSigners } from './utils/helpers'
import BN from 'bn.js'
import { ApiPromise, WsProvider } from '@polkadot/api'
import poolConstructor from '../../typechain-generated/constructors/pool'
import poolContract from '../../typechain-generated/contracts/pool'
import rewardConstructor from '../../typechain-generated/constructors/reward'
import rewardContract from '../../typechain-generated/contracts/reward'
import { IdBuilder } from '../../typechain-generated/types-arguments/pool'


describe( "Pool Test", () => {

    let pool_fixture = async() => { 
        // const api = await ApiPromise.create()

        const substrateNodeUrl = process.env.SUBSTRATE_NODE_URL || 'ws://127.0.0.1:9944';

        // initialise a provider with a specific endpoint
        const provider = new WsProvider(substrateNodeUrl)

        // initialise via isReady & new with specific provider
        const api = await new ApiPromise({ provider: provider, initWasm: false }).isReady;
        const signers = getSigners()
        const admin = signers[0]
        const brandA = signers[1]
        // const brandB = signers[2]
        const user1 = signers[3]


     
        const rewardFactory = new rewardConstructor(api, admin)
        const rewardAAddress = (await rewardFactory.new(brandA.address,"A","A",2,10000)).address
        const rewardBAddress = (await rewardFactory.new(admin.address,"B","B",2,10000)).address
        const  meAddress = (await rewardFactory.new(admin.address,"Me","Me",2,10000)).address
        const rewardA = new rewardContract(rewardAAddress, brandA, api)
        const rewardB = new rewardContract(rewardBAddress,admin,api)
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
        // me.tx.transfer(brandB.address, 1000, []);

        return {
          api,
          admin,
          brandA,
          // 
          poolA,
          poolB,
          rewardA,
          rewardB,
          poolAAddress,
          poolBAddress,
          meAddress,
          rewardAAddress,
          rewardBAddress,
          me,
          user1,
          close: async () => {
            await api.disconnect()
          }
        }
    }



              it('should start open rewards with correct R value and Signer', async () => {
                const { poolA, rewardA, me, brandA, admin, close } = await pool_fixture();
            
                await  rewardA.withSigner(brandA).tx.transfer(poolA.address, 100, []);

                await  rewardA.withSigner(brandA).query.transfer(poolA.address, 100, []);
               
                await me.withSigner(brandA).tx.transfer(poolA.address, 100, []);
                
                let result =  await poolA.withSigner(admin).tx.startOpenRewards();

                let res = (await poolA.query.getOpenRewardsState()).value.unwrapRecursively()[1]
                console.log("The res", res)
        
                expect((await poolA.query.getOpenRewardsState()).value.unwrapRecursively()[1]).to.be.eq(true)
                
                await close();
              });


             
              it('should pause open rewards with correct Signer and State', async () => {
                const { poolA, rewardA, me, brandA,  admin, close } = await pool_fixture();
            
                await  rewardA.withSigner(brandA).tx.transfer(poolA.address, 100, []);

                await  rewardA.withSigner(brandA).query.transfer(poolA.address, 100, []);
               
                await me.withSigner(brandA).tx.transfer(poolA.address, 100, []);
                
                await poolA.withSigner(admin).tx.startOpenRewards();

                await poolA.withSigner(admin).tx.pauseOpenRewards();

                expect((await poolA.query.getOpenRewardsState()).value.unwrapRecursively()[1]).to.be.eq(false)
                
                await close();
              });


              it('should resume open rewards with correct Signer and State', async () => {
                const { poolA, rewardA, me, brandA,  admin, close } = await pool_fixture();
            
                await  rewardA.withSigner(brandA).tx.transfer(poolA.address, 100, []);

                await  rewardA.withSigner(brandA).query.transfer(poolA.address, 100, []);
               
                await me.withSigner(brandA).tx.transfer(poolA.address, 100, []);
                
                await poolA.withSigner(admin).tx.startOpenRewards();

                await poolA.withSigner(admin).tx.pauseOpenRewards();

                await poolA.withSigner(admin).tx.resumeOpenRewards();

                expect((await poolA.query.getOpenRewardsState()).value.unwrapRecursively()[1]).to.be.eq(true)
                 await close();
              });


              it('should provide open rewards state', async () => {
                const { poolA, rewardA, me, brandA,  admin, close, rewardAAddress, meAddress } = await pool_fixture();
            
                await  rewardA.withSigner(brandA).tx.transfer(poolA.address, 100, []);

                await  rewardA.withSigner(brandA).query.transfer(poolA.address, 100, []);
               
                await me.withSigner(brandA).tx.transfer(poolA.address, 100, []);
                
                await poolA.withSigner(admin).tx.startOpenRewards();

                let result = await poolA.query.getOpenRewardsState();
                // console.log(poolA)

                expect([ result.value.unwrapRecursively()[0], result.value.unwrapRecursively()[1], result.value.unwrapRecursively()[2], result.value.unwrapRecursively()[3], result.value.unwrapRecursively()[4], result.value.unwrapRecursively()[5]].toString()).to.be.eq([true, true, false, admin.address, rewardAAddress, meAddress].toString())

                await close();
              });



              it('should record added liquidity', async () => {
                const { poolA, rewardA, me, brandA,  admin, close } = await pool_fixture();
            
                await  rewardA.withSigner(brandA).tx.transfer(poolA.address, 100, []);

                await  rewardA.withSigner(brandA).query.transfer(poolA.address, 100, []);
               
                await me.withSigner(brandA).tx.transfer(poolA.address, 100, []);
                
                await poolA.withSigner(admin).tx.startOpenRewards();

                await poolA.tx.recordLiquidityProvided(100,100,brandA.address,brandA.address);

                let position = (await poolA.query.getAllPositions(brandA.address)).value.unwrapRecursively();
                console.log("position", position)

                let output = position[0].u128.rawNumber.toString();
                console.log("output", output)
                
                let result = (await poolA.query.getPositionData(parseInt(output))).value.unwrapRecursively();
                let res1 = await result[0].rawNumber.toString()
                console.log("result for first index", res1)
           
                // console.log(result[0])
                expect([result[0].rawNumber.toString(), result[1].rawNumber.toString()].toString()).to.be.eq(["100","100"].toString())
                await close();
              });



              it('should record added liqudity to the same position', async () => {
                const { poolA, rewardA, me, brandA,  admin, close } = await pool_fixture();
             
                await  rewardA.withSigner(brandA).tx.transfer(poolA.address, 100, []);
 
                await  rewardA.withSigner(brandA).query.transfer(poolA.address, 100, []);
                
                await me.withSigner(brandA).tx.transfer(poolA.address, 100, []);
                 
                await poolA.withSigner(admin).tx.startOpenRewards();
 
                await poolA.tx.recordLiquidityProvided(100,100,brandA.address,brandA.address);
 
                await  rewardA.withSigner(brandA).tx.transfer(poolA.address, 100, []);
                await me.withSigner(brandA).tx.transfer(poolA.address, 200, []);
 
                await poolA.tx.recordLiquidityProvided(100,100,brandA.address,brandA.address);
 
                let position = (await poolA.query.getAllPositions(brandA.address)).value.unwrapRecursively();
 
                let output = position[0].u128.rawNumber.toString();
                 
                let result = (await poolA.query.getPositionData(parseInt(output))).value.unwrapRecursively();
 
               
                // console.log(result[0])
                expect([result[0].rawNumber.toString(), result[1].rawNumber.toString()].toString()).to.be.eq(["200","300"].toString())
                await close();
              });
 
 
              it('should withdraw the liqudity provided', async () => {
                const { poolA, rewardA, me, brandA,  admin, close } = await pool_fixture();
            
                await  rewardA.withSigner(brandA).tx.transfer(poolA.address, 100, []);
 
                await  rewardA.withSigner(brandA).query.transfer(poolA.address, 100, []);
                
                await me.withSigner(brandA).tx.transfer(poolA.address, 100, []);
                 
                await poolA.withSigner(admin).tx.startOpenRewards();
 
                await poolA.tx.recordLiquidityProvided(100,100,brandA.address,brandA.address);
           
         
 
                let brandARewardBalanceBefore = (await rewardA.query.balanceOf(brandA.address)).value.unwrapRecursively().rawNumber.toString();

                let brandAMeBalanceBefore = (await me.query.balanceOf(brandA.address)).value.unwrapRecursively().rawNumber.toString();

                // let resault = await poolA.withSigner(brandA).tx.withdrawLiquidity(IdBuilder.U128(0),100,100,brandA.address, brandA.address);

                // let result = (await poolA.query.getBalance(rewardA.address, brandA.address)).value.unwrapRecursively().rawNumber.toString();

                // console.log(result);

                await poolA.tx.withdrawLiquidity(IdBuilder.U128(0),100,100,brandA.address,brandA.address);

                let brandARewardBalanceAfter = (await rewardA.query.balanceOf(brandA.address)).value.unwrapRecursively().rawNumber.toString();

                let brandAMeBalanceAfter = (await me.query.balanceOf(brandA.address)).value.unwrapRecursively().rawNumber.toString();

                expect([(parseInt(brandARewardBalanceBefore) + 100).toString(), (parseInt(brandAMeBalanceBefore) + 100).toString()].toString()).to.be.eq([brandARewardBalanceAfter,brandAMeBalanceAfter].toString())

                await close();
              });



              it('should add_open_rewards_manager', async () => {
                const { poolA, rewardA, me, brandA,  admin, close } = await pool_fixture();
             
                await  rewardA.withSigner(brandA).tx.transfer(poolA.address, 100, []);
 
                await  rewardA.withSigner(brandA).query.transfer(poolA.address, 100, []);
                
                await me.withSigner(brandA).tx.transfer(poolA.address, 100, []);
                 
                await poolA.withSigner(admin).tx.startOpenRewards();
                 
                await poolA.tx.addOpenRewardsManager(brandA.address);
 
                let isManager = (await poolA.query.checkIfIsOpenRewardsManager(brandA.address)).value.unwrapRecursively();
                console.log(isManager);
 
                expect(isManager).to.be.equal(true);
 
                await poolA.withSigner(brandA).tx.recordLiquidityProvided(100,100,brandA.address,brandA.address);
                  
         
 
                let brandARewardBalanceBefore = (await rewardA.query.balanceOf(brandA.address)).value.unwrapRecursively().rawNumber.toString();

                let brandAMeBalanceBefore = (await me.query.balanceOf(brandA.address)).value.unwrapRecursively().rawNumber.toString();
 
                // let result = await poolA.withSigner(brandA).tx.withdrawLiquidity(IdBuilder.U128(0),100,100,brandA.address, brandA.address);
 
                // let result = (await poolA.query.getBalance(rewardA.address, brandA.address)).value.unwrapRecursively().rawNumber.toString();
 
                // console.log(result);
 
                await poolA.withSigner(brandA).tx.withdrawLiquidity(IdBuilder.U128(0),100,100,brandA.address,brandA.address);
 
                let brandARewardBalanceAfter = (await rewardA.query.balanceOf(brandA.address)).value.unwrapRecursively().rawNumber.toString();
 
                let brandAMeBalanceAfter = (await me.query.balanceOf(brandA.address)).value.unwrapRecursively().rawNumber.toString();
 
                expect([(parseInt(brandARewardBalanceBefore) + 100).toString(), (parseInt(brandAMeBalanceBefore) + 100).toString()].toString()).to.be.eq([brandARewardBalanceAfter,brandAMeBalanceAfter].toString())
 
                await close();
              });


              it('should remove_open_rewards_manager', async () => {
                const { poolA, rewardA, me, brandA,  admin, close } = await pool_fixture();
            
                await  rewardA.withSigner(brandA).tx.transfer(poolA.address, 100, []);

                await  rewardA.withSigner(brandA).query.transfer(poolA.address, 100, []);
               
                await me.withSigner(brandA).tx.transfer(poolA.address, 100, []);
                
                await poolA.withSigner(admin).tx.startOpenRewards();
                
                await poolA.tx.addOpenRewardsManager(brandA.address);

                
                await poolA.tx.removeOpenRewardsManager(brandA.address);
                
                let isManager = (await poolA.query.checkIfIsOpenRewardsManager(brandA.address)).value.unwrapRecursively();

                console.log("Check if still the mananger", isManager)

                expect(isManager).to.be.equal(false);

                await close();
              });


              it('should get the liquidity ratios in the pool', async () => {
                const { poolA, rewardA, me, brandA,  admin, close } = await pool_fixture();
            
                await  rewardA.withSigner(brandA).tx.transfer(poolA.address, 100, []);

                await  rewardA.withSigner(brandA).query.transfer(poolA.address, 100, []);
               
                await me.withSigner(brandA).tx.transfer(poolA.address, 100, []);

                await poolA.tx.recordLiquidityProvided(100,100,brandA.address,brandA.address);
                
                await poolA.withSigner(admin).tx.startOpenRewards();
                
              const response =  (await poolA.query.getLiquidityRatios()).value.unwrapRecursively();

              expect([parseInt(response[0].rawNumber.toString()), parseInt(response[1].rawNumber.toString())].toString()).to.be.eq([1000000,1000000].toString())
              });


              it('should get the addresses of the pool initiator and the tokens in the pool', async () => {
                const { poolA, rewardA, me, brandA,  admin, close } = await pool_fixture();
            
                await  rewardA.withSigner(brandA).tx.transfer(poolA.address, 100, []);

                await  rewardA.withSigner(brandA).query.transfer(poolA.address, 100, []);
               
                await me.withSigner(brandA).tx.transfer(poolA.address, 100, []);
                
              const response =  (await poolA.query.getLiquidityIds()).value.unwrapRecursively();

              expect([response[0], response[1], response[2]].toString()).to.be.eq([admin.address,rewardA.address, me.address].toString())
              });

              it('should get the state of the pool', async () => {
                const { poolA, rewardA, me, brandA,  admin, close } = await pool_fixture();
            
                await  rewardA.withSigner(brandA).tx.transfer(poolA.address, 100, []);

                await  rewardA.withSigner(brandA).query.transfer(poolA.address, 100, []);

               
                await me.withSigner(brandA).tx.transfer(poolA.address, 100, []);

                await poolA.tx.recordLiquidityProvided(100,100,brandA.address,brandA.address);
                
              const response =  (await poolA.query.getOpenRewardsState()).value.unwrapRecursively();
              expect([response[0], response[1], response[2], response[3], response[4], response[5], response[6], response[7], response[8]].toString()).to.be.eq([false,false,false,admin.address,rewardA.address,me.address,100,100,0].toString())
              });



              it('should get the configuration of the pool', async () => {
                const { poolA, rewardA, me, brandA,  admin, close } = await pool_fixture();
            
                await  rewardA.withSigner(brandA).tx.transfer(poolA.address, 100, []);

                await  rewardA.withSigner(brandA).query.transfer(poolA.address, 100, []);

               
                await me.withSigner(brandA).tx.transfer(poolA.address, 100, []);

                await poolA.tx.recordLiquidityProvided(100,100,brandA.address,brandA.address);
                
              const response =  (await poolA.query.getOpenRewardsConfigurations()).value.unwrapRecursively();
              expect([response[0], response[1], response[2], response[3], response[4], response[5], response[6], response[7]].toString()).to.be.eq([1000000,10000000,0,0,0,0,0,false].toString())
              });
              


    it("Should initiate outgoing conversation", async function () {

      const { poolA, rewardA, me, brandA,poolB, rewardB, admin,user1, close } = await pool_fixture();
            
      await rewardA.withSigner(brandA).tx.transfer(poolA.address, 100, []);
     
      await me.withSigner(brandA).tx.transfer(poolA.address, 100, []);

      await rewardB.withSigner(admin).tx.transfer(poolB.address, 100, []);

      await me.withSigner(admin).tx.transfer(poolB.address, 100, []);
      
      await poolA.tx.recordLiquidityProvided(100,100,brandA.address,brandA.address);

      // await poolB.tx.recordLiquidityProvided(100,100,brandA.address,brandA.address);

      await poolA.withSigner(admin).tx.startOpenRewards();

      // await poolB.withSigner(admin).tx.startOpenRewards();

      const needReward = await poolA.query.determineNeededRewardAmountGivenMeAmount(10, 12)
      
      // console.log("neededReward", needReward)
    });


     });


