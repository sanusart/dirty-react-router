import * as React from 'react';

export type RouteType = {
  path: string;
  component: (props: { params?: Record<string, string> }) => React.ReactNode;
};

export type OutletType = {
  [key: string]: unknown;
};

export type RouterContextType = {
  path: string;
  params: Record<string, string>;
  navigate: (to: string) => void;
  routes: RouteType[];
};

export type RouterProviderType = {
  children: React.ReactNode;
  routes: RouteType[];
};

export type LinkType = {
  to: string;
  children: React.ReactNode;
  className?: string;
  onClickCb?: () => void;
};
