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
    <div className="max-w-full w-full mx-auto bg-slate-300 shadow-lg rounded-lg p-6 space-y-8">
      
      {/* Imagen y botón */}
      <div className="flex flex-col items-center space-y-2">
        <img
          src="https://cdn-icons-png.flaticon.com/512/4715/4715329.png"
          alt="img-client"
          className="w-28 h-28 rounded-full border-2 border-black object-cover"
        />
        <label className="bg-blue-500 text-white rounded-md px-4 py-2 cursor-pointer hover:bg-red-500 text-sm">
          Cambiar Avatar
          <input type="file" accept="image/*" className="hidden" />
        </label>
      </div>

      {/* Información */}
      <div className="space-y-2 text-sm sm:text-base">
        <div className="flex">
          <b className="w-24">Nombre:</b> <span>{perfil.nombre}</span>
        </div>
        <div className="flex">
          <b className="w-24">Apellido:</b> <span>{perfil.apellido}</span>
        </div>
        <div className="flex">
          <b className="w-24">Teléfono:</b> <span>{perfil.celular}</span>
        </div>
        <div className="flex">
          <b className="w-24">Correo:</b> <span>{perfil.email}</span>
        </div>
        <div className="flex">
          <b className="w-24">Rol:</b> <span>{perfil.rol}</span>
        </div>
      </div>
    </div>
  );
};
