import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { web3 } from '@project-serum/anchor'

import { AppContext } from '../context/app-context';
import { PublicKey } from '@solana/web3.js';
import Spinner from '../common/spinner';

const Home = () => {
  const { wallet, connected, program } = useContext(AppContext);

  const [isLoading, setIsLoading] = useState(false);
  const [receiver, setReceiver] = useState('AiEruoctQuAHpARtLtUzm2Kmwq9hx5CE4z8uy36mFzJQ');
  const [message, setMessage] = useState('');
  const [messageList, setMessageList] = useState([]);

  const walletAddress = useMemo(() => {
    if (connected) {
      return wallet.publicKey.toBase58();
    } else {
      return '';
    }
  }, [connected, wallet]);

  const handleReceiver = (event) => {
    setReceiver(event.target.value);
  };

  const handleMessage = (event) => {
    setMessage(event.target.value);
  };

  const sendMessage = async () => {
    if (connected && walletAddress && receiver && message) {
      try {
        setIsLoading(true);
        // console.log('start sending...');
        const newMessageAddress = web3.Keypair.generate();
        const topic = 'This is simple message';
        await program.rpc.sendMessage(topic, message, {
          accounts: {
            message: newMessageAddress.publicKey,
            author: wallet.publicKey,
            receiver: new PublicKey(receiver),
            systemProgram: web3.SystemProgram.programId,
          },
          signers: [newMessageAddress]
        });
        // console.log('ended sending...');
        // const newMessage = await program.account.message.fetch(newMessageAddress.publicKey);
        // console.log('newMessage from Blockchain = ', newMessage);
        setIsLoading(false);
        fetchMessages();
      } catch (err) {
        setIsLoading(false);
      }
    }
  };

  const fetchMessages = useCallback(async () => {
    if (connected) {
      try {
        const senderFilters = [
          {
            memcmp: {
              offset: 8,
              bytes: wallet.publicKey.toBase58()
            }
          },
          {
            memcmp: {
              offset: 40,
              bytes: new PublicKey(receiver).toBase58()
            }
          },
        ];
        const receiverFilters = [
          {
            memcmp: {
              offset: 40,
              bytes: wallet.publicKey.toBase58()
            }
          },
          {
            memcmp: {
              offset: 8,
              bytes: new PublicKey(receiver).toBase58()
            }
          },
        ]
        const sendMessages = await program.account.message.all(senderFilters);
        const receiveMessages = await program.account.message.all(receiverFilters);
        const tempList = [];
        sendMessages.map(message => {
          tempList.push({
            direction: 'sender',
            timestamp: parseFloat(message.account.timestamp),
            content: message.account.content
          });
          return true;
        });
        receiveMessages.map(message => {
          tempList.push({
            direction: 'receiver',
            timestamp: parseFloat(message.account.timestamp),
            content: message.account.content
          });
          return true;
        });
        tempList.sort((a: any, b: any) => (a.timestamp - b.timestamp));
        setMessageList(tempList);
      } catch (err) {
        console.log('err = ', err);
      }
    }
  }, [connected, wallet, program, receiver]);

  const timerRef = useRef(null);
  useEffect(() => {
    if (timerRef.current === null) {
      timerRef.current = setInterval(fetchMessages, 2000);
    }
    return () => {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, [fetchMessages]);
  return (
    <>
      <div className='container mx-auto'>
        <section className='py-50'>
          <div className='flex justify-between items-center'>
            <div>
              <label>Sender : </label>
              <span className='border rounded p-5 w-400'>{walletAddress}</span>
            </div>
            <div>
              <label>Receiver : </label>
              <input type='text' className='border rounded p-5 w-400' value={receiver} onChange={handleReceiver}/>
            </div>
          </div>
        </section>

        <section className='py-20'>
          <div>
            <label>Send Message</label>
            <textarea className='border rounded p-5 w-full' onChange={handleMessage} value={message} placeholder='write message here' />
          </div>
          <div className='flex justify-end'>
            <button className='btn-md btn-primary' onClick={sendMessage}>Send Message</button>
          </div>
        </section>

        <section className='py-50'>
          <div className='border w-full min-h-200 max-h-350 overflow-auto rounded'>
            {messageList.map((message, index) => (
              <div key={index} className={'p-5 flex ' + (message.direction === 'sender' ? 'justify-start' : 'justify-end')} >
                <span className={'p-10 text-white rounded-full ' + (message.direction === 'sender' ? 'bg-primary' : 'bg-warning')}>{message.content}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
      <Spinner isLoading={isLoading}/>
    </>
  );
};

export default Home;
