import { Link, Navigate, useNavigate } from "react-router-dom"
import { useUserContext } from "../context/UserContext"

const apiBaseiUrl = import.meta.env.VITE_BASE_API_URL

function Signup() {
  const { user } = useUserContext()
  const navigate = useNavigate()

  const handleSubmit = async(e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const data = Object.fromEntries(formData)

    const response = await fetch(`${apiBaseiUrl}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
    
    if(!response.ok) {
      const json = await response.json()
      console.log(json)
      return
    }
    
    navigate("/login")
  }

  if(user.data) {
    return <Navigate to={"/"} />
  }

  return (
    <div>
      <h1>Sign up</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder='username' name='username' />
        <input type="text" placeholder='email' name='email' />
        <input type="text" placeholder='password' name='password' />
        <input type="text" placeholder='Confirm Password' name='confirmPassword' />
        <button type='submit'>Signup</button>
      </form>
      <p>Already have an account? <Link to={"/login"}>Login</Link> instead.</p>
    </div>
  )
}

export default Signup