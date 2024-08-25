import { Alert, Box, Grid, LinearProgress } from "@mui/material";
import ItemTile from "./ItemTile";
import { Fragment } from "react/jsx-runtime";
import { useContext } from "react";
import { cartItem, Products } from "../Context/ProductsContext";
import ItemDialog from "./ItemDialog";

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
};
export default function MainPage() {
  const { data, isLoading, error, viewDetailsclicked } =
    useContext<productsData>(Products);
  // console.log(setViewDetailsClicked);
  console.log("data from mainpage", data);

  if (isLoading) return <LinearProgress />;

  if (error) return <Alert severity="error">{error.message}</Alert>;
  // FetchCartDetails();
  return (
    <Fragment>
      <div className="App">React Shopping Cart</div>
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
  );
}
