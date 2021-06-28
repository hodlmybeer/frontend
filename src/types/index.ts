export type Token = {
  id: string
  name: string
  symbol: string
  decimals: number
  img?: string
  mintable?: boolean
  coingeckId?: string
  tags: string[]
}

export type Hodling = {
  token: hToken
  balance: string
  shareBalance: string
}

export type Account = {
  id: string
  hodlings: Hodling[]
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
  n: number // decrease coefficient
  bonusToken: string
  bonusTokenBalance: string
}
