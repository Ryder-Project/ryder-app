import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import './index.css'
import HomePage from './pages/HomePage'
import RequestRiderPage from './pages/RequestRiderPage'

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage/>} />
        <Route path='/request-rider' element={<RequestRiderPage/>} />
      </Routes>
    </Router>
  )
}

export default App
