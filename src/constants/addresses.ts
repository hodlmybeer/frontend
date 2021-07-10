import { SupportedNetworks } from './enums'

export const ZERO_ADDR = '0x0000000000000000000000000000000000000000'

export const factories: {
  [key in SupportedNetworks]: string
} = {
  [SupportedNetworks.Ropsten]: '0x05c62EeFa1e7c2559a9CE59f149514d5334C799E',
  [SupportedNetworks.Kovan]: '0x0ecfE8Ed77b7483EC1E4c8ceF98B97BF151B4a4b',
  [SupportedNetworks.Mumbai]: '0xe3f165855ab12b08aC3ebF225DB62dad99AEb01B',
}
