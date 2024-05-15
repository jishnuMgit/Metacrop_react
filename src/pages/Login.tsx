import { useState } from 'react'
import Button from '../components/Button'
import Center from '../components/Center'
import Form from '../components/Form'
import Input from '../components/Input'
import Logo from '../components/Logo'
import IconEye from '../components/icons/EyeIcon'
import IconEyeInvisible from '../components/icons/EyeOff'

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
                <IconEye onclick={togglePassword} />
              ) : (
                <IconEyeInvisible onclick={togglePassword} />
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
