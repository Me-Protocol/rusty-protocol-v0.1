import { consts } from './utils/constants'
import { bnArg, expect, getSigners } from './utils/helpers'
import BN from 'bn.js'
import { ApiPromise, WsProvider } from '@polkadot/api'
import poolInitiatorConstructor from '../../typechain-generated/constructors/pool_initiator'
import poolInitiatorContract from '../../typechain-generated/contracts/pool_initiator'
import poolConstructor from '../../typechain-generated/constructors/pool'
import poolContract from '../../typechain-generated/contracts/pool'
import rewardConstructor from '../../typechain-generated/constructors/reward'
import rewardContract from '../../typechain-generated/contracts/reward'


describe( "Pool inititiator Test", () => {

    let pool_fixture = async() => { 

        const substrateNodeUrl = process.env.SUBSTRATE_NODE_URL || 'ws://127.0.0.1:9944';

        // initialise a provider with a specific endpoint
        const provider = new WsProvider(substrateNodeUrl)

        // initialise via isReady & new with specific provider
        const api = await new ApiPromise({ provider: provider, initWasm: false }).isReady;
        const signers = getSigners()
        const admin = signers[0]
        const user = signers[2]


     
        const rewardFactory = new rewardConstructor(api, admin)
        const rewardAAddress = (await rewardFactory.new(admin.address,"A","A",2,10000)).address
        const  meAddress = (await rewardFactory.new(admin.address,"Me","Me",2,10000)).address
        const rewardA = new rewardContract(rewardAAddress, admin, api)
        const me = new rewardContract(meAddress, admin, api)
        const poolInitiatorFactory = new poolInitiatorConstructor(api, admin);

        const poolFactory = new poolConstructor(api, admin);

       

        const poolAddress = (await poolFactory.new(rewardAAddress, meAddress,
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

         const pool = new poolContract(poolAddress, admin, api)

        const poolInititatorAddress = (await poolInitiatorFactory.new(pool.abi.info.source.wasmHash.toString())).address

        const poolInitiator = new poolInitiatorContract(poolInititatorAddress, admin, api)
       
        me.tx.transfer(admin.address, 1000, []);

        const config =   {   rOptimal: 1000000,
            maximumRLimit: 1000000,
            minimumRewardAmountForConversation: 0,
            minimumMeAmountForConversation: 0,
            notifyRewardAmount: 0,
            notifyMeAmount: 0,
            defaultSlippageInPrecision: 0,
            allowInternalSwap: false
        }
        const brand = [1,2,3,4,5,6,7,8,9,0]

        return {
          api,
          admin,
          rewardA,     
          poolAddress,
          meAddress,
          rewardAAddress,
          poolInitiator,
          config,
          user,
          brand,
          me,
          close: async () => {
            await api.disconnect()
          }
        }
    }


            // it('Should be able to create a new pool', async () => {
            //     const {  rewardA, me,  admin, poolInitiator,config, brand, close } = await pool_fixture();
            
            //    expect(await poolInitiator.tx.createNewPool(rewardA.address, me.address, config, [0xDE, 0xAD, 0xBE, 0xEF],brand)).to.be.ok

             
            // });


            it('Should reject when called by unauthourized account ', async () => {
                const {  rewardA, me,  admin, poolInitiator,config, brand,user, close } = await pool_fixture();
            
               await expect (poolInitiator.withSigner(user).tx.createNewPool(rewardA.address, me.address, config, [0xDE, 0xAD, 0xBE, 0xEF],brand)).to.be.eventually.rejected

            });

            it('Should be able to create a new pool', async () => {
                const {  rewardA, me,  admin, poolInitiator,config, brand, close } = await pool_fixture();
            
               await poolInitiator.tx.createNewPool(rewardA.address, me.address, config, [0xDE, 0xAD, 0xBE, 0xEF],brand)

               let res = (await poolInitiator.query.getBrandPool(brand)).value.unwrapRecursively().length
               let result = await res
               console.log(result)

               expect (result).to.be.eq(48) 
            });





            })