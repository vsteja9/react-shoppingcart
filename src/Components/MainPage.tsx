import { Alert, Box, Grid, LinearProgress } from "@mui/material";
import ItemTile from "./ItemTile";
import { Fragment } from "react/jsx-runtime";
import { useContext, useState } from "react";
import { cartItem, Products } from "../Context/ProductsContext";
import ItemDialog from "./ItemDialog";
import NavBar from "./NavBar";
import "./MainPage.css";
import LandingPage, { CollectionData } from "./LandingPage";

export type productsData = {
  data: any;
  isLoading: boolean;
  error: any;
  viewDetailsclicked?: boolean;
  setViewDetailsClicked?: (value: boolean) => void;
  selectedProduct?: any;
  setSelectedProduct?: (value: any) => void;
  cartProducts?: cartItem[];
  setCartProducts?: (value: cartItem[]) => void;
  isCollection: boolean;
  setIsCollection: (value: boolean) => void;
  collectionData: CollectionData;
  setCollectionData: (value: CollectionData) => void;
};

export default function MainPage() {
  const { data, isLoading, error, viewDetailsclicked } =
    useContext<productsData>(Products);
  const [isStore, setIsStore] = useState(false);
  if (isLoading) return <LinearProgress />;
  if (error) return <Alert severity="error">{error.message}</Alert>;
  // FetchCartDetails();
  return (
    <>
      <NavBar setIsStore={setIsStore} />
      {isStore ? (
        <Fragment>
          <Box className="AllProducts">
            {viewDetailsclicked && <ItemDialog />}
            <Grid
              container
              style={{ alignContent: "center", justifyContent: "center" }}
            >
              {data &&
                data.products.map((product: any) => {
                  return <ItemTile product={product} />;
                })}
            </Grid>
          </Box>
        </Fragment>
      ) : (
        <LandingPage />
      )}
    </>
  );
}
