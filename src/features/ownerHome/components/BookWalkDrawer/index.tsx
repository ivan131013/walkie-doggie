import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  Heading,
  Button,
} from "@chakra-ui/react";
import { FunctionComponent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useOwnerWalkHooks } from "../../../walks/hooks/useOwnerWalkHook";

interface BookWalkDrawerProps {
  isOpen: boolean;
  onClose(): void;
}

const BookWalkDrawer: FunctionComponent<BookWalkDrawerProps> = ({
  isOpen,
  onClose,
}) => {
  const navigate = useNavigate();
  const { bookAWalk } = useOwnerWalkHooks();

  const [defaultCoordinates, setDefaultCoordinates] = useState({
    lat: 49.85992,
    lng: 24.014483,
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setDefaultCoordinates({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
  }, []);

  return (
    <>
      <Drawer placement={"bottom"} onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerBody p={"2rem"}>
            <Heading fontSize={"1.5rem"} fontWeight={"400"} mb={"2rem"}>
              Ready to book a walk?
            </Heading>

            <Button
              bg={"black"}
              color={"white"}
              w={"100%"}
              h={"3rem"}
              onClick={() => {
                bookAWalk(defaultCoordinates, 60);
                navigate("/checkout");
              }}
            >
              Schedule a walk
            </Button>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default BookWalkDrawer;
