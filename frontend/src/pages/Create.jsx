import { Form } from '../components/create/Form'

const Create = () => {
    return (
        <div>
            <h1 
            style={{ fontFamily: 'Lora, serif' }}
            className='font-black text-4xl text-gray-600'>Redes Comunitarias</h1>
            <hr className='my-4 border-t-2 border-gray-300' />
            <p className='mb-8'>Este módulo permitira gestionar las redes comunitarias atraves de sus respectivos administradores</p>
            <Form />
        </div>
    )
}

export default Create