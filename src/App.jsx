import './App.css'
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Reward from './pages/Reward';
function App() {
  
  return (
    <>
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/reward' element={<Reward />}/>
        </Routes>
      </Router>
    </div>
    </>
  )
}

export default App
