import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Divider,
  Grid,
} from "@mui/material";
import { useContext, useState } from "react";
import { cartItem, Products } from "../Context/ProductsContext";
import { useNavigate } from "react-router-dom";

export default function ItemDialog() {
  const navigate = useNavigate();
  const {
    viewDetailsclicked,
    setViewDetailsClicked,
    selectedProduct,
    cartProducts,
    setCartProducts,
  } = useContext(Products);
  const [quantity, setQuantity] = useState(0);
  const handleClick = () => {
    if (setViewDetailsClicked) setViewDetailsClicked(false);
  };
  const handleMinus = () => {
    setQuantity(quantity - 1);
    handleMinusCartProducts();
  };
  const handlePlus = () => {
    setQuantity(quantity + 1);
    handlePlusCartProducts();
  };
  function handleMinusCartProducts() {
    if (cartProducts) {
      let modifiedList = cartProducts.map((obj: cartItem) => {
        if (obj.product.title === selectedProduct.title) {
          obj.quantity = obj.quantity - 1;
          obj.totalPrice = obj.totalPrice - selectedProduct.price;
        }
        return obj;
      });
      if (setCartProducts) setCartProducts([...modifiedList]);
    }
    // if (flag === 0 || !cartProducts) {
    //   if (setCartProducts)
    //     setCartProducts([
    //       {
    //         product: selectedProduct,
    //         quantity: 1,
    //         totalPrice: selectedProduct.price,
    //       },
    //     ]);
    // }
  }
  function handlePlusCartProducts() {
    let flag = 0;
    if (cartProducts) {
      let modifiedList = cartProducts.map((obj: cartItem) => {
        if (obj.product.title === selectedProduct.title) {
          flag = 1;
          obj.quantity = obj.quantity + 1;
          obj.totalPrice = obj.totalPrice + selectedProduct.price;
        }
        return obj;
      });
      if (setCartProducts) setCartProducts([...modifiedList]);
    }
    if (flag === 0 || !cartProducts) {
      if (setCartProducts)
        setCartProducts([
          {
            product: selectedProduct,
            quantity: 1,
            totalPrice: selectedProduct.price,
          },
        ]);
    }
  }
  // useEffect(() => {
  //   handleMinusCartProducts();
  // }, [quantity]);
  // useEffect(() => {
  //   handlePlusCartProducts();
  // }, [quantity]);
  return (
    <>
      {viewDetailsclicked && (
        <Dialog open fullWidth>
          <DialogContent>
            <Grid container style={{}}>
              <Grid item>
                <img src={selectedProduct.thumbnail} alt="" />
              </Grid>
              <Grid
                item
                sm
                style={{
                  justifyContent: "center",
                  textAlign: "center",
                  marginTop: 20,
                }}
              >
                <h2>
                  $
                  {quantity > 0
                    ? quantity * selectedProduct.price
                    : selectedProduct.price}
                </h2>
                <h3>Quantity:{quantity}</h3>

                <Button
                  size="small"
                  style={{ color: "black" }}
                  variant="outlined"
                  disabled={quantity === 0 ? true : false}
                  onClick={handleMinus}
                >
                  -
                </Button>

                {` ${quantity}  `}

                <Button
                  size="small"
                  style={{ color: "black" }}
                  variant="outlined"
                  onClick={handlePlus}
                >
                  +
                </Button>
                <Divider
                  aria-hidden={true}
                  style={{ margin: 40, color: "white", background: "white" }}
                />
                {quantity > 0 && (
                  <Button
                    style={{ color: "white", background: "black" }}
                    variant="outlined"
                    onClick={() => {
                      let flag = 0;
                      if (setCartProducts) {
                        if (cartProducts) {
                          const existedProducts = cartProducts.map((obj) => {
                            if (obj.product.title === selectedProduct.title) {
                              flag = 1;
                              obj.quantity = obj.quantity + quantity - 1;
                              obj.totalPrice =
                                obj.totalPrice +
                                quantity * selectedProduct.price;
                            }
                            return obj;
                          });
                          setCartProducts([...existedProducts]);
                        } else
                          setCartProducts([
                            {
                              product: selectedProduct,
                              quantity: 1,
                              totalPrice: selectedProduct.price,
                            },
                          ]);
                        if (flag !== 1 && cartProducts) {
                          setCartProducts([
                            ...cartProducts,
                            {
                              product: selectedProduct,
                              quantity: 1,
                              totalPrice: selectedProduct.price,
                            },
                          ]);
                        }
                      }
                      navigate("/CartPage");
                    }}
                  >
                    Go To Cart
                  </Button>
                )}
              </Grid>
            </Grid>
            <h2
              style={{
                textAlign: "center",
                justifyContent: "center",
              }}
            >
              {selectedProduct.title}
            </h2>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClick}>Close</Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
}
