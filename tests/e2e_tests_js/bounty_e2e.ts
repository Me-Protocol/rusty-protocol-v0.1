import { consts } from './utils/constants'
import { bnArg, expect, getSigners } from './utils/helpers'
import BN from 'bn.js'
import { ApiPromise } from '@polkadot/api'
import bountyConstructor from '../../typechain-generated/constructors/bounty'
import bountyContract from '../../typechain-generated/contracts/bounty'
import rewardConstructor from '../../typechain-generated/constructors/reward'
import rewardContract from '../../typechain-generated/contracts/reward'

describe( "Bounty Test", () => {

    let pool_fixture = async() => { 
        const api = await ApiPromise.create()
        const signers = getSigners()
        const admin = signers[0]
        const brandA = signers[1]
        const brandB = signers[2]
        const user1 = signers[3]

     
        return {
          api,
          admin,
          brandA,
          brandB,
          user1,
          close: async () => {
            await api.disconnect()
          }
        }
    }

              it('Should successfully record bounty amount', async () => {
                const { brandA, brandB, admin, close } = await pool_fixture();
            
                await close();
              });
})