import { Box, Divider, Flex, Heading, Text } from "@chakra-ui/react";
import { FunctionComponent } from "react";

interface StatsProps {}

const Stats: FunctionComponent<StatsProps> = () => {
  return (
    <Flex
      borderRadius={"4px"}
      bg={"black"}
      p={"1rem"}
      color={"white"}
      justifyContent={"space-between"}
    >
      <Box>
        <Text opacity={0.7}>Walkers in your area:</Text>
        <Heading fontSize={"2rem"}>{12}</Heading>
      </Box>

      <Divider h={"4rem"} orientation={"vertical"} />

      <Box>
        <Text opacity={0.7}>Current demand:</Text>
        <Heading fontSize={"2rem"}>{"HIGH"}</Heading>
      </Box>
    </Flex>
  );
};

export default Stats;
