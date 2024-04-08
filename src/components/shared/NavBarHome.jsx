import { FiAlignRight } from "react-icons/fi";
import { FaFacebook, FaInstagram, FaShoppingBag, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { NavBarMobile } from "../../components/shared/NavBarHeader";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/cartContext";
import { IoLogOut } from "react-icons/io5";

export default function NavBarHome() {
  const [active, setActive] = useState(false);
  const handleNav = (active) => setActive(active);
  const { totalItems } = useContext(CartContext);
  
  const [isLogged ,setIsLogged] = useState(false);


  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  
  const cartContext = useContext(CartContext);

  const handleLogout = () => {
    

    const userId = localStorage.getItem("user_id");

    if (userId) {
      const cartItems = cartContext.cart;
      localStorage.setItem(`cart_${userId}`, JSON.stringify(cartItems));

    }
  
  

    localStorage.removeItem("token");
    localStorage.removeItem("user_id");
    localStorage.removeItem("user");
    window.location.href = "/";
  }

      
      useEffect(() => {
        if(localStorage.getItem("token")){
          setIsLogged(true);
        }

      },[]
      );

      useEffect (() => scrollToTop(), []);

    
  


  return (
    <nav className="navbar">
      <NavBarMobile active={active} handleNav={handleNav} />
      <div className="navbar-1">
        <ul className="navbar-social">
          <li>
            <a href="https://www.facebook.com/cervezascolmo/?locale=es_ES" target="_blank" rel="noopener noreferrer">
              <FaFacebook />
            </a>
          </li>
          <li>
            <a href="https://www.instagram.com/cervezascolmo/" target="_blank" rel="noopener noreferrer">
              <FaInstagram />
            </a>
          </li>
        </ul>
        <div className="navbar-logo">
          <Link to="/" className="logo">
            <img
              className="home-logo"
              src="/images/logo-colmo-cervezas.png"
              alt="Weisber"
            />
          </Link>
        </div>
        <ul className="navbar-icons">
          <li>
            <Link to="/account">
              <FaUser />
            </Link>
          </li>
          {
          isLogged ?
          <li className="logout-icons" onClick={handleLogout} > 
            <IoLogOut />
          </li>
          :
          null
          }
          <li>
            <div className="cart-navbar">
              <Link to="/cart">
                <span className="cart-contents header-cart-count count">
                  {totalItems}
                </span>
                <FaShoppingBag />
              </Link>
            </div>
          </li>
        </ul>
        <div className="navbar-control">
          <button
            onClick={() => handleNav(true)}
            type="button"
            className="navbar-toggle"
          >
            <FiAlignRight />
          </button>
        </div>
      </div>
      <div className="navbar-2">
        <ul>
          <li>
            <Link className="active" to="/">
              <span>Inicio</span>
            </Link>
          </li>
          <li>
            <Link to="/about">
              <span>Quienes Somos</span>
            </Link>
          </li>
          <li>
            <Link to="/products">
              <span>Productos </span>
            </Link>
          </li>
          <li>
            <Link to={"/gallery"}>
              <span>Galeria</span>
            </Link>
          </li>
          <li>
            <Link to="/contacts">
              <span>Contacto</span>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
