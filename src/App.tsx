import "./App.scss";
import Routes from "./routes";
import "./assets/scss/style.scss";
import "slick-carousel/slick/slick.css";
import "semantic-ui-css/semantic.min.css";
import { Fragment, useEffect } from "react";
import "slick-carousel/slick/slick-theme.css";
import { useAppDispatch } from "./redux/store";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { useAuth } from "./contexts/AuthContext";
import LayoutWrapper from "./layout/LayoutWrapper";
import NavigationScroll from "./ui_kits/NavigationScroll";
import { ScrollTop } from "./ui_kits/ScrollTop/ScrollTop";
import ModalManager from "./ui_kits/modal/modal-manager.component";
import { fetchCategoriesAsync } from "./redux/slices/nav/nav.reducer";
import { fetchCustomerAsync } from "./redux/slices/profile/profile.reducer";

// style + assets
import {
  fetchShopByCollectionAsync,
  fetchShopByPdtsAsync,
  fetchHotDealsCollectionAsync,
  fetchFeaturedCollectionAsync,
  fetchHotSaleCollectionAsync,
  fetchInstaCollectionAsync,
} from "./redux/slices/home/home.reducer";

function App() {
  const { user } = useAuth();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCategoriesAsync());
  }, [dispatch]);

  // useEffect(() => {
  //   dispatch(fetchAllProductsAsync());
  // }, [dispatch]);

  // Home Screen

  // useEffect(() => {
  //   dispatch(fetchShopByCollectionAsync());
  // }, [dispatch]);

  // useEffect(() => {
  //   dispatch(fetchShopByPdtsAsync());
  // }, [dispatch]);

  // useEffect(() => {
  //   dispatch(fetchHotDealsCollectionAsync());
  // }, [dispatch]);

  // useEffect(() => {
  //   dispatch(fetchFeaturedCollectionAsync());
  // }, [dispatch]);

  // useEffect(() => {
  //   dispatch(fetchHotSaleCollectionAsync());
  // }, [dispatch]);

  // useEffect(() => {
  //   dispatch(fetchInstaCollectionAsync());
  // }, [dispatch]);

  // Profile

  // useEffect(() => {
  //   if (user) {
  //     dispatch(fetchCustomerAsync(user));
  //   }
  // }, [dispatch, user]);

  return (
    <Fragment>
      <ScrollTop />
      <ToastContainer />
      <ModalManager />
      <LayoutWrapper>
        <NavigationScroll>
          <Routes />
        </NavigationScroll>
      </LayoutWrapper>
    </Fragment>
  );
}

export default App;
