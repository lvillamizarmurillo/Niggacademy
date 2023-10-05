import '../../css/login.css'
import { useState } from 'react';
import React from 'react';
import Navegadora from '../global';
import { useNavigate } from 'react-router-dom';


function Login() {
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [nombre, setNombre] = useState(null);
    const [apellido, setApellido] = useState(null);
    const [nameuser, setNameUser] = useState(null);
    const navigate = useNavigate();

    const loginIn = async(e)=>{
        e.preventDefault();
        const response = await(await fetch('http://192.168.129.72:5072/niggacademy/login', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept-version': '1.0.0'
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })).json();
        if(response.status == 200){
            localStorage.setItem('token',response.message)
            navigate('/');
        }else{
            alert(response.message)
        }
    }
    const registroIn = async(e)=>{
        e.preventDefault();
        const response = await(await fetch('http://192.168.129.72:5072/niggacademy/registro', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept-version': '1.0.0'
            },
            body: JSON.stringify({
                nombre: nombre,
                apellido: apellido,
                nombreUsuario: nameuser,
                correo: email,
                password: password
            })
        })).json();
        if(response.status == 200){
            console.log(response.message);
            loginIn(e);
        }else{
            alert(response.error)
        }
    }

    // Función para manejar cambios en el campo de email
    const handleEmailChange = (e) => {
        e.preventDefault();
        setEmail(e.target.value);
    };

    // Función para manejar cambios en el campo de contraseña
    const handlePasswordChange = (e) => {
        e.preventDefault();
        setPassword(e.target.value);
    };
    const handleNombreChange = (e) => {
        e.preventDefault();
        setNombre(e.target.value);
    };
    const handleApellidoChange = (e) => {
        e.preventDefault();
        setApellido(e.target.value);
    };
    const handleNameUserChange = (e) => {
        e.preventDefault();
        setNameUser(e.target.value);
    };
    return (
        <>
            <Navegadora />
            <div className="contenedor">
                <div className="wrapper">
                <div className="">
                    <label className="switch">
                    <input className="toggle" type="checkbox" />
                    <span className="slider"></span>
                    <span className="card-side"></span>
                    <div className="flip-card__inner">
                        <div className="flip-card__front">
                        <div className="title">Login</div>
                        <form onSubmit={loginIn} className="flip-card__form">
                            <input type="email" placeholder="Email" name='email' onChange={handleEmailChange} className="flip-card__input" />
                            <input type="password" placeholder="Password" name='password' onChange={handlePasswordChange} className="flip-card__input" />
                            <button type='submit' className="flip-card__btn">Enviar</button>
                        </form>
                        </div>
                        <div className="flip-card__back">
                        <div className="title">Registro</div>
                        <form onSubmit={registroIn} className="flip-card__form">
                            <input type="text" placeholder="Nombre" name='nombre' onChange={handleNombreChange} className="flip-card__input" />
                            <input type="text" placeholder="Apellido" name="apellido" onChange={handleApellidoChange} className="flip-card__input" />
                            <input type="text" placeholder="Nombre de usuario" name="nameuser" onChange={handleNameUserChange} className="flip-card__input" />
                            <input type="email" placeholder="Email" name="email" onChange={handleEmailChange} className="flip-card__input" />
                            <input type="text" placeholder="Password" name="password" onChange={handlePasswordChange} className="flip-card__input" />
                            <button className="flip-card__btn">Enviar</button>
                        </form>
                        </div>
                    </div>
                    </label>
                </div>
                </div>
            </div>
        </>
    )
}

export default Login