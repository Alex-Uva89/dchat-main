import dynamic from 'next/dynamic'
import Head from 'next/head'
import { useAccount } from 'wagmi'

export default function Home() {
  const { address, isConnected } = useAccount()
  const ConnectScreen = dynamic(
    () => import('../components/ConnectScreen'),
    { ssr: false }
  )
  const StatusBar = dynamic(
    () => import('../components/StatusBar'),
    { ssr: false }
  )
  const MessageBox = dynamic(
    () => import('../components/MessageBox'),
    { ssr: false }
  )

  const InputBox = dynamic(
    () => import('../components/InputBox'),
    { ssr: false }
  )
  return (
    <div>
      <Head>
        <title>dChat</title>
        <meta name="description" content="Simple decentralized chat" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"/>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div id="app">
      {!isConnected && <ConnectScreen/>}
      {isConnected && <StatusBar isConnected={isConnected} address={address}/> }
      {isConnected &&<MessageBox address={address}/>}
      {isConnected && <InputBox /> }
      </div>
    </div>
  )
}
