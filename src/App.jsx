import { useState } from 'react'
import {BrowserRouter,Routes,Router, Route} from 'react-router-dom'
import Layout from './layout/Layout'
import Inicio from './paginas/inicio'
import NuevoCliente from './paginas/NuevoCliente'
import EditarCliente from './paginas/EditarCliente'
import VerCliente from './paginas/VerCliente'
//// json-server --watch db.json --port 4000 para iniciar el server JSON

function App() {
  


  
  return (
   <BrowserRouter>
     <Routes>
        <Route path='/clientes' element={<Layout/>}>
           <Route index element={<Inicio/>}/>
           <Route path='nuevo' element={<NuevoCliente/>}/>
           <Route path='editar/:id' element={<EditarCliente/>}/>
           <Route path=':id' element={<VerCliente/>}/>
        </Route>

     </Routes>
   </BrowserRouter>
  )
}

export default App
