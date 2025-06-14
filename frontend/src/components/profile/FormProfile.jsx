const FormularioPerfil = () => {
    return (
        <form>
            <div className="flex flex-col md:flex-row md:gap-5 mb-5 mt-8">
                <div className="md:w-1/2 mb-5 md:mb-0">
                    <label className="mb-2 block text-sm font-semibold">Nombre</label>
                    <input
                        type="text"
                        placeholder="Ingresa tu nombre"
                        className="shadow-md block w-full rounded-md border border-gray-300 py-1 px-2 text-gray-500"
                    />
                </div>
                <div className="md:w-1/2">
                    <label className="mb-2 block text-sm font-semibold">Apellido</label>
                    <input
                        type="text"
                        placeholder="Ingresa tu apellido"
                        className="shadow-md block w-full rounded-md border border-gray-300 py-1 px-2 text-gray-500"
                    />
                </div>
            </div>

            <div className="mb-5">
                <label className="mb-2 block text-sm font-semibold">Celular</label>
                <input
                    type="text"
                    placeholder="Ingresa su celular"
                    className="shadow-md block w-full rounded-md border border-gray-300 py-1 px-2 text-gray-500"
                />
            </div>

            <div className="mb-5">
                <label className="mb-2 block text-sm font-semibold">Correo electrónico</label>
                <input
                    type="email"
                    placeholder="Ingresa su correo electrónico"
                    className="shadow-md block w-full rounded-md border border-gray-300 py-1 px-2 text-gray-500"
                />
            </div>

            <div className="text-center">
                <button
                    type="button"
                    className="bg-white border border-gray-400 text-gray-700 px-4 py-2 rounded shadow-md 
                    hover:bg-gray-700 hover:scale-105 duration-200 hover:text-white transition-all"
                >
                    ACTUALIZAR INFORMACION
                </button>
            </div>
        </form>
    )
}

export default FormularioPerfil;
