export interface Token {
  symbol: string;
  name: string;
  address: string;
  decimals: number;
  logoURI: string;
  price: number;
  change24h: number;
  volume24h: number;
  marketCap: number;
}

export const tokens: Token[] = [
  {
    symbol: "SOL",
    name: "Solana",
    address: "So11111111111111111111111111111111111111112",
    decimals: 9,
    logoURI: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png",
    price: 191.33,
    change24h: 4.7,
    volume24h: 2847000000,
    marketCap: 89000000000
  },
  {
    symbol: "USDC",
    name: "USD Coin",
    address: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
    decimals: 6,
    logoURI: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png",
    price: 0.9999,
    change24h: 0.02,
    volume24h: 8200000000,
    marketCap: 32000000000
  },
  {
    symbol: "USDT",
    name: "Tether USD",
    address: "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB",
    decimals: 6,
    logoURI: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB/logo.svg",
    price: 1.0001,
    change24h: -0.01,
    volume24h: 11000000000,
    marketCap: 97000000000
  },
  {
    symbol: "BTC",
    name: "Bitcoin",
    address: "9n4nbM75f5Ui33ZbPYXn59EwSgE8CGsHtAeTH5YFeJ9E",
    decimals: 6,
    logoURI: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/9n4nbM75f5Ui33ZbPYXn59EwSgE8CGsHtAeTH5YFeJ9E/logo.png",
    price: 95432.11,
    change24h: 2.3,
    volume24h: 32000000000,
    marketCap: 1870000000000
  },
  {
    symbol: "ETH",
    name: "Ethereum",
    address: "7vfCXTUXx5WJV5JADk17DUJ4ksgau7utNKj4b963voxs",
    decimals: 8,
    logoURI: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/7vfCXTUXx5WJV5JADk17DUJ4ksgau7utNKj4b963voxs/logo.png",
    price: 3578.92,
    change24h: 1.8,
    volume24h: 18000000000,
    marketCap: 430000000000
  },
  {
    symbol: "JUP",
    name: "Jupiter",
    address: "JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN",
    decimals: 6,
    logoURI: "https://static.jup.ag/jup/icon.png",
    price: 0.35472,
    change24h: 1.1,
    volume24h: 124000000,
    marketCap: 472000000
  },
  {
    symbol: "RAY",
    name: "Raydium",
    address: "4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R",
    decimals: 6,
    logoURI: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R/logo.png",
    price: 1.87,
    change24h: 3.4,
    volume24h: 67000000,
    marketCap: 543000000
  },
  {
    symbol: "BONK",
    name: "Bonk",
    address: "DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263",
    decimals: 5,
    logoURI: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263/logo.png",
    price: 0.00001234,
    change24h: -2.1,
    volume24h: 89000000,
    marketCap: 798000000
  },
  {
    symbol: "WIF",
    name: "dogwifhat",
    address: "EKpQGSJtjMFqKZ9KQanSqYXRcF8fBopzLHYxdM65zcjm",
    decimals: 6,
    logoURI: "https://bafkreibk3covs5ltyqxa272uodhculbr6kea6betidfwy3ajsav2vjzyum.ipfs.nftstorage.link",
    price: 1.52,
    change24h: 5.2,
    volume24h: 312000000,
    marketCap: 1520000000
  },
  {
    symbol: "JTO",
    name: "Jito",
    address: "jtojtomepa8beP8AuQc6eXt5FriJwfFMwQx2v2f9mCL",
    decimals: 9,
    logoURI: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/jtojtomepa8beP8AuQc6eXt5FriJwfFMwQx2v2f9mCL/logo.png",
    price: 2.34,
    change24h: -1.3,
    volume24h: 43000000,
    marketCap: 289000000
  },
  {
    symbol: "PYTH",
    name: "Pyth Network",
    address: "HZ1JovNiVvGrGNiiYvEozEVgZ58xaU3RKwX8eACQBCt3",
    decimals: 6,
    logoURI: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/HZ1JovNiVvGrGNiiYvEozEVgZ58xaU3RKwX8eACQBCt3/logo.png",
    price: 0.31,
    change24h: 2.7,
    volume24h: 89000000,
    marketCap: 1230000000
  },
  {
    symbol: "ORCA",
    name: "Orca",
    address: "orcaEKTdK7LKz57vaAYr9QeNsVEPfiu6QeMU1kektZE",
    decimals: 6,
    logoURI: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/orcaEKTdK7LKz57vaAYr9QeNsVEPfiu6QeMU1kektZE/logo.png",
    price: 3.12,
    change24h: 1.9,
    volume24h: 23000000,
    marketCap: 312000000
  },
  {
    symbol: "MATIC",
    name: "Polygon",
    address: "C7NNPWuZCNjZBfW5p6JvGsR8pUdsRpEdP1ZAhnoDwj7h",
    decimals: 8,
    logoURI: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/C7NNPWuZCNjZBfW5p6JvGsR8pUdsRpEdP1ZAhnoDwj7h/logo.png",
    price: 0.63,
    change24h: 0.8,
    volume24h: 156000000,
    marketCap: 5800000000
  },
  {
    symbol: "AVAX",
    name: "Avalanche",
    address: "KgV1GvrHQmRBY8sHQQeUKwTm2r2h8t4C8qt12Cw1HVE",
    decimals: 8,
    logoURI: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/KgV1GvrHQmRBY8sHQQeUKwTm2r2h8t4C8qt12Cw1HVE/logo.png",
    price: 21.34,
    change24h: 3.2,
    volume24h: 234000000,
    marketCap: 8900000000
  },
  {
    symbol: "LINK",
    name: "Chainlink",
    address: "2wpTofQ8SkACrkZWrZDjXPitYa8AwWgX8AfxdeBRRVLX",
    decimals: 8,
    logoURI: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/2wpTofQ8SkACrkZWrZDjXPitYa8AwWgX8AfxdeBRRVLX/logo.png",
    price: 14.23,
    change24h: -0.6,
    volume24h: 432000000,
    marketCap: 8400000000
  },
  {
    symbol: "UNI",
    name: "Uniswap",
    address: "8FU95xFJhUUkyyCLU13HSzDLs7oC4QZdXQHL6SCeab36",
    decimals: 8,
    logoURI: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/8FU95xFJhUUkyyCLU13HSzDLs7oC4QZdXQHL6SCeab36/logo.png",
    price: 5.67,
    change24h: 2.1,
    volume24h: 189000000,
    marketCap: 4300000000
  },
  {
    symbol: "SHIB",
    name: "Shiba Inu",
    address: "CiKu4eHsVrc1eueVQeHn7qhXTcVu95gSQmBpX4utjL9z",
    decimals: 8,
    logoURI: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/CiKu4eHsVrc1eueVQeHn7qhXTcVu95gSQmBpX4utjL9z/logo.png",
    price: 0.000009876,
    change24h: -1.8,
    volume24h: 267000000,
    marketCap: 5800000000
  },
  {
    symbol: "DOGE",
    name: "Dogecoin",
    address: "DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263",
    decimals: 8,
    logoURI: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263/logo.png",
    price: 0.078,
    change24h: 1.2,
    volume24h: 543000000,
    marketCap: 11200000000
  },
  {
    symbol: "RENDER",
    name: "Render Token",
    address: "rndrizKT3MK1iimdxRdWabcF7Zg7AR5T4nud4EkHBof",
    decimals: 8,
    logoURI: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/rndrizKT3MK1iimdxRdWabcF7Zg7AR5T4nud4EkHBof/logo.png",
    price: 5.23,
    change24h: 4.5,
    volume24h: 123000000,
    marketCap: 1980000000
  },
  {
    symbol: "HBAR",
    name: "Hedera",
    address: "HBARxqV4GpDh6u8kXFNzwcikF9m1vx3EDNGr62yNUC5Q",
    decimals: 8,
    logoURI: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/HBARxqV4GpDh6u8kXFNzwcikF9m1vx3EDNGr62yNUC5Q/logo.png",
    price: 0.062,
    change24h: -0.9,
    volume24h: 78000000,
    marketCap: 2300000000
  }
];
