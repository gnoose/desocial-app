import React, { useContext, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletDialogProvider, WalletDisconnectButton, WalletMultiButton } from '@solana/wallet-adapter-material-ui';
import classNames from 'classnames';

import { AppContext } from '../../context/app-context';

const ConnectButton = (props: any) => {
  const wallet = useWallet();
  const { connect, disconnect } = useContext(AppContext);

  useEffect(() => {
    if (wallet.connected) {
      connect();
    } else {
      disconnect();
    }
  }, [wallet, connect, disconnect]);

  const connectbuttonClassName = classNames({
    mx_WalletConnectButton: true,
    mx_ConnectedToWallet: !!wallet.publicKey?.toBase58()
  });

  return (
    <>
      <div className={connectbuttonClassName}>
        {
          <WalletDialogProvider>
            <WalletMultiButton id="wallet-connect-button">
              {
                props.children
              }
            </WalletMultiButton>
            <WalletDisconnectButton id="wallet-disconnect-button"/>
          </WalletDialogProvider>
        }
      </div>
    </>
  );
};

export default ConnectButton;
