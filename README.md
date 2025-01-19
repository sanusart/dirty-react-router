# Dirty react router

A lightweight, easy to use React router that helps manage simple site navigation.

## Installation

```bash
npm install dirty-react-router
```

## Basic Usage

1. wrapp your app with `<RouterProvider />`
2. add routes to `<RouterProvider routes={[]} />`
3. place `<Outlet />` where the content need to be rendered

```jsx
import { RouterProvider, Outlet } from 'dirty-react-router';

// Example components

function Home() {
  return <h1>Welcome to Home Page</h1>;
}

function About() {
  return <h1>About Us</h1>;
}

function UserProfile({ params }) {
  return <h1>User Profile {params.id}</h1>;
}

// Not found or any other component to catch-all
function NotFound() {
  return <h1>404 - Page Not Found</h1>;
}

const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About },
  { path: '/users/:id', component: UserProfile },
  { path: '*', component: NotFound },
];

function App() {
  return (
    <RouterProvider routes={[]}>
      <header />
      <aside />
      <article>
        <Outlet />
      </article>
      <footer />
    </RouterProvider>
  );
}
```

### Navigation

Using `<Link />` or programmatic `navigate()`

```jsx
import { Link, useRouter } from 'dirty-react-router';

function Navigation() {
  const { navigate } = useRouter();

  return (
    <nav>
      {/* Using Link component */}
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>

      {/* Programmatic navigation */}
      <button onClick={() => navigate('/users/123')}>Go to User Profile</button>
    </nav>
  );
}
```

### Route Parameters

```jsx
import { useParams } from 'dirty-react-router';

function UserProfile() {
  const { params } = useRouter();

  return (
    <div>
      <h1>User Profile</h1>
      <p>User ID: {params.id}</p>
    </div>
  );
}
```

# Components docs

## RouterProvider Component

A component that provides routing functionality to its children.

### Props:

| Prop       | Type              | Required | Description                                                     |
| ---------- | ----------------- | -------- | --------------------------------------------------------------- |
| `children` | `React.ReactNode` | Yes      | React nodes to be rendered within the provider                  |
| `routes`   | `RouteType[]`     | Yes      | An array of RouteType objects representing the available routes |

### Functionality:

- Manages the current path and route parameters.
- Provides navigation capabilities.
- Handles browser history and popstate events.
- Scrolls to the top of the page on route changes.

## Link Component

A component that provides navigation functionality within dirty-react-router.

### Props:

| Prop        | Type              | Required | Description                                                 |
| ----------- | ----------------- | -------- | ----------------------------------------------------------- |
| `to`        | `string`          | Yes      | The destination URL or path                                 |
| `children`  | `React.ReactNode` | Yes      | The content to be rendered inside the link                  |
| `className` | `string`          | No       | CSS class names to be applied to the link                   |
| `onClickCb` | `function`        | No       | A callback function to be executed when the link is clicked |

### Usage Example

```typescript jsx
import { Link } from './Link';

function Navigation() {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/contact" onClickCb={() => console.log('Contact clicked')}>Contact</Link>
      <Link to="https://example.com">External Link</Link>
    </nav>
  );
}

```

## Outlet Component

### Functionality

- Uses the useRouter hook to access the current path, params, and routes.
- Checks if routes are defined, throwing an error if they're not.
- Uses matchRoute to find the route that matches the current path.

If no matching route is found:

- Checks for a catch-all route (path: '\*').
- If a catch-all route exists, renders its component.
- If no catch-all route exists, renders a default 404 page.
- If a matching route is found, renders its component, passing params and any additional props.

### Error Handling

Throws an error with a console message if routes are not defined or not passed to the RouterProvider.

### 404 Handling

Renders a basic 404 page if no matching route or catch-all route is found.

### Props

> Accepts any additional props and passes them to the rendered component.

### Usage example

```typescript jsx
import { RouterProvider } from './RouterProvider';
import { Outlet } from './Outlet';

const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About },
  { path: '*', component: NotFound }
];

function App() {
  return (
    <RouterProvider routes={routes}>
      <Header />
      <Outlet someExtraProp={value} />
      <Footer />
    </RouterProvider>
  );
}

```

> someExtraProp will be available to access on the rendered component for example:
>
> ```typescript jsx
> export const About = ({ someExtraProp }) => <div />;
> ```

## useRouter Hook

A custom hook to access the router context within components.

Returns an object containing:

- path: The current path.
- params: An object with the current route parameters.
- navigate: A function to programmatically navigate to a new route.
- routes: An array of available routes.

### Usage example

```typescript jsx
function Navigation() {
  const { navigate, path } = useRouter();
  const activeRoute = path === document.location.pathname;

  return (
    <nav>
      <button active={activeRoute} onClick={() => navigate('/')}>Home</button>
      <button active={activeRoute} onClick={() => navigate('/users/1')}>User 1</button>
    </nav>
  );
}
```

> Must be used within a component that is a child of RouterProvider.

License: MIT 

:)
