import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <section className="min-h-screen bg-zinc-900 text-white p-10">
      <header className="mb-10">
        <h1 className="text-4xl font-bold mb-2">Panel de Control</h1>
        <p className="text-slate-400">
          Bienvenido al panel de administración del sistema de quejas y cines.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Registrar Nueva Queja */}
        <div className="bg-zinc-800 p-6 rounded-2xl shadow-lg">
          <h2 className="text-xl font-semibold mb-2">Registrar Nueva Queja</h2>
          <p className="text-slate-400 mb-4">
            Accede al formulario para ingresar una nueva queja de un cliente.
          </p>
          <Link
            to="/add-complaint"
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md"
          >
            Registrar Queja
          </Link>
        </div>

        {/* Lista de Quejas */}
        <div className="bg-zinc-800 p-6 rounded-2xl shadow-lg">
          <h2 className="text-xl font-semibold mb-2">Lista de Quejas</h2>
          <p className="text-slate-400 mb-4">
            Visualiza y gestiona las quejas existentes en el sistema.
          </p>
          <Link
            to="/complaints"
            className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md"
          >
            Ver Quejas
          </Link>
        </div>

        {/* Registrar Nuevo Cine */}
        <div className="bg-zinc-800 p-6 rounded-2xl shadow-lg">
          <h2 className="text-xl font-semibold mb-2">Registrar Nuevo Cine</h2>
          <p className="text-slate-400 mb-4">
            Accede al formulario para ingresar un nuevo cine al sistema.
          </p>
          <Link
            to="/add-cinema"
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md"
          >
            Registrar Cine
          </Link>
        </div>

        {/* Lista de Cines */}
        <div className="bg-zinc-800 p-6 rounded-2xl shadow-lg">
          <h2 className="text-xl font-semibold mb-2">Lista de Cines</h2>
          <p className="text-slate-400 mb-4">
            Visualiza y gestiona los cines registrados en el sistema.
          </p>
          <Link
            to="/cinemas"
            className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md"
          >
            Ver Cines
          </Link>
        </div>

        {/* Estadísticas */}
        <div className="bg-zinc-800 p-6 rounded-2xl shadow-lg md:col-span-2">
          <h2 className="text-xl font-semibold mb-2">Estadísticas</h2>
          <p className="text-slate-400 mb-4">
            Consulta datos estadísticos sobre la atención y resolución de quejas.
          </p>
          <Link
            to="/stats"
            className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-md"
          >
            Ver Estadísticas
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Dashboard;
