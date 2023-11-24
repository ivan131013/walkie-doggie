import { Flex, IconButton, Image, Text } from "@chakra-ui/react";
import { FaDog } from "react-icons/fa";
import { FunctionComponent } from "react";
import { BsChevronRight } from "react-icons/bs";
import dog_new from "../../../../assets/images/status_dog_digging.gif";
import person_found from "../../../../assets/images/status_person_walking.gif";
import person_waiting from "../../../../assets/images/status_person_waiting.gif";
import person_dog_walking from "../../../../assets/images/status_person_dog_walking.gif";
import { useNavigate } from "react-router-dom";

interface OnwerWalkItemProps {
  walkData: any;
}

const OnwerWalkItem: FunctionComponent<OnwerWalkItemProps> = ({ walkData }) => {
  const navigate = useNavigate();

  const statusMap: any = {
    new: "Looking for a walker",
    found: "Walker en route",
    awaiting_pickup: "Walker is here",
    ongoing: "Walk in progress",
    returning: "Walker is returning your dog",
    finished: "Finished",
  };

  const statusImages: any = {
    new: dog_new,
    found: person_found,
    awaiting_pickup: person_waiting,
    ongoing: person_dog_walking,
  };

  return (
    <Flex
      bg={"white"}
      borderRadius={"4px"}
      py={"0.5rem"}
      px={"1rem"}
      alignItems={"center"}
      gap={"1rem"}
      onClick={() => {
        navigate("/owner-walk-page/" + walkData.id);
      }}
    >
      <FaDog />
      <Text fontSize={"0.875rem"}>
        Walk on{" "}
        {new Date(walkData?.createdAt.seconds * 1000).toLocaleDateString(
          "en-GB"
        )}
      </Text>

      <Flex alignItems={'center'}>
        <Text fontSize={".875rem"}>{statusMap[walkData?.status]}</Text>
        <Image h={"2rem"} src={statusImages[walkData?.status]} />
      </Flex>
      <IconButton
        aria-label={""}
        icon={<BsChevronRight />}
        bg={"transparent"}
      />
    </Flex>
  );
};

export default OnwerWalkItem;
