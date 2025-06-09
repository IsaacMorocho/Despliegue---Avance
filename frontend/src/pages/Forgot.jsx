import {Link } from 'react-router'
import useFetch from '../hooks/useFetch'
import { useForm } from 'react-hook-form';
import { ToastContainer} from 'react-toastify'
import { motion } from 'framer-motion'

export const Forgot = () => {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const { fetchDataBackend } = useFetch()

    const sendMail = (data) => {
        const url = `${import.meta.env.VITE_BACKEND_URL}/recuperar-password/`
        fetchDataBackend(url, data,'POST')
    }

return (
  <motion.div
    initial={{ opacity: 0, x:-25 }}     // empieza a la derecha y transparente
    animate={{ opacity: 1, x: 0 }}       // se vuelve visible y vuelve a su lugar
    exit={{ opacity: 0, x: 100 }}       // opcional: sale hacia la izquierda
    transition={{ duration: 0.5 }}       // duración suave
    className="flex flex-col sm:flex-row h-screen"
  >
    <div className="w-full sm:w-1/2 h-1/3 sm:h-screen bg-[url('/images/forgot_pass.jpg')] 
        bg-no-repeat bg-cover bg-center sm:block hidden" />

    <ToastContainer />

    <div className="w-full sm:w-1/2 h-screen bg-white flex justify-center items-center">
      <div className="md:w-4/5 sm:w-full">
        <h1 className="text-3xl font-serif mb-2 text-center uppercase text-gray-700">
          RECUPERAR CUENTA
        </h1>

        <form onSubmit={handleSubmit(sendMail)}>
          <div className="mb-1">
            <label className="mb-2 block text-sm font-semibold my-11">
              Ingrese el correo electronico asociado a su cuenta:
            </label>
            <input
              type="email"
              placeholder="Ingresa un correo electrónico válido"
              className="block w-full rounded-md border border-gray-500 focus:border-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-100 py-1 px-1.5 text-gray-500"
              {...register("email", { required: "El correo electrónico es obligatorio" })}
            />
            {errors.email && <p className="text-red-800">{errors.email.message}</p>}
          </div>

          <div className="text-center">
            <button
              type="button"
              className="my-7 bg-gray-700 border border-gray text-white px-4 py-2 rounded shadow-md 
                        hover:bg-white hover:scale-105 duration-200 hover:text-gray-700 transition-all"
            >
              ENVIAR CONFIRMACIÓN
            </button>
          </div>
        </form>

        <div className="mt-5 text-xs border-b-2 " />

        <div className="tracking-wider flex justify-between items-center mt-2 text-sm text-gray-700">
          <Link to="/login" className="underline hover:text-black tracking-widest"> Regresar</Link>
        </div>
      </div>
    </div>
  </motion.div>
)
}