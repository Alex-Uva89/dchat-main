import styles from "./MessageBox.module.css"
import { useContractEvent, useContractRead } from 'wagmi'
import ContractABI from "../abis/chat.json"
import { useEffect, useState } from "react";

export default function MessageBox(props : {address: string | undefined}) {

    const [messages, setMessages] = useState([]);

    interface Message {
        sender: string;
        content: string;
        timestamp: number;
    }

    const { data, isError, isLoading, refetch} = useContractRead({
        address: '0x9eAaC71039FFC383E55Bc82DE30b6cCFE69c1A49',
        abi: ContractABI,
        functionName: 'getMessages',
    });


    useEffect(() => {   
        if(data == undefined) return;
        let tempMessages : Message[] = [];     
        (data as any).map((msg : any) =>{
           let newMessage : Message = {
                sender: msg[0],
                content: msg[1],
                timestamp: msg[2].toString()
           }
           tempMessages.push(newMessage);
        });
        
        setMessages(tempMessages as []);
    }, [data]);

    useContractEvent({
        address: '0x9eAaC71039FFC383E55Bc82DE30b6cCFE69c1A49',
        abi: ContractABI,
        eventName: 'NewMessage',
        listener() {
        refetch();
        },
      })

    const fetchedMsgs = [
        {
            sender: "Marco",
            text: "Ciao caro",
            time: "2022-08-04T15:00:00"
        },
        {
            sender: "twotimesgi",
            text: "Ciao Marco",
            time: "2022-08-04T15:00:00"
        },
        {
            sender: "Luca",
            text: "Ciao a tutti",
            time: "2022-08-04T15:05:00"
        },
        {
            sender: "Marco",
            text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum eius soluta nihil maiores corporis veniam quibusdam magni numquam illum pariatur, assumenda fugiat expedita optio! Reprehenderit culpa neque recusandae laboriosam dolores!",
            time: "2022-08-04T15:06:00"
        },
        {
            sender: "twotimesgi",
            text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
            time: "2022-08-04T15:00:00"
        },
    ];

    return <div className={styles.messageBox}>
        { messages.map((msg : Message) =>
            <div key={msg.sender+msg.timestamp} className={`${styles.message} ${props.address == msg.sender ? styles.sent : styles.received}`}>
                <div className={styles.msgSender}>#{ msg.sender.slice(-5) }</div>
                { msg.content }
                <div className={styles.msgTime}> {new Date(msg.timestamp * 1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} </div>
            </div>
        )}
    </div>
}
