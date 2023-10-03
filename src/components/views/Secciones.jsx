import '../../css/secciones.css'
import Navegadora from '../global';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

function Secciones() {
    const navigate = useNavigate();
    const nombreCurso = useParams();
    const verifyToken = () => {
        if(!localStorage.token){
            navigate('/login');
        }
        // Agrega tu lógica aquí
      };
      useEffect(() => {
        verifyToken();
      }, []);
    console.log(nombreCurso['*']);
    return (
        <>
            <Navegadora />
            <div className="contenedor-cursos">
                <div className="caja-curso">
                    <div className="nombre-curso">
                        <h2><a href="">Nombre</a></h2>
                    </div>
                    <div className="descripcion-curso">
                        <p>descripcion</p>
                    </div>
                </div>
            </div>
            <div className="comentarios">
                <div className="titulo"><h1>Comentarios</h1></div>
                <div className="comment">
                    <table>
                        <tr>
                            <td><h3>emailComment</h3></td>
                        </tr>
                        <tr>
                            <td><h4>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Soluta iure magnam reiciendis voluptate ducimus eum deleniti, ex, dolorum molestias cumque minus nostrum tempora. Error possimus harum aperiam, labore minus consequatur.</h4></td>
                        </tr>
                    </table>
                    <table>
                        <tr>
                            <td><h3>emailComment</h3></td>
                        </tr>
                        <tr>
                            <td><h4>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Soluta iure magnam reiciendis voluptate ducimus eum deleniti, ex, dolorum molestias cumque minus nostrum tempora. Error possimus harum aperiam, labore minus consequatur.</h4></td>
                        </tr>
                    </table>
                    <table>
                        <tr>
                            <td><h3>emailComment</h3></td>
                        </tr>
                        <tr>
                            <td><h4>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Soluta iure magnam reiciendis voluptate ducimus eum deleniti, ex, dolorum molestias cumque minus nostrum tempora. Error possimus harum aperiam, labore minus consequatur.</h4></td>
                        </tr>
                    </table>
                    <table>
                        <tr>
                            <td><h3>emailComment</h3></td>
                        </tr>
                        <tr>
                            <td><h4>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Soluta iure magnam reiciendis voluptate ducimus eum deleniti, ex, dolorum molestias cumque minus nostrum tempora. Error possimus harum aperiam, labore minus consequatur.</h4></td>
                        </tr>
                    </table>
                    <table>
                        <tr>
                            <td><h3>emailComment</h3></td>
                        </tr>
                        <tr>
                            <td><h4>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Soluta iure magnam reiciendis voluptate ducimus eum deleniti, ex, dolorum molestias cumque minus nostrum tempora. Error possimus harum aperiam, labore minus consequatur.</h4></td>
                        </tr>
                    </table>
                </div>
            </div>
        </>
    )
}

export default Secciones;