export const CardProfile = () => {
    const user = JSON.parse(sessionStorage.getItem("user"));

    const nombre = user?.name?.givenName || "No disponible";
    const apellido = user?.name?.familyName || "No disponible";
    const correo = user?.email || user?.userPrincipalName || "No disponible";

    return (
        <div className="bg-white border border-slate-200 h-auto p-4 
                        flex flex-col items-center justify-between shadow-xl rounded-lg">

            <div className="relative">
                <img src="https://cdn-icons-png.flaticon.com/512/4715/4715329.png" alt="img-client" className="m-auto rounded-full border-2 border-black" width={120} height={120} />
                <label className="absolute bottom-0 right-0 bg-blue-400  text-white rounded-full p-2 cursor-pointer hover:bg-emerald-400">📷
                    <input type="file" accept="image/*" className="hidden" />
                </label>
            </div>

            <div className="self-start">
                <b>Nombre:</b><p className="inline-block ml-3">{nombre}</p>
            </div>
            <div className="self-start">
                <b>Apellido:</b><p className="inline-block ml-3">{apellido}</p>
            </div>
            <div className="self-start">
                <b>Dirección:</b><p className="inline-block ml-3">No disponible</p>
            </div>
            <div className="self-start">
                <b>Teléfono:</b><p className="inline-block ml-3">No disponible</p>
            </div>
            <div className="self-start">
                <b>Correo:</b><p className="inline-block ml-3">{correo}</p>
            </div>
        </div>
    );
}
