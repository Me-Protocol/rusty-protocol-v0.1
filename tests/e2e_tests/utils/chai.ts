import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import type { AccountId } from '@polkadot/types/interfaces'

declare global {
  export namespace Chai {
    interface Assertion {
      output(value: AccountId | string | number | boolean | string[] | number[] | unknown, msg?: string): void
      bnToNumber(value: AccountId | string | number | boolean | string[] | number[] | unknown, msg?: string): void
      bnToString(value: AccountId | string | number | boolean | string[] | number[] | unknown, msg?: string): void
      bytesToString(value: AccountId | string | number | boolean | string[] | number[] | unknown, msg?: string): void
    }
  }
}

chai.use(chaiAsPromised)
chai.use((chai) => {
  chai.Assertion.addMethod('output', async function (param, message) {
    await new chai.Assertion(this._obj).to.eventually.have.property('value')

    const value = await new chai.Assertion(this._obj).to.eventually.have.property('value')
    const unwrapped = await value.unwrapRecursively()

    new chai.Assertion(unwrapped).to.equal(param, message)
  })

  chai.Assertion.addMethod('bnToNumber', async function (param, message) {
    await new chai.Assertion(this._obj).to.eventually.have.property('value')

    const value = await new chai.Assertion(this._obj).to.eventually.have.property('value')
    const valueToNumber = await value.unwrapRecursively().toNumber()

    new chai.Assertion(valueToNumber).to.equal(param, message)
  })

  chai.Assertion.addMethod('bnToString', async function (param, message) {
    await new chai.Assertion(this._obj).to.eventually.have.property('value')

    const value = await new chai.Assertion(this._obj).to.eventually.have.property('value')
    const valueToNumber = await value.unwrapRecursively().toString()

    new chai.Assertion(valueToNumber).to.equal(param, message)
  })

  chai.Assertion.addMethod('bytesToString', async function (param, message) {
    await new chai.Assertion(this._obj).to.eventually.have.property('value')

    const value = await new chai.Assertion(this._obj).to.eventually.have.property('value')
    const valueToNumber = bytesToString(value.unwrapRecursively().toString())

    new chai.Assertion(valueToNumber).to.equal(param, message)
  })
})
export const { expect } = chai

function bytesToString(bytes: string): string {
    const outputNumber = bytes.substring(2).split('').map(x => parseInt(x as unknown as string, 16))
  
    const length = outputNumber.length
    let result = ''
    for (let i = 0; i < length; i += 2) {
      result += String.fromCharCode(outputNumber[i] * 16 + outputNumber[i + 1])
    }
  
    return result
  }