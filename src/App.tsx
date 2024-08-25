import "./App.css";
import MainPage from "./Components/MainPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ItemTile from "./Components/ItemTile";
import ItemDialog from "./Components/ItemDialog";
import CartPage from "./Components/CartPage";
import SignUp from "./Components/LoginPage";
import SignIn from "./Components/SignInPage";
import ProductsProvider from "./Context/ProductsContext";
import { ToastContainer } from "react-toastify";

function App() {
  // let do the signin and up do later first go without login functionality

  const router = createBrowserRouter([
    {
      path: "/mainpage",
      element: <MainPage />,
    },
    {
      path: "/",
      element: <SignUp />,
    },
    {
      path: "/ItemTile",
      element: <ItemTile />,
    },
    { path: "/SignIn", element: <SignIn /> },
    { path: "/ItemDialog", element: <ItemDialog /> },
    { path: "/CartPage", element: <CartPage /> },
    { path: "*", element: <h1>No Page Found</h1> },
  ]);
  return (
    <>
      {" "}
      <ProductsProvider>
        <RouterProvider router={router} />
      </ProductsProvider>{" "}
      <ToastContainer/>
    </>
  );
}

export default App;
