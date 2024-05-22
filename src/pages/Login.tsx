import { useState } from 'react'
import { Button, Center, Form, Input, Logo } from '@/components/ui'
import { EyeIcon, EyeOff } from '@/components/icons'

function Login() {
  const [show, setShow] = useState(false)
  const togglePassword = () => {
    setShow(!show)
  }
  return (
    <div className="w-full">
      <Form>
        <>
          <Logo />
          <h1 className="text-3xl text-center my-8">Welcome!</h1>
          <Center>
            <div className="w-11/12 my-5 relative">
              <Input
                type="email"
                label="Email"
                className="w-full border-slate-200"
              />
              <Input
                type={`${show ? 'text' : 'password'}`}
                label="Password"
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
    </div>
  )
}

export default Login
