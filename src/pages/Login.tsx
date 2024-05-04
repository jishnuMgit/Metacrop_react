import Button from '../components/Button'
import Center from '../components/Center'
import Form from '../components/Form'
import Input from '../components/Input'
import Logo from '../components/Logo'

function Login() {
  return (
    <div className="w-full">
      <Form>
        <>
          <Logo />
          <h1 className="text-3xl text-center my-8">Welcome!</h1>
          <Center>
            <div className="w-11/12 my-5">
              <Input type="email" label="Email" />
              <Input type="password" label="Password" />
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
