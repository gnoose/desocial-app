import React, { createContext, ReactNode, useCallback, useMemo, useState } from 'react';
import { AnchorWallet, useAnchorWallet, } from '@solana/wallet-adapter-react';
import { Connection, PublicKey } from '@solana/web3.js';
import { Program, Provider } from '@project-serum/anchor';

import idl from '../../idl/desocial_app_program.json';

const preflightCommitment = 'finalized'
const commitment = 'finalized'
const programID = new PublicKey(idl.metadata.address);
const defaultWallet = { publicKey: programID, signTransaction: (transaction) => {}, signAllTransactions: (transaction) => {}} as AnchorWallet;
const defaultProvider = new Provider(new Connection('https://api.devnet.solana.com'), defaultWallet, { preflightCommitment, commitment });

const defaultContextValue = {
  wallet: defaultWallet,
  connected: false,
  provider: defaultProvider,
  program: new Program(idl as any, programID, defaultProvider),
  connect: () => {},
  disconnect: () => {},
};

export const AppContext = createContext(defaultContextValue);

type Props = {
  children: ReactNode;
}

export const AppProvider = ({children}: Props) => {
  const wallet = useAnchorWallet();
  const connection = useMemo(() => new Connection('https://api.devnet.solana.com'), []);
  const [connected, setConnected] = useState(false);
  let provider = useMemo(() => new Provider(connection, wallet, { preflightCommitment, commitment }), [connection, wallet]);
  let program = useMemo(() => new Program(idl as any, programID, provider), [provider]);

  const connect = useCallback(() => {
    setConnected(true);
  }, []);

  const disconnect = useCallback(() => {
    setConnected(false);
  }, []);

  const value = useMemo(() => ({
    wallet,
    connected,
    provider,
    program,
    connect,
    disconnect,
  }), [
    wallet,
    connected,
    provider,
    program,
    connect,
    disconnect,
  ])
  return (
    <>
      <AppContext.Provider value={value}>
        {children}
      </AppContext.Provider>
    </>
  );
};
