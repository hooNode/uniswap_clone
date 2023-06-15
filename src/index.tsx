import GlobalStyles from "@shared/styles/GlobalStyles";
import RadialGradientByChainUpdater from "@shared/styles/RadialGradientByChainUpdater";
import Theme from "@shared/styles/Theme";
import "@shared/styles/fonts/Pretendard/pretendard.css";
import { config } from "@shared/wagmi/connector";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { WagmiConfig } from "wagmi";
import App from "./App";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <RecoilRoot>
      <WagmiConfig config={config}>
        <BrowserRouter>
          <Theme>
            <RadialGradientByChainUpdater />
            <GlobalStyles />
            <App />
          </Theme>
        </BrowserRouter>
      </WagmiConfig>
    </RecoilRoot>
  </React.StrictMode>
);
