import { useState, useEffect } from 'react';
import { TokenInfo, TokenListProvider } from '@solana/spl-token-registry';

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
}

export const useSolanaTokens = () => {
  const [tokens, setTokens] = useState<SolanaToken[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTokens = async () => {
      try {
        const tokenListProvider = new TokenListProvider();
        const tokenList = await tokenListProvider.resolve();
        const tokenMap = tokenList.filterByChainId(101).getList(); // 101 is Solana mainnet

        // Convert to our format with mock prices for now
        const formattedTokens: SolanaToken[] = tokenMap
          .filter((token: TokenInfo) => token.symbol && token.name)
          .slice(0, 50) // Limit to top 50 tokens
          .map((token: TokenInfo) => ({
            symbol: token.symbol,
            name: token.name,
            address: token.address,
            decimals: token.decimals,
            logoURI: token.logoURI,
            price: Math.random() * 1000, // Mock price - would fetch from API in production
            change24h: (Math.random() - 0.5) * 10,
            volume24h: Math.random() * 1000000,
            marketCap: Math.random() * 10000000
          }));

        setTokens(formattedTokens);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching Solana tokens:', error);
        setLoading(false);
      }
    };

    fetchTokens();
  }, []);

  return { tokens, loading };
};
