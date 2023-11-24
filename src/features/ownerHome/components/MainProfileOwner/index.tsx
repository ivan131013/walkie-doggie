import {
  Avatar,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Heading,
  Input,
  useDisclosure,
} from "@chakra-ui/react";
import { FunctionComponent, useEffect } from "react";
import { MdOutlineLogout } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useFetchOwnerUser } from "../../../firebase/hooks/useFetchOwnerUser";
import { useFirebaseAuth } from "../../../firebaseAuth/hooks/useFirebaseAuth";

interface MainProfileProps {}

const MainProfileOwner: FunctionComponent<MainProfileProps> = () => {
  const { userData } = useFetchOwnerUser();

  const { user, signOut } = useFirebaseAuth();
  const navigate = useNavigate();

  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <>
      <Avatar
        size="md"
        name="Ryan Florence"
        src={userData?.photo}
        boxShadow={"0px 0px 8px 8px rgba(0, 0, 0, 0.1)"}
        cursor={"pointer"}
        onClick={onOpen}
      />

      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Profile</DrawerHeader>

          <DrawerBody>
            <Heading fontSize={"2rem"} fontWeight={"400"}>
              {userData?.name} & {userData?.dogName}
            </Heading>
          </DrawerBody>

          <DrawerFooter borderTop={"1px solid rgba(0, 0, 0, 0.1)"}>
            <Button
              rightIcon={<MdOutlineLogout />}
              onClick={async () => {
                await signOut();
                navigate("/");
              }}
              w={"100%"}
              fontWeight={"400"}
              variant={"transparent"}
            >
              Log out
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default MainProfileOwner;
