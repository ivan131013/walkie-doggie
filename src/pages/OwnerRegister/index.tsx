import {
  Center,
  Heading,
  VStack,
  Text,
  Image,
  Input,
  Box,
  Flex,
  Divider,
  Button,
  IconButton,
} from "@chakra-ui/react";
import { FunctionComponent, useEffect, useMemo, useState } from "react";
import { IoMdClose } from "react-icons/io";
import DefaultLayout from "../../ui/layouts/DefaultLayout";
import twoDogs from "../../assets/images/two_dogs_keys.webp";
import { useSignUp } from "../../features/auth/hooks/useSignUp";
import { useFirebaseAuth } from "../../features/firebaseAuth/hooks/useFirebaseAuth";
import { useNavigate } from "react-router-dom";

interface OwnerRegisterProps {}

const OwnerRegister: FunctionComponent<OwnerRegisterProps> = () => {
  const { createAccount } = useSignUp();
  const navigate = useNavigate();

  const { user } = useFirebaseAuth();

  //this should be moved to a wrapper component
  useEffect(() => {
    if (user) {
      navigate("/owner-home");
    }
  }, [user]);

  const [profileData, setProfileData] = useState<any>({
    email: "",
    password: "",
    phoneNumber: "",
    name: "",
    dogGender: "",
    dogName: "",
    breed: "",
    weight: 0,
    age: 0,
    photo: undefined,
  });

  const memoizedPic = useMemo(() => {
    if (profileData.photo) return URL.createObjectURL(profileData.photo);
    return undefined;
  }, [profileData.photo]);

  const hanldeCreateAccountClick = () => {
    createAccount(profileData);
  };

  return (
    <DefaultLayout>
      <Center minH={"100%"} w={"100%"} pb={"3rem"} pt={"3rem"}>
        <VStack w={"100%"} px={"2rem"}>
          <Heading fontFamily={"Righteous"} fontSize={"2rem"}>
            Walkie-Doggie
          </Heading>
          <Image src={twoDogs} h={"10rem"} />
          <Heading w={"100%"} textAlign={"center"} fontSize={"1.8rem"}>
            Create an acconut
          </Heading>
          <Text mb={"1rem"}>
            Please provide a little information about you and your pet
          </Text>

          <VStack w={"100%"} alignItems={"stretch"} gap={"1rem"}>
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
              <Text fontSize={"0.9rem"}>Name</Text>
              <Input
                variant="flushed"
                placeholder="Your name"
                type={"text"}
                fontSize={"1rem"}
                h={"2.5rem"}
                onChange={(e) => {
                  setProfileData({ ...profileData, name: e.target.value });
                }}
              />
            </Box>

            <Text mt={"2rem"}>Now a little about your friend:</Text>

            <Flex gap={"1rem"}>
              <Button
                w={"100%"}
                bg={"#97c6db"}
                fontWeight={"500"}
                color={"white"}
                fontSize={"1.1rem"}
                filter={profileData.dogGender === "male" ? "" : "grayscale(1)"}
                onClick={() => {
                  setProfileData({ ...profileData, dogGender: "male" });
                }}
              >
                Male
              </Button>
              <Button
                w={"100%"}
                bg={"#cf5bb9"}
                fontWeight={"500"}
                color={"white"}
                fontSize={"1.1rem"}
                filter={
                  profileData.dogGender === "female" ? "" : "grayscale(1)"
                }
                onClick={() => {
                  setProfileData({ ...profileData, dogGender: "female" });
                }}
              >
                Female
              </Button>
            </Flex>

            <Box w={"100%"}>
              <Text fontSize={"0.9rem"}>Your pet's name:</Text>
              <Input
                variant="flushed"
                placeholder="Pet's name"
                type={"text"}
                fontSize={"1rem"}
                h={"2.5rem"}
                onChange={(e) => {
                  setProfileData({ ...profileData, dogName: e.target.value });
                }}
              />
            </Box>

            <Box w={"100%"}>
              <Text fontSize={"0.9rem"}>Your pet's breed:</Text>
              <Input
                variant="flushed"
                placeholder="Pet's breed"
                type={"text"}
                fontSize={"1rem"}
                h={"2.5rem"}
                onChange={(e) => {
                  setProfileData({ ...profileData, breed: e.target.value });
                }}
              />
            </Box>

            <Flex w={"100%"} gap={"1rem"}>
              <Box w={"100%"}>
                <Text fontSize={"0.9rem"}>Weight:</Text>
                <Input
                  variant="flushed"
                  placeholder="kg"
                  type={"number"}
                  fontSize={"1rem"}
                  h={"2.5rem"}
                  onChange={(e) => {
                    setProfileData({
                      ...profileData,
                      weight: e.target.valueAsNumber,
                    });
                  }}
                />
              </Box>

              <Box w={"100%"}>
                <Text fontSize={"0.9rem"}>Age:</Text>
                <Input
                  variant="flushed"
                  placeholder="years"
                  type={"number"}
                  fontSize={"1rem"}
                  h={"2.5rem"}
                  onChange={(e) => {
                    setProfileData({
                      ...profileData,
                      age: e.target.valueAsNumber,
                    });
                  }}
                />
              </Box>
            </Flex>

            <Box>
              <Text fontSize={"0.9rem"}>Add some pictures of your pet: </Text>
              {!profileData.photo && (
                <Input
                  type={"file"}
                  fontSize={"1rem"}
                  onChange={(e) => {
                    setProfileData({
                      ...profileData,
                      photo: e.target.files?.[0],
                    });
                  }}
                />
              )}
              {profileData.photo && (
                <Box position={"relative"}>
                  <IconButton
                    aria-label={""}
                    icon={<IoMdClose />}
                    position={"absolute"}
                    top={"1rem"}
                    right={"1rem"}
                    onClick={() => {
                      setProfileData({ ...profileData, photo: undefined });
                    }}
                    bg={"gray.100"}
                  />
                  <Image src={memoizedPic} />
                </Box>
              )}
            </Box>
          </VStack>

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
            Create an account
          </Button>
        </VStack>
      </Center>
    </DefaultLayout>
  );
};

export default OwnerRegister;
