import { getLightClientProvider } from "@substrate/light-client-extension-helpers/web-page";
import {
  // make as makeSmoldotDiscoveryConnector,
  // SmoldotExtensionProviderDetail,
  getSmoldotExtensionProviders,
} from "@substrate/smoldot-discovery";
import { SmoldotExtensionProviderDetail } from "@substrate/smoldot-discovery/types";

const CHANNEL_ID = "substrate-wallet-template";

const PROVIDER_INFO = {
  uuid: crypto.randomUUID(),
  name: "Substrate Connect Wallet Template",
  icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg'/>",
  rdns: "io.github.paritytech.SubstrateConnectWalletTemplate",
};

const lightClientProvider = getLightClientProvider(CHANNEL_ID);

// #region Smoldot Discovery Provider
{
  const provider: SmoldotExtensionProviderDetail = lightClientProvider.then(
    getSmoldotExtensionProviders()
  );

  const detail = Object.freeze({
    info: PROVIDER_INFO,
    kind: "smoldot-v1",
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
