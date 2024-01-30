import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import './index.css'
import HomePage from './pages/HomePage'
import SignUpPage from './pages/Auth/SignUp'


function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage/>} />
        <Route path="/signup" element={<SignUpPage />}/>

      </Routes>
    </Router>
  )
}

export default App
