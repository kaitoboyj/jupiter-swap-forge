import { useState, useEffect } from "react";
import { ArrowDownUp, Settings, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { TokenSelector } from "./TokenSelector";
import { ChainSelector } from "./ChainSelector";
import { tokens as mockTokens, Token } from "@/data/tokens";
import { useSolanaTokens, SolanaToken } from "@/hooks/useSolanaTokens";
import { useToast } from "@/hooks/use-toast";
import { ChainType } from "@/types/chain";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";

interface SwapCardProps {
  selectedChain: ChainType;
  onChainSelect?: (chain: ChainType) => void;
}

export const SwapCard = ({ selectedChain, onChainSelect }: SwapCardProps) => {
  const { toast } = useToast();
  const { tokens: solanaTokens, loading: loadingSolana } = useSolanaTokens();
  const [fromToken, setFromToken] = useState<Token | SolanaToken | null>(null);
  const [toToken, setToToken] = useState<Token | SolanaToken | null>(null);
  const [fromAmount, setFromAmount] = useState<string>("");
  const [toAmount, setToAmount] = useState<string>("");
  const [slippage, setSlippage] = useState<string>("0.5");
  const [isFromSelectorOpen, setIsFromSelectorOpen] = useState(false);
  const [isToSelectorOpen, setIsToSelectorOpen] = useState(false);
  const [showChainSelector, setShowChainSelector] = useState(false);

  const availableTokens = selectedChain === 'solana' ? solanaTokens : mockTokens;

  useEffect(() => {
    if (availableTokens.length > 0 && !fromToken) {
      setFromToken(availableTokens[0]);
      setToToken(availableTokens[1] || availableTokens[0]);
    }
  }, [availableTokens, fromToken]);

  useEffect(() => {
    if (fromToken && toToken && fromAmount) {
      const from = parseFloat(fromAmount);
      if (!isNaN(from)) {
        const rate = fromToken.price / toToken.price;
        const result = from * rate;
        setToAmount(result.toFixed(6));
      }
    } else {
      setToAmount("");
    }
  }, [fromAmount, fromToken, toToken]);

  const handleSwapTokens = () => {
    const tempToken = fromToken;
    setFromToken(toToken);
    setToToken(tempToken);
    setFromAmount(toAmount);
  };

  const handleSwap = () => {
    if (!selectedChain) {
      setShowChainSelector(true);
      return;
    }

    if (!fromToken || !toToken || !fromAmount) {
      toast({
        title: "Invalid Swap",
        description: "Please enter an amount and select tokens",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Swap Initiated",
      description: `Swapping ${fromAmount} ${fromToken.symbol} for ${toAmount} ${toToken.symbol}`,
    });
  };

  const exchangeRate =
    fromToken && toToken ? (fromToken.price / toToken.price).toFixed(6) : "0";

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

  return (
    <Card className="w-full max-w-md mx-auto p-6 bg-card border-border shadow-xl">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-foreground">Swap</h2>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
              <Settings className="h-5 w-5" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 bg-popover border-border z-50">
            <div className="space-y-4">
              <h3 className="font-semibold text-foreground">Settings</h3>
              <div className="space-y-2">
                <Label htmlFor="slippage" className="text-foreground">
                  Slippage Tolerance (%)
                </Label>
                <Input
                  id="slippage"
                  type="number"
                  value={slippage}
                  onChange={(e) => setSlippage(e.target.value)}
                  className="bg-input border-border text-foreground"
                  placeholder="0.5"
                />
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      {/* From Token */}
      <div className="space-y-2 mb-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">You pay</span>
          {fromToken && (
            <span className="text-muted-foreground">
              Balance: 0.00 {fromToken.symbol}
            </span>
          )}
        </div>
        <div className="bg-secondary rounded-xl p-4">
          <div className="flex items-center justify-between">
            <Input
              type="number"
              value={fromAmount}
              onChange={(e) => setFromAmount(e.target.value)}
              placeholder="0.00"
              className="text-2xl font-semibold bg-transparent border-none p-0 h-auto text-foreground focus-visible:ring-0"
            />
            <Button
              variant="ghost"
              onClick={() => setIsFromSelectorOpen(true)}
              className="flex items-center gap-2 bg-muted hover:bg-muted/80 px-4 py-2 rounded-lg"
            >
              {fromToken ? (
                <>
                  <img
                    src={fromToken.logoURI}
                    alt={fromToken.symbol}
                    className="w-6 h-6 rounded-full"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = `https://ui-avatars.com/api/?name=${fromToken.symbol}&background=random`;
                    }}
                  />
                  <span className="font-semibold text-foreground">{fromToken.symbol}</span>
                </>
              ) : (
                <span className="text-foreground">Select token</span>
              )}
            </Button>
          </div>
          {fromToken && fromAmount && (
            <div className="text-sm text-muted-foreground mt-2">
              ≈ ${(parseFloat(fromAmount) * fromToken.price).toLocaleString()}
            </div>
          )}
        </div>
      </div>

      {/* Swap Button */}
      <div className="flex justify-center -my-2 relative z-10">
        <Button
          variant="ghost"
          size="icon"
          onClick={handleSwapTokens}
          className="rounded-full bg-secondary hover:bg-secondary/80 border-4 border-card"
        >
          <ArrowDownUp className="h-4 w-4 text-foreground" />
        </Button>
      </div>

      {/* To Token */}
      <div className="space-y-2 mt-2 mb-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">You receive</span>
          {toToken && (
            <span className="text-muted-foreground">
              Balance: 0.00 {toToken.symbol}
            </span>
          )}
        </div>
        <div className="bg-secondary rounded-xl p-4">
          <div className="flex items-center justify-between">
            <Input
              type="number"
              value={toAmount}
              readOnly
              placeholder="0.00"
              className="text-2xl font-semibold bg-transparent border-none p-0 h-auto text-foreground focus-visible:ring-0"
            />
            <Button
              variant="ghost"
              onClick={() => setIsToSelectorOpen(true)}
              className="flex items-center gap-2 bg-muted hover:bg-muted/80 px-4 py-2 rounded-lg"
            >
              {toToken ? (
                <>
                  <img
                    src={toToken.logoURI}
                    alt={toToken.symbol}
                    className="w-6 h-6 rounded-full"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = `https://ui-avatars.com/api/?name=${toToken.symbol}&background=random`;
                    }}
                  />
                  <span className="font-semibold text-foreground">{toToken.symbol}</span>
                </>
              ) : (
                <span className="text-foreground">Select token</span>
              )}
            </Button>
          </div>
          {toToken && toAmount && (
            <div className="text-sm text-muted-foreground mt-2">
              ≈ ${(parseFloat(toAmount) * toToken.price).toLocaleString()}
            </div>
          )}
        </div>
      </div>

      {/* Exchange Rate */}
      {fromToken && toToken && (
        <div className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg mb-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center gap-2 text-sm text-muted-foreground cursor-help">
                  <Info className="h-4 w-4" />
                  <span>Rate</span>
                </div>
              </TooltipTrigger>
              <TooltipContent className="bg-popover border-border z-50">
                <p>Current exchange rate between tokens</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <span className="text-sm font-medium text-foreground">
            1 {fromToken.symbol} = {exchangeRate} {toToken.symbol}
          </span>
        </div>
      )}

      {/* Swap Button */}
      <Button
        onClick={handleSwap}
        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-6 text-lg rounded-xl shadow-lg transition-all hover:shadow-primary/50"
        disabled={!fromAmount || !fromToken || !toToken}
      >
        {!selectedChain ? "Select Network to Swap" : "Swap"}
      </Button>

      {/* Token Selectors */}
      <TokenSelector
        tokens={availableTokens}
        selectedToken={fromToken}
        onSelectToken={setFromToken}
        open={isFromSelectorOpen}
        onOpenChange={setIsFromSelectorOpen}
      />
      <TokenSelector
        tokens={availableTokens}
        selectedToken={toToken}
        onSelectToken={setToToken}
        open={isToSelectorOpen}
        onOpenChange={setIsToSelectorOpen}
      />

      {/* Chain Selector */}
      {onChainSelect && (
        <ChainSelector
          open={showChainSelector}
          onOpenChange={setShowChainSelector}
          onSelectChain={onChainSelect}
        />
      )}
    </Card>
  );
};
