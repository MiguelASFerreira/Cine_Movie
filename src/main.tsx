import React from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

import App from './App'
import Home from './pages/Home'
import Movie from './pages/Movie'
import Serie from './pages/Serie'
import Search from './pages/Search'
import ListMovies from './pages/ListMovies'
import ListSeries from './pages/ListSerie'

import './index.css'


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route element={<App />} >
          <Route path='/' element={<Home />} />
          <Route path='/movie/:id' element={<Movie />} />
          <Route path='/serie/:id' element={<Serie />} />
          <Route path='search' element={<Search />} />
          <Route path='/movies' element={<ListMovies />} />
          <Route path='/series' element={<ListSeries />} />
        </Route>
      </Routes>
    </Router>
  </React.StrictMode>
)

