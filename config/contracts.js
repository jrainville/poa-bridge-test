let secrets;
try {
  secrets = require('secrets');
} catch (e) {
  console.warn('No secrets.json file found. You will not be able to use Rinkeby');
  secrets = {};
}

module.exports = {
  default: {
    deployment: {
      host: "localhost",
      port: 8546,
      type: "ws"
    },
    dappConnection: [
      "$WEB3",
      "ws://localhost:8546",
      "http://localhost:8545"
    ],

    gas: "auto",

    strategy: 'implicit',

    contracts: {
      BridgeToken: {
       onDeploy: async (deps) => {
         await deps.contracts.BridgeToken.methods.mint(100000000000000000000).send({from: deps.web3.eth.defaultAccount});
       }
      }
    }
  },

  // default environment, merges with the settings in default
  // assumed to be the intended environment by `embark run`
  development: {
    dappConnection: [
      "ws://localhost:8546",
      "http://localhost:8545",
      "$WEB3"  // uses pre existing web3 object if available (e.g in Mist)
    ]
  },

  rinkeby: {
    deployment: {
      host: `rinkeby.infura.io/${secrets.infuraId}`,
      port: false,
      type: "rpc",
      protocol: 'https',
      accounts: [
        {
          mnemonic: secrets.mnemonic
        }
      ]
    }
  },

  // merges with the settings in default
  // used with "embark run privatenet"
  privatenet: {
  },

  // merges with the settings in default
  // used with "embark run testnet"
  testnet: {
  },

  // merges with the settings in default
  // used with "embark run livenet"
  livenet: {
  },

  // you can name an environment with specific settings and then specify with
  // "embark run custom_name" or "embark blockchain custom_name"
  //custom_name: {
  //}
};
