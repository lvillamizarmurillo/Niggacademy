import {BrowserRouter as Router, Routes,Route} from 'react-router-dom'
import Home from './components/views/Home'
import Login from './components/views/Login'
import Sectiones from './components/views/Secciones'
import Video from './components/views/Video'

function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/secciones/*" element={<Sectiones/>} />
      <Route path="/contenido/:curso/:seccion/:video?" element={<Video/>} />
      {/* <Route path="/" element={<Home/>} /> */}
    </Routes>
  </Router>
  )
}

export default App
