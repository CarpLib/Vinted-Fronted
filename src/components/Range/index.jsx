import React, { useState } from "react";
import { Range, getTrackBackground } from "react-range";

const MyRange = ({ onValuesChange, range, setRange }) => {
  // Initialise l'état avec les valeurs initiales des curseurs
  const [values, setValues] = useState([10, 100]);
  //   console.log(range);
  const handleChange = (values) => {
    setValues(values);
    setRange(values);
    onValuesChange(range);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        // marginTop: "2rem",
      }}
    >
      {/* Utilise le composant Range de react-range */}
      <Range
        step={5} // Le pas d'incrément
        min={0} // La valeur minimale du curseur
        max={500} // La valeur maximale du curseur
        values={values} // Les valeurs actuelles des curseurs
        onChange={handleChange} // Met à jour les valeurs lorsque les curseurs sont déplacés
        // Génère la piste du curseur
        renderTrack={({ props, children }) => (
          <div
            onMouseDown={props.onMouseDown}
            onTouchStart={props.onTouchStart}
            style={{
              ...props.style,
              height: "36px",
              display: "flex",
              width: "300px",
            }}
          >
            <div
              ref={props.ref}
              style={{
                height: "5px",
                width: "100%",
                borderRadius: "4px",
                background: getTrackBackground({
                  values,
                  colors: ["#ccc", "#007782", "#ccc"],
                  min: 0,
                  max: 500,
                }),
                alignSelf: "center",
              }}
            >
              {/* Affiche les curseurs sur la piste */}
              {children}
            </div>
          </div>
        )}
        // Génère les curseurs (poignées)
        renderThumb={({ props, index }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: "16px",
              width: "16px",
              borderRadius: "50%",
              backgroundColor: "#FFF",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              boxShadow: "0px 2px 6px #AAA",
            }}
          >
            {/* Affiche la valeur du curseur au-dessus de la poignée */}
            <div
              style={{
                position: "absolute",
                top: "-20px",
                color: "#fff",
                fontWeight: "bold",
                fontSize: "14px",
                fontFamily: "Arial,Helvetica Neue,Helvetica,sans-serif",
                padding: "4px",
                borderRadius: "4px",
                backgroundColor: "#007782",
              }}
            >
              {values[index]}€
            </div>
          </div>
        )}
      />
    </div>
  );
};

export default MyRange;
