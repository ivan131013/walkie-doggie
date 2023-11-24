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
import WalkerRegister from "./pages/WalkerRegister";
import WalkerHome from "./pages/WalkerHome";
import OnwerWalkPage from "./pages/OwnerWalkPage";
import { APIProvider } from "@vis.gl/react-google-maps";

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
    element: <WalkerRegister />,
  },
  {
    path: "/walker-home",
    element: <WalkerHome />,
  },
  {
    path: "/owner-walk-page/:id",
    element: <OnwerWalkPage />,
  },
]);

function App() {
  return (
    <APIProvider apiKey={process.env.REACT_APP_GOOGLE_MAPS_KEY ?? ""}>
      <ChakraBaseProvider theme={theme}>
        <RouterProvider router={router} />
        <ToastContainer />
      </ChakraBaseProvider>
    </APIProvider>
  );
}

export default App;
