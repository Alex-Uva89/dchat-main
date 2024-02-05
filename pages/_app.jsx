import '../styles/globals.css'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { publicProvider } from 'wagmi/providers/public'
import {
  getDefaultWallets,
  RainbowKitProvider,
  darkTheme,
} from '@rainbow-me/rainbowkit';
import {
  chain,
  configureChains,
  createClient,
  WagmiConfig,
} from 'wagmi';
import '@rainbow-me/rainbowkit/styles.css';

const { chains, provider } = configureChains(
  [chain.polygonMumbai],
  [
    alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_KEY }),
    publicProvider()
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'dchat',
  chains
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider
})



export default function App({ Component, pageProps }) {
  return <WagmiConfig client={wagmiClient}>
    <RainbowKitProvider chains={chains}  theme={darkTheme({accentColor: '#f7f7f7', accentColorForeground: 'black', fontStack: "system", borderRadius: "small", overlayBlur: 'large'})} >
      <Component {...pageProps} />
    </RainbowKitProvider>
  </WagmiConfig>
}
