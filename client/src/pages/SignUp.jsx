import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import OAuth from '../components/OAuth'

const SignUp = () => {
  const [formData, setFormData] = useState({})
  const [errorMessage, setErrorMessage] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.username || !formData.email || formData.passwword) {
      return setErrorMessage('Please fill out all the fields.')
    }
    try {
      setLoading(true)
      setErrorMessage(null)
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      const data = await res.json()
      if (data.success === false) {
        return setErrorMessage(data.message)
      }
      setLoading(false)
      if (res.ok) {
        navigate('/sign-in')
      }
    } catch (error) {
      setErrorMessage(error.message)
      setLoading(false)
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
              <Label value='Your Name'></Label>
              <TextInput
                type='text'
                placeholder='Username'
                id='username'
                onChange={handleChange}
              ></TextInput>
            </div>
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
                'Sign Up'
              )}
            </Button>
            <OAuth />
          </form>
          <div className=' flex gap-2 text-sm mt-5'>
            <span>Have an account?</span>
            <Link to='/sign-in' className='text-blue-500'>
              Sign In
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

export default SignUp
