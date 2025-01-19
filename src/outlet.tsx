import * as React from 'react';
import { useRouter, matchRoute } from './context';

interface RouteContentProps {
  [key: string]: unknown;
}

export const Outlet = ({ ...rest }: RouteContentProps) => {
  const { path, params, routes } = useRouter();
  if (!routes) {
    throw new Error('routes are not defined ot not provided to Provider');
  }

  const { route } = matchRoute(routes, path);

  if (!route) {
    const catchAllRouteExists = !!routes.find((routeItem) => routeItem.path === '*');

    if (catchAllRouteExists) {
      const Component = routes.find((routeItem) => routeItem.path === '*')!.component;
      return <Component params={params} {...rest} />;
    } else {
      return (
        <div
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div>
            <strong>404</strong>: Page not found
          </div>
        </div>
      );
    }
  }

  const Component = route.component;
  return <Component params={params} {...rest} />;
};
