import { Center, Heading, VStack } from "@chakra-ui/react";
import { FunctionComponent } from "react";
import { useFetchAvailableWalks } from "../../hooks/useFetchAvailableWalks";
import WalkerWalkItem from "../WalkerWalkItem";

interface AvailableRequestsProps {}

const AvailableRequests: FunctionComponent<AvailableRequestsProps> = () => {
  const { walksData } = useFetchAvailableWalks();

  return (
    <VStack
      bg={"rgba(0,0,0,0.05)"}
      alignItems={"stretch"}
      minH={"10rem"}
      mt={"2rem"}
      p={"1rem"}
      pt={"2rem"}
      borderRadius={"0.5rem"}
    >
      <Heading fontSize={'1.5rem'}>Available requests in your area</Heading>
      {walksData?.map((walk) => {
        return <WalkerWalkItem walkData={walk} />;
      })}

      {(!walksData || walksData.length === 0) && (
        <Center>Sorry, nothing here yet(</Center>
      )}
    </VStack>
  );
};

export default AvailableRequests;
