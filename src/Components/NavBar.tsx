import { Avatar, Button, Typography } from "@mui/material";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { Products } from "../Context/ProductsContext";
import { deepOrange } from "@mui/material/colors";
import search from "../Images/search.png";
import axios from "axios";
export default function NavBar({
  setIsStore,
}: {
  setIsStore: (val: any) => void;
}) {
  const navigate = useNavigate();
  const [searchKey, setSearchKey] = useState("");
  const { cartProducts, setCollectionData, setIsCollection } =
    useContext(Products);
  const handleSearch = async () => {
    const searchResult = await axios.get(
      `https://dummyjson.com/products/search?q=${searchKey}`
    );
    console.log("key", searchKey, "data", searchResult.data);
    setIsCollection(true);
    setCollectionData(searchResult.data);
    setSearchKey("");
  };

  const cartLength =
    cartProducts?.length !== 0 ? `(${cartProducts?.length})` : "";
  return (
    <div className="navbar">
      <div></div>

      <Typography
        color={"white"}
        sx={{
          textAlign: {
            sm: "center",
            md: "center",
          },
          fontSize: {
            sm: "15px",

            md: "20px",
            lg: "30px",
          },
          margin: {
            sm: "20px",
          },
        }}
        // variant={screen.width > 1250 ? "h4" : "h6"}
        className="title"
      >
        React Shopping Cart
      </Typography>

      <div className="searchbar">
        <input
          placeholder="Search"
          type="text"
          value={searchKey}
          onChange={(e) => setSearchKey(e.target.value)}
        />
        <img src={search} alt="mage" onClick={handleSearch} />
      </div>

      <div
        className="btns"
        // style={{
        //   display: "flex",
        //   flexDirection: "row",
        //   justifyContent: "center",
        //   alignItems: "center",
        // }}
      >
        {/* <div className="btns"> */}
        <Button
          variant="outlined"
          sx={{
            margin: 3,
            marginRight: 0,
            color: "black",
            background: "white",
            borderColor: "white",
          }}
          onClick={() => {
            setIsStore(false);
            setIsCollection(false);
          }}
        >
          DashBoard
        </Button>
        <Button
          variant="outlined"
          sx={{
            margin: 3,
            color: "black",
            background: "white",
            borderColor: "white",
          }}
          onClick={() => {
            setIsStore(true);
            // setIsCollection(false);
          }}
        >
          Store
        </Button>
        <Button
          variant="outlined"
          sx={{
            //
            // margin: 3,
            // marginRight: 0,
            color: "black",
            background: "white",

            borderColor: "black",
          }}
          disabled={cartProducts && cartProducts?.length !== 0 ? false : true}
          onClick={() => navigate("/CartPage")}
        >
          Cart {cartLength}
        </Button>
        {/* </div> */}
        <Button
          variant="outlined"
          sx={{
            margin: 3,
            color: "black",
            background: "white",
            borderColor: "white",
          }}
          onClick={() => navigate("/SignIn")}
        >
          LogOut
        </Button>
        <Avatar
          sx={{
            bgcolor: deepOrange[500],
            margin: 3,
            marginLeft: 0,
            cursor: "pointer",
          }}
          alt="Remy Sharp"
          src="/broken-image.jpg"
        >
          V
        </Avatar>
      </div>
    </div>
  );
}
