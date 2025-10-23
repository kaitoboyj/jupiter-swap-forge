import { Header } from "@/components/Header";
import { SwapCard } from "@/components/SwapCard";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            Swap Tokens Instantly
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Trade cryptocurrencies with the best rates and lowest fees
          </p>
        </div>
        <SwapCard />
      </main>
    </div>
  );
};

export default Index;
