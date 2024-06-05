import { useEffect, useState } from 'react'
import {
  Button,
  Center,
  ErrorText,
  Form,
  FormInput,
  Logo,
} from '@/components/ui'
import { EyeIcon, EyeOff } from '@/components/icons'
import { Formik } from 'formik'
import { LoginSchema } from '@/schema'
import { initialFormValues } from '@/config/constants'
import { setCookie } from '@/utils/helpers'
import { useNavigate } from 'react-router-dom'
import { useFormApi } from 'useipa'

function Login() {
  const [show, setShow] = useState(false)
  const navigate = useNavigate()
  const { success, submitForm, error } = useFormApi()
  const togglePassword = () => {
    setShow(!show)
  }
  if (success) {
    setCookie('logged_in', 'true')
  }
  useEffect(() => {
    navigate('/')
  }, [success])

  return (
    <div className="w-full">
      <Formik
        initialValues={initialFormValues.login}
        validationSchema={LoginSchema}
        onSubmit={(values, { setSubmitting }) => {
          console.log(values)
          setSubmitting(false)
          submitForm('/auth/login', values)

          // resetForm()
        }}
      >
        {(formik) => (
          <Form onSubmit={formik.handleSubmit}>
            <>
              <Logo />
              <h1 className="text-3xl text-center my-8">Welcome!</h1>
              <Center>
                <div className="w-11/12 my-5 relative">
                  <FormInput
                    type="email"
                    label="Email"
                    name="email"
                    className="w-full border-slate-200"
                  />
                  <FormInput
                    type={`${show ? 'text' : 'password'}`}
                    label="Password"
                    name="password"
                    className="w-full border-slate-200"
                  />
                  {!show ? (
                    <EyeIcon onclick={togglePassword} />
                  ) : (
                    <EyeOff onclick={togglePassword} />
                  )}

                  {error && <ErrorText message={error.message} />}
                  <div className="flex justify-center ">
                    <Button type="submit" className="mt-3 w-5/12">
                      Login
                    </Button>
                  </div>
                </div>
              </Center>
            </>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default Login
