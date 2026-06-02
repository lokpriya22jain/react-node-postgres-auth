import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", form);
      localStorage.setItem("token", res.data.token);
      alert("Login Success");
      navigate("/dashboard"); 
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div style={{ padding: "30px", fontFamily: "sans-serif" }}>
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <input name="email" placeholder="Email" onChange={handleChange} required /><br/><br/>
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required /><br/><br/>
        <button type="submit">Login</button>
      </form>
      <p style={{ marginTop: "15px" }}>
        Don't have an account? <Link to="/signup">Signup here</Link>
      </p>
    </div>
  );
}
export default Login;