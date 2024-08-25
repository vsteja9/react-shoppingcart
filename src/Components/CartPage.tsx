import { Button } from "@mui/material";
import CartItem from "./CartItem";
import { Products } from "../Context/ProductsContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

export default function CartPage() {
  const navigate = useNavigate();
  const { cartProducts, setViewDetailsClicked } =
    useContext(Products);
  const totalQuantity = cartProducts
    ?.map((obj) => obj.quantity)
    .reduce((sum, val) => sum + val, 0);
  const totalPrice = cartProducts
    ?.map((obj) => obj.totalPrice)
    .reduce((sum, val) => sum + val, 0);
  return (
    <>
      <div style={{ display: "flex" }}>
        <div
          style={{
            height: 800,

            width: 1400,
            marginTop: "50px",
            marginLeft: "50px",
            marginBottom: "50px",
            borderRadius: "15px",
            boxShadow: `0 3px 10px rgb(0 0 0 / 0.2)`,
          }}
        >
          <h2 style={{ textAlign: "center" }}>Items List</h2>
          {cartProducts?.map((cartItem) => {
            console.log("cartProducts", cartProducts);
            return <CartItem Item={cartItem} />;
          })}
        </div>
        <div
          style={{
            height: 800,

            width: 400,
            margin: "50px",
            borderRadius: "10px",
            borderWidth: "1px",
            borderColor: "ActiveBorders",
            border: `2px solid rgba(0, 0, 0, 0.05)`,
          }}
        >
          <div
            style={{
              justifyContent: "center",
              textAlign: "center",
              margin: "50px",
            }}
          >
            <h2>Order Summary</h2>
            <div style={{ paddingTop: 200 }}>
              <h2>TotalQuantity:{totalQuantity}</h2>
              <h2>TotalPrice:{totalPrice?.toFixed(2)}</h2>
            </div>
            <Button
              onClick={() => {
                navigate("/login");
              }}
              style={{
                color: "white",
                marginTop: 270,
                margin: "10px",
                background: "black",
                width: 200,
              }}
            >
              Proceed Payment
            </Button>
            <Button
              onClick={() => {
                if (setViewDetailsClicked) setViewDetailsClicked(false);
                navigate("/mainpage");
              }}
              style={{
                color: "white",
                margin: "5px",
                background: "black",
                width: 200,
              }}
            >
              Continue Shopping
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
