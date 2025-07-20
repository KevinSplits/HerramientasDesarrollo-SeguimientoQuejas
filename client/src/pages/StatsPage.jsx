import { useEffect, useState } from "react";
import axios from "../api/axios";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  XAxis,
  YAxis,
  Bar,
  Legend
} from "recharts";

export const StatsPage = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get("/stats");
        setStats(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error al cargar estadísticas:", error);
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <p className="p-6">Cargando estadísticas...</p>;
  if (!stats) return <p className="p-6">Error al obtener estadísticas</p>;

  const COLORS = ["#60A5FA", "#34D399", "#A78BFA", "#FBBF24", "#F87171", "#10B981"];

  const estadoData = [
    { name: "Resueltas", value: stats.resueltas },
    { name: "Pendientes", value: stats.pendientes },
  ];

  const categoriaData = stats.quejasPorCategoria.map(cat => ({
    name: cat.name,
    value: cat.total
  }));

  const cineData = stats.quejasPorCine.map(c => ({
    name: c.name,
    total: c.total
  }));

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Estadísticas Generales</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center mb-8">
        <div className="bg-blue-100 p-4 rounded shadow">
          <p className="text-lg font-semibold text-gray-800">Total de Quejas</p>
          <p className="text-2xl text-gray-800">{stats.totalQuejas}</p>
        </div>
        <div className="bg-green-100 p-4 rounded shadow">
          <p className="text-lg font-semibold text-gray-800">Total de Cines</p>
          <p className="text-2xl text-gray-800">{stats.totalCines}</p>
        </div>
        <div className="bg-purple-100 p-4 rounded shadow">
          <p className="text-lg font-semibold text-gray-800">Resueltas</p>
          <p className="text-2xl text-gray-800">{stats.resueltas}</p>
        </div>
        <div className="bg-yellow-100 p-4 rounded shadow">
          <p className="text-lg font-semibold text-gray-800">Pendientes</p>
          <p className="text-2xl text-gray-800">{stats.pendientes}</p>
        </div>
      </div>

      {/* Gráficos estadísticos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Quejas por Categoría */}
        <div className="bg-white rounded shadow p-4">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Quejas por Categoría</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={categoriaData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {categoriaData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Quejas por Estado */}
        <div className="bg-white rounded shadow p-4">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Estado de las Quejas</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={estadoData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {estadoData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Quejas por Cine */}
      <div className="bg-white rounded shadow p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Quejas por Cine</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={cineData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="total" fill="#60A5FA" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Quejas por Categoría</h2>
        <ul className="space-y-2">
          {stats.quejasPorCategoria.map((cat, i) => (
            <li key={i} className="flex justify-between border-b py-2">
              <span>{cat.name}</span>
              <span>{cat.total} ({cat.porcentaje}%)</span>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Quejas por Cine</h2>
        <ul className="space-y-2">
          {stats.quejasPorCine.map((cine) => (
            <li key={cine._id} className="flex justify-between border-b py-2">
              <span>{cine.name}</span>
              <span>{cine.total}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default StatsPage;