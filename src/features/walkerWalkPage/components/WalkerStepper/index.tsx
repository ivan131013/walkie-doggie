import {
    Box,
    Step,
    StepDescription,
    StepIcon,
    StepIndicator,
    StepNumber,
    Stepper,
    StepSeparator,
    StepStatus,
    StepTitle,
    useSteps,
  } from "@chakra-ui/react";
  import { FunctionComponent, useEffect } from "react";
  import { useParams } from "react-router-dom";
import { useGetWalkById } from "../../../walkPageOwner/hooks/useGetWalkById";
  
  interface CurrentStepComponentProps {}
  
  const steps = [
    { title: "Accepted", description: "You have accepted an order" },
    { title: "En route", description: "Go meet the dog's owner" },
    { title: "Waiting", description: "We will notify owner about your arrival" },
    { title: "In progress", description: "WALK THE DOG" },
    {
      title: "Returning",
      description: "Return the dog",
    },
  ];
  
  const WalkerStepepr: FunctionComponent<
    CurrentStepComponentProps
  > = () => {
    const { id } = useParams<any>();
  
    const { walkData } = useGetWalkById(id ?? "");
  
    const { activeStep, setActiveStep } = useSteps({
      index: 0,
      count: steps.length,
    });
  
    useEffect(() => {
      if (walkData) {
        if (walkData.status === "new") {
          setActiveStep(0);
        }
  
        if (walkData.status === "found") {
          setActiveStep(1);
        }
  
        if (walkData.status === "awaiting_pickup") {
          setActiveStep(2);
        }
  
        if (walkData.status === "ongoing") {
          setActiveStep(3);
        }
  
        if (walkData.status === "returning") {
          setActiveStep(4);
        }
        if (walkData.status === "finished") {
          setActiveStep(5);
        }
      }
    }, [walkData]);
  
    return (
      <Stepper
        index={activeStep}
        orientation="vertical"
        height="400px"
        gap="0"
        fontSize={".875rem"}
      >
        {steps.map((step, index) => (
          <Step key={index}>
            <StepIndicator>
              <StepStatus
                complete={<StepIcon />}
                incomplete={<StepNumber />}
                active={<StepNumber />}
              />
            </StepIndicator>
  
            <Box flexShrink="0">
              <StepTitle>{step.title}</StepTitle>
              <StepDescription>{step.description}</StepDescription>
            </Box>
  
            <StepSeparator />
          </Step>
        ))}
      </Stepper>
    );
  };
  
  export default WalkerStepepr;
  