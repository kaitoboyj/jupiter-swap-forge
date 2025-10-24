import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { WagmiProvider } from 'wagmi';
import { QueryClientProvider } from '@tanstack/react-query';
import { config, queryClient } from './config/wagmi';
import { SolanaWalletProvider } from './providers/SolanaWalletProvider';
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <SolanaWalletProvider>
          <App />
        </SolanaWalletProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </StrictMode>
);
