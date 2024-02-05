import styles from "./ConnectScreen.module.css"
import { useAccount, useConnect } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';


export default function ConnectScreen() {
    

    const { connector: activeConnector, isConnected } = useAccount()
    const { connect, connectors, error, isLoading, pendingConnector } = useConnect();
    return <div className={styles.connectScreen}>
            <h1>Connect your wallet to start.</h1>
            <ConnectButton />
    </div>
}
