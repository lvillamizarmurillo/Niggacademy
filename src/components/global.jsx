import '../css/global.css'
import logo from '../assets/logo.png'

function Navegadora() {
    return (
        <header>
            <div className="menu">
                <img src={logo} alt="img" className='logo' />
                <nav>
                    <ul>
                        <li><a href="http://127.16.15.14:5073/">Home</a></li>
                        <li><a href="http://127.16.15.14:5073/login/">Login</a></li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default Navegadora;