import { Formik, Form, Field, } from 'formik'
import React from 'react'
import * as Yup from 'yup'
import Alerta from './Alerta'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Spinner from './Spinner'

const Formulario = ({ cliente, cargando }) => {

   const navigate = useNavigate()

   const nuecoClienteSchema = Yup.object().shape({ //Validar Formulario
      nombre: Yup.string()
         .min(3, 'El nombre es muy corto')
         .max(20, 'El nombre es muy largo')
         .required('El nombre del Cliente es obligatorio'),

      empresa: Yup.string()
         .required('El nombre de la empresa es obligatorio'),

      email: Yup.string()
         .email('Email no Válido')
         .required('El email es obligatorio'),

      telefono: Yup.number()
         .positive('Numero no válido')
         .integer('Numero no válido')
         .typeError('El Número no es válido')



   })


   const handleSubmit = async (valores) => {
      console.log(valores);
      try {
         let respuesta
         if (cliente.id) {
            //Editando un Registro
            const url = `http://localhost:4000/clientes/${cliente.id}`
            respuesta = await fetch(url, {
               method: 'PUT',
               body: JSON.stringify(valores),
               headers: {
                  'Content-Type': 'application/json',

               }

            })

         } else {
            //Nuevo Registro
            const url = 'http://localhost:4000/clientes'
            respuesta = await fetch(url, {
               method: 'POST',
               body: JSON.stringify(valores),
               headers: {
                  'Content-Type': 'application/json',

               }

            })
         }

         await respuesta.json()
         navigate('/clientes')

      } catch (error) {
         console.log(error);
      }
   }


   return (

      cargando ? <Spinner /> : (

         <div className='bg-white mt-10 px-5 py-10 rounded-md 
    shadow-md md:w-3/4 mx-auto'>
            <h1 className='text-gray-600 font-bold text-xl uppercase text-center'
            >{cliente?.nombre ? 'Editar Cliente' : 'Agregar Cliente'}</h1>

            <Formik
               initialValues={{
                  //otra manera 
                  //nombre: cliente.nombre ? cliente.nombre:''
                  nombre: cliente?.nombre ?? '',  //Si es undefined entonces ''
                  empresa: cliente?.empresa ?? '',
                  email: cliente?.email ?? '',
                  telefono: cliente?.telefono ?? '',
                  notas: cliente?.notas ?? '',

               }}
               enableReinitialize={true}
               onSubmit={async (values, { resetForm }) => {

                  await handleSubmit(values) //carga los valores del formulario

                  resetForm()
               }}

               validationSchema={nuecoClienteSchema} //aqui valida el formulario con el Schema creado

            >


               {({ errors, touched }) => {
                  //  console.log(data);
                  return (

                     <Form
                        className='mt-10'
                     >
                        <div className='mb-4'>
                           <label
                              className='text-gray-800'
                              htmlFor='nombre'
                           >Nombre:</label>
                           <Field
                              id='nombre'
                              type='text'
                              className='mt-2 block w-full p-3 bg-gray-50'
                              placeholder='Nombre del Cliente'
                              name='nombre'

                           />
                           {errors.nombre && touched.nombre ? (
                              <Alerta>{errors.nombre}</Alerta>
                           ) : null}


                        </div>

                        <div className='mb-4'>
                           <label
                              className='text-gray-800'
                              htmlFor='empresa'
                           >Empresa:</label>
                           <Field
                              id='empresa'
                              type='text'
                              className='mt-2 block w-full p-3 bg-gray-50'
                              placeholder='Empresa del Cliente'
                              name='empresa'
                           />
                           {errors.empresa && touched.empresa ? (
                              <Alerta>{errors.empresa}</Alerta>
                           ) : null}
                        </div>

                        <div className='mb-4'>
                           <label
                              className='text-gray-800'
                              htmlFor='email'
                           >Email:</label>
                           <Field
                              id='email'
                              type='email'
                              className='mt-2 block w-full p-3 bg-gray-50'
                              placeholder='Email del Cliente'
                              name='email'
                           />
                           {errors.email && touched.email ? (
                              <Alerta>{errors.email}</Alerta>
                           ) : null}
                        </div>

                        <div className='mb-4'>
                           <label
                              className='text-gray-800'
                              htmlFor='telefono'
                           >Teléfono:</label>
                           <Field
                              id='telefono'
                              type='tel'
                              className='mt-2 block w-full p-3 bg-gray-50'
                              placeholder='Teléfono del Cliente'
                              name='telefono'
                           />
                           {errors.telefono && touched.telefono ? (
                              <Alerta>{errors.telefono}</Alerta>
                           ) : null}

                        </div>

                        <div className='mb-4'>
                           <label
                              className='text-gray-800'
                              htmlFor='notas'
                           >Notas:</label>
                           <Field
                              as='textarea'
                              id='notas'
                              type='text'
                              className='mt-2 block w-full p-3 bg-gray-50 h-40'
                              placeholder='Notas del Cliente'
                              name='notas'
                           />
                        </div>

                        <input
                           type='submit'
                           value={cliente?.nombre ? 'Editar Cliente' : 'Agregar Cliente'}
                           className='mt-5 w-full bg-blue-800 p-3 text-white
                     uppercase font-bold text-lg'

                        />

                     </Form>

                  )
               }}
            </Formik>

         </div>
      )
   )
}

Formulario.defaultProps = {
   cliente: {},
   cargando: false
}

export default Formulario