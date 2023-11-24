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
import { useGetWalkById } from "../../hooks/useGetWalkById";

interface CurrentStepComponentProps {}

const steps = [
  { title: "Searching", description: "Looking for a walker in your area" },
  { title: "Found", description: "Walker is on their way to you" },
  { title: "Waiting", description: "Walker is here to pick up your pet" },
  { title: "In progress", description: "Your dog is being WALKED" },
  {
    title: "Returning",
    description: "Pick up your pet please",
  },
];

const CurrentStepComponent: FunctionComponent<
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

export default CurrentStepComponent;
