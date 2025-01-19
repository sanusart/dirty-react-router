import * as React from 'react';

import { useRouter } from './context';
import { RouteType } from './types';

export const Route = ({ path, component: Component }: RouteType) => {
  const { path: currentPath } = useRouter();

  return currentPath === path ? <Component /> : null;
};
