import { Box } from "@chakra-ui/react";
import { FunctionComponent } from "react";
import ElementsWrapper from "../../features/payments/components/ElementsWrapper";
import OwnerPayment from "../../features/payments/components/OwnerPayment";
import DefaultLayout from "../../ui/layouts/DefaultLayout";

interface CheckoutProps {}

const Checkout: FunctionComponent<CheckoutProps> = () => {
  return (
    <DefaultLayout>
      <Box p={"2rem"}>
        <ElementsWrapper>
          <OwnerPayment />
        </ElementsWrapper>
      </Box>
    </DefaultLayout>
  );
};

export default Checkout;
