import BigNumber from 'bignumber.js'

export type Token = {
  id: string
  name: string
  symbol: string
  decimals: number
}

export type Account = {
  hodlings: {
    token: hToken
    balance: string
    shareBalance: string
  }
}

export type hToken = Token & {
  token: string
  creator: string
  penalty: number
  fee: number
  expiry: number
  lockWindow: number
  createdAt: number
  createdTx: string
  tokenBalance: string
  totalShares: string
  totalFee: string
  totalReward: string
}
