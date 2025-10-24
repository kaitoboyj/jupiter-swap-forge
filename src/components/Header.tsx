import { useState } from "react";
import { Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useAccount, useDisconnect } from "wagmi";
import { ChainSelector } from "./ChainSelector";
import { ChainType } from "@/types/chain";

interface HeaderProps {
  selectedChain: ChainType;
  onChainSelect: (chain: ChainType) => void;
}

export const Header = ({ selectedChain, onChainSelect }: HeaderProps) => {
  const [isChainSelectorOpen, setIsChainSelectorOpen] = useState(false);
  const { connected: solanaConnected } = useWallet();
  const { isConnected: evmConnected } = useAccount();
  const { open } = useWeb3Modal();
  const { disconnect } = useDisconnect();

  const handleConnect = () => {
    if (!selectedChain) {
      setIsChainSelectorOpen(true);
      return;
    }

    if (selectedChain === 'solana') {
      // Solana connection handled by WalletMultiButton
      return;
    } else {
      // EVM chains (Ethereum, BSC)
      open();
    }
  };

  const handleDisconnect = () => {
    if (selectedChain !== 'solana') {
      disconnect();
    }
  };

  const isConnected = selectedChain === 'solana' ? solanaConnected : evmConnected;

  return (
    <>
      <header className="w-full border-b border-border bg-background/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                SwapDEX
              </div>
            </div>
            {selectedChain === 'solana' ? (
              <WalletMultiButton className="!bg-primary hover:!bg-primary/90 !text-primary-foreground !font-semibold !px-6 !rounded-lg" />
            ) : (
              <Button
                onClick={isConnected ? handleDisconnect : handleConnect}
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-6"
              >
                <Wallet className="mr-2 h-4 w-4" />
                {isConnected ? 'Disconnect' : 'Connect Wallet'}
              </Button>
            )}
          </div>
        </div>
      </header>

      <ChainSelector
        open={isChainSelectorOpen}
        onOpenChange={setIsChainSelectorOpen}
        onSelectChain={onChainSelect}
      />
    </>
  );
};
