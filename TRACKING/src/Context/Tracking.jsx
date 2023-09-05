import React, { useState, useEffect } from "react";
import Web3Model from "web3modal";
import { ethers } from "ethers";

// INTERNAL IMPORTS
// this file generated when we run the hardhat it generate in the artifacts folder
import tracking from "./Tracking.json";
// this contract address will get from the when we run the hardhat it generate full information
const ContractAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3";

const ContractABI = tracking.abi;

// ----- FETCHING THE SMART CONTRACT

// in this way we get the data that is interaction of user with contract
const fetchContract = (signerOrProvider) => {
  new ethers.Contract(ContractAddress, ContractABI, signerOrProvider);
};

export const TrackingContext = React.createContext();

export const TrackingProvider = ({ children }) => {
  // state variable
  const DappName = "Product Tracking Dapp";
  const [currentUser, setCurrentUser] = useState("");

  const createShipment = async (items) => {
    console.log(items);
    const { receiver, pickupTime, distance, price } = items;

    try {
      const web3Modal = new Web3Model();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = fetchContract(signer);
      const cretaItem = await contract.createContext(
        receiver,
        new Date(pickupTime).getTime(),
        distance,
        ethers.utils.parseUnits(price, 18),
        {
          value: ethers.utils.parseUnits(price, 18),
        }
      );
      await cretaItem.wait();
      console.log(cretaItem);
    } catch (error) {
      console.log("Some went Wrong", error);
    }
  };

  const getAllShipment = async () => {
    try {
      const provider = new ethers.providers.JsonRpcProvider();
      const contract = fetchContract(provider);

      const shipments = await contract.getAllTransaction();
      const allShipments = shipments.map((shipment) => ({
        sender: shipment.sender,
        receiver: shipment.receiver,
        price: ethers.utils.formatEther(shipment.price.toString()),
        pickupTime: shipment.pickupTime.toNumber(),
        deliveryTime: shipment.deliveryTime.toNumber(),
        distance: shipment.distance.toNumber(),
        isPaid: shipment.isPaid,
        status: shipment.status,
      }));

      return allShipments;
    } catch (error) {
      console.log("error went, getting shipment");
    }
  };

  const getShipmentsCount = async () => {
    try {
      if (!window.ethereum) return "Please Install MetaMask";

      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });

      const provider = new ethers.providers.JsonRpcProvider();
      const contract = fetchContract(provider);
      const shipmentsCount = await contract.getShipmentsCount(accounts[0]);
      return shipmentsCount.toNumber();
    } catch (error) {
      console.log("error went, getting shipment");
    }
  };

  const completeShipment = async (completeShip) => {
    console.log(completeShip);

    const { receiver, index } = completeShip;

    try {
      if (!window.ethereum) return "Please Install MetaMask";

      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      const web3Modal = new web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = fetchContract(signer);

      const transaction = await contract.completeShipment(
        accounts[0],
        receiver,
        index,
        {
          gasLimit: 3000000,
        }
      );

      transaction.wait();
      console.log(transaction);
    } catch (error) {
      console.log("Wrong Complete shipment");
    }
  };

  const getShipment = async (index) => {
    console.log(index * 1);

    try {
      if (!window.ethereum) return "Please Install MetaMask";

      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });

      const provider = new ethers.providers.JsonRpcProvider();
      const contract = fetchContract(provider);
      const shipment = await contract.getShipment(accounts[0], index * 1);

      const SingleShipment = {
        sender: shipment[0],
        receiver: shipment[1],
        pickupTime: shipment[2].toNumber(),
        deliveryTime: shipment[3].toNumber(),
        distance: shipment[4].toNumber(),
        price: shipment[5].formatEther(shipment[5].toString()),
        status: shipment[6],
        isPaid: shipment[7],
      };

      return SingleShipment;
    } catch (error) {
      console.log("Sorry no Shipment");
    }
  };

  const startShipment = async (getProduct) => {
    // distructuring
    const { receiver, index } = getProduct;

    try {
      if (!window.ethereum) return "Please Install MetaMask";

      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });

      const web3Modal = new Web3Model();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = fetchContract(signer);
      const shipment = await contract.startShipment(
        accounts[0],
        receiver,
        index * 1
      );

      shipment.wait();
      console.log(shipment);
    } catch (error) {
      console.log("Sorry no Shipment", error);
    }
  };

  // ---CHECK WALLET CONNECTION
  const checkIfWalletConnected = async () => {
    try {
      if (!window.ethereum) return "Please Install MetaMask";

      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });

      if (accounts.length) {
        setCurrentUser(accounts[0]);
      } else {
        return "No account";
      }
    } catch (error) {
      return "Not Connected";
    }
  };

  // ---CONNECT WALLET FUNCTION
  const connectWallet = async () => {
    try {
      if (!window.ethereum) return "Please Install MetaMask";

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      setCurrentUser(accounts[0]);
    } catch (error) {
      return "Something went wrong";
    }
  };

  // check every time when the user check the site
  useEffect(() => {
    checkIfWalletConnected();
  }, []);

  return (
    <TrackingContext.Provider
      value={{
        connectWallet,
        createShipment,
        getAllShipment,
        completeShipment,
        getShipment,
        startShipment,
        getShipmentsCount,
        DappName,
        currentUser,
      }}
    >
      {children}
    </TrackingContext.Provider>
  );
};
