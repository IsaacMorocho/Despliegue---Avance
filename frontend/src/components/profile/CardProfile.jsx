import { useEffect, useState } from "react";

export const CardProfile = () => {
  const [perfil, setPerfil] = useState(null);
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) return; 

    const fetchPerfil = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/perfil-superadmin`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        });

        if (!response.ok) throw new Error("Error al obtener el perfil");
        const data = await response.json();
        setPerfil(data);
      } catch (error) {
        console.error("Perfil error:", error);
      }
    };

    fetchPerfil();
  }, []);

  if (!perfil) {
    return (
      <div className="text-center text-black mt-10">
        Cargando perfil...
      </div>
    );
  }

  return (
    <div className="h-auto p-4 flex flex-col items-center justify-between rounded-lg space-y-4 ">

      <div className="relative">
        <img src="https://cdn-icons-png.flaticon.com/512/4715/4715329.png" alt="img-client"
          className="m-auto rounded-full border-2 border-black"
          width={120} height={120} />
        <label className="bg-blue-500 text-white rounded-md px-5 py-1 cursor-pointer hover:bg-red-400">
          Cambiar Avatar
          <input type="file" accept="image/*" className="hidden" />
        </label>
      </div>

      <div className="self-start">
        <b>Nombre:</b><p className="inline-block ml-3">{perfil.nombre}</p>
      </div>
      <div className="self-start">
        <b>Apellido:</b><p className="inline-block ml-3">{perfil.apellido}</p>
      </div>
      <div className="self-start">
        <b>Teléfono:</b><p className="inline-block ml-3">{perfil.celular}</p>
      </div>
      <div className="self-start">
        <b>Correo:</b><p className="inline-block ml-3">{perfil.email}</p> 
      </div>
      <div className="self-start">
        <b>Rol:</b><p className="inline-block ml-3">{perfil.rol}</p>
      </div>
    </div>
  );
};
