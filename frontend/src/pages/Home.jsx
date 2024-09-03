import { useUserContext } from "../context/UserContext"

function Home() {
  const { user } = useUserContext()

  return (
    <div>
      <h1>Home</h1>
      <p>{user.data.username}</p>
      <p>{user.data.email}</p>
    </div>
  )
}

export default Home
