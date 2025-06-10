import { useUserContext } from "../../context/UserContext"

const apiBaseUrl = import.meta.env.VITE_BASE_API_URL

function LogoutButton() {
  const { setUser, user } = useUserContext();

  const handleClick = async () => {
    await fetch(`${apiBaseUrl}/logout`, {
      headers: {
        "xsrf-token": user.csrfToken
      },
      method: "POST",
      credentials: "include"
    })

    setUser({ data: null, csrfToken: null });
  }
  
  return (
    <button onClick={handleClick} style={{ backgroundColor: "red", color: "white"}}>
      Log out
    </button>
  )
}

export default LogoutButton;