import { Avatar, Box, Flex, Heading, useDisclosure } from "@chakra-ui/react";
import { FunctionComponent } from "react";
import pes_patron from "../../../assets/images/pes_patron.jpg";
import { useFetchOwnerUser } from "../../../features/firebase/hooks/useFetchOwnerUser";
import MainProfileOwner from "../../../features/ownerHome/components/MainProfileOwner";

interface DefaultLayoutProps {
  children: React.ReactElement | React.ReactElement[];
}

const SignedInLayout: FunctionComponent<DefaultLayoutProps> = ({
  children,
}) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { userData } = useFetchOwnerUser();
  return (
    <Box minH={"100vh"} pt={"2rem"} px={"1.5rem !important"} maxW={"100vw"}>
      <Flex w={"100%"} justifyContent={"space-between"} mb={"1rem"}>
        <Heading fontFamily={"Righteous"} fontSize={"2rem"}>
          Hello, {userData?.name} & {userData?.dogName}
        </Heading>
        <MainProfileOwner />
      </Flex>
      {children}
    </Box>
  );
};

export default SignedInLayout;
