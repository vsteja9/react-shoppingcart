import { Button, Grid } from "@mui/material";
import { cartItem } from "../Context/ProductsContext";

export default function CartItem({ Item }: { Item: cartItem }) {
  return (
    <>
      <Grid
        container
        sm={10}
        marginLeft={9}
        marginBottom={3}
        style={{
          boxShadow: `0 3px 10px rgb(0 0 0 / 0.2)`,
          borderRadius: "20px",
          padding: "100",
          justifyContent: "space-between",
        }}
      >
        <Grid
          item
          style={{
            textAlign: "center",
            justifyContent: "center",
            paddingLeft: 50,
          }}
        >
          <img
            src={Item.product.thumbnail}
            height={100}
            width={100}
            alt=""
            style={{ justifyContent: "center", alignContent: "center" }}
          />
        </Grid>
        <Grid item style={{ textAlign: "center", alignContent: "center" }}>
          <h4>{Item.product.title}</h4>
        </Grid>
        <Grid item>
          <h4>Quantity:{Item.quantity}</h4>
          <h4>Price:{Item.totalPrice.toFixed(2)}</h4>
        </Grid>
        <Grid item alignContent={"center"}>
          <Button
            size="small"
            style={{
              color: "white",
              background: "black",
              height: 30,
              margin: 20,
              padding: 10,
              textAlign: "center",
            }}
          >
            Remove
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
