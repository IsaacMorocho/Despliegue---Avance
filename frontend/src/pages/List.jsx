import UsuariosCrud from "../components/list/User_Panel_Admin"

const List = () => {
    return (
        <div>
            <h1 
                style={{ fontFamily: 'Lora, serif' }}
                className='font-black text-4xl text-gray-600'>Usuarios</h1>
            <hr className='my-4 border-t-2 border-gray-300' />
            <p className='mb-8'>Para crear usuarios llene los siguientes campos:</p>
            <UsuariosCrud/>
        </div>
    )
}

export default List