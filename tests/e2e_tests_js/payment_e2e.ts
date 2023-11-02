import { consts } from './utils/constants'
import { bnArg, expect, getSigners } from './utils/helpers'
import BN from 'bn.js'
import { ApiPromise } from '@polkadot/api'
import paymentConstructor from '../../typechain-generated/constructors/payment'
import paymentContract from '../../typechain-generated/contracts/payment'
import rewardConstructor from '../../typechain-generated/constructors/reward'
import rewardContract from '../../typechain-generated/contracts/reward'
import { use } from 'chai'

describe( "Payment Service Test", () => {

    let payment_fixture = async() =>{
        const api = await ApiPromise.create()
        const signers = getSigners()
        const admin = signers[0]
        const user1 = signers[1]
        const user2 = signers[2]

        const meFactory = new rewardConstructor(api, admin)
        const meAddress = (await meFactory.new(admin.address,"Me","Me",2,10000)).address
        const me = new rewardContract(meAddress, admin, api)
        const paymentFactory = new paymentConstructor(api, admin)
        const paymentAddress = (await paymentFactory.new(meAddress)).address
        const payment = new paymentContract(paymentAddress, admin, api)

        
        await me.withSigner(admin).tx.transfer(user1.address, 1000, [])

        return {
        admin,
        user1,
        user2,
        me,
        payment,
          done: async () => {
            await api.disconnect()
          }
        }
    }

    it('Should be able to deposit into the contract', async () => {
        const { admin, user1, user2,me, payment, done } = await payment_fixture();

        await me.withSigner(user1).tx.increaseAllowance(payment.address, 1000)

        await payment.withSigner(user1).tx.brandDepositMe(100, user1.address)

        let brandBal = await payment.withSigner(user1).query.brandMeBalance()
        let bal = brandBal.value.unwrapRecursively().rawNumber.toString()

        expect(brandBal.value.unwrapRecursively().rawNumber.toString()).to.eq("100")

      })

    it('Should reject if user doesnt create me allowance for contract', async () => {
      const { admin, user1, user2,me, payment, done } = await payment_fixture();
       
      await expect(payment.withSigner(user1).tx.brandDepositMe(100, user1.address)).to.be.eventually.rejected
      
    })

    it('Should reject if user without funds in contract try to withdraw', async () => {   
      const { admin, user1, user2,me, payment, done } = await payment_fixture();

      await me.withSigner(user1).tx.increaseAllowance(payment.address, 1000)

      await payment.withSigner(user1).tx.brandDepositMe(100, user1.address)

      await expect(payment.withSigner(user2).tx.brandWithdrawMe(100, user2.address)).to.be.eventually.rejected


    })

    it('User should be able to withdraw funds', async () => {
      const { admin, user1, user2,me, payment, done } = await payment_fixture();

      await me.withSigner(user1).tx.increaseAllowance(payment.address, 1000)

      await payment.withSigner(user1).tx.brandDepositMe(100, user1.address)

      let balanceBeforeWithdrawal = await me.withSigner(user1).query.balanceOf(user1.address);

      let balBeforeWithdrawal = balanceBeforeWithdrawal.value.unwrapRecursively().rawNumber.toString()

      await payment.withSigner(user1).tx.brandWithdrawMe(100, user1.address)

      let balanceafterWithdrawal = await me.withSigner(user1).query.balanceOf(user1.address);

      let balafterWithdrawal = balanceafterWithdrawal.value.unwrapRecursively().rawNumber.toString()

      expect( Number(balBeforeWithdrawal) + 100).to.eq(Number(balafterWithdrawal))


    })


    it('User balance in contract should reduce after paying for service', async () => {
      const { admin, user1, user2,me, payment, done } = await payment_fixture();

      await me.withSigner(user1).tx.increaseAllowance(payment.address, 1000)

      await payment.withSigner(user1).tx.brandDepositMe(100, user1.address)

      await payment.withSigner(user1).tx.brandServicePayment(50)

      let remainingBal = await payment.withSigner(user1).query.brandMeBalance()

      expect(await remainingBal.value.unwrapRecursively().rawNumber.toString()).to.eq("50")


    })

    it('User without funds in contract should not be able to pay for services', async () => {
      const { admin, user1, user2,me, payment, done } = await payment_fixture();

      await me.withSigner(user1).tx.increaseAllowance(payment.address, 1000)

      await payment.withSigner(user1).tx.brandDepositMe(100, user1.address)

      await payment.withSigner(user1).tx.brandServicePayment(50)

      await expect(payment.withSigner(user2).tx.brandServicePayment(50)).to.be.rejected


    })


    it('Should reject if user try to pay above his funds in contract', async () => {
      const { admin, user1, user2,me, payment, done } = await payment_fixture();

      await me.withSigner(user1).tx.increaseAllowance(payment.address, 1000)

      await payment.withSigner(user1).tx.brandDepositMe(100, user1.address)

      await payment.withSigner(user1).tx.brandServicePayment(50)

      await expect(payment.withSigner(user1).tx.brandServicePayment(200)).to.be.rejected

    })


    it('Should reject if none admin calls the protocolWithdrawMe', async () => {
      const { admin, user1, user2,me, payment, done } = await payment_fixture();

      await me.withSigner(user1).tx.increaseAllowance(payment.address, 1000)

      await payment.withSigner(user1).tx.brandDepositMe(100, user1.address)

      await payment.withSigner(user1).tx.brandServicePayment(50)

      await expect(payment.withSigner(user1).tx.protocolWithdrawMe(200, user1.address)).to.be.rejected

    })

    it('Should admin should be able to withdraw me paid for services ', async () => {
      const { admin, user1, user2,me, payment, done } = await payment_fixture();

      await me.withSigner(user1).tx.increaseAllowance(payment.address, 1000)

      await payment.withSigner(user1).tx.brandDepositMe(100, user1.address)

      await payment.withSigner(user1).tx.brandServicePayment(50)

      let balanceBeforeWithdrawal = await me.withSigner(admin).query.balanceOf(admin.address);

      let balBeforeWithdrawal = balanceBeforeWithdrawal.value.unwrapRecursively().rawNumber.toString()

      await payment.withSigner(admin).tx.protocolWithdrawMe(50, admin.address)

      let balanceafterWithdrawal = await me.withSigner(admin).query.balanceOf(admin.address);

      let balafterWithdrawal = balanceafterWithdrawal.value.unwrapRecursively().rawNumber.toString()

      expect(Number(balBeforeWithdrawal) + 50).to.be.eq(Number(balafterWithdrawal))

    })

    it('Should reject if admin try to withdraw higher than services paid for', async () => {
      const { admin, user1, user2,me, payment, done } = await payment_fixture();

      await me.withSigner(user1).tx.increaseAllowance(payment.address, 1000)

      await payment.withSigner(user1).tx.brandDepositMe(100, user1.address)

      await payment.withSigner(user1).tx.brandServicePayment(50)

      await payment.withSigner(admin).tx.protocolWithdrawMe(50, user1.address)

      await expect(payment.withSigner(admin).tx.protocolWithdrawMe(1000, user1.address)).to.be.eventually.rejected
    })

    







    




    
})