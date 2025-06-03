
import CardPassword from '../components/profile/CardPassword'
import { CardProfile } from '../components/profile/CardProfile'
import FormProfile from '../components/profile/FormProfile'


const Profile = () => {
    return (
        <>       
            <div>
                <h1 className='font-black text-4xl text-gray-500'>Perfil</h1>
                <hr className='x'/>
            </div>

            <div className='flex justify-around gap-x-8 flex-wrap gap-y-8 md:flex-nowrap'>
                <div className='w-full md:w-1/2'>
                    <FormProfile/>
                </div>
                <div className='w-full md:w-1/2'>
                    <CardProfile/>
                    <CardPassword/>
                </div>
            </div>
        </>

    )
}

export default Profile