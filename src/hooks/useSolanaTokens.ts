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
  category?: string;
  isPopular?: boolean;
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

// Top 20 popular Solana tokens with real contract addresses
const POPULAR_TOKENS: SolanaToken[] = [
  {
    symbol: 'SOL',
    name: 'Solana',
    address: 'So11111111111111111111111111111111111111112',
    decimals: 9,
    logoURI: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png',
    price: 145.23,
    change24h: 5.67,
    volume24h: 2500000000,
    marketCap: 65000000000,
    tags: ['native'],
    category: 'Popular',
    isPopular: true
  },
  {
    symbol: 'USDC',
    name: 'USD Coin',
    address: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
    decimals: 6,
    logoURI: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png',
    price: 1.00,
    change24h: 0.01,
    volume24h: 5000000000,
    marketCap: 25000000000,
    tags: ['stablecoin'],
    category: 'Stablecoins',
    isPopular: true
  },
  {
    symbol: 'USDT',
    name: 'Tether USD',
    address: 'Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB',
    decimals: 6,
    logoURI: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB/logo.png',
    price: 1.00,
    change24h: -0.01,
    volume24h: 8000000000,
    marketCap: 90000000000,
    tags: ['stablecoin'],
    category: 'Stablecoins',
    isPopular: true
  },
  {
    symbol: 'JUP',
    name: 'Jupiter',
    address: 'JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN',
    decimals: 6,
    logoURI: 'https://static.jup.ag/jup/icon.png',
    price: 0.85,
    change24h: 12.5,
    volume24h: 150000000,
    marketCap: 1200000000,
    tags: ['defi'],
    category: 'DeFi',
    isPopular: true
  },
  {
    symbol: 'RAY',
    name: 'Raydium',
    address: '4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R',
    decimals: 6,
    logoURI: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R/logo.png',
    price: 1.85,
    change24h: 8.3,
    volume24h: 80000000,
    marketCap: 450000000,
    tags: ['defi', 'raydium'],
    category: 'DeFi',
    isPopular: true
  },
  {
    symbol: 'BONK',
    name: 'Bonk',
    address: 'DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263',
    decimals: 5,
    logoURI: 'https://arweave.net/hQiPZOsRZXGXBJd_82PhVdlM_hACsT_q6wqwf5cSY7I',
    price: 0.00002,
    change24h: 15.7,
    volume24h: 45000000,
    marketCap: 1300000000,
    tags: ['meme', 'community'],
    category: 'Meme',
    isPopular: true
  },
  {
    symbol: 'WIF',
    name: 'dogwifhat',
    address: 'EKpQGSJtjMFqKZ9KQanSqYXRcF8fBopzLHYxdM65zcjm',
    decimals: 6,
    logoURI: 'https://bafkreibk3covs5ltyqxa272uodhculbr6kea6betidfwy3ajsav2vjzyum.ipfs.nftstorage.link',
    price: 2.45,
    change24h: 22.1,
    volume24h: 120000000,
    marketCap: 2400000000,
    tags: ['meme'],
    category: 'Meme',
    isPopular: true
  },
  {
    symbol: 'JTO',
    name: 'Jito',
    address: 'jtojtomepa8beP8AuQc6eXt5FriJwfFMwQx2v2f9mCL',
    decimals: 9,
    logoURI: 'https://metadata.jito.network/token/jto/image',
    price: 3.25,
    change24h: 6.8,
    volume24h: 65000000,
    marketCap: 350000000,
    tags: ['defi'],
    category: 'DeFi',
    isPopular: true
  },
  {
    symbol: 'PYTH',
    name: 'Pyth Network',
    address: 'HZ1JovNiVvGrGNiiYvEozEVgZ58xaU3RKwX8eACQBCt3',
    decimals: 6,
    logoURI: 'https://pyth.network/token.svg',
    price: 0.42,
    change24h: 4.2,
    volume24h: 55000000,
    marketCap: 280000000,
    tags: ['oracle'],
    category: 'DeFi',
    isPopular: true
  },
  {
    symbol: 'ORCA',
    name: 'Orca',
    address: 'orcaEKTdK7LKz57vaAYr9QeNsVEPfiu6QeMU1kektZE',
    decimals: 6,
    logoURI: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/orcaEKTdK7LKz57vaAYr9QeNsVEPfiu6QeMU1kektZE/logo.png',
    price: 3.85,
    change24h: 7.5,
    volume24h: 35000000,
    marketCap: 180000000,
    tags: ['defi'],
    category: 'DeFi',
    isPopular: true
  },
  {
    symbol: 'MOBILE',
    name: 'Helium Mobile',
    address: 'mb1eu7TzEc71KxDpsmsKoucSSuuoGLv1drys1oP2jh6',
    decimals: 6,
    logoURI: 'https://shdw-drive.genesysgo.net/CsDkETHRRR1EcueeN346MJoqzymkkr7RFjMqGpZMzAib/mobile.png',
    price: 0.0012,
    change24h: 3.2,
    volume24h: 15000000,
    marketCap: 120000000,
    tags: ['infrastructure'],
    category: 'Infrastructure',
    isPopular: true
  },
  {
    symbol: 'RENDER',
    name: 'Render Token',
    address: 'rndrizKT3MK1iimdxRdWabcF7Zg7AR5T4nud4EkHBof',
    decimals: 8,
    logoURI: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/rndrizKT3MK1iimdxRdWabcF7Zg7AR5T4nud4EkHBof/logo.png',
    price: 7.65,
    change24h: 9.1,
    volume24h: 45000000,
    marketCap: 280000000,
    tags: ['rendering'],
    category: 'Infrastructure',
    isPopular: true
  },
  {
    symbol: 'MSOL',
    name: 'Marinade staked SOL',
    address: 'mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So',
    decimals: 9,
    logoURI: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So/logo.png',
    price: 156.40,
    change24h: 5.5,
    volume24h: 25000000,
    marketCap: 450000000,
    tags: ['lst'],
    category: 'DeFi',
    isPopular: true
  },
  {
    symbol: 'DRIFT',
    name: 'Drift Protocol',
    address: 'DriFtupJYLTosbwoN8koMbEYSx54aFAVLddWsbksjwg7',
    decimals: 6,
    logoURI: 'https://drift-public.s3.eu-west-1.amazonaws.com/assets/drift-token.png',
    price: 0.68,
    change24h: 11.2,
    volume24h: 18000000,
    marketCap: 95000000,
    tags: ['defi'],
    category: 'DeFi',
    isPopular: true
  },
  {
    symbol: 'W',
    name: 'Wormhole',
    address: '85VBFQZC9TZkfaptBWjvUw7YbZjy52A6mjtPGjstQAmQ',
    decimals: 6,
    logoURI: 'https://wormhole.com/token.png',
    price: 0.35,
    change24h: 2.8,
    volume24h: 28000000,
    marketCap: 650000000,
    tags: ['bridge'],
    category: 'Infrastructure',
    isPopular: true
  },
  {
    symbol: 'TNSR',
    name: 'Tensor',
    address: 'TNSRxcUxoT9xBG3de7PiJyTDYu7kskLqcpddxnEJAS6',
    decimals: 9,
    logoURI: 'https://metadata.tensor.so/tnsr.png',
    price: 0.58,
    change24h: 6.4,
    volume24h: 12000000,
    marketCap: 85000000,
    tags: ['nft'],
    category: 'NFT',
    isPopular: true
  },
  {
    symbol: 'BOME',
    name: 'Book of Meme',
    address: 'ukHH6c7mMyiWCf1b9pnWe25TSpkDDt3H5pQZgZ74J82',
    decimals: 6,
    logoURI: 'https://bafkreidlwyr26m5bckjo2bbqhqcvcbvn27vm35vc4w2kuf46yly37ma2jq.ipfs.nftstorage.link',
    price: 0.0085,
    change24h: 18.5,
    volume24h: 32000000,
    marketCap: 580000000,
    tags: ['meme'],
    category: 'Meme',
    isPopular: true
  },
  {
    symbol: 'POPCAT',
    name: 'Popcat',
    address: '7GCihgDB8fe6KNjn2MYtkzZcRjQy3t9GHdC8uHYmW2hr',
    decimals: 9,
    logoURI: 'https://bafkreifc4sbgujiufjl5yyek6z7mso3qehjvt4yfqr7hfkzbvbvgbebfoy.ipfs.nftstorage.link',
    price: 0.62,
    change24h: 25.3,
    volume24h: 42000000,
    marketCap: 620000000,
    tags: ['meme'],
    category: 'Meme',
    isPopular: true
  },
  {
    symbol: 'MEW',
    name: 'cat in a dogs world',
    address: 'MEW1gQWJ3nEXg2qgERiKu7FAFj79PHvQVREQUzScPP5',
    decimals: 5,
    logoURI: 'https://bafkreidvkvuzyslw4su4z4g64ugv343n54u4mg5qauuf766skqzpe4wiey.ipfs.nftstorage.link',
    price: 0.0042,
    change24h: 14.7,
    volume24h: 28000000,
    marketCap: 380000000,
    tags: ['meme'],
    category: 'Meme',
    isPopular: true
  },
  {
    symbol: 'MYRO',
    name: 'Myro',
    address: 'HhJpBhRRn4g56VsyLuT8DL5Bv31HkXqsrahTTUCZeZg4',
    decimals: 9,
    logoURI: 'https://cf-ipfs.com/ipfs/QmQ3VbZi4f5s7bAYGUJpCJzGkb2aVfq6Xz7jPELiJmVBvK',
    price: 0.088,
    change24h: 9.8,
    volume24h: 22000000,
    marketCap: 88000000,
    tags: ['meme'],
    category: 'Meme',
    isPopular: true
  }
];

export const useSolanaTokens = () => {
  const [tokens, setTokens] = useState<SolanaToken[]>(POPULAR_TOKENS);
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
          .map((token: JupiterToken) => {
            // Check if this token is in our popular list
            const popularToken = POPULAR_TOKENS.find(pt => pt.address === token.address);
            
            return {
              symbol: token.symbol,
              name: token.name,
              address: token.address,
              decimals: token.decimals,
              logoURI: token.logoURI || popularToken?.logoURI,
              tags: token.tags,
              price: popularToken?.price || Math.random() * 1000,
              change24h: popularToken?.change24h || (Math.random() - 0.5) * 10,
              volume24h: popularToken?.volume24h || Math.random() * 1000000,
              marketCap: popularToken?.marketCap || Math.random() * 10000000,
              category: popularToken?.category || (token.tags?.[0] === 'community-token' ? 'Community' : 'Other'),
              isPopular: !!popularToken
            };
          });

        // Merge with popular tokens to ensure they're always available
        const allTokens = [...POPULAR_TOKENS, ...formattedTokens.filter(ft => 
          !POPULAR_TOKENS.find(pt => pt.address === ft.address)
        )];

        setTokens(allTokens);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching Jupiter tokens:', error);
        // Fallback to popular tokens if API fails
        setTokens(POPULAR_TOKENS);
        setLoading(false);
      }
    };

    fetchTokens();
  }, []);

  return { tokens, loading };
};
