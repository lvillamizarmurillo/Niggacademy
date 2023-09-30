import {BrowserRouter as Router, Routes,Route} from 'react-router-dom'

function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<h1>Home page</h1>} />
      {/* <Route path="/" element={<Home/>} /> */}
    </Routes>
  </Router>
  )
}

export default App
