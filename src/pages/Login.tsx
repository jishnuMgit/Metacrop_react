import { useEffect, useState } from 'react'
import { Form, FormInput } from '@/components/ui'
import { EyeIcon, EyeOff } from '@/components/icons'
import { Formik } from 'formik'
import { LoginSchema } from '@/schema'
import { initialFormValues } from '@/config/constants'
import { setCookie } from '@/utils/helpers'
import { useNavigate } from 'react-router-dom'
import { useFormApi } from 'useipa'
import { Button, Typography } from '@material-tailwind/react'
import Logo from '../assets/images/connectlylogo-removebg-preview.png'
import { EtheralShadow } from '@/components/ui/EtherealShadow'

function Login() {
  const [show, setShow] = useState(false)
  const navigate = useNavigate()
  const { success, submitForm, error, fetching } = useFormApi()

  useEffect(() => {
    if (success) {
      setCookie('logged_in', 'true')
      navigate('/')
    }
  }, [success, navigate])

  const togglePassword = () => setShow((prev) => !prev)

  return (
    <div className="relative flex w-full h-screen justify-center items-center">
      <EtheralShadow
        color="rgba(128, 128, 128, 0.8)"
        animation={{ scale: 100, speed: 60 }}
        noise={{ opacity: 0.8, scale: 1.5 }}
        sizing="fill"
      >
        <div className="flex w-full max-w-5xl mx-auto bg-white/60 rounded-2xl shadow-lg backdrop-blur-lg overflow-hidden">
          {/* Left Side - Form */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 py-12">
            <div className="text-center mb-6">
              <Typography variant="h2" className="font-bold mb-2">
                Sign In
              </Typography>
              <Typography variant="paragraph" className="text-base font-normal text-gray-600">
                Enter your email and password to Sign In.
              </Typography>
            </div>

            <Formik
              initialValues={initialFormValues.login}
              validationSchema={LoginSchema}
              onSubmit={(values, { setSubmitting }) => {
                setSubmitting(false)
                submitForm('/auth/login', values)
              }}
            >
              {(formik) => (
                <Form onSubmit={formik.handleSubmit}>
  <div>
    <div className="mb-4">
      <Typography variant="small" className="mb-1 font-medium text-gray-700">
        Your email
      </Typography>
      <FormInput name="email" type="email" placeholder="you@mail.com" />
    </div>

    <div className="mb-2">
      <Typography variant="small" className="mb-1 font-medium text-gray-700">
        Password
      </Typography>
      <div className="relative">
        <FormInput
          name="password"
          type={show ? 'text' : 'password'}
          placeholder="Enter your password"
        />
        <div onClick={togglePassword} className="absolute right-3 top-2.5 cursor-pointer">
          {show ? <EyeOff /> : <EyeIcon />}
        </div>
      </div>
    </div>

    {error && (
      <Typography color="red" className="mt-2 text-sm">
        {error.message}
      </Typography>
    )}

    <Button
      loading={fetching}
      className="mt-6 w-full bg-black text-white rounded-lg"
      type="submit"
    >
      Sign In
    </Button>

    <div className="flex justify-center mt-4">
      <Typography
        as="a"
        href="#"
        variant="small"
        className="text-sm font-medium text-blue-600 hover:underline"
      >
        Forgot Password?
      </Typography>
    </div>
  </div>
</Form>

              )}
            </Formik>
          </div>

          {/* Right Side - Logo */}
          <div className="hidden lg:flex w-1/2 items-center justify-center bg-white/80">
            <img
              src={Logo}
              alt="Logo"
              className="max-h-72 w-auto object-contain drop-shadow-xl"
            />
          </div>
        </div>
      </EtheralShadow>
    </div>
  )
}

export default Login
