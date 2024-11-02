import { signInWithGoogle} from '../../services';
import { FiLogIn, FiUser, AiOutlineGoogle } from '../../assets';

export function LoginControl(): JSX.Element {
  return (
    <div className='flex h-full animate-fade flex-col items-center justify-center gap-8 text-center'>
      <h1 className='text-4xl font-bold text-green-300 italic'>akdimensia</h1>

      <div
  className='flex w-full max-w-md flex-col items-center justify-center 
             gap-6 rounded-3xl bg-gradient-to-br from-[#1c1c1c] via-[#2e2e2e] to-[#3a3a3a] 
             p-6 shadow-xl transition-all duration-500 hover:shadow-2xl 
             border border-[#444] backdrop-blur-lg'
>
  <i className='text-5xl text-gray-300 transition-transform duration-500 hover:scale-110'>
    <FiLogIn />
  </i>
  <div className='flex flex-col items-center gap-3 text-center text-gray-200'>
    <h2 className='text-2xl font-extrabold bg-clip-text text-transparent 
                   bg-gradient-to-r from-pink-500 to-yellow-500'>
      You are not signed in yet
    </h2>
    <p className='text-sm font-light opacity-90'>
      Please sign in with your Google account to stay synced across all devices 🙏
    </p>
  </div>
  <div className='children:btn-focus flex w-full justify-center gap-4 text-base children:flex 
                  children:w-full children:max-w-[150px] children:items-center 
                  children:justify-center children:gap-3 children:rounded-xl 
                  children:border-none children:bg-gradient-to-r from-blue-500 to-purple-500
                  children:px-5 children:py-3 children:text-xl
                  children:transition-transform children:duration-500 
                  hover:children:scale-110 focus-visible:children:ring-offset-4'>
    <button
      className='relative inline-flex items-center justify-center w-full max-w-xs px-8 py-4 
                 text-lg font-semibold text-white transition-all duration-500 ease-in-out 
                 transform bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 
                 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-110 
                 hover:from-purple-600 hover:to-green-400 
                 focus:outline-none focus:ring-4 focus:ring-green-300 active:scale-95'
      type='button'
      onClick={signInWithGoogle}
    >
      <span className='absolute inset-0 w-full h-full 
                      bg-gradient-to-r from-white/30 via-transparent to-white/30 
                      opacity-0 transition-opacity duration-300 ease-in-out 
                      rounded-2xl group-hover:opacity-100 
                      pointer-events-none'></span>
      <AiOutlineGoogle className='mr-3 text-3xl transition-transform duration-300 
                           ease-in-out group-hover:rotate-12' />
      <span className='relative z-10'>Google</span>
    </button>
  </div>
</div>

      <p className='text-lg'>
        Crafted with{' '}
        <span role='img' aria-label='heart'>
        💦💦❤️{' '}
        </span>
        by{' '}
        <a
          className='btn-focus rounded px-0.5 decoration-transparent underline-offset-2 transition
                     duration-300 hover:text-pink-400 hover:underline hover:decoration-red-200
                     focus-visible:ring-2'
          href='https://github.com/ccrsxx'
          target='_blank'
          rel='noreferrer'
        >
          Dubey
        </a>
      </p>
    </div>
  );
}
