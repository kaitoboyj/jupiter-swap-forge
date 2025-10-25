/// <reference types="vite/client" />

interface Window {
  Jupiter: {
    init: (config: { displayMode: string; enableWalletPassthrough: boolean }) => void;
    resume: () => void;
  };
}
