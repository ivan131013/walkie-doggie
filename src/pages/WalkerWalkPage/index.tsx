import {
  Button,
  Box,
  Text,
  Image,
  useDisclosure,
  Flex,
} from "@chakra-ui/react";
import { FunctionComponent, useEffect, useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useParams, useNavigate } from "react-router-dom";
import CurrentStepComponent from "../../features/walkPageOwner/components/CurrentStepComponent";
import { useGetWalkById } from "../../features/walkPageOwner/hooks/useGetWalkById";
import DefaultLayout from "../../ui/layouts/DefaultLayout";

import onwer_marker from "../../assets/images/marker_owner_thumb.png";
import walker_marker from "../../assets/images/marker_walker_thumb.png";

import {
  AdvancedMarker,
  APIProvider,
  Map,
  Marker,
} from "@vis.gl/react-google-maps";
import WalkerStepepr from "../../features/walkerWalkPage/components/WalkerStepper";
import OwnerAndPetInfo from "../../features/walkerWalkPage/components/OwnerAndPetInfoModal";
import { useManageWalkForWalker } from "../../features/walkerHome/hooks/useManageWalkForWalker";

interface WalkerWalkpageProps {}

const WalkerWalkpage: FunctionComponent<WalkerWalkpageProps> = () => {
  const { id } = useParams<any>();
  const navigate = useNavigate();

  const {
    walkData,
    updateWalkLocationWithMyLocation,
    notifyArrival,
    notifyReturn,
  } = useManageWalkForWalker(id);

  const {
    isOpen: isOwnerModalOpen,
    onOpen: onOwnerModalOpen,
    onClose: onOwnerModalClose,
  } = useDisclosure();

  const [currentLocation, setCurrentLocation] = useState<any>({
    lat: 0,
    lng: 0,
  });

  navigator.geolocation.getCurrentPosition((position) => {
    setCurrentLocation({
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    });

    updateWalkLocationWithMyLocation({
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    });
  });

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
        <WalkerStepepr />

        <Flex gap={"1rem"}>
          <Button
            bg={"black"}
            color={"white"}
            fontWeight={400}
            mt={"1rem"}
            onClick={() => {
              onOwnerModalOpen();
            }}
          >
            Pet and owner info
          </Button>

          {walkData?.status === "found" && (
            <Button
              bg={"white"}
              border={"1px solid black"}
              color={"black"}
              fontWeight={400}
              mt={"1rem"}
              onClick={() => {
                notifyArrival();
              }}
            >
              Notify your arrival
            </Button>
          )}

          {walkData?.status === "ongoing" && (
            <Button
              bg={"white"}
              border={"1px solid black"}
              color={"black"}
              fontWeight={400}
              mt={"1rem"}
              onClick={() => {
                notifyReturn();
              }}
            >
              Notify return
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
          {walkData?.ownerLocation && (
            <AdvancedMarker position={walkData?.ownerLocation}>
              <Image src={onwer_marker} h={"2rem"} />
            </AdvancedMarker>
          )}

          {walkData?.location && (
            <AdvancedMarker position={walkData.location}>
              <Image src={walker_marker} h={"2rem"} />
            </AdvancedMarker>
          )}
        </Map>
      </Box>
      <OwnerAndPetInfo
        ownerId={walkData?.ownerId ?? ""}
        isOpen={isOwnerModalOpen}
        onClose={onOwnerModalClose}
      />
    </DefaultLayout>
  );
};

export default WalkerWalkpage;
