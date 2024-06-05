import { consts } from './utils/constants'
import { bnArg, expect, getSigners } from './utils/helpers'
import BN from 'bn.js'
import { ApiPromise, WsProvider } from '@polkadot/api'
import oracleConstructor from '../../typechain-generated/constructors/oracle'
import oracleContract from '../../typechain-generated/contracts/oracle'
import rewardConstructor from '../../typechain-generated/constructors/reward'
import rewardContract from '../../typechain-generated/contracts/reward'
import poolConstructor from '../../typechain-generated/constructors/pool'
import poolContract from '../../typechain-generated/contracts/pool'
import servicesConstructor from '../../typechain-generated/constructors/services'
import servicesContract from '../../typechain-generated/contracts/services'
import { IdBuilder } from '../../typechain-generated/types-arguments/pool'

import { BrandDetails, EditableBrandDetails, GlobalBrandConfig } from '../../typechain-generated/types-arguments/services'

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

     
        const rewardFactory = new rewardConstructor(api, admin)
        const rewardAAddress = (await rewardFactory.new(admin.address,"A","A",2,10000)).address
        const rewardBAddress = (await rewardFactory.new(admin.address,"B","B",2,10000)).address
        const  meAddress = (await rewardFactory.new(admin.address,"Me","Me",2,10000)).address
        const rewardA = new rewardContract(rewardAAddress, admin, api)
        const rewardB = new rewardContract(rewardBAddress, admin, api)
        const me = new rewardContract(meAddress, admin, api)
        const poolFactory = new poolConstructor(api, admin);
        const oracleFactory = new oracleConstructor(api, admin)
        const oracleAddress = (await oracleFactory.new(meAddress)).address
        const oracle = new oracleContract(oracleAddress, admin, api)
        const servicesFactory = new servicesConstructor(api, admin)
        const servicesAddress = (await servicesFactory.new()).address
        const services = new servicesContract(servicesAddress, admin, api)

       

        const poolAAddress = (await poolFactory.new(rewardAAddress, meAddress,
            {   rOptimal: 1600000,
                maximumRLimit: 1700000,
                minimumRewardAmountForConversation: 0,
                minimumMeAmountForConversation: 0,
                notifyRewardAmount: 0,
                notifyMeAmount: 0,
                defaultSlippageInPrecision: 5000000,
                allowInternalSwap: true
            }
            )).address;
            const poolBAddress = (await poolFactory.new(rewardBAddress, meAddress,
                {   rOptimal: 1500000,
                    maximumRLimit: 1900000,
                    minimumRewardAmountForConversation: 0,
                    minimumMeAmountForConversation: 0,
                    notifyRewardAmount: 0,
                    notifyMeAmount: 0,
                    defaultSlippageInPrecision: 7000000,
                    allowInternalSwap: true
                }
                )).address;
        const poolA = new poolContract(poolAAddress, admin, api)
        const poolB = new poolContract(poolBAddress, admin, api)
 

        return {
          api,
          admin,
          poolA,
          poolB,
          rewardA,
          oracle,
          rewardB,
          poolAAddress,
          poolBAddress,
          services,
          meAddress,
          rewardAAddress,
          rewardBAddress,
          me,
        //   user1,
          close: async () => {
            await api.disconnect()
          }
        }
    }


              it('should start open rewards with correct R value and Signer', async () => {
                const { poolA, poolB, rewardA, rewardB, me, admin,oracle, close } = await pool_fixture();
            
                await  rewardA.withSigner(admin).tx.transfer(poolA.address, 1000, []);  
                await me.withSigner(admin).tx.transfer(poolA.address, 1000, []);
        
                await  rewardB.withSigner(admin).tx.transfer(poolB.address, 2000, []);
                await me.withSigner(admin).tx.transfer(poolB.address, 2000, []);
                             
                await poolA.withSigner(admin).tx.startOpenRewards();
                await poolB.withSigner(admin).tx.startOpenRewards();

                await poolA.withSigner(admin).tx.recordLiquidityProvided(1000, 1000, admin.address, admin.address)
                await poolB.withSigner(admin).tx.recordLiquidityProvided(2000, 2000, admin.address, admin.address)

                let config = (await poolA.query.getOpenRewardsConfigurations()).value.unwrapRecursively()

                // console.log(config.toString())

                let theoracle = (await oracle.query.determineNeededRewardBGivenRewardA(poolA.address,poolB.address, 20)).value.unwrapRecursively()
                console.log(theoracle.toString())

                expect(theoracle.toString()).to.eq("1260018")
                
                await close();
              });


              it('should return the exact balances of me and reward in a pool', async () => {
                const { poolA, poolB, rewardA, rewardB, me, admin,oracle, close } = await pool_fixture();
            
                await  rewardA.withSigner(admin).tx.transfer(poolA.address, 1000, []);  
                await me.withSigner(admin).tx.transfer(poolA.address, 1000, []);
        
                await  rewardB.withSigner(admin).tx.transfer(poolB.address, 2000, []);
                await me.withSigner(admin).tx.transfer(poolB.address, 2000, []);
                             
                await poolA.withSigner(admin).tx.startOpenRewards();
                await poolB.withSigner(admin).tx.startOpenRewards();

                await poolA.withSigner(admin).tx.recordLiquidityProvided(1000, 1000, admin.address, admin.address)
                await poolB.withSigner(admin).tx.recordLiquidityProvided(2000, 2000, admin.address, admin.address)

                let config = (await poolA.query.getOpenRewardsConfigurations()).value.unwrapRecursively()

                let pool_bal = (await oracle.query.determineMeAndRewardBalanceInAPool(poolA.address, rewardA.address, me.address)).value.unwrapRecursively()

                console.log("pool balance",pool_bal.toString())

                expect(pool_bal.toString()).to.eq("1000,1000")

                
                await close();
              });

              

              it('Should total brands added to the protocol', async () => {
                const { admin, services, oracle} = await pool_fixture();

                const brand1 = [31,42,53,64,75,86,27,38,49,20]
                const brand2 = [11,32,43,546,56,76,87,98,99,30]
    
                let  brandDetail1: BrandDetails = {
                  name: "Nike",
                  onlinePresence: "www.nike.com",
                  id: brand1,
                  mainAccount: admin.address,
                  dateJoined: 23344
              }

              let  brandDetail2: BrandDetails = {
                name: "Nike",
                onlinePresence: "www.addidas.com",
                id: brand1,
                mainAccount: admin.address,
                dateJoined: 12345
            }

              await services.tx.updateBrandDetailsByBrandId(brandDetail1, brand1)
              await services.tx.updateBrandDetailsByBrandId(brandDetail2, brand2)
             
              let brands = (await oracle.query.getAllBrands(services.address)).value.unwrapRecursively();
              console.log("All brands", brands);
  
       
              expect((await oracle.query.getAllBrands(services.address)).value.unwrapRecursively().length).to.be.eq(2)
            })

     });


