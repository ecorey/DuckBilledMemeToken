require("@nomiclabs/hardhat-waffle");
require("dotenv").config();

require("@nomiclabs/hardhat-etherscan");

const INFURA_PROJECT_ID = process.env.INFURA_PROJECT_ID;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

if (!INFURA_PROJECT_ID || !PRIVATE_KEY) {
  throw new Error("Please set your environment variables in .env file");
}

module.exports = {
  solidity: "0.8.17",
  networks: {
    sepolia: {
      url: `https://sepolia.infura.io/v3/${INFURA_PROJECT_ID}`,
      accounts: [PRIVATE_KEY],
    },
  },
  etherscan: {
    apiKey: "CXXDYMGRHH96PCSFW4BE8NXFKGYJ74NW6U",
  },
};
