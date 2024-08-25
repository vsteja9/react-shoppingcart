import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { createContext, useState } from "react";
import { productsData } from "../Components/MainPage";

export const Products = createContext<productsData>({
  data: "",
  isLoading: false,
  error: "",
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

  async function FetchCartDetails() {
    try {
      const { data } = await axios.get("https://dummyjson.com/products");
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
      }}
    >
      {children}
    </Products.Provider>
  );
}
