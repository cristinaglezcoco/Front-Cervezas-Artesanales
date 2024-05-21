import NavBarHeader from "../../components/shared/NavBarHeader";
import Footer from "../../components/shared/Footer";
import "./_products.scss";
import Container from "../../components/shared/Container";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { BeersContext } from "../../components/context/beersContext";
import { CartContext } from "../../components/context/cartContext";

function Products() {
  return (
    <>
      <NavBarHeader title="Productos" />

      <Container>
        <div className="products-space"></div>
        <div className="hs-carousel-1">
          <div className="hs-car-icons">
            <img src="/images/icon-detalle_6.png" alt="" />
            <img src="/images/icon-detalle_5.png" alt="" />
          </div>
          <h1>Descubre Nuestra Cervezas</h1>
          <p>
            Explora un mundo de sabor con <span>nuestras cervezas artesanales únicas</span>.
            Descubre la pasión y la calidad en cada sorbo, disponible ahora para
            tu disfrute.
          </p>
          <div className="beer-button">
            <button><Link to="/area">¡Crea tú propia cerveza!</Link></button>
          </div>
        </div>
        <ProductsList />
        {/* <ProductsPagination /> */}
      </Container>
      <Footer />
    </>
  );
}

export default Products;

export const ProductsList = () => {
  const { beers } = useContext(BeersContext);
  return (
    <div className="products-list">
      {beers.map((producto) => (
        <ProductItem key={producto._id} producto={producto} />
      ))}
    </div>
  );
};

export const ProductItem = ({ producto }) => {
  const { addToCart } = useContext(CartContext);
  const handleAddToCart = () => {
    addToCart(producto, 1);
  };
  return (
    <div className="product-item">
      <Link to={"/product/" + producto._id} className="product-item-img">
        <img src={producto.picture} alt="" />
      </Link>
      <div className="product-item-info">
        <h3>{producto.nombre}</h3>
        <p>
          {producto.graduacion}% | {producto.fermentacion} | {producto.color}
        </p>
        <p>Precio: {producto.precio.toFixed(2)} €</p>
        <button onClick={handleAddToCart}>Añadir al carrito</button>
      </div>
    </div>
  );
};

// export const ProductsPagination = () => {
//   return (
//     <div className="products-pagination">
//       <div>
//         <button className="active">1</button>
//         <button>2</button>
//       </div>
//       <button>
//         <img src="/images/icon-arrow-product-04.png" alt="arrow icon" />
//       </button>
//     </div>
//   );
// };
