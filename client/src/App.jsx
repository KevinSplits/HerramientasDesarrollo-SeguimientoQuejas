import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { AuthProvider } from "./context/authContext";
import { ProtectedRoute } from "./routes";

import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import { TaskFormPage } from "./pages/TaskFormPage";
import { LoginPage } from "./pages/LoginPage";
import { TasksPage } from "./pages/TasksPage";
import { TaskProvider } from "./context/tasksContext";
import { CinemaProvider } from "./context/cinemasContext";
import { ComplaintProvider } from "./context/complaintsContext";
import Dashboard from "./pages/Dashboard";
import { CinemaFormPage } from "./pages/CinemaFormPage";
import { ComplaintFormPage } from "./pages/ComplaintFormPage";
import { CinemasPage } from "./pages/CinemasPage";
import { ComplaintsPage } from "./pages/ComplaintsPage";
import { StatsPage } from "./pages/StatsPage";


function App() {
  return (
    <AuthProvider>
      <TaskProvider>
        <ComplaintProvider>
          <CinemaProvider>
            <BrowserRouter>
              <main className="container content-container mx-auto px-10 md:px-0">
                <Navbar />
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />

                  <Route element={<ProtectedRoute />}>
                    <Route path="/dashboard" element={<Dashboard />} />

                    {/* Tareas */}
                    <Route path="/tasks" element={<TasksPage />} />
                    <Route path="/add-task" element={<TaskFormPage />} />
                    <Route path="/tasks/:id" element={<TaskFormPage />} />

                    {/* Cines */}
                    <Route path="/cinemas" element={<CinemasPage />} />
                    <Route path="/add-cinema" element={<CinemaFormPage />} />
                    <Route path="/cinemas/:id" element={<CinemaFormPage />} />

                    {/* Quejas */}
                    <Route path="/complaints" element={<ComplaintsPage />} />
                    <Route path="/add-complaint" element={<ComplaintFormPage />} />
                    <Route path="/complaints/:id" element={<ComplaintFormPage />} />

                    <Route path="/stats" element={< StatsPage/>} />

                    {/* Perfil */}
                    <Route path="/profile" element={<h1>Profile</h1>} />
                  </Route>
                </Routes>
              </main>
            </BrowserRouter>
          </CinemaProvider>
        </ComplaintProvider>
      </TaskProvider>
    </AuthProvider>
  );
}


export default App;
