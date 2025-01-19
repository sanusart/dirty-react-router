import * as React from 'react';

import { useRouter } from './context';
import { LinkType } from './types';

export const Link = ({ to, children, className, onClickCb }: LinkType) => {
  const { navigate } = useRouter();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();

    if (typeof onClickCb === 'function') {
      onClickCb();
    }

    if (to.startsWith('https')) {
      window.open(to);
    }
    navigate(to);
  };

  return (
    <a href={to} onClick={handleClick} className={className}>
      {children}
    </a>
  );
};
