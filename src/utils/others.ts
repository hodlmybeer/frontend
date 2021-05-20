import Web3 from 'web3'
import ENS from 'ethereum-ens'
import BigNumber from 'bignumber.js'

const testTokenAbi = require('../constants/abis/mintableErc20.json')
const INFURA_KEY = process.env.REACT_APP_INFURA_KEY

// ENS
export const resolveENS = async (ensName: string, networkId: number) => {
  const network = networkId === 1 ? 'mainnet' : 'rinkeby'
  const web3 = new Web3(`https://${network}.infura.io/v3/${INFURA_KEY}`)
  const ens = new ENS(web3)
  const address = await ens.resolver(ensName).addr()
  return address.toLowerCase()
}

export const isEOA = async (address: string, networkId: number): Promise<Boolean> => {
  const network = networkId === 1 ? 'mainnet' : networkId === 42 ? 'kovan' : 'rinkeby'
  const web3 = new Web3(`https://${network}.infura.io/v3/${INFURA_KEY}`)
  return (await web3.eth.getCode(address)) === '0x'
}

export function toUTCDateString(expiry: number): string {
  const expiryDate = new Date(expiry * 1000)
  return expiryDate.toUTCString().split(' ').slice(1, 4).join(' ')
}

export function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export async function mintTestnetToken(
  web3: Web3,
  token: string,
  amount: BigNumber,
  user: string,
  notifyCallback: Function,
) {
  const erc = new web3.eth.Contract(testTokenAbi, token)
  await erc.methods.mint(user, amount.toString()).send({ from: user }).on('transactionHash', notifyCallback)
}
