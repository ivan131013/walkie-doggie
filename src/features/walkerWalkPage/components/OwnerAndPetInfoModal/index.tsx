import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Flex,
  Text,
  Divider,
  Heading,
  Image,
} from "@chakra-ui/react";
import { FunctionComponent } from "react";
import { useFetchOwnerUserById } from "../../../firebase/hooks/useFetchOwnerUserById";

interface OwnerAndPetInfoProps {
  ownerId: string;
  isOpen: boolean;
  onClose(): void;
}

const OwnerAndPetInfo: FunctionComponent<OwnerAndPetInfoProps> = ({
  ownerId,
  isOpen,
  onClose,
}) => {
  const { userData } = useFetchOwnerUserById(ownerId);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered={true}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody p={"2rem"}>
            <Heading fontSize={"2.1rem"} fontWeight={"400"} mb={"2rem"}>
              Owner and pet info
            </Heading>
            <Flex alignItems={"center"} gap={"1rem"}>
              <Text fontSize={"1.4rem"}>Name:</Text>
              <Text fontWeight={600} fontSize={"1.5rem"}>
                {userData?.name}
              </Text>
            </Flex>
            <Flex alignItems={"center"} gap={"1rem"}>
              <Text fontSize={"1.4rem"}>Phone number:</Text>
              <Text fontWeight={600} fontSize={"1.5rem"}>
                {userData?.phoneNumber}
              </Text>
            </Flex>
            <Divider my={"1rem"} />

            <Heading fontSize={"1.8rem"} fontWeight={400}>
              Pet info:
            </Heading>

            <Flex alignItems={"center"} gap={"1rem"}>
              <Text fontSize={"1.4rem"}>Name:</Text>
              <Text fontWeight={600} fontSize={"1.5rem"}>
                {userData?.dogName}
              </Text>
            </Flex>

            <Flex alignItems={"center"} gap={"1rem"}>
              <Text fontSize={"1.4rem"}>Gender:</Text>
              <Text fontWeight={600} fontSize={"1.5rem"}>
                {userData?.dogGender}
              </Text>
            </Flex>

            <Flex alignItems={"center"} gap={"1rem"}>
              <Text fontSize={"1.4rem"}>Weight:</Text>
              <Text fontWeight={600} fontSize={"1.5rem"}>
                {userData?.weight} kg
              </Text>
            </Flex>

            <Flex alignItems={"center"} gap={"1rem"}>
              <Text fontSize={"1.4rem"}>Photo:</Text>
            </Flex>

            <Image src={userData?.photo} />
          </ModalBody>

          {/* <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter> */}
        </ModalContent>
      </Modal>
    </>
  );
};

export default OwnerAndPetInfo;
