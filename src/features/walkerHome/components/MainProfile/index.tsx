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
  Input,
  useDisclosure,
} from "@chakra-ui/react";
import { FunctionComponent, useEffect } from "react";
import { MdOutlineLogout } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useFirebaseAuth } from "../../../firebaseAuth/hooks/useFirebaseAuth";
import { useFetchWalkerProfileData } from "../../hooks/useFetchWalkerProfileData";

interface MainProfileProps {}

const MainProfile: FunctionComponent<MainProfileProps> = () => {
  const { userData } = useFetchWalkerProfileData();

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
            <Input placeholder="Type here..." />
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

export default MainProfile;
