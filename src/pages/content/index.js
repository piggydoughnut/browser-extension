console.log('Content script loaded')

import { register } from "@substrate/light-client-extension-helpers/content-script"

const CHANNEL_ID = "substrate-wallet-template"


try {
  const s = document.createElement("script")
  s.type = "module"
  s.src = chrome.runtime.getURL("./inpage/index.js")
  s.onload = () => s.remove()
  ;(document.head || document.documentElement).appendChild(s)
} catch (error) {
  console.error("error injecting inpage.js", error)
}

register(CHANNEL_ID)

const port = chrome.runtime.connect({ name: "substrate-wallet-template" })
port.onMessage.addListener((msg) =>
  window.postMessage({ origin: "substrate-wallet-template/extension", msg }),
)
window.addEventListener("message", ({ data }) => {
  if (data.origin !== "substrate-wallet-template/web") return
  port.postMessage(data.msg)
})