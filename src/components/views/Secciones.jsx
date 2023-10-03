import '../../css/secciones.css'
import Navegadora from '../global';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Secciones() {
    const navigate = useNavigate();
    const [data, setData] = useState(null);
    const [dataComment, setDataComment] = useState(null);
    const nombreCurso = useParams();
    const fetchDataFromApi = async () => {
        try {
          const response = await(await fetch(`http://127.16.15.14:5072/niggacademy/contenido/${nombreCurso['*']}`, {
              method: "GET",
              headers: {
                  'Accept-version': '1.0.0',
                  'Authorization': `Bearer ${localStorage.token}`
              }
          })).json();
          setData(response);
        } catch (error) {
          console.error(error);
        }
    };
    const fetchDataFromApiComment = async () => {
        try {
          const response1 = await(await fetch(`http://127.16.15.14:5072/niggacademy/contenido/${nombreCurso['*']}`, {
              method: "GET",
              headers: {
                  'Accept-version': '1.0.1',
                  'Authorization': `Bearer ${localStorage.token}`
              }
          })).json();
          setDataComment(response1);
        } catch (error) {
          console.error(error);
        }
    };
    const verifyToken = () => {
        if(!localStorage.token){
            navigate('/login');
        }
        // Agrega tu lógica aquí
      };
      useEffect(() => {
        verifyToken();
        fetchDataFromApi();
        fetchDataFromApiComment();
      }, []);
    return (
        <>
            <Navegadora />
            <div className="contenedor-cursos">
                    {data !== null ? (
                        data.map((item,index)=>(
                            <div className="caja-curso" key={index}>
                                <div className="nombre-curso-seccion">
                                    <h2><Link to={`/`}>{item.nombre}</Link></h2>
                                </div>
                                <div className="descripcion-curso">
                                    <p>{item.descripcion}</p>
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
            <div className="comentarios">
                <div className="titulo"><h1>Comentarios</h1></div>
                <div className="comment">
                    <table>
                        <tbody>
                            {dataComment !== null ? (
                            dataComment.map((item, index) => (
                                <React.Fragment key={index}>
                                <tr>
                                    <td><h3>{item.correo}</h3></td>
                                </tr>
                                <tr>
                                    <td><h4>{item.descripcion}</h4></td>
                                </tr>
                                </React.Fragment>
                            ))
                            ) : (
                            <tr>
                                <td colSpan="2" className="wrapper">
                                <div className="circle"></div>
                                <div className="circle"></div>
                                <div className="circle"></div>
                                <div className="shadow"></div>
                                <div className="shadow"></div>
                                <div className="shadow"></div>
                                </td>
                            </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default Secciones;