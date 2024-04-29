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
import { assert } from 'chai'
import { BrandDetails, EditableBrandDetails, GlobalBrandConfig } from '../../typechain-generated/types-arguments/services'

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

        const poolFactory = new poolConstructor(api, admin);


        const poolAAddress = (await poolFactory.new(rewardAddress, meAddress,
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

        
        const pool = new poolContract(poolAAddress, admin, api)

        const brand = [1,2,3,4,5,6,7,8,9,0]

        return {
        admin,
        user1,
        user2,
        brand,
        services,
        treasury,
        pool,
        treasuryAddress,
        me,
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
            const { admin, services, treasuryAddress, me, bountyAddress} = await payment_fixture();
            
            let editableRecord = {
                me: me.address,
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
            const { admin,user1, services, treasuryAddress, me, bountyAddress} = await payment_fixture();
            
            let editableRecord = {
                me: me.address,
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
            const { admin,user1, services, treasuryAddress, me, bountyAddress} = await payment_fixture();
            
            let brand = [1,2,3,4,5,6,7,8,9,0];

            await services.withSigner(admin).tx.registerBrand("Nike", "nike.com", user1.address, brand)
        })

        it('Test to ensure only onboarding manager can register a new brand', async () => {
            const { admin,user1, services, treasuryAddress, bountyAddress} = await payment_fixture();
            
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

        it('Should create rewards', async () => {
            const { admin, user1, user2, services ,brand, reward, rewardInitiator, pool} = await payment_fixture();

                await rewardInitiator.tx.createNewReward( admin.address,"rewardA","rewardA",2,10000, [0xDE, 0xAD, 0xBE, 0xEF], brand)

                let newReward = (await rewardInitiator.query.getBrandReward(brand)).value.unwrapRecursively()

                await services.tx.createNewReward( newReward,"rewardA","rewardA","RewardA discription",1,brand, admin.address, pool.address)

                let res = (await services.query.getRewardDetails(newReward)).value.unwrapRecursively().contractAddress

                expect(res).to.be.eq(newReward)
                
        })


        it('Should update brand details correctly', async () => {
            const { admin, user1, user2, services ,brand, reward, rewardInitiator} = await payment_fixture();

                let  brandDetail: BrandDetails = {
                    name: "Nike",
	                onlinePresence: "www.nike.com",
                    id: brand,
                    mainAccount: admin.address,
                    dateJoined: 12345
                }

                await services.tx.updateBrandDetailsByBrandId(brandDetail, brand)
                let res = await services.query.getBrandDetails(brand)
                // console.log("The results", res)
         
                expect(res.value.unwrapRecursively().name).to.be.eq("Nike")
        })

        it('Should update brand config correctly', async () => {
            const { admin, user1, user2, services ,brand, reward, rewardInitiator} = await payment_fixture();

            let config: GlobalBrandConfig = {
                enableBountyRewards: true,
                enableCais: true,
                payIncomingGasFees: true,
                payOutgoingGasFees: true
            }

            await services.tx.updateBrandConfigByBrandId( config, false, brand)

            let res = await services.query.getBrandConfigById(brand)

            // console.log("The brand config", res)

            expect(res.value.unwrapRecursively().enableBountyRewards).to.be.eq(config.enableBountyRewards)

        })


        it('Should start and activate pool', async () => {
            const { admin, user1, user2, services ,brand, reward,pool, me,rewardInitiator} = await payment_fixture();

            await  reward.withSigner(admin).tx.transfer(pool.address, 100, []);
           
            await me.withSigner(admin).tx.transfer(pool.address, 100, []);

            await rewardInitiator.tx.createNewReward( admin.address,"rewardA","rewardA",2,10000, [0xDE, 0xAD, 0xBE, 0xEF], brand)

            let newReward = (await rewardInitiator.query.getBrandReward(brand)).value.unwrapRecursively()

            await services.tx.createNewReward( newReward,"rewardA","rewardA","RewardA discription",1,brand, admin.address, pool.address)

            expect(await services.tx.activateOpenRewards(newReward)).to.be.ok
            
           
        })

        it('Should revert for pool zero address', async () => {
            const { admin, user1, user2, services ,brand, reward,pool, me,rewardInitiator} = await payment_fixture();

            await  reward.withSigner(admin).tx.transfer(pool.address, 100, []);
           
            await me.withSigner(admin).tx.transfer(pool.address, 100, []);

            await rewardInitiator.tx.createNewReward( admin.address,"rewardA","rewardA",2,10000, [0xDE, 0xAD, 0xBE, 0xEF], brand)

            let newReward = (await rewardInitiator.query.getBrandReward(brand)).value.unwrapRecursively()

            await services.tx.createNewReward( newReward,"rewardA","rewardA","RewardA discription",1,brand, admin.address, "5C4hrfjw9DjXZTzV3MwzrrAr9P1MJhSrvWGWqi1eSuyUpnhM")

            await expect( services.tx.activateOpenRewards(newReward)).to.be.rejected
       
        })



        it('Should revert for wrong pool address', async () => {
            const { admin, user1, user2, services ,brand, reward,pool, me,rewardInitiator} = await payment_fixture();

            await  reward.withSigner(admin).tx.transfer(pool.address, 100, []);
           
            await me.withSigner(admin).tx.transfer(pool.address, 100, []);

            await rewardInitiator.tx.createNewReward( admin.address,"rewardA","rewardA",2,10000, [0xDE, 0xAD, 0xBE, 0xEF], brand)

            let newReward = (await rewardInitiator.query.getBrandReward(brand)).value.unwrapRecursively()

            await services.tx.createNewReward( newReward,"rewardA","rewardA","RewardA discription",1,brand, admin.address, "5C4hrfjw9DjXZTzV3MwzrrAr9P1MJhSrvWGWqi1eSuyUpnhM")

            await expect( services.tx.activateOpenRewards(admin.address)).to.be.rejected
       
        })





        it('Should pause pool', async () => {
            const { admin, user1, user2, services ,brand, reward,pool, me,rewardInitiator} = await payment_fixture();

            await  reward.withSigner(admin).tx.transfer(pool.address, 100, []);
           
            await me.withSigner(admin).tx.transfer(pool.address, 100, []);

            await rewardInitiator.tx.createNewReward( admin.address,"rewardA","rewardA",2,10000, [0xDE, 0xAD, 0xBE, 0xEF], brand)

            let newReward = (await rewardInitiator.query.getBrandReward(brand)).value.unwrapRecursively()

            await services.tx.createNewReward( newReward,"rewardA","rewardA","RewardA discription",1,brand, admin.address, pool.address)

            await services.tx.activateOpenRewards(newReward)

            expect(await services.tx.pauseOpenRewards(newReward)).to.be.ok
            
           
        })

        it('Should revert for pool zero address', async () => {
            const { admin, user1, user2, services ,brand, reward,pool, me,rewardInitiator} = await payment_fixture();

            await  reward.withSigner(admin).tx.transfer(pool.address, 100, []);
           
            await me.withSigner(admin).tx.transfer(pool.address, 100, []);

            await rewardInitiator.tx.createNewReward( admin.address,"rewardA","rewardA",2,10000, [0xDE, 0xAD, 0xBE, 0xEF], brand)

            let newReward = (await rewardInitiator.query.getBrandReward(brand)).value.unwrapRecursively()

            await services.tx.createNewReward( newReward,"rewardA","rewardA","RewardA discription",1,brand, admin.address,  pool.address)

            await services.tx.activateOpenRewards(newReward)

            await expect( services.tx.pauseOpenRewards("5C4hrfjw9DjXZTzV3MwzrrAr9P1MJhSrvWGWqi1eSuyUpnhM")).to.be.rejected
       
        })



        it('Should revert for wrong pool address to pause pool', async () => {
            const { admin, user1, user2, services ,brand, reward,pool, me,rewardInitiator} = await payment_fixture();

            await  reward.withSigner(admin).tx.transfer(pool.address, 100, []);
           
            await me.withSigner(admin).tx.transfer(pool.address, 100, []);

            await rewardInitiator.tx.createNewReward( admin.address,"rewardA","rewardA",2,10000, [0xDE, 0xAD, 0xBE, 0xEF], brand)

            let newReward = (await rewardInitiator.query.getBrandReward(brand)).value.unwrapRecursively()

            await services.tx.createNewReward( newReward,"rewardA","rewardA","RewardA discription",1,brand, admin.address, pool.address)

            await services.tx.activateOpenRewards(newReward)
            
            await expect( services.tx.pauseOpenRewards(admin.address)).to.be.rejected
        })

        it('Should resume pool again', async () => {
            const { admin, user1, user2, services ,brand, reward,pool, me,rewardInitiator} = await payment_fixture();

            await  reward.withSigner(admin).tx.transfer(pool.address, 100, []);
           
            await me.withSigner(admin).tx.transfer(pool.address, 100, []);

            await rewardInitiator.tx.createNewReward( admin.address,"rewardA","rewardA",2,10000, [0xDE, 0xAD, 0xBE, 0xEF], brand)

            let newReward = (await rewardInitiator.query.getBrandReward(brand)).value.unwrapRecursively()

            await services.tx.createNewReward( newReward,"rewardA","rewardA","RewardA discription",1,brand, admin.address, pool.address)

            await services.tx.activateOpenRewards(newReward)

            await services.tx.pauseOpenRewards(newReward)

            expect(await services.tx.resumeOpenRewards(newReward)).to.be.ok
            
        })


        it('Should not resume pool again if already activated', async () => {
            const { admin, user1, user2, services ,brand, reward,pool, me,rewardInitiator} = await payment_fixture();

            await  reward.withSigner(admin).tx.transfer(pool.address, 100, []);
           
            await me.withSigner(admin).tx.transfer(pool.address, 100, []);

            await rewardInitiator.tx.createNewReward( admin.address,"rewardA","rewardA",2,10000, [0xDE, 0xAD, 0xBE, 0xEF], brand)

            let newReward = (await rewardInitiator.query.getBrandReward(brand)).value.unwrapRecursively()

            await services.tx.createNewReward( newReward,"rewardA","rewardA","RewardA discription",1,brand, admin.address, pool.address)

            await services.tx.activateOpenRewards(newReward)

            await expect(services.tx.resumeOpenRewards(newReward)).to.be.rejected
            
        })


        it('Resume pool should fail for wrong address', async () => {
            const { admin, user1, user2, services ,brand, reward,pool, me,rewardInitiator} = await payment_fixture();

            await  reward.withSigner(admin).tx.transfer(pool.address, 100, []);
           
            await me.withSigner(admin).tx.transfer(pool.address, 100, []);

            await rewardInitiator.tx.createNewReward( admin.address,"rewardA","rewardA",2,10000, [0xDE, 0xAD, 0xBE, 0xEF], brand)

            let newReward = (await rewardInitiator.query.getBrandReward(brand)).value.unwrapRecursively()

            await services.tx.createNewReward( newReward,"rewardA","rewardA","RewardA discription",1,brand, admin.address, pool.address)

            await services.tx.activateOpenRewards(newReward)

            await expect(services.tx.resumeOpenRewards(admin.address)).to.be.rejected
            
        })


        it('Should top up treasury', async () => {
            const { admin, services ,brand, reward,bountyAddress, treasuryAddress, me} = await payment_fixture();

            let editableRecord = {
                me: me.address,
	            bounty: bountyAddress,
	            treasury: treasuryAddress,
	            adminId: [1,2,3,4,5,6,7,8,9,0],
	            totalNumberOfBrands: 1,
	            totalNumberOfRewards: 1,
	            lastUpdated: 12345
            }

            await services.withSigner(admin).tx.updateProtocolRecords(editableRecord)

           await me.withSigner(admin).tx.increaseAllowance(services.address, 1000)
           await reward.withSigner(admin).tx.increaseAllowance(services.address, 1000)

           expect(await services.tx.topUpTreasuryBalances(reward.address, 100, 100, brand)).to.be.ok

           let treasuryBalance = (await me.query.balanceOf(treasuryAddress)).value.unwrapRecursively().rawNumber

           console.log("Treasury balance is :", treasuryBalance)
        })

        it('Should fail if protocol records are not set', async () => {
            const { admin, services ,brand, reward,bountyAddress, treasuryAddress, me} = await payment_fixture();

           await me.withSigner(admin).tx.increaseAllowance(services.address, 1000)
           await reward.withSigner(admin).tx.increaseAllowance(services.address, 1000)

           await expect(services.tx.topUpTreasuryBalances(reward.address, 100, 100, brand)).to.be.rejected
        })




        it('Should rejected if zero value deposit', async () => {
            const { admin, services ,brand, reward,bountyAddress, treasuryAddress, me} = await payment_fixture();

            let editableRecord = {
                me: me.address,
	            bounty: bountyAddress,
	            treasury: treasuryAddress,
	            adminId: [1,2,3,4,5,6,7,8,9,0],
	            totalNumberOfBrands: 1,
	            totalNumberOfRewards: 1,
	            lastUpdated: 12345
            }

            await services.withSigner(admin).tx.updateProtocolRecords(editableRecord)

           await me.withSigner(admin).tx.increaseAllowance(services.address, 1000)
           await reward.withSigner(admin).tx.increaseAllowance(services.address, 1000)

           await expect(services.tx.topUpTreasuryBalances(reward.address, 0, 0, brand)).to.be.rejected

        })


        it('Should rejected if allowance not created for deposit', async () => {
            const { admin, services ,brand, reward,bountyAddress, treasuryAddress, me} = await payment_fixture();

            let editableRecord = {
                me: me.address,
	            bounty: bountyAddress,
	            treasury: treasuryAddress,
	            adminId: [1,2,3,4,5,6,7,8,9,0],
	            totalNumberOfBrands: 1,
	            totalNumberOfRewards: 1,
	            lastUpdated: 12345
            }

           await services.withSigner(admin).tx.updateProtocolRecords(editableRecord)

           await expect(services.tx.topUpTreasuryBalances(reward.address, 1000, 1000, brand)).to.be.rejected

        })


        it('Should wthdraw from treasury after deposit', async () => {
            const { admin, services ,brand, reward,bountyAddress, treasuryAddress, me} = await payment_fixture();

            let editableRecord = {
                me: me.address,
	            bounty: bountyAddress,
	            treasury: treasuryAddress,
	            adminId: [1,2,3,4,5,6,7,8,9,0],
	            totalNumberOfBrands: 1,
	            totalNumberOfRewards: 1,
	            lastUpdated: 12345
            }

        await services.withSigner(admin).tx.updateProtocolRecords(editableRecord)

        await me.withSigner(admin).tx.increaseAllowance(services.address, 1000)
        await reward.withSigner(admin).tx.increaseAllowance(services.address, 1000)

        await services.tx.topUpTreasuryBalances(reward.address, 100, 100, brand)

        expect(await services.tx.withdrawTreasuryBalances(reward.address, 100, 100,admin.address, brand)).to.be.ok

    
        })


        it('Withdrawal should be rejected from treasury without deposit', async () => {
            const { admin, services ,brand, reward,bountyAddress, treasuryAddress, me} = await payment_fixture();

            let editableRecord = {
                me: me.address,
	            bounty: bountyAddress,
	            treasury: treasuryAddress,
	            adminId: [1,2,3,4,5,6,7,8,9,0],
	            totalNumberOfBrands: 1,
	            totalNumberOfRewards: 1,
	            lastUpdated: 12345
            }

        await services.withSigner(admin).tx.updateProtocolRecords(editableRecord)

        await me.withSigner(admin).tx.increaseAllowance(services.address, 1000)
        await reward.withSigner(admin).tx.increaseAllowance(services.address, 1000)

        await expect(services.tx.withdrawTreasuryBalances(reward.address, 100, 100,admin.address, brand)).to.be.rejected
    
        })


        it('Should be rejectd for zero value for  wthdrawal from treasury after deposit', async () => {
            const { admin, services ,brand, reward,bountyAddress, treasuryAddress, me} = await payment_fixture();

            let editableRecord = {
                me: me.address,
	            bounty: bountyAddress,
	            treasury: treasuryAddress,
	            adminId: [1,2,3,4,5,6,7,8,9,0],
	            totalNumberOfBrands: 1,
	            totalNumberOfRewards: 1,
	            lastUpdated: 12345
            }

        await services.withSigner(admin).tx.updateProtocolRecords(editableRecord)

        await me.withSigner(admin).tx.increaseAllowance(services.address, 1000)
        await reward.withSigner(admin).tx.increaseAllowance(services.address, 1000)

        await services.tx.topUpTreasuryBalances(reward.address, 100, 100, brand)

        await expect(services.tx.withdrawTreasuryBalances(reward.address, 0, 0,admin.address, brand)).to.be.rejected

    
        })

        it('Should be rejectd for wrong  brand for  wthdrawal from treasury after deposit', async () => {
            const { admin, services ,brand, reward,bountyAddress, treasuryAddress, me} = await payment_fixture();

            let editableRecord = {
                me: me.address,
	            bounty: bountyAddress,
	            treasury: treasuryAddress,
	            adminId: [1,2,3,4,5,6,7,8,9,0],
	            totalNumberOfBrands: 1,
	            totalNumberOfRewards: 1,
	            lastUpdated: 12345
            }

        await services.withSigner(admin).tx.updateProtocolRecords(editableRecord)

        await me.withSigner(admin).tx.increaseAllowance(services.address, 1000)
        await reward.withSigner(admin).tx.increaseAllowance(services.address, 1000)

        await services.tx.topUpTreasuryBalances(reward.address, 100, 100, brand)

        await expect(services.tx.withdrawTreasuryBalances(reward.address, 0, 0,admin.address, [0,1,2,3,4,5,6,7,8,2])).to.be.rejected

    
        })






    
    });




})