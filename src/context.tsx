import * as React from 'react';
import type { RouterContextType, RouterProviderType, RouteType } from '../types';

const RouterContext = React.createContext<RouterContextType | undefined>(undefined);

export const matchRoute = (
  routes: RouteType[],
  path: string
): { route: RouteType | null; params: Record<string, string> } => {
  for (const route of routes) {
    const routeParts = route.path.split('/');
    const pathParts = path.split('/');

    if (routeParts.length === pathParts.length) {
      const params: Record<string, string> = {};
      const match = routeParts.every((part, i) => {
        if (part.startsWith(':')) {
          params[part.slice(1)] = pathParts[i];
          return true;
        }
        return part === pathParts[i];
      });

      if (match) {
        return { route, params };
      }
    }
  }

  return { route: null, params: {} };
};

export const RouterProvider = ({ children, routes }: RouterProviderType) => {
  const [path, setPath] = React.useState(window.location.pathname);
  const [params, setParams] = React.useState<Record<string, string>>({});

  const updateRoute = React.useCallback(
    (newPath: string) => {
      const { params: newParams } = matchRoute(routes, newPath);
      setPath(newPath);
      setParams(newParams);
    },
    [routes]
  );

  const navigate = React.useCallback(
    (to: string) => {
      window.history.pushState(null, '', to);
      updateRoute(to);
    },
    [updateRoute]
  );

  React.useEffect(() => {
    updateRoute(path);
  }, [path, updateRoute]);

  React.useEffect(() => {
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, [path]);

  React.useEffect(() => {
    const handlePopState = () => {
      updateRoute(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [updateRoute]);

  return (
    <RouterContext.Provider value={{ path, params, navigate, routes }}>
      {children}
    </RouterContext.Provider>
  );
};

export const useRouter = () => {
  const context = React.useContext(RouterContext);
  if (context === undefined) {
    console.log(
      ' ❗ %c Error ',
      'background: tomato; border: 1px solid tomato; border-radius: 3px; padding: 2px 0px 0px 0px; color: #fff',
      'useRouter() can only be used within <RouterProvider/> children'
    );
    throw new Error('useRouter() can only be used within <RouterProvider/> children');
  }
  return context;
};
