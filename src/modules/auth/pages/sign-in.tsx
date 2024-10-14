
import { useSignInMutation } from "../hooks/mutations"

const SignIn = () => {
  const {mutate} = useSignInMutation()
  const save = () =>{
    const payload = {
      phone_number: "+998999999999",
      password: "temur25055"
    }
    mutate(payload)
  }
    return (
      <>
          <h1>Sign In</h1>
          <button onClick={save}>save</button>
      </>
    )
  }
  export default SignIn