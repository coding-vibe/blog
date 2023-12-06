import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import Layout from "./components/Layout";
import "./App.css";

const routesMap = createBrowserRouter([
  {
    element: <Layout />,
    path: "/",
    children: [
      {
        element: <AuthPage />,
        path: "/auth",
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={routesMap} />;
}

export default App;
