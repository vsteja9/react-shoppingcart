import { Typography } from "@mui/material";
import axios from "axios";
import { useContext } from "react";
import { Products } from "../Context/ProductsContext";

export type collectionTypeProps = {
  name: string;
  image: string;
};

export default function CollectionTile({
  collection,
}: {
  collection: collectionTypeProps;
}) {
  const { name, image } = collection;
  const { setCollectionData, setIsCollection } = useContext(Products);
  async function fetchCategoryData(category: string) {
    const collection = await axios.get(
      `https://dummyjson.com/products/category/${category}`
    );
    return collection.data;
  }
  const handleCollectionClick = async () => {
    switch (name) {
      case "Beauty Products":
        const beautyData = await fetchCategoryData("beauty");
        setCollectionData(beautyData);
        setIsCollection(true);
        break;
      case "Home Decorations":
        const homeData = await fetchCategoryData("home-decoration");
        setCollectionData(homeData);
        setIsCollection(true);
        break;
      case "Laptops":
        const laptopData = await fetchCategoryData("laptops");
        setCollectionData(laptopData);
        setIsCollection(true);
        break;
      case "Mobiles & Accessories":
        const mobileData = await fetchCategoryData("mobile-accessories");
        setCollectionData(mobileData);
        setIsCollection(true);
        break;
      case "Mens Accessories":
        const shirtData = await fetchCategoryData("mens-shirts");
        const shoesData = await fetchCategoryData("mens-shoes");
        const watchData = await fetchCategoryData("mens-watches");
        setCollectionData({
          products: [
            ...shirtData.products,
            ...shoesData.products,
            ...watchData.products,
          ],
        });
        setIsCollection(true);
        break;
      case "Womens Accessories":
        const bagsData = await fetchCategoryData("womens-bags");
        const dressDate = await fetchCategoryData("womens-dresses");
        const jewData = await fetchCategoryData("womens-jewellery");
        const WshoesData = await fetchCategoryData("womens-shoes");
        const WwatchData = await fetchCategoryData("womens-watches");
        setCollectionData({
          products: [
            ...bagsData.products,
            ...dressDate.products,
            ...jewData.products,

            ...WshoesData.products,

            ...WwatchData.products,
          ],
        });
        setIsCollection(true);
        break;
    }
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        cursor: "pointer",
        justifyContent: "center",
        alignItems: "center",
      }}
      onClick={() => {
        console.log("name", name);
        handleCollectionClick();
      }}
    >
      <img
        src={image}
        alt="mage"
        width={150}
        height={150}
        style={{ borderRadius: "50%" }}
      />
      <Typography fontWeight={"bold"}>{name}</Typography>
    </div>
  );
}
