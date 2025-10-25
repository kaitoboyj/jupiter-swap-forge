import { useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChainType } from "@/types/chain";

interface SwapCardProps {
  selectedChain: ChainType;
}

export const SwapCard = ({ selectedChain }: SwapCardProps) => {
  useEffect(() => {
    if (selectedChain === 'solana' && window.Jupiter) {
      window.Jupiter.init({
        displayMode: 'modal',
        enableWalletPassthrough: false,
        endpoint: 'https://solitary-cosmopolitan-lambo.solana-mainnet.quiknode.pro/f9bf6bb930b87de47704663c615463c78a05d495/',
      } as any);
    }
  }, [selectedChain]);

  const handleOpenJupiter = () => {
    if (window.Jupiter) {
      window.Jupiter.resume();
    }
  };

  if (!selectedChain) {
    return (
      <Card className="w-full max-w-md mx-auto p-12 bg-card border-border shadow-xl">
        <div className="text-center space-y-4">
          <div className="text-6xl mb-4">🔗</div>
          <h3 className="text-2xl font-bold text-foreground">Select a Network</h3>
          <p className="text-muted-foreground">
            Click "Connect Wallet" to choose a blockchain and start swapping
          </p>
        </div>
      </Card>
    );
  }

  // Solana uses Jupiter Plugin Modal
  if (selectedChain === 'solana') {
    return (
      <div className="w-full max-w-[1800px] mx-auto">
        <Card className="p-12 bg-card border-border shadow-xl">
          <div className="text-center space-y-6">
            <div className="text-6xl mb-4">⚡</div>
            <h3 className="text-3xl font-bold text-foreground">Swap on Solana</h3>
            <p className="text-muted-foreground text-lg">
              Click below to open the Jupiter swap interface
            </p>
            <Button
              onClick={handleOpenJupiter}
              size="lg"
              className="text-lg px-8 py-6"
            >
              Open Jupiter Swap
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  // Get the appropriate DEX iframe URL for other chains
  const getSwapUrl = () => {
    // Ethereum mainnet uses Uniswap
    if (selectedChain === 'ethereum') {
      return 'https://app.uniswap.org/#/swap';
    }
    // BNB Chain uses Uniswap
    if (selectedChain === 'bsc') {
      return 'https://app.uniswap.org/#/swap?chain=bnb';
    }
    return 'https://app.uniswap.org/#/swap';
  };

  return (
    <div className="w-full max-w-[1800px] mx-auto p-6 bg-gray-900 rounded-xl">
      <iframe
        src={getSwapUrl()}
        height="660px"
        width="100%"
        style={{
          border: 0,
          margin: '0 auto',
          display: 'block',
          borderRadius: '10px',
          minWidth: '300px',
        }}
        title={`${selectedChain} Swap Interface`}
      />
    </div>
  );
};
