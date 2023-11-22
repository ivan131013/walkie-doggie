import {
  Center,
  Heading,
  VStack,
  Image,
  Input,
  Button,
} from "@chakra-ui/react";
import { FunctionComponent, useEffect, useState } from "react";
import DefaultLayout from "../../ui/layouts/DefaultLayout";
import woman_dog_winter from "../../assets/images/woman_dog_winter.jpeg";
import { useNavigate } from "react-router-dom";
import { useFetchOwnerUser } from "../../features/firebase/hooks/useFetchOwnerUser";
import { useFetchWalkerUser } from "../../features/firebase/hooks/useFetchWalkerUser";
import { useFirebaseAuth } from "../../features/firebaseAuth/hooks/useFirebaseAuth";

interface LoginPageProps {}

const LoginPage: FunctionComponent<LoginPageProps> = () => {
  const navigate = useNavigate();
  const { signIn } = useFirebaseAuth();

  const { userData: ownerUser } = useFetchOwnerUser();
  const { userData: walkerUser } = useFetchWalkerUser();

  const [credentials, setCredentials] = useState<any>({
    email: "",
    password: "",
  });

  const hanldeLoginClick = () => {
    signIn(credentials.email, credentials.password);
  };

  //this should be moved to a wrapper component
  //i think
  useEffect(() => {
    if (ownerUser) {
      navigate("/owner-home");
    }
    if (walkerUser) {
      navigate("/walker-home");
    }
  }, [ownerUser, walkerUser]);

  return (
    <>
      <DefaultLayout>
        <Center h={"100%"} w={"100%"}>
          <VStack w={"100%"}>
            <Image src={woman_dog_winter} w={"80vw"} />
            <Heading fontFamily={"Righteous"} fontSize={"2rem"}>
              Walkie-Doggie
            </Heading>

            <VStack w={"100%"} p={"2rem"} gap={"1rem"}>
              <Input
                variant="flushed"
                placeholder="Email"
                type={"email"}
                onChange={(e) => {
                  setCredentials({ ...credentials, email: e.target.value });
                }}
              />
              <Input
                variant="flushed"
                placeholder="Password"
                type={"password"}
                onChange={(e) => {
                  setCredentials({ ...credentials, password: e.target.value });
                }}
              />
              <Button
                bg={"black"}
                color={"white"}
                w={"100%"}
                mt={"1.5rem"}
                py={"1.5rem"}
                fontWeight={"500"}
                onClick={() => {
                  hanldeLoginClick();
                }}
              >
                Login
              </Button>
              <Button
                variant={"transparent"}
                fontWeight={"400"}
                onClick={() => {
                  navigate("/owner-sign-up");
                }}
              >
                Create an account
              </Button>
            </VStack>
          </VStack>

          <Button
            variant={"transparent"}
            fontWeight={"400"}
            fontSize={"1rem"}
            color={"#276EF1"}
            position={"absolute"}
            bottom={"2rem"}
          >
            Dog walker sign up
          </Button>
        </Center>
      </DefaultLayout>
    </>
  );
};

export default LoginPage;
