import { useState } from 'react'
import { Button, Center, Form, FormInput, Logo } from '@/components/ui'
import { EyeIcon, EyeOff } from '@/components/icons'
import { Formik } from 'formik'
import { loginSchema } from '@/schema'
import { initialFormValues } from '@/config/constants'

function Login() {
  const [show, setShow] = useState(false)
  const togglePassword = () => {
    setShow(!show)
  }

  return (
    <div className="w-full">
      <Formik
        initialValues={initialFormValues.login}
        validationSchema={loginSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          console.log(values)
          setSubmitting(false)
          resetForm()
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
