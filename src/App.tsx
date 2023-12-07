import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "components/Layout";
import AuthPage from "pages/AuthPage";
import AuthVerificationPage from "pages/AuthVerificationPage";
import "./App.css";

const routes = {
  ROOT: "/",
  AUTH: "/auth",
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
