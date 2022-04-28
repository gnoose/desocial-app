import * as React from 'react';
import { useMemo } from 'react';

import { clusterApiUrl } from '@solana/web3.js';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { getWalletAdapters } from '@solana/wallet-adapter-wallets';

import { ConnectionProvider, WalletProvider, } from '@solana/wallet-adapter-react';


const WalletContainer = props => {
    const network = "devnet" as WalletAdapterNetwork;
    const endpoint = useMemo(() => clusterApiUrl(network), []);
    const wallets = useMemo(
        () =>
            getWalletAdapters({network}),
        []
    );
    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets}  autoConnect>
            {
                props.children
            }
            </WalletProvider>
        </ConnectionProvider>
    );
}

export default WalletContainer

