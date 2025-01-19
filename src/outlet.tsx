import * as React from 'react';
import { useRouter, matchRoute } from './context';
import type { OutletType } from './types';

export const Outlet = ({ ...rest }: OutletType) => {
  const { path, params, routes } = useRouter();
  if (!routes) {
    console.log(
      ' ❗ %c Error ',
      'background: tomato; border: 1px solid tomato; border-radius: 3px; padding: 2px 0px 0px 0px; color: #fff',
      '"routes" are not defined or not passed to the <RouterProvider/>'
    );
    throw new Error('"routes" are not defined or not passed to the <RouterProvider/>');
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
