import { Avatar, Box, Flex } from "@chakra-ui/react";
import { FunctionComponent } from "react";
import pes_patron from "../../../assets/images/pes_patron.jpg";

interface DefaultLayoutProps {
  children: React.ReactElement | React.ReactElement[];
}

const SignedInLayout: FunctionComponent<DefaultLayoutProps> = ({
  children,
}) => {
  return (
    <Box minH={"100vh"} pt={"2rem"} px={"1.5rem !important"} maxW={"100vw"}>
      <Flex w={"100%"} justifyContent={"flex-end"} mb={"1rem"}>
        <Avatar
          size="md"
          name="Ryan Florence"
          src={pes_patron}
          boxShadow={"0px 0px 8px 8px rgba(0, 0, 0, 0.2)"}
        />
      </Flex>
      {children}
    </Box>
  );
};

export default SignedInLayout;
