import * as React from 'react';

import { useRouter } from './context';

interface RouteProps {
  path: string;
  component: React.ComponentType;
}

export const Route: React.FC<RouteProps> = ({ path, component: Component }) => {
  const { path: currentPath } = useRouter();

  return currentPath === path ? <Component /> : null;
};
