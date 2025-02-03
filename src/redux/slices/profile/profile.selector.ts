import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../store";

const profileSelf = (state: RootState) => state.profile;

export const selectedProfilePage = createSelector(
  [profileSelf],
  (profileState) => profileState.profilePage
);

export const customer = createSelector(
  [profileSelf],
  (profileState) => profileState.customer
);

export const plans = createSelector(
  [profileSelf],
  (profileState) => profileState.plans
);

export const orders = createSelector(
  [profileSelf],
  (profileState) => profileState.orders
);

export const subscribedPlan = createSelector(
  [profileSelf],
  (profileState) => profileState.subscribedPlan
);
