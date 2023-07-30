import { ethers } from "ethers";
import React, { useState, useContext, useEffect } from "react";
import { contractAddress, contractABI } from "../contract";
import { WalletContext } from "../contexts/WalletContext";

const Stats = () => {
  const { isConnected, connectWallet, provider } = useContext(WalletContext);

  const connectToWallet = () => {
    connectWallet();
  };

  const [tokenQuantityToBuy, setTokenQuantityToBuy] = useState(0);
  const [tokenQuantityToBurn, setTokenQuantityToBurn] = useState(0);
  const [tokenBalance, setTokenBalance] = useState(0);

  const buyTokens = async () => {
    if (!isConnected) {
      alert("Please connect your wallet first!");
      return;
    }

    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractABI, signer);

    try {
      const tokenQuantityWei = ethers.utils.parseUnits(
        tokenQuantityToBuy.toString(),
        18
      ); // convert token quantity to WEI
      const totalCost = tokenQuantityWei
        .mul(201614)
        .div(ethers.utils.parseUnits("1", 18)); // multiply by 201614 and divide by 10^18

      const tx = await contract.buyTokens(tokenQuantityWei, {
        value: totalCost,
      }); // specify ETH amount to send along with transaction
      await tx.wait();
      alert("Transaction successful!");

      fetchTokenBalance(); // fetch balance after buying tokens
    } catch (error) {
      console.error("An error occurred", error);
    }
  };

  const burnTokens = async () => {
    if (!isConnected) {
      alert("Please connect your wallet first!");
      return;
    }

    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractABI, signer);

    try {
      const tx = await contract.burnTokens(tokenQuantityToBurn);
      await tx.wait();
      alert("Transaction successful!");

      fetchTokenBalance(); // fetch balance after burning tokens
    } catch (error) {
      console.error("An error occurred", error);
    }
  };

  const handleBuyInputChange = (event) => {
    setTokenQuantityToBuy(event.target.value);
  };

  const handleBurnInputChange = (event) => {
    setTokenQuantityToBurn(event.target.value);
  };

  const fetchTokenBalance = useCallback(async () => {
    if (!isConnected) {
      alert("Please connect your wallet first!");
      return;
    }

    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractABI, signer);

    try {
      const address = await signer.getAddress();
      const balance = await contract.getBalanceOfAddress(address);
      setTokenBalance(parseFloat(ethers.utils.formatEther(balance)).toFixed(4));
    } catch (error) {
      console.error("An error occurred", error);
    }
  }, [isConnected, provider]);

  useEffect(() => {
    if (isConnected) {
      fetchTokenBalance();
    }
  }, [isConnected, fetchTokenBalance]);

  return (
    <div className="statsBox">
      <h2 className="flex justify-center">$DBT</h2>
      <br />
      <h1 className="text-m">
        -This contract is currently in BETA and is deployed to the SEPOLIA
        TESTNET ONLY-
      </h1>
      <br />
      <br />
      <p className="aboutStats flex justify-center">
        Fixed Price until the LP is established: 0.0006180 $USD
      </p>

      <div className="flex justify-center items-center pt-8 space-x-4 flex-col">
        <div className="buyTokensSection">
          <input
            type="number"
            value={tokenQuantityToBuy}
            onChange={handleBuyInputChange}
            placeholder="Quantity of DuckBilled Meme Tokens"
            className="px-4 py-2.5 bg-blue-600 font-medium text-sm leading-tight uppercase rounded-full shadow-md shadow-gray-400 hover:bg-blue-700 hover:shadow-lg focus:outline-none active:bg-blue-800 dark:shadow-transparent transition duration-150 ease-in-out dark:text-blue-500 dark:border dark:border-blue-500 dark:bg-transparent text-white"
          />

          <button
            onClick={buyTokens}
            className="mt-2 mx-auto px-4 py-2.5 bg-blue-600 font-medium text-sm leading-tight uppercase rounded-full shadow-md shadow-gray-400 hover:bg-blue-700 hover:shadow-lg focus:outline-none active:bg-blue-800 dark:shadow-transparent transition duration-150 ease-in-out dark:text-blue-500 dark:border dark:border-blue-500 dark:bg-transparent text-white"
          >
            Buy Tokens
          </button>
        </div>

        <div className="burnTokensSection mt-4">
          <input
            type="number"
            value={tokenQuantityToBurn}
            onChange={handleBurnInputChange}
            placeholder="Quantity to Burn"
            className="px-4 py-2.5 bg-blue-600 font-medium text-sm leading-tight uppercase rounded-full shadow-md shadow-gray-400 hover:bg-blue-700 hover:shadow-lg focus:outline-none active:bg-blue-800 dark:shadow-transparent transition duration-150 ease-in-out dark:text-blue-500 dark:border dark:border-blue-500 dark:bg-transparent text-white"
          />

          <button
            onClick={burnTokens}
            className="mt-2 mx-auto px-4 py-2.5 bg-blue-600 font-medium text-sm leading-tight uppercase rounded-full shadow-md shadow-gray-400 hover:bg-blue-700 hover:shadow-lg focus:outline-none active:bg-blue-800 dark:shadow-transparent transition duration-150 ease-in-out dark:text-blue-500 dark:border dark:border-blue-500 dark:bg-transparent text-white"
          >
            Burn Tokens
          </button>

          <div className="flex justify-center items-center px-4 py-5 ">
            <button
              onClick={connectToWallet}
              className="px-4 py-2.5 bg-blue-600 font-medium
              text-sm leading-tight uppercase rounded-full
              shadow-md shadow-gray-400 hover:bg-blue-700
              hover:shadow-lg focus:outline-none
              active:bg-blue-800 dark:shadow-transparent
              transition duration-150 ease-in-out dark:text-blue-500
              dark:border dark:border-blue-500 dark:bg-transparent
              text-white"
            >
              {isConnected ? "Connected" : "Connect Wallet"}
            </button>
          </div>
        </div>
      </div>

      <p
        className="blockRewardsBox flex justify-center pt-64"
        style={{ color: "neon green" }}
      >
        Wallet Balance: {tokenBalance} $DBT
      </p>
    </div>
  );
};

export default Stats;
