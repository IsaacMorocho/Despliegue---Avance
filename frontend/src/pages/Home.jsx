import logoDarkMode from '../assets/dark.png'
import AppStoreImage from '../assets/appstore.png'
import GooglePlayImage from '../assets/googleplay.png'
import { Link } from 'react-router'
import { MdDashboard } from "react-icons/md";
import { FiActivity } from "react-icons/fi";
import { FiAlertCircle } from "react-icons/fi";
import { FaCommentSms } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
import { SiCashapp } from "react-icons/si";



export const Home = () => {
    return (
        <>
            <header className="container mx-auto h-40 text-center py-4 md:flex justify-between items-center px-4 md:h-15">
                <div className="flex items-center gap-x-2">
                <img className="w-17 h-16 " src="/images/app_logo.png" alt="Logo" />
                <h1 className="font-bold text-2xl text-blue-700">
                    Poli<span className="text-red-700">RED</span>
                </h1>
                </div>
                <ul className='flex gap-7 justify-center flex-wrap'>
                    <li><a href="/" className='font-bold hover:text-amber-700 hover:underline'>Inicio</a></li>
                    <li><a href="#about" className='font-bold hover:text-amber-700 hover:underline'>Sobre nosotros</a></li>
                </ul>
                    <Link to="/login" className=" inline-block bg-white px-2 py-1 text-gray-700
                     hover:bg-gray-700 hover:text-white hover:scale-104 transition">
                        Administración
                    </Link>

            </header>
            <main className="relative w-full aspect-[18/4] my-5 bg-[url('/images/banner_home1.jpg')] bg-cover bg-center justify-center text-white">
                <div className="bg-black/50 w-full h-full absolute top-0 left-0 z-0"></div> {/* opcional: oscurece fondo */}
                
                <div className="relative z-50 px-6 md:text-left">
                    <h1 className="font-lato font-extrabold text-white uppercase text-3xl md:text-5xl py-13">La red social <br />para los politécnicos</h1>
                    <p className="text-lg md:text-2xl my-1">Chats, publicaciones, apoyo académico y mucho más...</p>
                </div>
                </main>
                    <p className="font-bold text-center my-15 text-xl text-gray-700">Poli Red se encuentra disponible en:</p>
                    <div className="flex justify-center items-center gap-6 ">
                    <a href="#"><img src={AppStoreImage} alt="App Store" className="h-10" /></a>
                    <a href="#"><img src={GooglePlayImage} alt="Google Play" className="h-10" /></a>
                    </div>
            <section id="about" className='container mx-auto px-4'>

                <div className='container mx-auto relative mt-20'>
                    <h2 className='font-semibold text-3xl relative z-1 w-80 text-center mx-auto bg-white'>¿Quiénes Somos?</h2>
                    <div className='text-cyan-600 border-2 absolute top-1/2 w-full z-0' />
                </div>

                <div className='my-10 flex flex-col gap-10 items-center sm:flex-row sm:justify-around sm:items-center'>

                    <div className='sm:w-1/2'>
                        <img src="/images/logo_epn.png" alt="App Store" className='w-full h-full object-cover' />
                    </div>

                    <div className='px-10 sm:w-1/2'>
                        <p className='my-10'>PoliRED es una app para compartir recursos academicos solamente entre estudiantes de la EPN. Aqui algunas de nuestras caracteristicas:
                        </p>
                        <ul className='space-y-7'>
                            <li>
                                <MdDashboard className='inline text-2xl mr-2' />Interfaz inspirada en Instagram
                            </li>
                            <li>
                                <FaCommentSms className='inline text-2xl mr-2' />
                                Chats en tiempo real
                            </li>
                            <li>
                                <FiAlertCircle className='inline text-2xl mr-2'  />
                                Control sobre tus publicaciones
                            </li>
                            <li>
                                <FiActivity  className='inline text-2xl mr-2' />
                                Constante actividad administrativa
                            </li>
                            <li>
                                <SiCashapp className='inline text-2xl mr-2' />
                                Compra y venta de recursos estudiantiles.
                            </li>
                        </ul>
                        <p className='my-7'>Y muchas funcionalidades mas!</p>
                    </div>

                </div>
            </section>



            <footer className='text-center bg-neutral-200 p-6 sm:px-20 sm:py-10 mt-5 rounded-tr-3xl rounded-tl-3xl space-y-8'>
                <div className='flex justify-between items-center'>
                    <div className='text-left'>
                    <div className='text-3xl font-extrabold text-blue-900'>Envíanos tus sugerencias</div>
                    </div>
                    <div className='flex-1 sm:max-w-1/2'>
                        <form action="#" className='w-full p-4'>
                            <fieldset className='border-2 border-gray-400 p-4 rounded-sm '>
                                <legend className='bg-gray-700 w-full text-left text-white pl-2 py-2 rounded-sm '>Sugerencias / Recomendaciones</legend>
                                <div className='flex justify-between gap-4'>
                                    <input type="email" placeholder="Mensaje" className='sm:flex-1 border border-gray-500 rounded-md focus:outline-none px-2' />
                                    <button className='flex-1 sm:max-w-40 border bg-red-700 p-1 rounded-lg text-white'>Enviar</button>
                                </div>
                            </fieldset>
                        </form>
                    </div>
                </div>
                <div className='flex justify-between'>
                    <ul className='flex gap-4'>
                        <li>
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                            <FaFacebook className="text-2xl hover:text-blue-600 transition-colors" />
                        </a>
                        </li>
                        <li>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                            <FaSquareInstagram className="text-2xl hover:text-pink-500 transition-colors" />
                        </a>
                        </li>
                        <li>
                        <a href="https://x.com" target="_blank" rel="noopener noreferrer">
                            <FaXTwitter className="text-2xl hover:text-black transition-colors" />
                        </a>
                        </li>

                    </ul>
                </div>

                <hr className='border-1 border-red-700' />

                <p className='font-semibold'>
                    Desarrollo de Aplicaciones Web - Grupo #3
                </p>
            </footer>

        </>
    )
}

