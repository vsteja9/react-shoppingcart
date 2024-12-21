import "./MainPage.css";
import beautySwiper from "./../Images/beautySwiper.png";
import homedecorSwiper from "./../Images/homedecorSwiper.png";
import laptopsSwiper from "./../Images/laptopsSwiper.png";
import mensSwiper from "./../Images/mensSwiper.png";
import mobilesSwiper from "./../Images/mobilesSwiper.png";
import womenSwiper from "./../Images/womenSwiper.png";
import ImageSlider from "./Swiper/Swiper";
import CollectionTile, { collectionTypeProps } from "./CollectionTile";
import beauty from "./../Images/beauty.png";
import homedecorations from "./../Images/homedecoration.png";
import laptop from "./../Images/laptops.png";
import mens from "./../Images/mens.png";
import womens from "./../Images/women.png";
import mobiles from "./../Images/mobiles.png";
import { useContext } from "react";
import { Box, Grid, Typography } from "@mui/material";
import ItemTile from "./ItemTile";
import ItemDialog from "./ItemDialog";
import { Products } from "../Context/ProductsContext";

export type CollectionData = {
  products: object[];
};
export default function LandingPage() {
  const imagesList: string[] = [
    beautySwiper,
    homedecorSwiper,
    laptopsSwiper,
    mensSwiper,
    mobilesSwiper,
    womenSwiper,
  ];
  const { viewDetailsclicked, isCollection, collectionData } =
    useContext(Products);

  const collectionList: collectionTypeProps[] = [
    {
      name: "Beauty Products",
      image: beauty,
    },
    {
      name: "Home Decorations",
      image: homedecorations,
    },
    {
      name: "Laptops",
      image: laptop,
    },
    {
      name: "Mobiles & Accessories",
      image: mobiles,
    },
    {
      name: "Mens Accessories",
      image: mens,
    },
    {
      name: "Womens Accessories",
      image: womens,
    },
  ];

  if (collectionData.products.length === 0 && isCollection)
    return (
      <Typography variant="h2" textAlign={"center"} margin={20}>
        No Results Found.Please Try Again..
      </Typography>
    );

  return (
    <>
      {isCollection ? (
        <>
          <Box className="AllProducts">
            {viewDetailsclicked && <ItemDialog />}
            <Grid
              container
              style={{ alignContent: "center", justifyContent: "center" }}
            >
              {collectionData &&
                collectionData?.products.map((product: any) => {
                  return <ItemTile product={product} />;
                })}
            </Grid>
          </Box>
        </>
      ) : (
        <div className="intropage">
          <ImageSlider images={imagesList} />
          <div className="collections">
            {collectionList.map((collection) => {
              return <CollectionTile collection={collection} />;
            })}
          </div>
        </div>
      )}
    </>
  );
}
