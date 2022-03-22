import { Contract, ethers } from "ethers";
import ExampleContract  from '../../../backend/artifacts/contracts/ExampleContract.sol/ExampleContract.json'

export default function getContract(contractAddress: string): any {
  const provider = new ethers.providers.Web3Provider( (window as any).ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(
    contractAddress,
    ExampleContract.abi,
    signer
  );
  return contract;
}