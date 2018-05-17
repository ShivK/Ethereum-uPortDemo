import { Connect, SimpleSigner } from 'uport-connect'

//to read (process.env.SIGNER_KEY,process.env.APP_NAME,process.env.APP_MNID)

const uport = new Connect('A11 Insurance', {
  clientId: '2odHUdxZB29bDvGda3QfC2cqYQ1YqsEhbwo',
  network: 'rinkeby',
  signer: SimpleSigner('57d08e26e2cd736410fde9adc5001b8d06e13e7d18a4cc20d92ef54af999a0b3')
})


const web3 = uport.getWeb3()
export { web3, uport }
