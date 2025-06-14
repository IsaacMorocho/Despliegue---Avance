import CardPassword from '../components/profile/CardPassword'
import { CardProfile } from '../components/profile/CardProfile'
import FormProfile from '../components/profile/FormProfile'

const Profile = () => {
  return (
    <div>
      <h1 
        style={{ fontFamily: 'Lora, serif' }}
        className='font-black text-4xl text-gray-600'>Perfil</h1>
      <hr className='mr-98' />
        <div className="flex flex-col lg:flex-row gap-6 items-start w-full px-4">
          <div className="w-full lg:w-2/3">
            <FormProfile />
            <CardPassword/>
          </div>
          <div className="w-full lg:w-1/3">
            <CardProfile />
          </div>
        </div>
    </div>
  )
}

export default Profile
