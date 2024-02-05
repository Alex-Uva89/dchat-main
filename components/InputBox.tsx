import { useState } from "react";
import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from "wagmi"
import styles from "./InputBox.module.css"
import ContractABI from "../abis/chat.json"
import SendIcon from "../public/send-icon.svg"
import Image from "next/image"
export default function InputBox() {

  const [message, setMessage] = useState("");

  const { config } = usePrepareContractWrite({
    address: "0x9eAaC71039FFC383E55Bc82DE30b6cCFE69c1A49",
    abi: ContractABI,
    functionName: 'sendMessage',
    args: [message],
  })

  const { data, isLoading, write } = useContractWrite(config)

  const { isSuccess, isLoading: isLoadingTx } = useWaitForTransaction({
    hash: data?.hash,
  })

  const handleEnter = (e : any) => {
    if(e.key != "Enter" ) return;
    handleSubmit();
  }

  const handleSubmit =  async () => {
    setMessage("");
    await write?.()
  }
  
  return <div className={styles.inputBox}>
    <input className={styles.msgInput} onKeyDown={handleEnter} placeholder="Write a message..." value={message} type="text" disabled={isLoading || isLoadingTx} onChange={(e) => setMessage(e.target.value)}/>
    <button onClick={handleSubmit} disabled={message.length < 1} className={styles.sendButton}><Image src={SendIcon} alt="send icon"/></button>
  </div>

}
