import Container from "../../components/shared/Container";
import NavBarHeader from "../../components/shared/NavBarHeader";
import Footer from "../../components/shared/Footer";
import "../Area/_area.scss";
import "../Checkout/_checkout.scss";
import { useEffect, useState } from "react";
import Beer from "/images/createdBeer.png";
import { FaCheckCircle, FaTimes } from "react-icons/fa";

function Area() {
  const [showSelectCereals, setShowSelectCereals] = useState(false);
  const [showSelectLev, setShowSelectLev] = useState(false);
  const [showSelectLup, setShowSelectLup] = useState(false);
  const [showSelectFruits, setShowSelectFruits] = useState(false);
  const [showSelectEspecias, setShowSelectEspecias] = useState(false);
  const [showSelectHierbas, setShowSelectHierbas] = useState(false);
  const [showSelectOthers, setShowSelectOthers] = useState(false);

  const [selectedCereals, setSelectedCereals] = useState([]);
  const [selectedLup, setSelectedLup] = useState([]);
  const [selectedOthers, setSelectedOthers] = useState([]);
  const [selectedLev, setSelectedLev] = useState("Ale");
  const [selectedFruits, setSelectedFruits] = useState(null);
  const [selectedEspecias, setSelectedEspecias] = useState(null);
  const [selectedHierbas, setSelectedHierbas] = useState(null);

  const [createdBeer, setCreatedBeer] = useState([]);
  const [showSuccessMssg, setShowSuccessMssg] = useState(false);

  const [errormssg, setErrorMssg] = useState(null);

  const userId = localStorage.getItem("user_id");
  // console.log(userId);

  const handleSelectCereals = () => {
    setShowSelectCereals(!showSelectCereals);
    setSelectedCereals([]);
  };

  const handleSelectLev = () => {
    setShowSelectLev(!showSelectLev);
  };

  const handleSelectLup = () => {
    setShowSelectLup(!showSelectLup);
    setSelectedLup([]);
  };

  const handleSelectFruits = () => {
    setShowSelectFruits(!showSelectFruits);
  };

  const handleSelectEspecias = () => {
    setShowSelectEspecias(!showSelectEspecias);
  };

  const handleSelectHierbas = () => {
    setShowSelectHierbas(!showSelectHierbas);
  };

  const handleSelectOthers = () => {
    setShowSelectOthers(!showSelectOthers);
    setSelectedOthers([]);
  };


  const handleCheckboxCereal = (e) => {
    const cereal = e.target.value;
    if (e.target.checked) {
      if (selectedCereals.length < 2) {
        setSelectedCereals([...selectedCereals, cereal]);
      } else {
        e.target.checked = false; // Desmarcar el checkbox si ya se seleccionaron dos cereales
      }
      // console.log(selectedCereals);
    } else {
      setSelectedCereals(selectedCereals.filter((item) => item !== cereal));
    }
  };

  const handleCheckLev = (e) => {
    setSelectedLev(e.target.value);
  };

  const handleCheckFruits = (e) => {
    setSelectedFruits(e.target.value);
  };

  const handleCheckEspecias = (e) => {
    setSelectedEspecias(e.target.value);
  };

  const handleCheckHierbas = (e) => {
    setSelectedHierbas(e.target.value);
  };

  const handleCheckboxLupulo = (e) => {
    const lupulo = e.target.value;
    if (e.target.checked) {
      if (selectedLup.length < 4) {
        setSelectedLup([...selectedLup, lupulo]);
      } else {
        e.target.checked = false; // Desmarcar el checkbox si ya se seleccionaron cuatro lúpulos
      }
    } else {
      setSelectedLup(selectedLup.filter((item) => item !== lupulo));
    }
  };

  const handleCheckboxOther = (e) => {
    const other = e.target.value;
    if (e.target.checked) {
      if (selectedOthers.length < 3) {
        setSelectedOthers([...selectedOthers, other]);
      } else {
        e.target.checked = false; // Desmarcar el checkbox si ya se seleccionaron tres extras
      }
    } else {
      setSelectedOthers(selectedOthers.filter((item) => item !== other));
    }
  };

  const requireIngredients = () => {
    return (
      selectedCereals.length >= 1 &&
      selectedLev !== null &&
      selectedLup.length >= 1
    );
  };

  const handleSubmitBeer = () => {
    //TODO
    if (requireIngredients()) {
      const beer = {
        cereales: selectedCereals,
        levadura: selectedLev,
        lupulo: selectedLup,
        frutas: selectedFruits,
        especias: selectedEspecias,
        hierbas: selectedHierbas,
        otros: selectedOthers,
      };
      setCreatedBeer(prevBeers => [...prevBeers, beer]);
      setErrorMssg("");
      setShowSuccessMssg(true);
      console.log(beer);

      const storedBeers = JSON.parse(localStorage.getItem(`beers_${userId}`)) || [];
      const updatedBeers = [...storedBeers, beer];
      localStorage.setItem(`beers_${userId}`, JSON.stringify(updatedBeers));
    } else {
      setErrorMssg(
        "Tu cerveza está incompleta, selecciona los ingredientes necesarios *"
      );
    }
  };

  useEffect(() => {
    // Cargar cervezas creadas del almacenamiento local al cargar la página
    const storedBeers = JSON.parse(localStorage.getItem(`beers_${userId}`));
    if (storedBeers) {
      setCreatedBeer(storedBeers);
    }
  }, [userId]);


  const handleClearMssg = () => {
    // setCreatedBeer(null);
    setShowSuccessMssg(false);
  }

  const handleRemoveBeer = (index) => {
    setCreatedBeer(prevBeers => prevBeers.filter((_, i) => i !== index));

    const storedBeers = JSON.parse(localStorage.getItem(`beers_${userId}`)) || [];
    const removeBeers = storedBeers.filter((_, i) => i !== index);
    localStorage.setItem(`beers_${userId}`, JSON.stringify(removeBeers));
  }

  return (
    <>
      <NavBarHeader title="Área Personal" />

      <Container>
        <div className="hs-carousel-1">
          <div className="hs-car-icons">
            <img src="/images/icon-detalle_6.png" alt="" />
            <img src="/images/icon-detalle_5.png" alt="" />
          </div>
          <h1>Crea tu propia cerveza única</h1>
          <p>
            Explora nuestra selección de{" "}
            <span>
              ingredientes premium y da vida a tu receta cervecera ideal.
            </span>{" "}
            Desde maltasespeciales hasta lúpulos aromáticos, tú tienes el
            control.¡Haz tu cerveza, tu camino!
          </p>
        </div>
        <div className="ingredients-container">
          <h2>Selecciona los ingredientes de tu cerveza:</h2>
          <div className="container-select">
            <div className="ingredients-select">
              {showSelectCereals ? (
                <>
                  <div className="select-list">
                    <div className="select-info">
                      <div className="out-btn">
                        <img
                          src="/images/atras.png"
                          alt="exit"
                          onClick={handleSelectCereals}
                        />
                      </div>

                      <div className="complete-list">
                        <div className="select-list__each">
                          <input
                            type="checkbox"
                            value="Cebada"
                            onChange={handleCheckboxCereal}
                            checked={selectedCereals.includes("Cebada")}
                          />
                          <label htmlFor="Cebada">Cebada</label>
                        </div>
                        <div className="select-list__each">
                          <input
                            type="checkbox"
                            value="Centeno"
                            onChange={handleCheckboxCereal}
                            checked={selectedCereals.includes("Centeno")}
                          />
                          <label htmlFor="Centeno">Centeno</label>
                        </div>
                        <div className="select-list__each">
                          <input
                            type="checkbox"
                            value="Arroz"
                            onChange={handleCheckboxCereal}
                            checked={selectedCereals.includes("Arroz")}
                          />
                          <label htmlFor="Arroz">Arroz</label>
                        </div>
                        <div className="select-list__each">
                          <input
                            type="checkbox"
                            value="Avena"
                            onChange={handleCheckboxCereal}
                            checked={selectedCereals.includes("Avena")}
                          />
                          <label htmlFor="Avena">Avena</label>
                        </div>
                        <div className="select-list__each">
                          <input
                            type="checkbox"
                            value="Trigo"
                            onChange={handleCheckboxCereal}
                            checked={selectedCereals.includes("Trigo")}
                          />
                          <label htmlFor="Trigo">Trigo</label>
                        </div>
                        <div className="select-list__each">
                          <input
                            type="checkbox"
                            value="Maiz"
                            onChange={handleCheckboxCereal}
                            checked={selectedCereals.includes("Maiz")}
                          />
                          <label htmlFor="Maiz">Maiz</label>
                        </div>
                      </div>
                    </div>
                    <p>*Max 2 cereales</p>
                  </div>
                </>
              ) : (
                <div className="title-select" onClick={handleSelectCereals}>
                  <label>Cereales*</label>
                </div>
              )}
            </div>

            <div className="ingredients-select">
              {showSelectLev ? (
                <>
                  <div className="select-list">
                    <div className="select-info">
                      <div className="out-btn">
                        <img
                          src="/images/atras.png"
                          alt="exit"
                          onClick={handleSelectLev}
                        />
                      </div>
                      <div className="complete-list">
                        <select id="Levadura" onChange={handleCheckLev}>
                          <option value="Ale" className="select-list__each">
                            Ale
                          </option>
                          <option value="Lager" className="select-list__each">
                            Lager
                          </option>
                        </select>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="title-select" onClick={handleSelectLev}>
                  <label>Levadura*</label>
                </div>
              )}
            </div>

            <div className="ingredients-select">
              {showSelectLup ? (
                <>
                  <div className="select-list">
                    <div className="select-info">
                      <div className="out-btn">
                        <img
                          src="/images/atras.png"
                          alt="exit"
                          onClick={handleSelectLup}
                        />
                      </div>

                      <div className="complete-list">
                        <div className="select-list__each">
                          <input
                            type="checkbox"
                            value="Magnun"
                            onChange={handleCheckboxLupulo}
                            checked={selectedLup.includes("Magnun")}
                          />
                          <label htmlFor="Magnun">Magnun</label>
                        </div>
                        <div className="select-list__each">
                          <input
                            type="checkbox"
                            value="Saaz"
                            onChange={handleCheckboxLupulo}
                            checked={selectedLup.includes("Saaz")}
                          />
                          <label htmlFor="Saaz">Saaz</label>
                        </div>
                        <div className="select-list__each">
                          <input
                            type="checkbox"
                            value="Chinook"
                            onChange={handleCheckboxLupulo}
                            checked={selectedLup.includes("Chinook")}
                          />
                          <label htmlFor="Chinook">Chinook</label>
                        </div>
                        <div className="select-list__each">
                          <input
                            type="checkbox"
                            value="Mandarina bavaria"
                            onChange={handleCheckboxLupulo}
                            checked={selectedLup.includes("Mandarina bavaria")}
                          />
                          <label htmlFor="Mandarina bavaria">
                            Mandarina bavaria
                          </label>
                        </div>
                        <div className="select-list__each">
                          <input
                            type="checkbox"
                            value="EL dorado"
                            onChange={handleCheckboxLupulo}
                            checked={selectedLup.includes("EL dorado")}
                          />
                          <label htmlFor="EL dorado">EL dorado</label>
                        </div>
                        <div className="select-list__each">
                          <input
                            type="checkbox"
                            value="Mosaic"
                            onChange={handleCheckboxLupulo}
                            checked={selectedLup.includes("Mosaic")}
                          />
                          <label htmlFor="Mosaic">Mosaic</label>
                        </div>
                        <div className="select-list__each">
                          <input
                            type="checkbox"
                            value="Cascade"
                            onChange={handleCheckboxLupulo}
                            checked={selectedLup.includes("Cascade")}
                          />
                          <label htmlFor="Cascade">Cascade</label>
                        </div>
                        <div className="select-list__each">
                          <input
                            type="checkbox"
                            value="Simcoe"
                            onChange={handleCheckboxLupulo}
                            checked={selectedLup.includes("Simcoe")}
                          />
                          <label htmlFor="Simcoe">Simcoe</label>
                        </div>
                        <div className="select-list__each">
                          <input
                            type="checkbox"
                            value="Idaho7"
                            onChange={handleCheckboxLupulo}
                            checked={selectedLup.includes("Idaho7")}
                          />
                          <label htmlFor="Idaho7">Idaho7</label>
                        </div>
                      </div>
                    </div>
                    <p>*Max 4 lúpulos</p>
                  </div>
                </>
              ) : (
                <div className="title-select" onClick={handleSelectLup}>
                  <label>Lúpulo*</label>
                </div>
              )}
            </div>

            {/* frutas   */}

            <div className="ingredients-select">
              {showSelectFruits ? (
                <>
                  <div className="select-list">
                    <div className="select-info">
                      <div className="out-btn">
                        <img
                          src="/images/atras.png"
                          alt="exit"
                          onClick={handleSelectFruits}
                        />
                      </div>
                      <div className="complete-list">
                        <select id="Frutas" onChange={handleCheckFruits}>
                          <option
                            value="Frambuesas"
                            className="select-list__each"
                          >
                            Frambuesas
                          </option>
                          <option value="Mango" className="select-list__each">
                            Mango
                          </option>
                          <option value="Naranja" className="select-list__each">
                            Naranja
                          </option>
                          <option value="Cerezas" className="select-list__each">
                            Cerezas
                          </option>
                          <option value="Piña" className="select-list__each">
                            Piña
                          </option>
                        </select>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="title-select" onClick={handleSelectFruits}>
                  <label>Frutas</label>
                </div>
              )}
            </div>

            {/* especias */}
            <div className="ingredients-select">
              {showSelectEspecias ? (
                <>
                  <div className="select-list">
                    <div className="select-info">
                      <div className="out-btn">
                        <img
                          src="/images/atras.png"
                          alt="exit"
                          onClick={handleSelectEspecias}
                        />
                      </div>
                      <div className="complete-list">
                        <select id="Especias" onChange={handleCheckEspecias}>
                          <option
                            value="Cilantro"
                            className="select-list__each"
                          >
                            Cilantro
                          </option>
                          <option
                            value="Cascara de naranja"
                            className="select-list__each"
                          >
                            Cascara de naranja
                          </option>
                          <option
                            value="Jengibre"
                            className="select-list__each"
                          >
                            Jengibre
                          </option>
                          <option
                            value="Pimienta"
                            className="select-list__each"
                          >
                            Pimienta
                          </option>
                        </select>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="title-select" onClick={handleSelectEspecias}>
                  <label>Especias</label>
                </div>
              )}
            </div>

            {/* hierbas */}

            <div className="ingredients-select">
              {showSelectHierbas ? (
                <>
                  <div className="select-list">
                    <div className="select-info">
                      <div className="out-btn">
                        <img
                          src="/images/atras.png"
                          alt="exit"
                          onClick={handleSelectHierbas}
                        />
                      </div>
                      <div className="complete-list">
                        <select id="Hierbas" onChange={handleCheckHierbas}>
                          <option value="Menta" className="select-list__each">
                            Menta
                          </option>
                          <option
                            value="Albahaca"
                            className="select-list__each"
                          >
                            Albahaca
                          </option>
                          <option value="Salvia" className="select-list__each">
                            Salvia
                          </option>
                          <option value="Romero" className="select-list__each">
                            Romero
                          </option>
                        </select>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="title-select" onClick={handleSelectHierbas}>
                  <label>Hierbas</label>
                </div>
              )}
            </div>

            {/* otros */}
            <div className="ingredients-select">
              {showSelectOthers ? (
                <>
                  <div className="select-list">
                    <div className="select-info">
                      <div className="out-btn">
                        <img
                          src="/images/atras.png"
                          alt="exit"
                          onClick={handleSelectOthers}
                        />
                      </div>

                      <div className="complete-list">
                        <div className="select-list__each">
                          <input
                            type="checkbox"
                            value="Café"
                            onChange={handleCheckboxOther}
                            checked={selectedOthers.includes("Café")}
                          />
                          <label htmlFor="Café">Café</label>
                        </div>
                        <div className="select-list__each">
                          <input
                            type="checkbox"
                            value="Chocolate"
                            onChange={handleCheckboxOther}
                            checked={selectedOthers.includes("Chocolate")}
                          />
                          <label htmlFor="Chocolate">Chocolate</label>
                        </div>
                        <div className="select-list__each">
                          <input
                            type="checkbox"
                            value="Miel"
                            onChange={handleCheckboxOther}
                            checked={selectedOthers.includes("Miel")}
                          />
                          <label htmlFor="Miel">Miel</label>
                        </div>
                        <div className="select-list__each">
                          <input
                            type="checkbox"
                            value="Vainilla"
                            onChange={handleCheckboxOther}
                            checked={selectedOthers.includes("Vainilla")}
                          />
                          <label htmlFor="Vainilla">Vainilla</label>
                        </div>
                        <div className="select-list__each">
                          <input
                            type="checkbox"
                            value="Coco"
                            onChange={handleCheckboxOther}
                            checked={selectedOthers.includes("Coco")}
                          />
                          <label htmlFor="Coco">Coco</label>
                        </div>
                        <div className="select-list__each">
                          <input
                            type="checkbox"
                            value="Agua"
                            onChange={handleCheckboxOther}
                            checked={selectedOthers.includes("Agua")}
                          />
                          <label htmlFor="Agua">Agua</label>
                        </div>
                      </div>
                    </div>
                    <p>*Max 2 extras</p>
                  </div>
                </>
              ) : (
                <div className="title-select" onClick={handleSelectOthers}>
                  <label>Extras</label>
                </div>
              )}
            </div>
          </div>

          <div onClick={handleSubmitBeer} className="create-btn">
            <button>Crear</button>
            {errormssg && <p>{errormssg}</p>}
          </div>

          {showSuccessMssg ? (
            <div className="checkout-succes-modal">
            <div className="checkout-modal-content">
              <div className="checkout-modal-icon">
                <FaCheckCircle />
              </div>
              <span className="checkout-modal-title">
                !Tu cerveza ha sido <br /> creada con exito!
              </span>
              <div className="succes-beer">
                  <img src={Beer} alt="cerveza" />
              </div>
              <button onClick={handleClearMssg}>Entendido</button>
              <div onClick={handleClearMssg} className="close-checkout-modal">
                <FaTimes />
              </div>
            </div>
          </div>
          ) : (
            <div className="container-beers">
            {createdBeer.map((beer, index) => (
            <>
            <div key={index} className="created-beer">
              <div className="created-beer__format">
                <div className="created-beer__img">
                  <img src={Beer} alt="cerveza" />
                </div>
                <ul className="created-beer__info">
                  <li><span>Cereales: </span>{beer.cereales.join(", ")}</li>
                  <li><span>Levadura:</span> {beer.levadura}</li>
                  <li><span>Lúpulo: </span>{beer.lupulo.join(", ")}</li>
                  {beer.frutas && <li><span>Frutas: </span>{beer.frutas}</li>}
                  {beer.especias && <li><span>Especias: </span>{beer.especias}</li>}
                  {beer.hierbas && <li><span>Hierbas: </span>{beer.hierbas}</li>}
                  {beer.otros.length > 0 && <li><span>Otros: </span>{beer.otros.join(", ")}</li>}
                </ul>
              </div>
              <div className="created-beer__remove">
                <button onClick={() => handleRemoveBeer(index)}>Eliminar</button>
              </div>
            </div>
            </>
          ))}
            </div>
          )}

        </div>

        <Footer />
      </Container>
    </>
  );
}

export default Area;
