import { Link } from "react-router-dom";

export const ButtonLink = ({ to, children }) => (
  <Link to={to} className="bg-indigo-500 px-4 py-1 rounded-md my-2 disabled:bg-indigo-300">
    {children}
  </Link>
);
