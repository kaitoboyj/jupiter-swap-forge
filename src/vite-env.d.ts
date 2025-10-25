/// <reference types="vite/client" />

interface Window {
  Jupiter: {
    init: (config: { 
      displayMode: string; 
      enableWalletPassthrough: boolean;
      endpoint?: string;
    }) => void;
    resume: () => void;
  };
}
