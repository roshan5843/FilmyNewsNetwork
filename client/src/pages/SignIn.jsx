import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { signInStart, signInSuccess, signInFailure} from '../redux/user/userSlice'
import OAuth from '../components/OAuth'

const SignIn = () => {
  const [formData, setFormData] = useState({})
  const {loading, error: errorMessage} = useSelector(state => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.email || formData.passwword) {
      return dispatch(signInFailure('Please fill out all the fields.'))
    }
    try {
      dispatch(signInStart())
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      const data = await res.json()
      if (data.success === false) {
        dispatch(signInFailure(data.message))
      }
      if (res.ok) {
        dispatch(signInSuccess(data))
        navigate('/')
      }
    } catch (error) {
    dispatch(signInFailure(error.message))
    }
  }
  return (
    <div className='min-h-screen mt-20'>
      <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>
        {/* left div */}
        <div className='flex-1'>
          <Link to='/' className='  font-bold dark:text-white text-4xl'>
          <img src='/logo.png' alt='Logo' className='inline-block h-20 p-1 px-2' />
          </Link>
          <p className='text-sm'>
          At FilmyNewsNetwork, we’re passionate about movies from Bollywood and
        world cinema's blockbusters to indie gems, cult classics to
        international masterpieces.
          </p>
        </div>

        {/* right div */}
        <div className='flex-1'>
          <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
            <div>
              <Label value='Your Email'></Label>
              <TextInput
                type='email'
                placeholder='Email'
                id='email'
                onChange={handleChange}
              ></TextInput>
            </div>
            <div>
              <Label value='Your Password'></Label>
              <TextInput
                type='password'
                placeholder='Password'
                id='password'
                onChange={handleChange}
              ></TextInput>
            </div>
            <Button
              gradientDuoTone='purpleToPink'
              type='submit'
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size='sm' />
                  <span className='pl-3'>Loading...</span>
                </>
              ) : (
                'Sign In'
              )}
            </Button>
            <OAuth />
          </form>
          <div className=' flex gap-2 text-sm mt-5'>
            <span> Don't have an account?</span>
            <Link to='/sign-up' className='text-blue-500'>
              Sign Up
            </Link>
          </div>
          {errorMessage && (
            <Alert className='mt-5' color='failure'>
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  )
}

export default SignIn
