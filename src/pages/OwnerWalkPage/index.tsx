import { Box, Button, Flex, Image, useDisclosure } from "@chakra-ui/react";
import { FunctionComponent, useEffect, useState } from "react";
import onwer_marker from "../../assets/images/marker_owner_thumb.png";
import walker_marker from "../../assets/images/marker_walker_thumb.png";

import {
  AdvancedMarker,
  APIProvider,
  Map,
  Marker,
} from "@vis.gl/react-google-maps";

import CurrentStepComponent from "../../features/walkPageOwner/components/CurrentStepComponent";
import DefaultLayout from "../../ui/layouts/DefaultLayout";
import { useNavigate, useParams } from "react-router-dom";
import { useGetWalkById } from "../../features/walkPageOwner/hooks/useGetWalkById";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useOwnerWalkHooks } from "../../features/walks/hooks/useOwnerWalkHook";
import WalkerModal from "../../features/walkPageOwner/components/WalkerModal";

interface OnwerWalkPageProps {}

const OnwerWalkPage: FunctionComponent<OnwerWalkPageProps> = () => {
  const { id } = useParams<any>();
  const navigate = useNavigate();

  const { walkData } = useGetWalkById(id);

  const { isOpen, onClose, onOpen } = useDisclosure();

  const { confirmPickupForAWalk, finishWalk } = useOwnerWalkHooks();

  const [currentLocation, setCurrentLocation] = useState<any>({
    lat: 0,
    lng: 0,
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setCurrentLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
  }, [navigator]);

  const showSecondLocation = walkData?.status !== "new" || false;

  return (
    <DefaultLayout>
      <Box
        bg={"white"}
        borderRadius={"1rem"}
        px={"2rem"}
        pt={"1rem"}
        pb={"2rem"}
        overflow={"hidden"}
        zIndex={100}
      >
        <Button
          leftIcon={<IoIosArrowRoundBack />}
          bg={"transparent"}
          px={0}
          mb={"1rem"}
          onClick={() => {
            navigate(-1);
          }}
        >
          Back
        </Button>
        <CurrentStepComponent />
        <Flex mt={"1rem"} gap={"1rem"}>
          <Button
            bg={"black"}
            color={"white"}
            fontWeight={"400"}
            onClick={() => {
              onOpen();
            }}
          >
            Walker info
          </Button>
          {walkData?.status === "awaiting_pickup" && (
            <Button
              bg={"white"}
              color={"balck"}
              border={"1px solid black"}
              fontWeight={"400"}
              onClick={() => {
                confirmPickupForAWalk(id ?? "");
              }}
            >
              Confirm pickup
            </Button>
          )}

          {walkData?.status === "returning" && (
            <Button
              bg={"black"}
              color={"white"}
              fontWeight={"400"}
              onClick={() => {
                finishWalk(id ?? "");
              }}
            >
              Finish order
            </Button>
          )}
        </Flex>
      </Box>

      <Box h={"30rem"}>
        <Map
          zoom={12}
          center={{ lat: 49.85992, lng: 24.014483 }}
          mapId={"owner-tracker-map"}
        >
          <AdvancedMarker position={currentLocation}>
            <Image src={onwer_marker} h={"2rem"} />
          </AdvancedMarker>

          {showSecondLocation && walkData?.location && (
            <AdvancedMarker position={walkData.location}>
              <Image src={walker_marker} h={"2rem"} />
            </AdvancedMarker>
          )}
        </Map>
      </Box>
      <WalkerModal
        walkerId={walkData?.acceptedBy ?? ""}
        isOpen={isOpen}
        onClose={onClose}
      />
    </DefaultLayout>
  );
};

export default OnwerWalkPage;
