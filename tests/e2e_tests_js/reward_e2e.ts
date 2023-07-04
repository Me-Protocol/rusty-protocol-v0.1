// import { consts } from './utils/constants'
// import { expect, getSigners } from './utils/helpers'
// import { ApiPromise } from '@polkadot/api'
// import rewardConstructor from '../../typechain-generated/constructors/reward'
// import rewardContract from '../../typechain-generated/contracts/reward'


// describe( "Reward Test", () => {

//     let reward_fixture = async() =>{
//         const api = await ApiPromise.create()
//         const signers = getSigners()
//         const defaultSigner = signers[2]
//         const alice = signers[0]
//         const bob = signers[1]

//         const rewardFactory = new rewardConstructor(api, defaultSigner)
//         const contractAddress = (await rewardFactory.new(alice.address,["Me"],["Me"],2,100)).address
//         const contract = new rewardContract(contractAddress, defaultSigner, api)
    
//         return {
//           api,
//           defaultSigner,
//           alice,
//           bob,
//           contract,
//           query: contract.query,
//           tx: contract.tx,
//           close: async () => {
//             await api.disconnect()
//           }
//         }
//     }

//     it('mints initial rewards', async () => {
//         const { api, query, defaultSigner: sender, alice, close } = await reward_fixture();
    
//         await expect(query.balanceOf(alice.address)).to.have.bnToNumber(100);
    
//         await close();
//       })

//     it('only brand can mint type a', async () => {
//         const { api, query, defaultSigner: sender, alice, bob, tx, contract, close } = await reward_fixture();
//         await expect(tx.mintTo(bob.address, 100)).to.eventually.be.rejected
//         await close();
//     })

//     it('only brand can mint type b', async () => {
//         const { api, query, defaultSigner: sender, alice, bob, tx, contract, close } = await reward_fixture();
//         await expect(contract.withSigner(alice).tx.mintTo(bob.address, 100)).to.eventually.be.ok
//         await close();
//     })

//     it('brand can burn', async () => {
//         const { api, query, defaultSigner: sender, alice, bob, tx, contract, close } = await reward_fixture();
//         await expect(contract.withSigner(alice).tx.burnRewards(100)).to.eventually.be.ok
//         await expect(query.totalSupply()).to.have.bnToNumber(0);
//         await close();
//     })
    
// })