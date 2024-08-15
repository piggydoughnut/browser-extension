console.log("Service Worker 👋");
import {
    polkadot,
    ksmcc3,
    westend2,
  } from "@substrate/connect-known-chains"
  import { register } from "@substrate/light-client-extension-helpers/background"
  console.log('HELLOOOOO1')
  import { start } from "@substrate/light-client-extension-helpers/smoldot"
  console.log('HELLOOOOO2')
  
  const { lightClientPageHelper, addOnAddChainByUserListener } = register({
    smoldotClient: start({ maxLogLevel: 4 }),
    getWellKnownChainSpecs: async () => [polkadot, ksmcc3, westend2],
  })
  console.log('HELLOOOOO')