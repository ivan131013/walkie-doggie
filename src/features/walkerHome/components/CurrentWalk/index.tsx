import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";
import { useFetchOwnerUserById } from "../../../firebase/hooks/useFetchOwnerUserById";
import { useFetchCurrentWalk } from "../../hooks/useFetchCurrentWalk";

interface CurrentWalkProps {}

const CurrentWalk: FunctionComponent<CurrentWalkProps> = () => {
  const { walkData } = useFetchCurrentWalk();
  const navigate = useNavigate();

  const statusMap: any = {
    new: "New order",
    found: "Going to pick up",
    awaiting_pickup: "Arrived and waiting",
    ongoing: "Walk in progress",
    returning: "Returning dog",
    finished: "Finished",
  };

  const { userData } = useFetchOwnerUserById(walkData?.ownerId);
  return (
    <Box
      bg={"rgba(0, 0, 2, 0.05)"}
      p={"2rem"}
      mt={"2rem"}
      borderRadius={"1rem"}
    >
      <Heading fontSize={"2rem"} textAlign={"center"} mb={"1rem"}>
        Ongoing order:
      </Heading>

      <Box bg={"white"} p={"1rem"} borderRadius={"1rem"}>
        <Text mb={"1rem"}>
          {userData?.name} has requested a {walkData?.duration} minutes long
          walk
        </Text>

        <Heading
          color={"rgb(50, 128, 255)"}
          fontSize={"1.75rem"}
          fontWeight={300}
          w={"100%"}
          textAlign={"center"}
        >
          {statusMap[walkData?.status]}
        </Heading>
        <Flex justifyContent={"center"}>
          <Button
            variant={"ghost"}
            fontWeight={"300"}
            fontSize={"0.875rem"}
            onClick={() => {
              navigate("/walker-walk-page/" + walkData?.id);
            }}
          >
            See details
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

export default CurrentWalk;
