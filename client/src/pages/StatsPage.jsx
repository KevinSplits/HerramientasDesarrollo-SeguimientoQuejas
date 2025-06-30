import { useEffect, useState } from "react";
import axios from "axios";
import { Card } from "../components/ui";

export function StatsPage() {
  const [stats, setStats] = useState({
    cinemas: 0,
    complaints: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [cinemasRes, complaintsRes] = await Promise.all([
          axios.get("http://localhost:4000/api/cinemas", { withCredentials: true }),
          axios.get("http://localhost:4000/api/complaints", { withCredentials: true }),
        ]);

        setStats({
          cinemas: cinemasRes.data.length,
          complaints: complaintsRes.data.length,
        });
      } catch (err) {
        console.error("Error obteniendo estadísticas:", err);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold mb-4">Estadísticas Generales</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <Card>
          <h2 className="text-xl font-semibold">Total de Cines</h2>
          <p className="text-3xl">{stats.cinemas}</p>
        </Card>

        <Card>
          <h2 className="text-xl font-semibold">Total de Quejas</h2>
          <p className="text-3xl">{stats.complaints}</p>
        </Card>
      </div>
    </div>
  );
}
