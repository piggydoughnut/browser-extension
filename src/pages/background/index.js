console.log("Service Worker 👋");
import {
    polkadot,
    ksmcc3,
    westend2,
  } from "@substrate/connect-known-chains"
  import { register } from "@substrate/light-client-extension-helpers/background"
  import { start } from "@substrate/light-client-extension-helpers/smoldot"
  
  const { lightClientPageHelper, addOnAddChainByUserListener } = register({
    smoldotClient: start({ maxLogLevel: 4 }),
    getWellKnownChainSpecs: async () => [polkadot, ksmcc3, westend2],
  })
  