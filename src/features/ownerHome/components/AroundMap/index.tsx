import { FunctionComponent, useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";
import { Box } from "@chakra-ui/react";

interface AroundMapProps {}

const MyLocationComponent = ({ text }: any) => <div>hols</div>;

const AroundMap: FunctionComponent<AroundMapProps> = () => {
  const [defaultCoordinates, setDefaultCoordinates] = useState({
    lat: 49.85992,
    lng: 24.014483,
  });

  const defaultProps = {
    center: {
      lat: 49.85992,
      lng: 24.014483,
    },
    zoom: 12,
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setDefaultCoordinates({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
  }, []);

  return (
    <Box w={"100%"} h={"20rem"}>
      <Map center={defaultProps.center} zoom={10}>
        <Marker position={defaultCoordinates} />
      </Map>
    </Box>
  );
};

export default AroundMap;
