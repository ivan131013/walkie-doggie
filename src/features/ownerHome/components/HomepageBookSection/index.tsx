import { Button, Flex, Text, useDisclosure } from "@chakra-ui/react";
import { FunctionComponent } from "react";
import BookWalkDrawer from "../BookWalkDrawer";

interface HomepageBookSectionProps {}

const HomepageBookSection: FunctionComponent<HomepageBookSectionProps> = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <Flex
      bg={"#EDEDED"}
      py={"0.5rem"}
      w={"100%"}
      justifyContent={"space-between"}
      p={"1rem"}
      borderRadius={"0.5rem"}
      //boxShadow={"0px 0px 8px 8px rgba(0, 0, 0, 0.1)"}
      alignItems={"center"}
    >
      <Text fontWeight={"500"} fontSize={"1.3rem"}>
        Where to?
      </Text>
      <Button
        bg={"black"}
        color={"white"}
        fontSize={"1.1rem"}
        fontWeight={"400"}
        onClick={onOpen}
      >
        Book a walk
      </Button>
      <BookWalkDrawer isOpen={isOpen} onClose={onClose} />
    </Flex>
  );
};

export default HomepageBookSection;
