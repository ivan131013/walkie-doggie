import {
  Center,
  VStack,
  Heading,
  Image,
  Avatar,
  Box,
  IconButton,
  Input,
  Text,
  Flex,
  Button,
} from "@chakra-ui/react";
import { FunctionComponent, useEffect, useMemo, useRef, useState } from "react";
import DefaultLayout from "../../ui/layouts/DefaultLayout";
import woman_dog_leash from "../../assets/images/woman_dog_leash.jpeg";
import { FiPlus } from "react-icons/fi";
import { useWalkerSignUp } from "../../features/auth/hooks/useWalkerSignUp";
import { useFirebaseAuth } from "../../features/firebaseAuth/hooks/useFirebaseAuth";
import { useNavigate } from "react-router-dom";

interface WalkerRegisterProps {}

const WalkerRegister: FunctionComponent<WalkerRegisterProps> = () => {
  const { createAccount } = useWalkerSignUp();
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState<any>({
    photo: undefined,
    email: "",
    password: "",
    phoneNumber: "",
    firstName: "",
    lastName: "",
    dateOfBirth: new Date(),
    gender: "",
    yearsOfExperience: 0,
    currentLocation: {
      lat: 0,
      lon: 0,
    },
    isActive: true,
    ratings: [],
  });

  const ref = useRef<any>();

  const hanldeCreateAccountClick = () => {
    createAccount(profileData);
  };

  const { user } = useFirebaseAuth();

  //this should be moved to a wrapper component
  useEffect(() => {
    if (user) {
      navigate("/walker-home");
    }
  }, [user]);

  const memoizedPic = useMemo(() => {
    if (profileData.photo) return URL.createObjectURL(profileData.photo);
  }, [profileData.photo]);

  return (
    <DefaultLayout>
      <Center minH={"100%"} w={"100%"} pb={"3rem"} pt={"3rem"}>
        <VStack w={"100%"} px={"2rem"} gap={"1rem"}>
          <VStack gap={0}>
            <Heading fontFamily={"Righteous"} fontSize={"2rem"}>
              Walkie-Doggie <span style={{ color: "#276EF1" }}>jobs</span>
            </Heading>
          </VStack>

          <Image src={woman_dog_leash} h={"10rem"} borderRadius={"1rem"} />
          <Box position={"relative"}>
            <Avatar
              size="2xl"
              src={
                memoizedPic
              }
            />
            <IconButton
              icon={<FiPlus />}
              aria-label={""}
              borderRadius={"50%"}
              position={"absolute"}
              bottom={"0rem"}
              right={"0rem"}
              onClick={() => {
                ref.current.click();
              }}
            />
            <Input
              display={"none"}
              type={"file"}
              accept="image/png, image/jpeg"
              ref={ref}
              onChange={(e) => {
                if (!!e.target?.files?.[0])
                  setProfileData({ ...profileData, photo: e.target.files[0] });
              }}
            />
          </Box>

          <Flex gap={"1rem"} mt={"0.5rem"}>
            <Box w={"100%"}>
              <Text fontSize={"0.9rem"}>First Name</Text>
              <Input
                variant="flushed"
                placeholder="Your first name"
                type={"text"}
                fontSize={"1rem"}
                h={"2.5rem"}
                onChange={(e) => {
                  setProfileData({ ...profileData, firstName: e.target.value });
                }}
              />
            </Box>

            <Box w={"100%"}>
              <Text fontSize={"0.9rem"}>Last Name</Text>
              <Input
                variant="flushed"
                placeholder="Your name"
                type={"text"}
                fontSize={"1rem"}
                h={"2.5rem"}
                onChange={(e) => {
                  setProfileData({ ...profileData, lastName: e.target.value });
                }}
              />
            </Box>
          </Flex>

          <Box w={"100%"}>
            <Text fontSize={"0.9rem"}>Years of experience(0 for none):</Text>
            <Input
              variant="flushed"
              placeholder=""
              type={"number"}
              min={0}
              fontSize={"1rem"}
              h={"2.5rem"}
              onChange={(e) => {
                setProfileData({
                  ...profileData,
                  phoneNumber: e.target.value,
                });
              }}
            />
          </Box>

          <Box w={"100%"}>
            <Text fontSize={"0.9rem"}>Email</Text>
            <Input
              variant="flushed"
              placeholder="sample@mail.com"
              type={"email"}
              fontSize={"1rem"}
              h={"2.5rem"}
              onChange={(e) => {
                setProfileData({ ...profileData, email: e.target.value });
              }}
            />
          </Box>
          <Box w={"100%"}>
            <Text fontSize={"0.9rem"}>Password</Text>
            <Input
              variant="flushed"
              placeholder="password"
              type={"password"}
              fontSize={"1rem"}
              h={"2.5rem"}
              onChange={(e) => {
                setProfileData({ ...profileData, password: e.target.value });
              }}
            />
          </Box>
          <Box w={"100%"}>
            <Text fontSize={"0.9rem"}>Confirm password</Text>
            <Input
              variant="flushed"
              placeholder="confirm password"
              type={"password"}
              fontSize={"1rem"}
              h={"2.5rem"}
            />
          </Box>
          <Box w={"100%"}>
            <Text fontSize={"0.9rem"}>Phone number</Text>
            <Input
              variant="flushed"
              placeholder="+380 - - - - - - - - - -"
              type={"text"}
              fontSize={"1rem"}
              h={"2.5rem"}
              onChange={(e) => {
                setProfileData({
                  ...profileData,
                  phoneNumber: e.target.value,
                });
              }}
            />
          </Box>

          <Box w={"100%"}>
            <Text fontSize={"0.9rem"}>Birthday</Text>
            <Input
              variant="flushed"
              placeholder="Your birthday"
              type={"date"}
              fontSize={"1rem"}
              h={"2.5rem"}
              onChange={(e) => {
                setProfileData({
                  ...profileData,
                  dateOfBirth: e.target.valueAsDate,
                });
              }}
            />
          </Box>

          <Flex gap={"1rem"} w={"100%"}>
            <Button
              w={"100%"}
              bg={"#97c6db"}
              fontWeight={"500"}
              color={"white"}
              fontSize={"1.1rem"}
              filter={profileData.gender === "male" ? "" : "grayscale(1)"}
              onClick={() => {
                setProfileData({ ...profileData, gender: "male" });
              }}
              _active={{}}
            >
              Male
            </Button>
            <Button
              w={"100%"}
              bg={"#cf5bb9"}
              fontWeight={"500"}
              color={"white"}
              fontSize={"1.1rem"}
              filter={profileData.gender === "female" ? "" : "grayscale(1)"}
              onClick={() => {
                setProfileData({ ...profileData, gender: "female" });
              }}
              _active={{}}
            >
              Female
            </Button>
          </Flex>

          <Button
            bg={"black"}
            color={"white"}
            w={"100%"}
            fontWeight={"500"}
            fontSize={"1rem"}
            h={"3rem"}
            mt={"2rem"}
            onClick={hanldeCreateAccountClick}
          >
            Create an job account
          </Button>
        </VStack>
      </Center>
    </DefaultLayout>
  );
};

export default WalkerRegister;
