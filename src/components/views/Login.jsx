import '../../css/login.css'
import React from 'react';
import Navegadora from '../global';

function Login() {
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
                        <div className="title">Log in</div>
                        <form action="" className="flip-card__form">
                            <input type="email" placeholder="Email" name="email" className="flip-card__input" />
                            <input type="password" placeholder="Password" name="password" className="flip-card__input" />
                            <button className="flip-card__btn">Let's go!</button>
                        </form>
                        </div>
                        <div className="flip-card__back">
                        <div className="title">Sign up</div>
                        <form action="" className="flip-card__form">
                            <input type="text" placeholder="Name" className="flip-card__input" />
                            <input type="email" placeholder="Email" name="email" className="flip-card__input" />
                            <input type="password" placeholder="Password" name="password" className="flip-card__input" />
                            <button className="flip-card__btn">Confirm!</button>
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