import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const BeersContext = createContext();

export const BeersProvider = ({ children }) => {
  const [beers, setBeers] = useState([]);

  function finBeerById(id) {
    return beers.find((beer) => beer._id === id);
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://front-cervezas-artesanales.vercel.app//cervezas");
        setBeers(response.data);
      } catch (error) {
        console.error("Error en la solicitud Axios:", error);
        // Manejar el error según sea necesario
      }
    };

    //llamada de la funcion creada para hacer la peticion(axios) de manera asincrona
    fetchData();
  }, []); // El segundo argumento de useEffect es la dependencia, si está vacío se ejecuta una vez al montarse el componente

  return (
    <BeersContext.Provider value={{ beers, finBeerById }}>
      {children}
    </BeersContext.Provider>
  );
};
