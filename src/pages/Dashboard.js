import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); 
    navigate("/");
  };

  return (
    <div style={{ padding: "30px", fontFamily: "sans-serif" }}>
      <h1>🎉 Welcome to the Dashboard!</h1>
      <p>This page is protected. You can only see this if you are logged in.</p>
      <br />
      <button onClick={handleLogout} style={{ padding: "8px 15px", cursor: "pointer" }}>
        Logout
      </button>
    </div>
  );
}
export default Dashboard;