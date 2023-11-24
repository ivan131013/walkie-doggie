import { Box, Button, Image } from "@chakra-ui/react";
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

interface OnwerWalkPageProps {}

const OnwerWalkPage: FunctionComponent<OnwerWalkPageProps> = () => {
  const { id } = useParams<any>();
  const navigate = useNavigate();

  const { walkData } = useGetWalkById(id);

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
      </Box>

      <Box h={"30rem"}>
        <Map
          zoom={10}
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
    </DefaultLayout>
  );
};

export default OnwerWalkPage;
