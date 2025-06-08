import { useState, useContext, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import useFetch from '../hooks/useFetch'
import { AuthContext } from '../layout/AuthContext'

const Login = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { fetchDataBackend } = useFetch();
    const { login } = useContext(AuthContext);

    useEffect(() => {
        const handleMessage = (event) => {
            if (event.origin !== "http://localhost:3000") return;
            const { token, user } = event.data;
            if (token) {
                login(token);
                sessionStorage.setItem("user", JSON.stringify(user));
                navigate('/dashboard');
            } else {
                toast.error("No se recibió el token desde Microsoft.");
            }
        };
        window.addEventListener("message", handleMessage);
        return () => window.removeEventListener("message", handleMessage);
    }, [login, navigate]);

const loginUser = async (data) => {
    const url = `${import.meta.env.VITE_BACKEND_URL}/login`;
    const response = await fetchDataBackend(url, data, 'POST');

    if (response?.token) {
  login(response.token);
  sessionStorage.setItem("token", response.token); // 🔥 IMPORTANTE
  navigate('/dashboard');

    } else {
        toast.error("Credenciales inválidas o error al iniciar sesión");
    }
};


    const openMicrosoftLogin = () => {
        window.open(
            "http://localhost:3000/auth/microsoft",
            "Microsoft Login",
            "toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=620,height=700"
        );
    };

    return (

    <div className="relative h-screen bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/images/epn_1.jpg')"  }}>
        <ToastContainer />

        {/* Contenedor centrado y traslúcido */}
        <div className="leading-normal absolute inset-0 flex justify-center items-center">
        <div className="bg-none bg-opacity-10 backdrop-blur-lg rounded-3xl shadow-2xl p-10 w-full max-w-120 space-y-8 ">
        <h1 className="font-serif text-2xl text-center text-white tracking-widest">LOGIN ADMINISTRADOR</h1>
        <p className="text-gray-200 text-sm text-center">Por favor ingresa tus datos</p>

            <form onSubmit={handleSubmit(loginUser)} className="space-y-5">
            {/* Correo */}
                <div>
                    <label className="block mb-1 text-white text-base ">Correo electrónico</label>
                    <input
                        type="email"
                        placeholder="Ingresa tu correo"
                        className="block w-full rounded-xl border border-gray-300 focus:border-black-700 focus:outline-none focus:ring-1 focus:ring-black-700 py-2 px-3 text-gray-900 text-sm"
                        {...register("email", { required: "El correo es obligatorio" })}
                    />
                {errors.email && <p className="text-red-300 text-sm">{errors.email.message}</p>}
            </div>

            {/* Contraseña */}
            <div>
                <label className="block mb-1 text-white text-base ">Contraseña</label>
                <div className="relative">
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="********************"
                        className="block w-full rounded-xl border border-gray-300 focus:border-black-700 focus:outline-none focus:ring-1 focus:ring-black-700 py-2 px-3 text-gray-900 pr-10"
                        {...register("password", { required: "La contraseña es obligatoria" })}
                    />
                    {errors.password && <p className="text-red-300 text-sm">{errors.password.message}</p>}
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute top-2 right-3 text-gray-500 hover:text-gray-700"
                    >
                        {showPassword ? (
                            <svg className="w-5 h-5" /* eye-off icon */ />
                        ) : (
                            <svg className="w-5 h-5" /* eye icon */ />
                        )}
                    </button>
                </div>
            </div>

            {/* Botón de iniciar sesión */}
            <button className="tracking-widest py-3 w-full text-center rounded-xl bg-gray-800 text-white hover:bg-white transition hover:scale-105 duration-300 hover:text-black">
                Iniciar sesión
            </button>
        </form>
        {/* Separador */}
        <div className="grid grid-cols-3 items-center text-gray-400 gap-2">
            <hr className="border-gray-500" />
            <p className="text-center text-sm">ó</p>
            <hr className="border-gray-500" />
        </div>

        {/* Microsoft login */}
        <button onClick={openMicrosoftLogin} className="bg-white  py-3 w-full rounded-xl flex justify-center items-center  hover:scale-105 duration-300 hover:bg-gray-900 hover:text-white    ">
            <img className="w-5 mr-2" src="https://cdn-icons-png.flaticon.com/512/732/732221.png" alt="Microsoft icon" />
            Iniciar sesión con Microsoft
        </button>

        {/* Enlaces extras */}
        <div className="text-center mt-4 text-sm">
            <Link to="/forgot/id" className="text-blue-200 hover:text-white underline">Olvidé mi contraseña</Link>
        </div>
        <div className="tracking-wider flex justify-between items-center mt-2 text-sm text-gray-200">
            <Link to="/" className="underline hover:text-white"> Regresar</Link>
        </div>
    </div>
</div>

    </div>
);

};

export default Login;
