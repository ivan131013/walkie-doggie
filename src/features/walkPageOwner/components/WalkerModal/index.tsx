import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  Heading,
  Flex,
  Divider,
  Text,
  Image,
} from "@chakra-ui/react";
import { FunctionComponent } from "react";
import { useFetchWalkerUser } from "../../../firebase/hooks/useFetchWalkerUser";
import { useFetchWalkerUserById } from "../../../walkerHome/hooks/useFetchWalkerUserById";

interface WalkerModalProps {
  walkerId: string;
  isOpen: boolean;
  onClose(): void;
}

const WalkerModal: FunctionComponent<WalkerModalProps> = ({
  isOpen,
  onClose,
  walkerId,
}) => {
  const { userData } = useFetchWalkerUserById(walkerId);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered={true}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody p={"2rem"}>
            <Heading fontSize={"2.1rem"} fontWeight={"400"} mb={"2rem"}>
              Walker info
            </Heading>
            <Flex alignItems={"center"} gap={"1rem"}>
              <Text fontSize={"1.4rem"}>First name:</Text>
              <Text fontWeight={600} fontSize={"1.5rem"}>
                {userData?.firstName}
              </Text>
            </Flex>
            <Flex alignItems={"center"} gap={"1rem"}>
              <Text fontSize={"1.4rem"}>Last name:</Text>
              <Text fontWeight={600} fontSize={"1.5rem"}>
                {userData?.lastName}
              </Text>
            </Flex>

            <Flex alignItems={"center"} gap={"1rem"}>
              <Text fontSize={"1.4rem"}>Phone number:</Text>
              <Text fontWeight={600} fontSize={"1.5rem"}>
                {userData?.phoneNumber}
              </Text>
            </Flex>

            <Flex alignItems={"center"} gap={"1rem"}>
              <Text fontSize={"1.4rem"}>Gender:</Text>
              <Text fontWeight={600} fontSize={"1.5rem"}>
                {userData?.gender}
              </Text>
            </Flex>

            <Flex alignItems={"center"} gap={"1rem"}>
              <Text fontSize={"1.4rem"}>Date of birth:</Text>
              <Text fontWeight={600} fontSize={"1.5rem"}>
                {new Date(
                  userData?.dateOfBirth.seconds * 1000
                ).toLocaleDateString()}
              </Text>
            </Flex>

            <Flex alignItems={"center"} gap={"1rem"}>
              <Text fontSize={"1.4rem"}>Years of experience:</Text>
              <Text fontWeight={600} fontSize={"1.5rem"}>
                {userData?.yearsOfExperience}
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

export default WalkerModal;
