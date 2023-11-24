import { Box, Flex, Text, VStack } from "@chakra-ui/react";
import { FunctionComponent } from "react";
import { useOwnerWalkHooks } from "../../hooks/useOwnerWalkHook";
import OnwerWalkItem from "../OnwerWalkItem";

interface CurrentOwnerWalksProps {}

const CurrentOwnerWalks: FunctionComponent<CurrentOwnerWalksProps> = () => {
  const { ownerPendingWalks } = useOwnerWalkHooks();

  return (
    <>
      <Box
        bg={"rgba(0, 0, 0, 0.05)"}
        py={"0.5rem"}
        w={"100%"}
        p={"1rem"}
        borderRadius={"0.5rem"}
        //boxShadow={"0px 0px 8px 8px rgba(0, 0, 0, 0.1)"}
        alignItems={"center"}
      >
        <Text fontWeight={"500"} fontSize={"1.3rem"}>
          Your walks
        </Text>

        {ownerPendingWalks.length > 0 && (
          <VStack alignItems={"stretch"} mt={'1rem'}>
            {ownerPendingWalks.map((e) => {
              return <OnwerWalkItem walkData={e} />;
            })}
          </VStack>
        )}
      </Box>
    </>
  );
};

export default CurrentOwnerWalks;
