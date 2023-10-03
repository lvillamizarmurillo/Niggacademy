import '../../css/home.css'
import Navegadora from '../global';
import React, { useState, useEffect } from 'react';

function Home() {
    const [data, setData] = useState(null);
    useEffect(() => {
        const fetchDataFromApi = async () => {
          try {
            const response = await(await fetch('http://127.16.15.14:5072/niggacademy/home', {
                method: "GET",
                headers: {
                    'Accept-version': '1.0.0'
                }
            })).json();
            setData(response);
          } catch (error) {
            console.error(error);
          }
        };
        // Llama a la función de solicitud cuando el componente se monta
        fetchDataFromApi();
      }, []);
    return (
        <>
            <Navegadora />
            <div className="contenedor-cursos">
                {data !== null ? (
                    data.map((item,index)=>(
                        <div className="caja-curso" key={index}>
                            <div className="nombre-curso">
                                <h2><a href="">{item.nombre}</a></h2>
                            </div>
                            <div className="descripcion-curso">
                                <p>{item.descripcion}</p>
                                <h3>pts: {item.calificacion.estrellas}</h3>
                            </div>
                            <div className="calificacion-curso">
                                <h6>Calificado por: {item.calificacion.contador} personas</h6>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="wrapper">
                        <div className="circle"></div>
                        <div className="circle"></div>
                        <div className="circle"></div>
                        <div className="shadow"></div>
                        <div className="shadow"></div>
                        <div className="shadow"></div>
                    </div>
                )}
            </div>
        </>
    )
}

export default Home;