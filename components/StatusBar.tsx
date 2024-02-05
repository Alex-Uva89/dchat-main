import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import styles from "./StatusBar.module.css"

interface props{
  address : string | undefined ;
  isConnected : boolean;
}
export default function StatusBar(props : props) {

  const [time, setTime] = useState(new Date().toLocaleTimeString());
  setInterval(() => {
     setTime(new Date().toLocaleTimeString());
   }, 1000);


  return <div className={styles.statusBar}>
   { <span>{time}</span> }
  {props.isConnected && <span>Logged in as <b>{props.address?.slice(-5)}</b></span>}
</div>
}
