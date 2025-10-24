import { createWeb3Modal } from '@web3modal/wagmi/react';
import { defaultWagmiConfig } from '@web3modal/wagmi/react/config';
import { WagmiProvider } from 'wagmi';
import { mainnet, bsc } from 'wagmi/chains';
import { QueryClient } from '@tanstack/react-query';

const projectId = '36f5ee8da67825bfd8a1329ca2698cdf';

const metadata = {
  name: 'SwapDEX',
  description: 'Multi-chain DEX aggregator',
  url: typeof window !== 'undefined' ? window.location.origin : '',
  icons: ['https://avatars.githubusercontent.com/u/37784886']
};

const chains = [mainnet, bsc] as const;

export const config = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
});

export const queryClient = new QueryClient();

if (typeof window !== 'undefined') {
  createWeb3Modal({
    wagmiConfig: config,
    projectId,
    enableAnalytics: false,
    themeMode: 'dark',
    themeVariables: {
      '--w3m-accent': 'hsl(142, 76%, 36%)',
      '--w3m-border-radius-master': '2px'
    }
  });
}
