import React from "react";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ChakraBaseProvider } from "@chakra-ui/react";
import { theme } from "./ui/theme/mainTheme/theme";
import GemeralGreetingPage from "./pages/GeneralGreetingPage";
import LoginPage from "./pages/LoginPage";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import OwnerRegister from "./pages/OwnerRegister";
import { app } from "./services/firebase/firebaseConfig";
import OwnerHome from "./pages/OwnerHome";
import Checkout from "./pages/Checkout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <GemeralGreetingPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/owner-sign-up",
    element: <OwnerRegister />,
  },
  {
    path: "/owner-home",
    element: <OwnerHome />,
  },
  { path: "/checkout", element: <Checkout /> },
  {
    path: "/walker-sign-up",
    element: <OwnerRegister />,
  },
]);

function App() {
  return (
    <ChakraBaseProvider theme={theme}>
      <RouterProvider router={router} />
      <ToastContainer />
    </ChakraBaseProvider>
  );
}

export default App;
