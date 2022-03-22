import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
// if you have successfuly compiled the smart contract in the backend folder, typechain should have created an interface that we can use here 
// import {ExampleContract} from '../../backend/typechain/ExampleContract';
import getContract from "./utils/useGetContract";

function App() {
  /*-----------STATES---------------*/
  // const [typedContract, setTypedContract] = useState<ExampleContract>()
  const [contract, setContract] = useState<any>(undefined)
  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"

  /*-----------SIDE EFFECTS---------------*/
  useEffect(() => {
    // wild wild west version of setting contract
    setContract(getContract(contractAddress))

    // gentlemen version of setting contract 
    //setTypedContract( (getContract(contractAddress) as ExampleContract))
}, [])

  /*-----------FUNCTIONS---------------*/
async function addAccount() {
  // if you want to use the typed contract

  //   await (await typedContract?.addAccount("XamHans"));
  //   typedContract?.on("accountCreatedEvent", async function (event:any) {
  //     console.log('Recieved event from smart contract ',event)
  // })

  await contract.addAccount("XamHans");
  contract?.on("accountCreatedEvent", async function (event:any) {
        console.log('Recieved event from smart contract ',event)
  })
}

  return (
    <div className="flex flex-col w-full h-full bg-white dark:bg-gray-700">
 
      <header className="flex flex-col items-center justify-center flex-grow text-2xl text-gray-700 dark:text-white">
        <img src={logo} className="animate-spin-slow h-72" alt="logo" />
        <p>Vite + React + Solidity + Typescript = 🌞</p>
        <p className="my-8">
          <button
            className="inline-flex items-center px-6 py-3 text-base font-medium text-white bg-teal-600 border border-transparent rounded-md shadow-sm hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
            onClick={() => addAccount()}
          >
            Press me and check your console :)
          </button>
        </p>
        <p>
          <a
            className="text-blue-400"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          {" | "}
          <a
            className="text-blue-400"
            href="https://vitejs.dev/guide/features.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vite Docs
          </a>
          {" | "}
          <a
            className="text-blue-400"
            href="https://docs.soliditylang.org/en/v0.8.13/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Solidity Docs
          </a>
        </p>
      </header>
    </div>
  );
}

export default App;