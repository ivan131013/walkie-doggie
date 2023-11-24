import { Box, Flex, Heading, Text, Image, VStack } from "@chakra-ui/react";
import { FunctionComponent } from "react";
import SignedInLayout from "../../ui/layouts/SignedInLayout";
import dev_food from "../../assets/images/dev_food.png";
import HomepageBookSection from "../../features/ownerHome/components/HomepageBookSection";
import AroundMap from "../../features/ownerHome/components/AroundMap";
import CurrentOwnerWalks from "../../features/walks/components/CurrentOwnerWalks";

interface OwnerHomeProps {}

const OwnerHome: FunctionComponent<OwnerHomeProps> = () => {
  return (
    <SignedInLayout>
      <VStack alignItems={"stretch"} gap={"1rem"}>
        <Flex
          bg={"#10462E"}
          borderRadius={"0.5rem"}
          alignItems={"center"}
          w={"100%"}
          py={"1rem"}
          pl={"1rem"}
          justifyContent={"space-between"}
          mb={"1rem"}
        >
          <Box>
            <Heading color={"white"} fontSize={"1.25rem"} fontWeight={"600"}>
              Get your doggie a treat{" "}
            </Heading>
            <Text color={"white"} fontSize={"1rem"}>
              Order on Feedie-Doggie
            </Text>
          </Box>
          <Image src={dev_food} />
        </Flex>

        <HomepageBookSection />

        <CurrentOwnerWalks />

        <AroundMap />
      </VStack>
    </SignedInLayout>
  );
};

export default OwnerHome;
