import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import MovieNews from './pages/MovieNews'
import BoxOffice from './pages/BoxOffice'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Dashboard from './pages/Dashboard'
import Header from './components/Header'

function App() {
  return (
    <BrowserRouter>
              <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/movienews' element={<MovieNews />}/>
        <Route path='/boxoffice' element={<BoxOffice />}/>
        <Route path='/sign-in' element={<SignIn />}/>
        <Route path='/sign-up' element={<SignUp />}/>
        <Route path='/dashboard' element={<Dashboard />}/>
        
        
        
      </Routes>
    </BrowserRouter>
  )
}

export default App
