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
    { path: "/", component: Home },
    { path: "/about", component: About },
    { path: "/users/:id", component: UserProfile },
    { path: "*", component: NotFound },
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
      <button onClick={() => navigate('/users/123')}>
        Go to User Profile
      </button>
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





