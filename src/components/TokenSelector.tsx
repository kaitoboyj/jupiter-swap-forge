import { useState } from "react";
import { Check, Search, X, TrendingUp } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
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
  const [activeCategory, setActiveCategory] = useState("popular");

  // Extract unique categories
  const categories = ["popular", "all", "defi", "meme", "stablecoins", "nft", "infrastructure"];

  // Check if search query is a contract address (base58, typically 32-44 chars)
  const isContractAddress = searchQuery.length > 30 && /^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(searchQuery);

  const filteredTokens = tokens.filter((token) => {
    // First apply search filter
    const matchesSearch = 
      token.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
      token.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      token.address.toLowerCase() === searchQuery.toLowerCase();

    if (!matchesSearch) return false;

    // Then apply category filter
    if (activeCategory === "popular") {
      return (token as SolanaToken).isPopular === true;
    } else if (activeCategory === "all") {
      return true;
    } else {
      const tokenCategory = (token as SolanaToken).category?.toLowerCase() || 
                           (token as SolanaToken).tags?.[0]?.toLowerCase() || '';
      return tokenCategory.includes(activeCategory);
    }
  });

  // Show top 20 popular tokens if no search and on popular tab
  const displayTokens = activeCategory === "popular" && !searchQuery
    ? filteredTokens.slice(0, 20)
    : filteredTokens;

  const handleSelect = (token: Token | SolanaToken) => {
    onSelectToken(token);
    onOpenChange(false);
    setSearchQuery("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-foreground flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Select a token
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, symbol, or contract address"
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
            {isContractAddress && (
              <div className="absolute right-10 top-1/2 transform -translate-y-1/2">
                <Badge variant="secondary" className="text-xs">Contract Address</Badge>
              </div>
            )}
          </div>

          {/* Category Tabs */}
          <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full">
            <TabsList className="grid grid-cols-7 w-full bg-secondary/50">
              <TabsTrigger value="popular" className="text-xs">Popular</TabsTrigger>
              <TabsTrigger value="all" className="text-xs">All</TabsTrigger>
              <TabsTrigger value="defi" className="text-xs">DeFi</TabsTrigger>
              <TabsTrigger value="meme" className="text-xs">Meme</TabsTrigger>
              <TabsTrigger value="stablecoins" className="text-xs">Stable</TabsTrigger>
              <TabsTrigger value="nft" className="text-xs">NFT</TabsTrigger>
              <TabsTrigger value="infrastructure" className="text-xs">Infra</TabsTrigger>
            </TabsList>

            <TabsContent value={activeCategory} className="mt-0">
              <ScrollArea className="h-[450px] mt-4">
                {displayTokens.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    <Search className="h-12 w-12 mx-auto mb-3 opacity-50" />
                    <p>No tokens found</p>
                    {isContractAddress && (
                      <p className="text-sm mt-2">Searching by contract address...</p>
                    )}
                  </div>
                ) : (
                  <div className="space-y-1 pr-4">
                    {displayTokens.map((token, index) => (
                      <button
                        key={token.address}
                        onClick={() => handleSelect(token)}
                        className={cn(
                          "w-full flex items-center justify-between p-3 rounded-lg transition-all hover:bg-secondary/50",
                          selectedToken?.address === token.address && "bg-secondary ring-2 ring-primary/50"
                        )}
                      >
                        <div className="flex items-center gap-3 flex-1">
                          <div className="relative">
                            <img
                              src={token.logoURI}
                              alt={token.symbol}
                              className="w-10 h-10 rounded-full"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = `https://ui-avatars.com/api/?name=${token.symbol}&background=random`;
                              }}
                            />
                            {(token as SolanaToken).isPopular && (
                              <div className="absolute -top-1 -right-1 bg-primary rounded-full p-0.5">
                                <TrendingUp className="h-3 w-3 text-primary-foreground" />
                              </div>
                            )}
                          </div>
                          <div className="text-left">
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-foreground">{token.symbol}</span>
                              {(token as SolanaToken).tags && (token as SolanaToken).tags!.length > 0 && (
                                <Badge variant="outline" className="text-xs">
                                  {(token as SolanaToken).tags![0]}
                                </Badge>
                              )}
                            </div>
                            <div className="text-sm text-muted-foreground">{token.name}</div>
                          </div>
                        </div>
                        <div className="text-right flex items-center gap-3">
                          <div>
                            <div className="font-medium text-foreground">
                              ${token.price < 0.01 ? token.price.toFixed(6) : token.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
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
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
};
