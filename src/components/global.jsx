import '../css/global.css'
import logo from '../assets/logo.png'

function Navegadora() {
    return (
        <header>
            <div className="menu">
                <img src={logo} alt="img" className='logo' />
                <nav>
                    <ul>
                        <li><a href="">Inicio</a></li>
                        <li><a href="">Sobre mi</a></li>
                        <li><a href="">Servicios</a></li>
                        <li><a href="">Blog</a></li>
                        <li><a href="">Contacto</a></li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default Navegadora;