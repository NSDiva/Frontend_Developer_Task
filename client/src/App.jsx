import { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter, Routes, Route, useNavigate, Navigate } from 'react-router-dom';

// MAKE SURE THIS MATCHES YOUR SERVER PORT
const API_URL = "http://localhost:5000/api";

function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        const { data } = await axios.post(`${API_URL}/login`, { email, password });
        localStorage.setItem("token", data.token);
        navigate("/dashboard");
      } else {
        await axios.post(`${API_URL}/register`, { email, password });
        alert("Registered! Now Login.");
        setIsLogin(true);
      }
    } catch (err) { alert("Error: " + (err.response?.data?.error || "Connection Error")); }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-80">
        <h2 className="text-xl font-bold mb-4">{isLogin ? "Login" : "Register"}</h2>
        <input className="w-full mb-2 p-2 border" placeholder="Email" onChange={e => setEmail(e.target.value)} />
        <input className="w-full mb-4 p-2 border" type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
        <button className="w-full bg-blue-500 text-white p-2 rounded">{isLogin ? "Login" : "Sign Up"}</button>
        <p className="mt-2 text-blue-500 cursor-pointer" onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Need an account?" : "Have an account?"}
        </p>
      </form>
    </div>
  );
}

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/");
    
    axios.get(`${API_URL}/tasks`, { headers: { Authorization: token } })
      .then(res => setTasks(res.data))
      .catch(() => navigate("/"));
  }, []);

  const addTask = async () => {
    const token = localStorage.getItem("token");
    const { data } = await axios.post(`${API_URL}/tasks`, { title: newTitle }, { headers: { Authorization: token } });
    setTasks([...tasks, data]);
    setNewTitle("");
  };

  return (
    <div className="p-10 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">My Dashboard</h1>
      <div className="flex gap-2 mb-6">
        <input className="border p-2 rounded w-64" value={newTitle} onChange={e => setNewTitle(e.target.value)} placeholder="New Task..." />
        <button onClick={addTask} className="bg-green-500 text-white px-4 py-2 rounded">Add</button>
        <button onClick={() => { localStorage.clear(); navigate("/"); }} className="bg-red-500 text-white px-4 py-2 rounded ml-auto">Logout</button>
      </div>
      <ul className="bg-white shadow rounded p-4">
        {tasks.map(t => <li key={t._id} className="border-b p-2">{t.title}</li>)}
      </ul>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}