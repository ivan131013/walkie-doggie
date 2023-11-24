import { Button, Flex, Text } from "@chakra-ui/react";
import { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";
import { useFetchOwnerUser } from "../../../firebase/hooks/useFetchOwnerUser";
import { useFetchOwnerUserById } from "../../../firebase/hooks/useFetchOwnerUserById";
import { useManageWalkForWalker } from "../../hooks/useManageWalkForWalker";

interface WalkerWalkItemProps {
  walkData: any;
  isAccepted?: boolean;
}

const WalkerWalkItem: FunctionComponent<WalkerWalkItemProps> = ({
  walkData,
  isAccepted,
}) => {
  const { userData } = useFetchOwnerUserById(walkData?.ownerId);
  const navigate = useNavigate();

  const { acceptRequest } = useManageWalkForWalker(walkData?.id);

  return (
    <Flex
      bg={"white"}
      borderRadius={"0.5rem"}
      py={"1rem"}
      px={"1rem"}
      position={"relative"}
    >
      <Text
        position={"absolute"}
        top={"0.25rem"}
        left={"0.25rem"}
        fontSize={"0.5rem"}
        opacity={"0.5"}
      >
        {new Date(walkData?.createdAt.seconds * 1000).toLocaleDateString(
          "en-GB",
          { hour: "2-digit", minute: "2-digit" }
        )}
      </Text>
      <Text>
        {userData?.name} has requested a {walkData?.duration} minutes long walk
      </Text>

      {!isAccepted && (
        <Button
          bg={"black"}
          color={"white"}
          fontWeight={"400"}
          fontSize={"1rem"}
          onClick={() => {
            acceptRequest().then(() => {
              navigate("/walker-walk-page/" + walkData?.id);
            });
          }}
        >
          ACCEPT
        </Button>
      )}

      {isAccepted && (
        <Button
          bg={"white"}
          color={"black"}
          border={"1px solid black"}
          px={'2rem'}
          fontWeight={"400"}
          fontSize={"1rem"}
          onClick={() => {
            navigate("/walker-walk-page/" + walkData?.id);
          }}
        >
          VIEW WALK
        </Button>
      )}
    </Flex>
  );
};

export default WalkerWalkItem;
