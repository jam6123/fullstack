import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useUserContext } from "./context/UserContext";
import { useEffect } from "react";
import Navigation from "./components/Navigation/Navigation";

/*
  - The user should only be able to access private routes by the token's status not by the user's object stored in localstorage.
  - Should authenticate user with cookies on every page refresh or change route.
*/

const apiBaseUrl = import.meta.env.VITE_BASE_API_URL;

function ProtectedRoute() {
  const { user, setUser } = useUserContext();

  console.log("ProtectedRoute", user);
  // This "location" will always change even you're navigating on current route (e.g. you're on "/" route and clicking "<Link to="/">Home</Link>").
  // So we use this to cause rerender.
  const location = useLocation();

  useEffect(() => {
    async function getUserProfile() {
      console.log('ProtectedRoute remounted');
      /*
        - Cookies are automatically sent when it has "http only" value.
        - The token from our cookies will be checked at the backend to see
          if it is expired or no token provided. 
      */
      const response = await fetch(`${apiBaseUrl}/profile`, {
        credentials: "include"
      });

      if (!response.ok) {
        setUser({ data: null, csrfToken: null });
        const json = await response.json();
        console.log(json);
        return;
      }

      const json = await response.json();
      setUser({
        data: json.data,
        csrfToken: response.headers.get("xsrf-token")
      });
    }

    getUserProfile();
  }, [location]);

  return user.data ? (
    <>
      <Navigation />
      <Outlet />
    </>
  ) : (
    <Navigate to={"/login"} />
  );
}

export default ProtectedRoute;

// Notes: async operations will still be running after the component was unmounted.
