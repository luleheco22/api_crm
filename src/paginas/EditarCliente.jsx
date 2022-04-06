import Formulario from '../components/Formulario'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
//effect para consultar la Api, state para setear los valores y params para tener la ID de la url



const EditarCliente = () => {

  const { id } = useParams()

  const [cliente, setCliente] = useState({})
  const [cargando, setCargando] = useState(false)

  useEffect(() => {

    const obtenerClienteAPI = async () => {
      setCargando(!cargando)
      try {
        const url = `http://localhost:4000/clientes/${id}`
        const respuesta = await fetch(url)
        const resultado = await respuesta.json()
        setCliente(resultado)
      } catch (error) {
        console.log(error);
      }
      setCargando(false)
    }
    obtenerClienteAPI()
  }, [])



  return (
    <div>
      <h1 className='font-black text-4xl text-blue-900'>Editar Cliente</h1>
      <p className='mt-3'>Utiliza este formulario para editar datos de un cliente</p>

      {cliente?.nombre ? (
        <Formulario
          cliente={cliente}
          cargando={cargando}

        />
      ): <p>Cliente ID no válido</p>
    }
    </div>
  )
}

export default EditarCliente