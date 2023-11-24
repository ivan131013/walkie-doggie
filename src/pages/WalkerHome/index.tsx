import { Box, Flex, Heading } from "@chakra-ui/react";
import { FunctionComponent, useEffect } from "react";
import AvailableRequests from "../../features/walkerHome/components/AvailableRequests";
import CurrentWalk from "../../features/walkerHome/components/CurrentWalk";
import MainProfile from "../../features/walkerHome/components/MainProfile";
import RequestsHistory from "../../features/walkerHome/components/RequestsHistory";
import Stats from "../../features/walkerHome/components/Stats";
import { useFetchWalkerProfileData } from "../../features/walkerHome/hooks/useFetchWalkerProfileData";
import DefaultLayout from "../../ui/layouts/DefaultLayout";

interface WalkerHomeProps {}

const WalkerHome: FunctionComponent<WalkerHomeProps> = () => {
  const { userData } = useFetchWalkerProfileData();

  return (
    <>
      <DefaultLayout>
        <Box px={"2rem"} pt={"3rem"}>
          <Flex
            justifyContent={"space-between"}
            alignItems={"center"}
            mb={"2rem"}
          >
            <Heading fontFamily={"Righteous"} fontSize={"2rem"}>
              Hello, {userData?.firstName}
            </Heading>

            <MainProfile />
          </Flex>

          <Stats />

          <CurrentWalk />

          <AvailableRequests />
          <RequestsHistory />
        </Box>
      </DefaultLayout>
    </>
  );
};

export default WalkerHome;
