import { Center, VStack, Image, Heading, Button } from "@chakra-ui/react";
import { FunctionComponent } from "react";
import dog_woman from "../../assets/images/woman_dog 11.svg";
import { MdArrowRightAlt } from "react-icons/md";
import logo_ne from "../../assets/images/logo_one_line.svg";
import DefaultLayout from "../../ui/layouts/DefaultLayout";
import { useNavigate } from "react-router-dom";
import { useFetchOwnerUser } from "../../features/firebase/hooks/useFetchOwnerUser";

interface GemeralGreetingPageProps {}

const GemeralGreetingPage: FunctionComponent<GemeralGreetingPageProps> = () => {
  const navigate = useNavigate();
  useFetchOwnerUser();

  return (
    <DefaultLayout>
      <Center
        bg={"#276EF1"}
        h={"100%"}
        w={"100vw"}
        flexDir={"column"}
        pt={"6rem"}
        pb={"3rem"}
        justifyContent={"space-between"}
        px={"2rem"}
      >
        <Image src={logo_ne} />
        <VStack>
          <Center
            bg={"white"}
            borderRadius={"50%"}
            w={"70vw"}
            aspectRatio={"1/1"}
          >
            <Image src={dog_woman} h={"80%"} />
          </Center>
          <Heading color={"white"} fontSize={"2.15rem"} fontWeight={"600"}>
            Get your dog walked!
          </Heading>
        </VStack>

        <Button
          bg={"black"}
          color={"white"}
          rightIcon={<MdArrowRightAlt />}
          w={"100%"}
          fontSize={"1rem"}
          fontWeight={"500"}
          py={"1rem"}
          h={"auto"}
          onClick={() => {
            navigate("/login");
          }}
        >
          Get started
        </Button>
      </Center>
    </DefaultLayout>
  );
};

export default GemeralGreetingPage;
