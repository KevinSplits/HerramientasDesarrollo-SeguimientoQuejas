import { Link } from "react-router-dom";

function HomePage() {
  return (
    <section className="bg-500 flex justify-center items-center">
      <header className="bg-zinc-800 p-10 ">
        <h1 className="text-5xl py-2 font-bold text-white">
          Sistema de Gestión de Quejas para Cines
        </h1>

        <p className="text-md text-slate-300">
          Bienvenido al sistema de gestión y seguimiento de quejas para locales de cines. 
          Esta plataforma permite a los clientes registrar quejas de forma sencilla y 
          transparente, y a los administradores darles seguimiento para mejorar la calidad 
          del servicio. Nuestro objetivo es mejorar la experiencia del usuario, 
          agilizar la atención de incidencias y obtener datos útiles para la toma de decisiones.
        </p>

        <Link
          className="bg-zinc-500 text-white px-4 py-2 rounded-md mt-4 inline-block"
          to="/register"
        >
          Empezar
        </Link>

        <img src="https://s1.significados.com/foto/cine-og.jpg" className="pt-5 p-2" />
      </header>
    </section>
  );
}

export default HomePage;
