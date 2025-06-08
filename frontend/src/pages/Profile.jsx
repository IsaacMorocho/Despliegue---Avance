import CardPassword from '../components/profile/CardPassword'
import { CardProfile } from '../components/profile/CardProfile'
import FormProfile from '../components/profile/FormProfile'

const Profile = () => {
  return (
    <div>
      <h1 className='font-black text-4xl text-gray-500'>Perfil</h1>
      <hr className='mr-80' />
      <div className='mt-4 ml-auto w-fit mr-10'>
        <CardProfile />
      </div>
      <div className='flex justify-around gap-x-5 flex-wrap gap-y-8 md:flex-nowrap mt-10'>
        <div className='md:w-1/1 mr-80 -mt-96'>
          <FormProfile />
          <CardPassword />
        </div>
      </div>
    </div>
  )
}

export default Profile
