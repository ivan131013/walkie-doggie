import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  Heading,
  Button,
} from "@chakra-ui/react";
import { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";

interface BookWalkDrawerProps {
  isOpen: boolean;
  onClose(): void;
}

const BookWalkDrawer: FunctionComponent<BookWalkDrawerProps> = ({
  isOpen,
  onClose,
}) => {
  const navigate = useNavigate();
  return (
    <>
      <Drawer placement={"bottom"} onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerBody p={"3rem"}>
            <Heading fontSize={"1.5rem"} fontWeight={"400"}>
              Schedule a walk
            </Heading>

            <Button
              bg={"black"}
              color={"white"}
              w={"100%"}
              h={"3rem"}
              onClick={() => {
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
