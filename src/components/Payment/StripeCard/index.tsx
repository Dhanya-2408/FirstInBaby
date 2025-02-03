import { FC } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import useObjectState from "../../../hooks/useObjectState";
import { initialFormState } from "../../../models/constants";
import { IFormState } from "../../../models/types";
import {
  Form,
  FormElement,
  FormSubmit,
  FormTextInput,
} from "../../../ui_kits/Form";
import { FormError } from "../../AuthHandler/FormError";
import { fetchData } from "../../../services/axios";
import { CARD_OPTIONS } from "./data";
import { paymentService } from "../../../services/axiosServices";
import { useNavigate } from "react-router-dom";

export interface IPaymentProps {
  name: string;
  amount: number;
  email: string;
  phoneNo: string;
  onSuccess: (id: string) => void;
}

interface IProps {
  PaymentProps: IPaymentProps;
}

export const StripeCard: FC<IProps> = (props: IProps) => {
  const { name, amount, email, phoneNo, onSuccess } = props.PaymentProps;

  const navigate = useNavigate();

  const stripe = useStripe();
  const elements = useElements() as any;

  const { obj: formState, setObj: setFormState } = useObjectState(
    initialFormState as IFormState<string>
  );

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    // Creating Payment Intent

    setFormState({
      ...formState,
      helperText: "Creating payment intent...",
      isButtonLoading: true,
      submitSuccess: true,
    });

    const { client_secret } = await fetchData({
      ...paymentService.stripePay,
      params: {
        amnt: amount,
        currency: "INR",
        method: "card",
      },
    })
      .then((res: any) => {
        return res;
      })
      .catch((error: any) => {
        setFormState({
          ...formState,
          helperText: error.message || " Payment Failed",
          submitSuccess: false,
          isButtonLoading: false,
        });
      });

    console.log("client_secret", client_secret);

    // Confirm the payment on client

    if (client_secret) {
      const paymentResult = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: name,
          },
        },
      });

      if (paymentResult.error) {
        setFormState({
          ...formState,
          helperText: paymentResult.error.message || " Payment Failed",
          submitSuccess: false,
          isButtonLoading: false,
        });
      }
      if (paymentResult?.paymentIntent?.status === "succeeded") {
        setFormState({
          ...formState,
          helperText: "Payment successful",
          submitSuccess: true,
          isButtonLoading: false,
        });
        onSuccess(paymentResult.paymentIntent.id);
        navigate("/orderconfirm");
      }
    }
  };

  const handleOnchange = () => {
    setFormState(initialFormState as IFormState<string>);
  };

  return (
    <Form onSubmit={handleSubmit} classname="Payment_Card">
      <FormError formState={formState} />
      <FormElement>
        <FormTextInput
          label="Company Name"
          type="text"
          placeholder={name}
          disabled={true}
        />
      </FormElement>
      <FormElement>
        <FormTextInput
          label="Email"
          type="email"
          placeholder={email}
          disabled={true}
        />
      </FormElement>
      <FormElement>
        <FormTextInput
          label="Phone"
          type="tel"
          placeholder={phoneNo}
          disabled={true}
        />
      </FormElement>
      <FormElement>
        <CardElement options={CARD_OPTIONS as any} onChange={handleOnchange} />
      </FormElement>
      <FormSubmit
        disabled={!stripe}
        isLoading={formState.isButtonLoading}
        isFull
      >
        {`PAY INR ${amount}`}
      </FormSubmit>
    </Form>
  );
};
