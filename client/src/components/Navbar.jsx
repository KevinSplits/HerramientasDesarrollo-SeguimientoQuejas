import { Link } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { ButtonLink } from "./ui/ButtonLink";

export function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();
  console.log(isAuthenticated, user)

  return (
    <nav className="bg-zinc-700 my-3 flex justify-between py-5 px-10 rounded-lg">
      <h1 className="text-2xl font-bold">
        <Link to={isAuthenticated ? "/" : "/"}>Sistema de Gestión y Seguimiento de
Quejas para Locales de Cines</Link>
      </h1>
      <ul className="flex gap-x-2">
        {isAuthenticated ? (
          <>
            <li>
              ¡Bienvenido, usuario "<strong>{user.username}"!</strong>
            </li>
            <li>
              <Link className="bg-indigo-600 hover:bg-indigo-800 text-white px-4 py-2 rounded" to="/" onClick={() => logout()}>
                Cerrar Sesión
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <ButtonLink to="/login">Login</ButtonLink>
            </li>
            <li>
              <ButtonLink to="/register">Register</ButtonLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
