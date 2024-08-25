import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
} from "@mui/material";
import { useContext } from "react";
import { cartItem, Products } from "../Context/ProductsContext";
import { useNavigate } from "react-router-dom";

export default function ItemTile({ product }: any) {
  const navigate = useNavigate();
  const {
    setViewDetailsClicked,
    setSelectedProduct,
    cartProducts,
    setCartProducts,
  } = useContext(Products);
  console.log("product value", product);

  function handleViewDetails(e: any) {
    console.log("clicked view details", product.id);
    if (setSelectedProduct) setSelectedProduct(product);
    if (setViewDetailsClicked) setViewDetailsClicked(true);
    // navigate("/ItemDialog");
  }
  function handleAddCart() {
    let flag = 0;
    if (setCartProducts) {
      if (cartProducts) {
        const existedProducts = cartProducts.map((obj: cartItem) => {
          if (obj.product.title === product.title) {
            flag = 1;
            obj.quantity = obj.quantity + 1;
            obj.totalPrice = obj.totalPrice + product.price;
          }
          return obj;
        });
        console.log("existedProducts", existedProducts);
        setCartProducts([...existedProducts]);
      } else {
        setCartProducts([
          {
            product: product,
            quantity: 1,
            totalPrice: product.price,
          },
        ]);
      }
      if (flag !== 1 && cartProducts)
        setCartProducts([
          ...cartProducts,
          {
            product: product,
            quantity: 1,
            totalPrice: product.price,
          },
        ]);
    }
    navigate("/CartPage");
  }
  return (
    <>
      <Grid
        item
        sx={{
          padding: "20px",
          alignContent: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <Card sx={{ boxShadow: `0 3px 10px rgb(0 0 0 / 0.2)` }}>
          <CardContent component={"image"}>
            <Box
              fontStyle={"oblique"}
              fontFamily={"cursive"}
              fontWeight={"bold"}
            >
              {product.title}
            </Box>
            <Box
              component="img"
              sx={{
                height: 233,
                margin: "20px",
                width: 350,
                justifyContent: "center",
                alignItems: "center",
                maxHeight: { xs: 233, md: 167 },
                maxWidth: { xs: 350, md: 250 },
              }}
              alt="Image temp"
              src={product.thumbnail}
            />
          </CardContent>
          <CardActions
            sx={{
              justifyContent: "center",
              alignItems: "center",
              paddingBottom: "15px",
            }}
          >
            <Button
              onClick={handleViewDetails}
              style={{ background: "black", color: "white" }}
            >
              View Details
            </Button>
            <Button
              onClick={handleAddCart}
              style={{ background: "black", color: "white" }}
            >
              Add to Cart
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </>
  );
}
