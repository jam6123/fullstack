import React from 'react'
import { useUserContext } from "../../context/UserContext"
import { useNavigate } from 'react-router-dom'

const apiBaseUrl = import.meta.env.VITE_BASE_API_URL

function LogoutButton() {
  const { setUser, user } = useUserContext()

  const handleClick = async () => {
    await fetch(`${apiBaseUrl}/logout`, {
      headers: {
        "xsrf-token": user.csrfToken
      },
      method: "POST",
      credentials: "include"
    })
    setUser({ data: null, csrfToken: null })
    localStorage.removeItem("user")
  }
  
  return (
    <button onClick={handleClick}>Log out</button>
  )
}

export default LogoutButton