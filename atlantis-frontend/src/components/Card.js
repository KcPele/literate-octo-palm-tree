
import { useContext, useState } from "react";
import { etherContext } from "./contexts/EtherProvider";
import { ethers } from "ethers"
import contractAbi from './contractABI.json'
import atlantisContractAbi from "./atlantisContractABI.json"
import Loading from "./Helper/Loading"

function Card() {
  const {provider} = useContext(etherContext)
  const [totalSupply, setTotalSupply] = useState(0)
  const [totalDistributed, setTotalDistributed] = useState(0)
  const [totalReceivers, setTotalRecievers] = useState(0)
  const CONTRACT_ADDRESS = "0x037482A45b5EFf8FA80A5a0Bb35Be90C0deC6965"
  const ATLANTIS_CONTRACT = "0x120960e9E5B7d15eb5913e1E873bB19238bB1ab6"
  
  const doSomthing = async () => {
    if(provider){

        try {
          const {ethereum} = window;
          if(ethereum) {
              
              const signer = provider.getSigner()
              const contract = new ethers.Contract(CONTRACT_ADDRESS, contractAbi.abi, signer);
              const atlantisContract = new ethers.Contract(ATLANTIS_CONTRACT, atlantisContractAbi.abi, signer);

              //total supply
              console.log(atlantisContract)
              let totalSupply = await atlantisContract.totalSupply()
              let totalSup = ethers.utils.formatEther(totalSupply.toString())
              setTotalSupply(totalSup)
              
              //total distributed
              let totalDistributed = await contract.totalDistributed()
              //converting big number
              let totalD = ethers.utils.formatEther(totalDistributed.toString());
              console.log(totalD, "total distributed")
              setTotalDistributed(totalD)
              //total recieved
              let totalReceivers = await contract.totalReceivers()
              //converting big number
              const totalR = ethers.utils.formatEther(totalReceivers.toString());
              console.log(totalR, "total received")
              setTotalRecievers(totalR)
              ///listering for an event on the contract
            try{
                contract.on("DistributionComplete", (numberOfReceivers, amount) => {
                console.log(numberOfReceivers)
                console.log(amount)
              })
            } catch {
              console.log("no event emitted")
            }
          }
      } catch (error) {
          console.log(error)
      }

    } else {
      console.log("not connected")
     
    }
  }
  doSomthing()
  return (
    <div className="menu-card">
      <div className="card">
        <h4>Total Bonus</h4>
        <p>{totalSupply}</p>
        <p>ALT-TOKEN</p>
      </div>
      <div className="card">
        <h4>TOTAL SENT</h4>
        <Loading />
        <p>{totalDistributed}%</p>
      </div>
      <div className="card">
        <h4>TOTAL CLAIMED</h4>
        <p>{totalReceivers}</p>
      </div>
    </div>
  );
}

export default Card;
