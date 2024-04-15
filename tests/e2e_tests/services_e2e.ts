import { consts } from './utils/constants'
import { bnArg, expect, getSigners } from './utils/helpers'
import BN from 'bn.js'
import { ApiPromise, WsProvider } from '@polkadot/api'
import poolConstructor from '../../typechain-generated/constructors/pool'
import poolContract from '../../typechain-generated/contracts/pool'
import rewardInitiatorContract from '../../typechain-generated/contracts/reward_initiator'
import rewardInitiatorConstructor from '../../typechain-generated/constructors/reward_initiator'
import bountyConstructor from '../../typechain-generated/constructors/bounty'
import bountyContract from '../../typechain-generated/contracts/bounty'
import rewardConstructor from '../../typechain-generated/constructors/reward'
import rewardContract from '../../typechain-generated/contracts/reward'
import servicesConstructor from '../../typechain-generated/constructors/services'
import servicesContract from '../../typechain-generated/contracts/services'
import treasuryConstructor from '../../typechain-generated/constructors/treasury'
import treasuryContract from '../../typechain-generated/contracts/treasury'

import { IdBuilder } from '../../typechain-generated/types-arguments/pool'

describe( "Service Test", () => {

    let payment_fixture = async() =>{
        // const api = await ApiPromise.create()

        const substrateNodeUrl = process.env.SUBSTRATE_NODE_URL || 'ws://127.0.0.1:9944';

        // initialise a provider with a specific endpoint
        const provider = new WsProvider(substrateNodeUrl)

        // initialise via isReady & new with specific provider
        const api = await new ApiPromise({ provider: provider, initWasm: false }).isReady;
        const signers = getSigners()
        const admin = signers[0]
        const user1 = signers[1]
        const user2 = signers[2]

        const rewardFactory = new rewardConstructor(api, admin)
        const  meAddress = (await rewardFactory.new(admin.address,"Me","Me",2,10000)).address
        const me = new rewardContract(meAddress, admin, api)
        const servicesFactory = new servicesConstructor(api, admin)
        const servicesAddress = (await servicesFactory.new()).address
        const services = new servicesContract(servicesAddress, admin, api)
        const treasuryFactory = new treasuryConstructor(api, admin)
        const treasuryAddress = (await treasuryFactory.new(meAddress)).address
        const treasury = new treasuryContract(treasuryAddress, admin, api)
        const bountyFactory = new bountyConstructor(api, admin)
        const bountyAddress = (await bountyFactory.new(meAddress)).address
        const bounty = new bountyContract(bountyAddress, admin, api)

        const rewardAddress = (await rewardFactory.new(admin.address,"","",2,10000)).address
        const reward = new rewardContract(rewardAddress, admin, api)
        const rewardInitiatorFactory = new rewardInitiatorConstructor(api, admin);
  
        const rewardInititatorAddress = (await rewardInitiatorFactory.new(reward.abi.info.source.wasmHash.toString())).address

        const rewardInitiator = new rewardInitiatorContract(rewardInititatorAddress, admin, api)

        

        return {
        admin,
        user1,
        user2,
        services,
        treasury,
        treasuryAddress,
        meAddress,
        bountyAddress,
        reward,
        rewardInitiator,

          done: async () => {
            await api.disconnect()
          }
        }
    }
    describe("Test for Admin Serivces", function () {

        it('Test to update treasury address', async () => {
            const { admin, user1, user2 , services, treasuryAddress} = await payment_fixture();
            
            await services.withSigner(admin).tx.updateTreasuryAddress(treasuryAddress)

            let treasuryAddress_ = (await services.query.getProtocolRecords()).value.unwrapRecursively().treasury

            expect(treasuryAddress_).equal(treasuryAddress)
        })
        
        it('Test to update protocol configuration', async () => {
            const { admin, user1, user2 , services, treasuryAddress} = await payment_fixture();

            let editableConfig =  {
                defaultMinimumMeForConversation: 1,
                defaultMinimumRewardForConversationInPercent: 1,
                defaultMaximumRLimitForConversationInPrecision: 1,
                defaultRewardNotifyThresholdInPercent: 1,
                defaultNotifyMeAmount: 1,
                defaultNotifyRewardAmountInPercent: 1,
                caiInMe: 1,
                protocolFee: 1,
                bountyContributionInPrecision: 1,
                conversionsSlippageInPrecisiion: 1,
                informationsSlippageInPrecision: 1
            }
            
            await services.withSigner(admin).tx.updateProtocolConfigurations(editableConfig)

            let protocolConfig = (await services.query.getProtocolConfig()).value.unwrapRecursively()

            // console.log(protocolConfig)

            expect([Number(protocolConfig.defaultMinimumMeForConversation)].toString()).to.be.eq([editableConfig.defaultMinimumMeForConversation].toString())
        })

        it('Test to ensure only adim can update protocol configuration', async () => {
            const { admin, user1, user2 , services, treasuryAddress} = await payment_fixture();

            let editableConfig =  {
                defaultMinimumMeForConversation: 1,
                defaultMinimumRewardForConversationInPercent: 1,
                defaultMaximumRLimitForConversationInPrecision: 1,
                defaultRewardNotifyThresholdInPercent: 1,
                defaultNotifyMeAmount: 1,
                defaultNotifyRewardAmountInPercent: 1,
                caiInMe: 1,
                protocolFee: 1,
                bountyContributionInPrecision: 1,
                conversionsSlippageInPrecisiion: 1,
                informationsSlippageInPrecision: 1
            }

             await expect(services.withSigner(user1).tx.updateProtocolConfigurations(editableConfig)).to.be.rejected
        })


        it('Test to update protocol record', async () => {
            const { admin, services, treasuryAddress, meAddress, bountyAddress} = await payment_fixture();
            
            let editableRecord = {
                me: meAddress,
	            bounty: bountyAddress,
	            treasury: treasuryAddress,
	            adminId: [1,2,3,4,5,6,7,8,9,0],
	            totalNumberOfBrands: 1,
	            totalNumberOfRewards: 1,
	            lastUpdated: 12345
            }

            await services.withSigner(admin).tx.updateProtocolRecords(editableRecord)

            let protocolRecord = (await services.query.getProtocolRecords()).value.unwrapRecursively()

            expect(protocolRecord.me).to.be.eq(editableRecord.me)
            
        })

        it('Test to ensure only adimin can update protocol record', async () => {
            const { admin,user1, services, treasuryAddress, meAddress, bountyAddress} = await payment_fixture();
            
            let editableRecord = {
                me: meAddress,
	            bounty: bountyAddress,
	            treasury: treasuryAddress,
	            adminId: [1,2,3,4,5,6,7,8,9,0],
	            totalNumberOfBrands: 1,
	            totalNumberOfRewards: 1,
	            lastUpdated: 12345
            }

            await expect(services.withSigner(user1).tx.updateProtocolRecords(editableRecord)).to.be.rejected
            
        })

        it('Test to register a new brand', async () => {
            const { admin,user1, services, treasuryAddress, meAddress, bountyAddress} = await payment_fixture();
            
            let brand = [1,2,3,4,5,6,7,8,9,0];

            await services.withSigner(admin).tx.registerBrand("Nike", "nike.com", user1.address, brand)
        })

        it('Test to ensure only onboarding manager can register a new brand', async () => {
            const { admin,user1, services, treasuryAddress, meAddress, bountyAddress} = await payment_fixture();
            
            let brand = [1,2,3,4,5,6,7,8,9,0];

            await expect(services.withSigner(user1).tx.registerBrand("Adidas", "adidas.com", user1.address, brand)).to.be.rejected
        })


    });


    describe("Test for Customer Services", function () {

        it('Should reject if admin try to withdraw higher than services paid for', async () => {
            const { admin, user1, user2 } = await payment_fixture();
            
        })
    });

    describe("Test for Brand Services", function () {

        it('Should create more rewards', async () => {
            const { admin, user1, user2, services , reward, rewardInitiator} = await payment_fixture();
            

            // services.tx.createNewReward(rewardInitiator.address, "rewardA","redA", 'Beautiful token',18,10000000, [0xDE, 0xAD, 0xBE, 0xEF], [1,2,3,4,5,6,7,8,9,0], admin.address)
            
            let res = await services.query.getBrandConfigById([1,2,3,4,5,6,7,8,9,0])
            
            console.log("The result", res)
        })
    
    });


})