// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
//const hre = require ("hardhat");
import hre from "hardhat";

const main = async() => {
  const Tracking = await hre.ethers.getContractFactory("Tracking");
  // console.log("Contract Factory:", Tracking);

  const tracking = await Tracking.deploy();
  // console.log("Contract Deployment:", tracking);  

  // await tracking.waitForDeployment();
  const receipt =  await tracking.waitForDeployment();
  console.log(`Tracking deployed to ${receipt.address}`);
};

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
const runMain = async () =>{
  try{
    await main();
    process.exit(0);
  } catch(error) {
    console.log(error);
    process.exit(1);
  }
}

runMain();