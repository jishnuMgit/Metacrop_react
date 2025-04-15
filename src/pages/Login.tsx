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
import Logo from '../assets/images/connectlylogo.png'

function Login() {
  const [show, setShow] = useState(false)
  const navigate = useNavigate()
  const { success, submitForm, error, fetching } = useFormApi()
  if (success) {
    setCookie('logged_in', 'true')
  }

  const togglePassword = () => {
    setShow(!show)
  }

  useEffect(() => {
    navigate('/')
  }, [success])

  return (
    <Formik
      initialValues={initialFormValues.login}
      validationSchema={LoginSchema}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(false)
        submitForm('/auth/login', values)

        // resetForm()
      }}
    >
      {(formik) => (
        <Form onSubmit={formik.handleSubmit}>
          <>
            <section className="m-8 flex gap-4">
              <div className="w-full lg:w-3/5 mt-24">
                <div className="text-center">
                  <Typography variant="h2" className="font-bold mb-4">
                    Sign In
                  </Typography>
                  <Typography variant="paragraph" className="text-lg font-normal">
                    Enter your email and password to Sign In.
                  </Typography>
                </div>
                <div className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2">
                  <div className="mb-1 flex flex-col gap-6">
                    <Typography variant="small" className="-mb-3 font-medium">
                      Your email
                    </Typography>
                    <FormInput name="email" type="email" placeholder="you@mail.com"></FormInput>

                    <Typography variant="small" className="-mb-3 font-medium">
                      Password
                    </Typography>
                    <div className="relative">
                      <FormInput
                        name="password"
                        type={show ? 'text' : 'password'}
                        placeholder="Enter your password"
                      ></FormInput>
                      <div className="absolute right-[4px] top-[0.7rem]">
                        {!show ? (
                          <EyeIcon onclick={togglePassword} />
                        ) : (
                          <EyeOff onclick={togglePassword} />
                        )}
                      </div>
                    </div>
                  </div>
                  {error && <Typography color="red">{error.message}</Typography>}

                  <Button loading={fetching} className="mt-6" fullWidth type="submit">
                    Sign In
                  </Button>

                  <div className="flex items-center justify-between gap-2 mt-6">
                    <Typography variant="small" className="font-medium">
                      <a href="#">Forgot Password?</a>
                    </Typography>
                  </div>
                </div>
              </div>
              <div className=" h-full hidden lg:block relative">
                {/* <div className="absolute">
                  <Logo
                    noIcon
                    textColor="bg-gradient-to-r from-[#191b1c] dark:from-dark-btn-color to-[#f7f7f7] dark:to-dark-btn-color/50"
                  />
                </div> */}

                {/* <img src="img/pattern.png" className="h-full w-full object-cover rounded-3xl" /> */}
                <img src={Logo} className="h-full w-full mx-auto mt-24 object-cover rounded-3xl" />
              </div>
            </section>
          </>
        </Form>
      )}
    </Formik>
  )
}

export default Login
