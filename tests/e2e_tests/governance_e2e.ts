import { consts } from './utils/constants'
import { bnArg, expect, getSigners } from './utils/helpers'
import BN from 'bn.js'
import { ApiPromise , WsProvider} from '@polkadot/api'
import governanceConstructor from '../../typechain-generated/constructors/governance'
import governanceContract from '../../typechain-generated/contracts/governance'
import rewardConstructor from '../../typechain-generated/constructors/reward'
import rewardContract from '../../typechain-generated/contracts/reward'
import votesContract from "../../typechain-generated/contracts/votes"
import votesConstructor from '../../typechain-generated/constructors/votes'
import receiverContract from '../../typechain-generated/contracts/receiver'
import receiverConstructor from '../../typechain-generated/constructors/receiver'
import {AbiMessage} from '@polkadot/api-contract/types'
import { use } from 'chai'
import { Transaction, VoteType } from '../../typechain-generated/types-arguments/governance'

export function paramsToInput(params: Uint8Array) {
    let ecdStr = ''
    for (let i = 1; i < params.length; ++i) {
      let stemp = params[i].toString(16)
      if (stemp.length < 2) {
        stemp = '0' + stemp
      }
      ecdStr += stemp
    }
    const selector = hexToNumbers(ecdStr.substring(0, 8))
    const data = hexToNumbers(ecdStr.substring(8))
    return { selector, data }
  }

  export function hexToNumbers(hex: string): number[] {
    const byteArray = new Uint8Array(hex.length / 2)
  
    for (let i = 0; i < hex.length; i += 2) {
      byteArray[i / 2] = parseInt(hex.substr(i, 2), 16)
    }
  
    return Array.from(byteArray)
  }

  export const getMessageByName = (messages: AbiMessage[], name: string): AbiMessage => {
    return messages.filter((message) => {
      return message.identifier.includes(name)
    })[0]
  }

describe( "governance Test", () => {

    let governance_fixture = async() =>{
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

        const meFactory = new rewardConstructor(api, admin)
        const meAddress = (await meFactory.new(admin.address,"Me","Me",2,10000)).address
        const me = new rewardContract(meAddress, admin, api)

        const votingDelay = 10
        const votingPeriod = 10
        const proposalThreshold = 0
        const numrator = 0
        const totalSupply = 10000;

        
        const votesFactory = new votesConstructor(api, admin)
        const votesAddress = (await votesFactory.new(totalSupply)).address
        const votes = new votesContract(votesAddress, admin, api)


        const governanceFactory = new governanceConstructor(api, admin)
        const governanceAddress = (await governanceFactory.new(votesAddress, votingDelay, votingPeriod, proposalThreshold, numrator)).address
        const governance = new governanceContract(governanceAddress, admin, api)

        await votes.tx.setBlockTimestamp((await governance.query.blockTimestamp()).value.ok!)

        await votes.withSigner(admin).tx.transfer(admin.address, 1000, [])
        await votes.withSigner(admin).tx.delegate(admin.address)

        const receiverFactory = new receiverConstructor(api, admin)
        const receiverAddress = (await receiverFactory.new()).address
        const receiver = new receiverContract(receiverAddress, admin, api)

        

        const callParams = paramsToInput(getMessageByName(receiver.abi.messages, 'recieve').toU8a([]))


        const proposal: Transaction = {
            callee: receiverAddress,
            selector: callParams.selector,
            input: callParams.data,
            transferredValue: 0,
            gasLimit: 1000000000000
        }

           
        return {
        admin,
        user1,
        user2,
        governance,
        votingDelay,
        votingPeriod,
        proposal,
        proposalThreshold,
        numrator,
          done: async () => {
            await api.disconnect()
          }
        }
    }

    it('Ensure the proposal threshold is correct', async () => {
        const {
          governance,
          proposalThreshold
        } = await governance_fixture();

        
        await expect((await governance.query.proposalThreshold()).value.ok!.rawNumber.toNumber()).to.equals(proposalThreshold)

      })


    it('Ensure that voting delay is correct', async () => {
      const {governance, 
        votingDelay } = await governance_fixture();

      await expect((await governance.query.votingDelay()).value.ok!).to.equals(votingDelay)
     
    })



    it('Ensurethat voting period is correct', async () => {
      const {
        governance, 
        votingPeriod} = await governance_fixture();


      await expect((await governance.query.votingPeriod()).value.ok!).to.equals(votingPeriod)
    
    })


    it('Ensure that quorum numerator is set correct ', async () => {
      const {
        governance,
        numrator,  done } = await governance_fixture();

      await expect((await governance.query.quorumNumerator()).value.ok!.rawNumber.toNumber()).to.equals(numrator)

    })

    

    it('Should be able to create a proposal', async () => {
        const {
           governance,
           proposal
           } = await governance_fixture();
  
        expect(await governance.tx.propose([proposal], '<description>')).to.ok
    })

    it('Should reject if proposalhas been already created', async () => {
      const {governance,proposal } = await governance_fixture();

      await governance.tx.propose([proposal], '<description>')
      await expect(governance.tx.propose([proposal], '<description>')).to.be.rejected
    })


    it('should reject if proposal does not exist', async () => {   
      const { admin, user1, user2, governance,proposal, done } = await governance_fixture();

      const proposalId = (await governance.tx.propose([proposal], '<description>'))?.events
      // console.log("The proposal Id", proposalId)

      await expect(governance.tx.castVote([10], VoteType.for, "New governance", [10])).to.eventually.be.rejected

    }) 

    it('should reject if voting has not started', async () => {   
      const { admin, user1, user2, governance,proposal, done } = await governance_fixture();

      await governance.tx.propose([proposal], '<description>')
      await expect(governance.tx.castVote([10], VoteType.for, "New governance", [10])).to.eventually.be.rejected

    }) 

})

