import { connectInjectedExtension } from "@polkadot-api/pjs-signer";
import { toHex, fromHex } from "@polkadot-api/utils";
import { createTx } from "@substrate/light-client-extension-helpers/tx-helper"; // 👈 create-tx import
import { Unstable } from "@substrate/connect-discovery";
import {
  getLightClientProvider,
  LightClientProvider,
} from "@substrate/light-client-extension-helpers/web-page";

const CHANNEL_ID = "substrate-wallet-template";

const PROVIDER_INFO = {
  uuid: crypto.randomUUID(),
  name: "Abra cadabra",
  icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg'/>",
  rdns: "io.github.paritytech.SubstrateConnectWalletTemplate",
};

const lightClientProviderPromise = getLightClientProvider(CHANNEL_ID);

// #region Smoldot Discovery Provider
{
  const provider = lightClientProviderPromise.then(
    (lightClientProvider: LightClientProvider): Unstable.Provider => ({
      ...lightClientProvider,
      async createTx(chainId: string, from: string, callData: string) {
        const chains = Object.values(lightClientProvider.getChains());
        const chain = chains.find(({ genesisHash }) => genesisHash === chainId);

        if (!chain) {
          throw new Error("unknown chain");
        }

        const injectedExt = await connectInjectedExtension("polkadot-js");

        const account = injectedExt
          .getAccounts()
          .find((account) => toHex(account.polkadotSigner.publicKey) === from);

        if (!account) {
          throw new Error("no account");
        }

        const signer = account.polkadotSigner;

        const tx = await createTx(chain.connect)({
          callData: fromHex(callData),
          signer,
        });

        return toHex(tx);
      },
      async getAccounts(_chainId: string) {
        const injectedExt = await connectInjectedExtension("polkadot-js");
        const accounts = injectedExt.getAccounts();

        return accounts;
      },
    })
  );

  const detail: Unstable.SubstrateConnectProviderDetail = Object.freeze({
    info: PROVIDER_INFO,
    kind: "substrate-connect-unstable",
    provider,
  });

  window.addEventListener(
    "substrateDiscovery:requestProvider",
    ({ detail: { onProvider } }) => onProvider(detail)
  );

  window.dispatchEvent(
    new CustomEvent("substrateDiscovery:announceProvider", {
      detail,
    })
  );
}
// #endregion
