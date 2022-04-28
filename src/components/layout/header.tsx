import * as React from 'react';

import ConnectButton from '../common/connect-button';

const Header = () => {
  return (
    <>
      <div className="h-70 w-full bg-primary-75">
        <div className="container mx-auto h-full flex items-center justify-between">
          <span className="font-bold text-30 text-white">Desocial</span>
          <ConnectButton/>
        </div>
      </div>
    </>
  );
};

export default Header;
