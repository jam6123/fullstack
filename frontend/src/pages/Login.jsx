import { Link, Navigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";

const apiBaseUrl = import.meta.env.VITE_BASE_API_URL;

function Login() {
  const { user, setUser } = useUserContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    // the purpose of this fetch is to request a token from the server
    const response = await fetch(`${apiBaseUrl}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data),
      credentials: "include"
    });

    if (!response.ok) {
      console.log(response.headers.get('x-ratelimit-remaining'))

      const json = await response.json();
      console.log(json);
      return;
    }

    // if success
    const json = await response.json();
    setUser({
      ...user,
      data: json.data,
    });
  };

  if (user.data) {
    return <Navigate to={"/"} />;
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <input type="text" placeholder="email" name="email" defaultValue={"admin@gmail.com"} />
        <input type="text" placeholder="password" name="password" defaultValue={"admin1234"} />

        <button type="submit" style={{ backgroundColor: "blue", color: "white"}}>Login</button>
      </form>
      <p>No account? Go to <Link to={"/signup"}>Signup</Link></p>
    </div>
  );
}

export default Login;