import { useState, useEffect } from 'react';

export interface SolanaToken {
  symbol: string;
  name: string;
  address: string;
  decimals: number;
  logoURI?: string;
  price: number;
  change24h: number;
  volume24h: number;
  marketCap: number;
  tags?: string[];
}

interface JupiterToken {
  address: string;
  chainId: number;
  decimals: number;
  name: string;
  symbol: string;
  logoURI?: string;
  tags?: string[];
  extensions?: {
    coingeckoId?: string;
  };
}

export const useSolanaTokens = () => {
  const [tokens, setTokens] = useState<SolanaToken[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTokens = async () => {
      try {
        // Fetch from Jupiter API - comprehensive token list including Raydium, Pump.fun, etc.
        const response = await fetch('https://tokens.jup.ag/tokens');
        const jupiterTokens: JupiterToken[] = await response.json();

        // Convert to our format with mock prices
        const formattedTokens: SolanaToken[] = jupiterTokens
          .filter((token: JupiterToken) => token.symbol && token.name)
          .map((token: JupiterToken) => ({
            symbol: token.symbol,
            name: token.name,
            address: token.address,
            decimals: token.decimals,
            logoURI: token.logoURI,
            tags: token.tags,
            price: Math.random() * 1000, // Mock price - would integrate price API in production
            change24h: (Math.random() - 0.5) * 10,
            volume24h: Math.random() * 1000000,
            marketCap: Math.random() * 10000000
          }));

        setTokens(formattedTokens);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching Jupiter tokens:', error);
        setLoading(false);
      }
    };

    fetchTokens();
  }, []);

  return { tokens, loading };
};
