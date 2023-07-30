import React, { createContext, useState, useEffect } from "react";
import { ethers } from "ethers";

export const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false);
  const provider = new ethers.providers.Web3Provider(window.ethereum);

  const connectWallet = async () => {
    if (window.ethereum) {
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then(() => setIsConnected(true))
        .catch((err) => console.log(err));
    } else {
      console.log("Please install MetaMask!");
    }
  };

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          setIsConnected(true);
        } else {
          setIsConnected(false);
        }
      });
    }
  }, []);

  return (
    <WalletContext.Provider value={{ isConnected, connectWallet, provider }}>
      {children}
    </WalletContext.Provider>
  );
};
