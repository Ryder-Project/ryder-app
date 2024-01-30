import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import './index.css'
import HomePage from './pages/HomePage'
import RequestRiderPage from './pages/RequestRiderPage'
import SignUpPage from './pages/Auth/SignUp'


function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage/>} />
        <Route path='/request-rider' element={<RequestRiderPage/>} />
        <Route path="/signup/rider" element={<SignUpPage />}/>

      </Routes>
    </Router>
  )
}

export default App
