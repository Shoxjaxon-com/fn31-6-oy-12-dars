import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import MainLeauts from './leyats/MainLeauts'
import Produckts from './pages/Product'
import Cart from './pages/Cart'
import ProductDeteils from './pages/ProductDeteils'

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<MainLeauts><Home /></MainLeauts>}/>
        <Route  path='/about' element={<MainLeauts><About /></MainLeauts>}/>
        <Route path='/product' element={<MainLeauts><Produckts/></MainLeauts>} />
        <Route  path='/cart' element={<MainLeauts><Cart/></MainLeauts>}/>
        <Route path='/product/:id' element={<MainLeauts><ProductDeteils/></MainLeauts>} />

      </Routes>
    </div>
  )
}

export default App
