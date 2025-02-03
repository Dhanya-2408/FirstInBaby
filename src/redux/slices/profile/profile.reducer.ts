import { fetchData } from "../../../services/axios";
import { profileService } from "../../../services/axiosServices";
import { createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  ICustomer,
  IOrder,
  IPlan,
  IProfileState,
  ISubscribedPlan,
  profileMenu,
} from "./profile.type";

export const fetchCustomerAsync = createAsyncThunk<ICustomer, string>(
  "profile/getCustomer",
  async (email, { rejectWithValue }) => {
    try {
      const response = (await fetchData({
        ...profileService.getCustomerbyIdEmail,
        url : `${profileService.getCustomerbyIdEmail.url}/${email}`
        // params: { email },
      })) as ICustomer;
      return response;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const fetchOrderAsync = createAsyncThunk<IOrder, any>(
  "profile/getOrder",
  async (data, { rejectWithValue }) => {
    try {
      const response = (await fetchData({
        ...profileService.getOrder,
        url: `${profileService.getOrder.url}/${data.email}/${data.offset}/${data.pagesize}`,
      })) as IOrder;
      return response;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const placeOrderAsync = createAsyncThunk<any, any>(
  "profile/postOrder",
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetchData({
        ...profileService.placeOrder,
        params: data,
      });
      await dispatch(fetchOrderAsync(data.email));
      return response;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const fetchPlansAsync = createAsyncThunk<IPlan[]>(
  "profile/getPlans",
  async (_arg, { rejectWithValue }) => {
    try {
      const response = (await fetchData(profileService.plans)) as IPlan[];
      return response;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const fetchSubscribedPlanAsync = createAsyncThunk<
  ISubscribedPlan,
  string
>("profile/getSubscribedPlan", async (email, { rejectWithValue }) => {
  try {
    const response = (await fetchData({
      ...profileService.getSubscription,
      params: { cusId: email },
    })) as ISubscribedPlan;
    return response;
  } catch (err) {
    return rejectWithValue(err);
  }
});

export const updateSubscriptionPlanAsync = createAsyncThunk<any, any>(
  "profile/updateSubscriptionPost",
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetchData({
        ...profileService.updateSubscriptionPlan,
        params: data,
      });
      await dispatch(fetchSubscribedPlanAsync(data.cusId));
      return response;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const profileReducer = {
  setProfilePage: (
    state: IProfileState,
    { payload }: PayloadAction<profileMenu>
  ): void => {
    state.profilePage = payload;
  },
};

export const extraProfileReducer = {
  [fetchCustomerAsync.pending.type]: (state: IProfileState) => {
    state.customer.loading = true;
  },
  [fetchCustomerAsync.fulfilled.type]: (
    state: IProfileState,
    { payload }: PayloadAction<ICustomer>
  ) => {
    state.customer.loading = false;
    state.customer.data = payload;
  },
  [fetchCustomerAsync.rejected.type]: (state: IProfileState) => {
    state.customer.loading = false;
    state.customer.error = "Error while fetching customer data";
  },
  [fetchPlansAsync.pending.type]: (state: IProfileState) => {
    state.plans.loading = true;
  },
  [fetchPlansAsync.fulfilled.type]: (
    state: IProfileState,
    { payload }: PayloadAction<IPlan[]>
  ) => {
    state.plans.loading = false;
    state.plans.data = payload;
  },
  [fetchPlansAsync.rejected.type]: (state: IProfileState) => {
    state.plans.loading = false;
    state.plans.error = "Error while fetching plans data";
  },
  [fetchOrderAsync.pending.type]: (state: IProfileState) => {
    state.orders.loading = true;
  },
  [fetchOrderAsync.fulfilled.type]: (
    state: IProfileState,
    { payload }: PayloadAction<IOrder>
  ) => {
    state.orders.loading = false;
    state.orders.data = payload;
  },
  [fetchOrderAsync.rejected.type]: (state: IProfileState) => {
    state.orders.loading = false;
    state.orders.error = "Error while fetching orders data";
  },
  [fetchSubscribedPlanAsync.pending.type]: (state: IProfileState) => {
    state.subscribedPlan.loading = true;
  },
  [fetchSubscribedPlanAsync.fulfilled.type]: (
    state: IProfileState,
    { payload }: PayloadAction<ISubscribedPlan>
  ) => {
    state.subscribedPlan.loading = false;
    state.subscribedPlan.data = payload;
  },
  [fetchSubscribedPlanAsync.rejected.type]: (state: IProfileState) => {
    state.subscribedPlan.loading = false;
    state.subscribedPlan.error = "Error while fetching subscribed plan data";
  },
};
