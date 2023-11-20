import { Box } from "@chakra-ui/react";
import { FunctionComponent } from "react";

interface DefaultLayoutProps {
  children: React.ReactElement | React.ReactElement[];
}

const DefaultLayout: FunctionComponent<DefaultLayoutProps> = ({ children }) => {
  return <Box h={"100vh !important"}>{children}</Box>;
};

export default DefaultLayout;
