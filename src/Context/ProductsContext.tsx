import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { productsData } from "../Components/MainPage";
import { CollectionData } from "../Components/LandingPage";

export const Products = createContext<productsData>({
  data: "",
  isLoading: false,
  error: "",
  isCollection: false,
  collectionData: { products: [] },
  setIsCollection: function (value: boolean): void {},
  setCollectionData: function (value: CollectionData): void {},
});
export interface cartItem {
  product: any;
  quantity: number;
  totalPrice: number;
}

export default function ProductsProvider({ children }: any) {
  const [viewDetailsclicked, setViewDetailsClicked] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({});
  const [cartProducts, setCartProducts] = useState<cartItem[]>([]);

  const initialData: CollectionData = { products: [] };
  const [isCollection, setIsCollection] = useState(false);
  const [collectionData, setCollectionData] = useState(initialData);

  useEffect(() => {
    const storedData = localStorage.getItem("cartProducts");
    if (storedData) setCartProducts(JSON.parse(storedData));
  }, []);

  useEffect(() => {
    // if we want to save the data we need to stringify obj
    localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
  }, [cartProducts]);

  async function FetchCartDetails() {
    try {
      const { data } = await axios.get(
        "https://dummyjson.com/products?limit=0"
      );
      console.log("response", data);
      return data;
    } catch (err) {
      console.log(err);
    }
  }
  const { data, isLoading, error } = useQuery({
    queryKey: ["cartData"],
    queryFn: FetchCartDetails,
  });
  console.log("data from query", data);
  console.log("children", children);

  return (
    <Products.Provider
      value={{
        data,
        isLoading,
        error,
        viewDetailsclicked,
        setViewDetailsClicked,
        selectedProduct,
        setSelectedProduct,
        cartProducts,
        setCartProducts,
        isCollection,
        setIsCollection,
        collectionData,
        setCollectionData,
      }}
    >
      {children}
    </Products.Provider>
  );
}
