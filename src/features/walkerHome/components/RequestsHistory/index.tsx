import { VStack, Heading, Center } from "@chakra-ui/react";
import { FunctionComponent } from "react";
import { useFetchAvailableWalks } from "../../hooks/useFetchAvailableWalks";
import { useFetchPreviousWalks } from "../../hooks/useFetchPreviousWalks";
import WalkerWalkItem from "../WalkerWalkItem";

interface RequestsHistoryProps {}

const RequestsHistory: FunctionComponent<RequestsHistoryProps> = () => {
  const { walksData } = useFetchPreviousWalks();

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
      <Heading fontSize={"1.5rem"}>Order history:</Heading>
      {walksData?.map((walk) => {
        return <WalkerWalkItem walkData={walk} isAccepted={true} />;
      })}

      {(!walksData || walksData.length === 0) && (
        <Center>Sorry, nothing here yet(</Center>
      )}
    </VStack>
  );
};

export default RequestsHistory;
