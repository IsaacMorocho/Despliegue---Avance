import logoDog from '../assets/dog-hand.webp';
import { ToastContainer, toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import useFetch from '../hooks/useFetch';
import { useParams } from 'react-router'; // Corregido: useParams viene de 'react-router-dom'

const Reset = () => {
    const { token } = useParams();
    const { fetchDataBackend } = useFetch();
    const [tokenBack, setTokenBack] = useState(false);

    const verifyToken = async () => {
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/reset/${token}`;
            await fetchDataBackend.axios(url, null, 'POST');
            setTokenBack(true);
        } catch (error) {
            console.error("Error al verificar token:", error);
            toast.error("Token inválido o expirado.");
            setTokenBack(false);
        }
    };

    useEffect(() => {
        verifyToken();
    }, []);

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <ToastContainer />
            <h1 className="text-3xl font-semibold mb-2 text-center text-gray-500">
                Bienvenido nuevamente
            </h1>
            <small className="text-gray-400 block my-4 text-sm">
                Por favor, ingrese los siguientes datos
            </small>
            <img
                className="object-cover h-80 w-80 rounded-full border-4 border-solid border-slate-600"
                src={logoDog}
                alt="Imagen de bienvenida"
            />

            {tokenBack && (
                <form className="w-80">
                    <div className="mb-4">
                        <label className="mb-2 block text-sm font-semibold">
                            Nueva contraseña
                        </label>
                        <input
                            type="password"
                            placeholder="Ingresa tu nueva contraseña"
                            className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-1.5 text-gray-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="mb-2 block text-sm font-semibold">
                            Confirmar contraseña
                        </label>
                        <input
                            type="password"
                            placeholder="Repite tu contraseña"
                            className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-1.5 text-gray-500"
                        />
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="bg-gray-600 text-slate-300 border py-2 w-full rounded-xl mt-5 hover:scale-105 duration-300 hover:bg-gray-900 hover:text-white"
                        >
                            Enviar
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
};

export default Reset;
