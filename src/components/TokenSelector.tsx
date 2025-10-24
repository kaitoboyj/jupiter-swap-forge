import { useState } from "react";
import { Check, Search, X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Token } from "@/data/tokens";
import { SolanaToken } from "@/hooks/useSolanaTokens";
import { cn } from "@/lib/utils";

interface TokenSelectorProps {
  tokens: Token[] | SolanaToken[];
  selectedToken: Token | SolanaToken | null;
  onSelectToken: (token: Token | SolanaToken) => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const TokenSelector = ({
  tokens,
  selectedToken,
  onSelectToken,
  open,
  onOpenChange,
}: TokenSelectorProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTokens = tokens.filter(
    (token) =>
      token.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
      token.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelect = (token: Token | SolanaToken) => {
    onSelectToken(token);
    onOpenChange(false);
    setSearchQuery("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-foreground">Select a token</DialogTitle>
        </DialogHeader>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name or symbol"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-input border-border text-foreground"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
            >
              <X className="h-4 w-4 text-muted-foreground hover:text-foreground" />
            </button>
          )}
        </div>
        <ScrollArea className="h-[400px] mt-4">
          <div className="space-y-1">
            {filteredTokens.map((token) => (
              <button
                key={token.address}
                onClick={() => handleSelect(token)}
                className={cn(
                  "w-full flex items-center justify-between p-3 rounded-lg transition-all hover:bg-secondary/50",
                  selectedToken?.address === token.address && "bg-secondary"
                )}
              >
                <div className="flex items-center gap-3">
                  <img
                    src={token.logoURI}
                    alt={token.symbol}
                    className="w-8 h-8 rounded-full"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = `https://ui-avatars.com/api/?name=${token.symbol}&background=random`;
                    }}
                  />
                  <div className="text-left">
                    <div className="font-semibold text-foreground">{token.symbol}</div>
                    <div className="text-sm text-muted-foreground">{token.name}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium text-foreground">
                    ${token.price.toLocaleString()}
                  </div>
                  <div
                    className={cn(
                      "text-sm font-medium",
                      token.change24h >= 0 ? "text-primary" : "text-destructive"
                    )}
                  >
                    {token.change24h >= 0 ? "+" : ""}
                    {token.change24h.toFixed(2)}%
                  </div>
                </div>
                {selectedToken?.address === token.address && (
                  <Check className="h-5 w-5 text-primary" />
                )}
              </button>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
