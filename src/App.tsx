import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "components/Layout";
import AuthPage from "pages/AuthPage";
import AuthVerificationPage from "pages/AuthVerificationPage";
import BlogPostsPage from "pages/BlogPostsPage";
import "./App.css";

// eslint-disable-next-line react-refresh/only-export-components
export const routes = {
  ROOT: "/",
  AUTH: "/auth",
  POSTS: "/posts",
  VERIFY_AUTH: "/verify-auth",
};

const routesMap = createBrowserRouter([
  {
    element: <Layout />,
    path: routes.ROOT,
    children: [
      {
        element: <AuthPage />,
        path: routes.AUTH,
      },
      {
        element: <BlogPostsPage />,
        path: routes.POSTS,
      },
      {
        element: <AuthVerificationPage />,
        path: routes.VERIFY_AUTH,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={routesMap} />;
}

export default App;
