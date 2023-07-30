const hre = require("hardhat");

async function main() {
  const DuckBilledMemeToken = await hre.ethers.getContractFactory(
    "DuckBilledMemeToken"
  );
  const duckBilledMemeToken = await DuckBilledMemeToken.deploy();

  console.log(duckBilledMemeToken);

  await duckBilledMemeToken.deployed();

  console.log("DuckBilledMemeToken deployed to:", duckBilledMemeToken.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
