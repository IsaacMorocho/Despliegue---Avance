import { Link, useOutlet, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import { motion,AnimatePresence } from 'framer-motion'

const Dashboard = () => {
  const location = useLocation();
  const outlet = useOutlet(); // nuevo hook
  const urlActual = location.pathname;
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
      {/* Encabezado */}
      <div className='w-full bg-gray-700 py-2 px-2 flex items-center justify-end gap-4 z-50'>
        <img
          src='/images/logo_admin.png'
          alt='img-client'
          className='absolute left-10 mt-1 rounded-full'
          width={50}
          height={50}
        />
        <div
          style={{ fontFamily: 'Lora, serif' }}
          className='absolute left-1/2 tracking-widest text-2xl transform -translate-x-1/2 font-semibold text-slate-100'
        >
          PANEL DE CONTROL
        </div>
        <div className='text-md font-semibold text-slate-100'>Super Administrador -</div>
          <img
            src='https://cdn-icons-png.flaticon.com/512/4715/4715329.png'
            alt='img-client'
            className='border-2 border-green-600 rounded-full'
            width={50}
            height={50}
          />
        <button
          onClick={handleLogout}
          className='text-white mr-3 text-md block hover:bg-red-900 text-center bg-red-800 px-4 py-1 rounded-lg'
        >
          Cerrar Sesión
        </button>
      </div>

      {/* Layout principal */}
      <div className='md:flex md:min-h-screen'>
        {/* Sidebar con contenido sticky */}
        <div className='md:w-1/6 bg-slate-300 px-5 py-4'>
          <div className='sticky top-16'> {/* Se mantiene visible al hacer scroll */}
            <ul className='mt-5 py-45'>
              <li className='text-center text-2xl'>
                <Link
                  to='/dashboard'
                  style={{ fontFamily: 'Lora, serif' }}
                  className={`${
                    urlActual === '/dashboard'
                      ? 'transition-all duration-700 ease-in-out text-slate-300 bg-gray-700 px-3 py-2 rounded-md text-center'
                      : 'text-gray-700'
                  } text-2xl block mt-2 hover:text-slate-400`}
                >
                  Perfil
                </Link>
              </li>
              <hr className='mt-5 border-gray-700' />

              <li className='text-center'>
                <Link
                  to='/dashboard/listar'
                  style={{ fontFamily: 'Lora, serif' }}
                  className={`${
                    urlActual === '/dashboard/listar'
                      ? 'transition-all duration-700 ease-in-out text-slate-300 bg-gray-700 px-3 py-2 rounded-md text-center'
                      : 'text-gray-700'
                  } text-2xl block mt-2 hover:text-slate-400`}
                >
                  Usuarios
                </Link>
              </li>
              <hr className='mt-5 border-gray-700' />
              <li className='text-center'>
                <Link
                  to='/dashboard/crear'
                  style={{ fontFamily: 'Lora, serif' }}
                  className={`${
                    urlActual === '/dashboard/crear'
                      ? 'transition-all duration-700 ease-in-out text-slate-300 bg-gray-700 px-3 py-2 rounded-md text-center'
                      : 'text-gray-700'
                  } text-2xl block mt-2 hover:text-slate-400`}
                >
                  Red Comunitaria
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Contenido principal */}
        <div className='flex-1 flex flex-col justify-between h-screen bg-gray-100'>
          <div className='overflow-y-scroll p-8 mt-4'>
            <AnimatePresence mode="wait">
              <motion.div
                key={location.key} // Cambiar de pathname a key
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              >
                {outlet}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
