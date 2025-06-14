
const CardPassword = () => {

    return (
        <>
            <div className='mt-5'>
                <h1 className='font-black text-2xl text-gray-500 mt-16'>Actualizar contraseña</h1>
                <hr className='my-4 border-t-2 border-gray-400' />
            </div>

            <form >
                <div>
                    <label className="mb-2 block text-sm font-semibold">Contraseña actual</label>
                    <input type="text" placeholder="Ingresa tu contraseña actual" 
                    className="shadow-md block w-full rounded-md border border-gray-300 py-1 px-2 text-gray-500 mb-5" 
                    required/>
                </div>

                <div>
                    <label className="mb-2 block text-sm font-semibold">Nueva contraseña</label>
                    <input type="text" placeholder="Ingresa la nueva contraseña" 
                    className="shadow-md block w-full rounded-md border border-gray-300 py-1 px-2 text-gray-500 mb-5" 
                    required/>
                </div>

            <div className="text-center">
                <button
                    type="button"
                    className="bg-white border border-gray-400 text-gray-700 px-4 py-2 rounded shadow-md 
                    hover:bg-gray-700 hover:scale-105 duration-200 hover:text-white transition-all"
                >
                    ACTUALIZAR CONTRASEÑA
                </button>
            </div>

            </form>
        </>
    )
}

export default CardPassword