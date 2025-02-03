import classNames from "classnames";
import { useEffect, useState } from "react";
import { Panel } from "../../../../ui_kits/Panel/Panel";
import { IPlan } from "../../../../redux/slices/profile/profile.type";
import { useAppDispatch, useAppSelector } from "../../../../redux/store";
import {
  customer,
  plans,
} from "../../../../redux/slices/profile/profile.selector";
import { PageContent } from "../../../../ui_kits/global/PageContent.styles";
import {
  fetchPlansAsync,
  updateSubscriptionPlanAsync,
} from "../../../../redux/slices/profile/profile.reducer";
import "./Style.scss";
import { IPaymentProps, StripeCard } from "../../../Payment/StripeCard";

export const Subscribe = () => {
  const { data: plansInfo } = useAppSelector(plans);
  const { data: userData } = useAppSelector(customer);
  const dispatch = useAppDispatch();

  const [selectedPlan, setSelectedPlan] = useState<null | IPlan>(null);

  const onPaymentSuccess = async (txnId: any) => {
    const paymentOptions = {
      plan: selectedPlan?.planName,
      email: userData?.email,
      pstatus: "success",
    };
    dispatch(updateSubscriptionPlanAsync(paymentOptions));
  };

  const handleOnClick = (plan: IPlan) => {
    setSelectedPlan(plan);
  };

  useEffect(() => {
    if (!plansInfo) {
      dispatch(fetchPlansAsync());
    }
  }, [dispatch]);

  const PaymentProps = {
    name: userData?.fname,
    amount: selectedPlan?.planAmount,
    email: userData?.email,
    phoneNo: userData?.uPhone,
    onSuccess: onPaymentSuccess,
  };

  return (
    <PageContent>
      <Panel title="Subscribe to get more offers">
        <div className="Grid">
          {plansInfo?.map((plan: IPlan) => (
            <div
              className="Grid__Cell 1/1--phone 1/3--tablet-and-up 1/3--desk"
              key={plan.planID}
              onClick={() => handleOnClick(plan)}
            >
              <div
                className={classNames("Plan_Element", {
                  "Plan_Element--isActive":
                    plan.planID === selectedPlan?.planID,
                })}
              >
                <img src={plan.imageUrl} alt={plan.planName}></img>
                <h5 className="Heading Text--highlight">{plan.planName}</h5>
                <h4 className="Heading Text--highlight">
                  Rs. {plan.planAmount}
                </h4>
              </div>
            </div>
          ))}
        </div>
      </Panel>
      {selectedPlan && (
        <Panel title="Activate Your Plan">
          <StripeCard PaymentProps={PaymentProps as IPaymentProps} />
        </Panel>
      )}
    </PageContent>
  );
};
