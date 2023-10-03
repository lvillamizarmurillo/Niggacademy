import {BrowserRouter as Router, Routes,Route} from 'react-router-dom'
import Home from './components/views/Home'
import Login from './components/views/Login'

function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/login" element={<Login/>} />
      {/* <Route path="/" element={<Home/>} /> */}
    </Routes>
  </Router>
  )
}

export default App
