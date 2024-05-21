// import Home from "./Home";
import { Route, Routes } from "react-router-dom";
import Register from "../pages/Account/Register";
import Home from "../pages/Home";
import Account from "../pages/Account";
import About from "../pages/About";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import Contacts from "../pages/Contacts";
import Products from "../pages/Products";
import Gallery from "../pages/Gallery";
import { BeersProvider } from "./context/beersContext";
import {
  useUsersContext,
  UserContext,
} from "../components/context/userContext";
import ProductInfo from "../pages/ProductInfo";
import { CartProvider } from "./context/cartContext";
import AuthRoute from "./AuthRoute/AuthRoute";
import Profile from "../pages/Account/Profile";
import Area from "../pages/Area/Area";

function App() {
  const saveUser = useUsersContext();
  return (
    <>
      <UserContext.Provider value={saveUser}>
        <BeersProvider>
          <CartProvider>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/account" element={<Account />} />
              <Route path="/about" element={<About />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<AuthRoute element={<Checkout/>}/>}></Route>
              <Route path="/product/:id" element={<ProductInfo />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/products" element={<Products />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Account/>} />
              <Route path="/profile" element={<AuthRoute element={<Profile/>}/>}></Route>
              <Route path="/area" element={<AuthRoute element={<Area/>}/>}></Route>
            </Routes>
          </CartProvider>
        </BeersProvider>
      </UserContext.Provider>
    </>
  );
}

export default App;
