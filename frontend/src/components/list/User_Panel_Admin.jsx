import { useState } from "react";
import { MdDeleteForever, MdPublishedWithChanges } from "react-icons/md";
import { FiUserPlus } from "react-icons/fi";

const UserCRUD = () => {
  const [userInfo, setUserInfo] = useState({
    nombre: "",
    apellido: "",
    celular: "",
    correo: "",
    rol: "",
    redComunitaria: "",
    contraseña: ""
  });

  // Estado para almacenar múltiples usuarios
  const [users, setUsers] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Agregar el nuevo usuario a la lista
    setUsers([...users, userInfo]);
    // Limpiar el formulario
    setUserInfo({
      nombre: "",
      apellido: "",
      celular: "",
      correo: "",
      rol: "",
      redComunitaria: "",
      contraseña: ""
    });
  };

  const handleDelete = (index) => {
    const updatedUsers = users.filter((_, i) => i !== index);
    setUsers(updatedUsers);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Formulario de creación de usuario */}
      <div className="bg-slate-300 p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Crear nuevo usuario</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
              <input
                type="text"
                name="nombre"
                value={userInfo.nombre}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-700 rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Apellido</label>
              <input
                type="text"
                name="apellido"
                value={userInfo.apellido}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-700 rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Celular</label>
              <input
                type="tel"
                name="celular"
                value={userInfo.celular}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-700 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Correo electrónico</label>
              <input
                type="email"
                name="correo"
                value={userInfo.correo}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-700 rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Rol</label>
              <input
                type="text"
                name="rol"
                value={userInfo.rol}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-700 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Red comunitaria</label>
              <input
                type="text"
                name="redComunitaria"
                value={userInfo.redComunitaria}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-700 rounded-md"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
              <input
                type="password"
                name="contraseña"
                value={userInfo.contraseña}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-700 rounded-md"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="flex items-center justify-center w-61 bg-white border border-slate-300 text-gray-700 px-9 py-2 rounded shadow-md 
                    hover:bg-gray-700 hover:scale-105 duration-200 hover:text-white transition-all"
          >
            <FiUserPlus className="h-5 w-9"/>
            CREAR USUARIO
          </button>
        </form>
      </div>

      {/* Tabla de usuarios */}
      <div className="bg-slate-300 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Lista de Usuarios</h2>
        
        {users.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-700">
              <thead>
                <tr className="bg-gray-700 text-white">
                  <th className="py-2 px-4 border-b">Nombre</th>
                  <th className="py-2 px-4 border-b">Apellido</th>
                  <th className="py-2 px-4 border-b">Celular</th>
                  <th className="py-2 px-4 border-b">Correo</th>
                  <th className="py-2 px-4 border-b">Rol</th>
                  <th className="py-2 px-4 border-b">Red Comunitaria</th>
                  <th className="py-2 px-4 border-b">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={index} className="hover:bg-gray-100">
                    <td className="py-2 px-4 border-b border-gray-700">{user.nombre || "--"}</td>
                    <td className="py-2 px-4 border-b border-gray-700">{user.apellido || "--"}</td>
                    <td className="py-2 px-4 border-b border-gray-700">{user.celular || "--"}</td>
                    <td className="py-2 px-4 border-b border-gray-700">{user.correo || "--"}</td>
                    <td className="py-2 px-4 border-b border-gray-700">{user.rol || "--"}</td>
                    <td className="py-2 px-4 border-b border-gray-700">{user.redComunitaria || "--"}</td>
                    <td className="py-2 px-4 border-b border-gray-700">
                      <div className="flex justify-center space-x-2">
                        <button 
                          className="p-1 text-blue-600 hover:text-blue-800"
                          title="Actualizar"
                        >
                          <MdPublishedWithChanges className="h-5 w-5" />
                        </button>
                        <button 
                          className="p-1 text-red-600 hover:text-red-800"
                          title="Eliminar"
                          onClick={() => handleDelete(index)}
                        >
                          <MdDeleteForever className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center py-4">No hay usuarios registrados</p>
        )}
      </div>
    </div>
  );
};

export default UserCRUD;