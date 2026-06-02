import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/signup", form);
      alert(res.data.message);
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div style={{ padding: "30px", fontFamily: "sans-serif" }}>
      <form onSubmit={handleSubmit}>
        <h2>Signup</h2>
        <input name="name" placeholder="Name" onChange={handleChange} required /><br/><br/>
        <input name="email" placeholder="Email" onChange={handleChange} required /><br/><br/>
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required /><br/><br/>
        <button type="submit">Register</button>
      </form>
      <p style={{ marginTop: "15px" }}>
        Already have an account? <Link to="/">Login here</Link>
      </p>
    </div>
  );
}
export default Signup;