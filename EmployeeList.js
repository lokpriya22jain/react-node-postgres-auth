import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/employees", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEmployees(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error retrieving registry rows:", err);
        setLoading(false);
      }
    };
    fetchEmployees();
  }, []);

  if (loading) return <div style={{ padding: "30px" }}>🔄 Fetching relational records...</div>;

  return (
    <div style={{ padding: "30px", fontFamily: "sans-serif" }}>
      <div style={{ display: "flex", justifyContent: "between", alignItems: "center", marginBottom: "20px" }}>
        <h2>📂 Registered Employee Registry (JOIN Views)</h2>
        <Link to="/dashboard" style={{ marginLeft: "auto", textDecoration: "none", color: "#007bff", fontWeight: "bold" }}>
          ⬅️ Back to Dashboard
        </Link>
      </div>

      {employees.length === 0 ? (
        <p>No employee profiles have been cataloged yet.</p>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "10px", textAlign: "left" }}>
            <thead>
              <tr style={{ backgroundColor: "#f4f6f9", borderBottom: "2px solid #dee2e6" }}>
                <th style={{ padding: "12px" }}>ID</th>
                <th style={{ padding: "12px" }}>Account Name</th>
                <th style={{ padding: "12px" }}>Email</th>
                <th style={{ padding: "12px" }}>Department</th>
                <th style={{ padding: "12px" }}>Designation</th>
                <th style={{ padding: "12px" }}>Salary</th>
                <th style={{ padding: "12px" }}>Assigned Skills</th>
                <th style={{ padding: "12px" }}>Verification Files</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((emp) => (
                <tr key={emp.id} style={{ borderBottom: "1px solid #e9ecef" }}>
                  <td style={{ padding: "12px" }}>{emp.id}</td>
                  <td style={{ padding: "12px", fontWeight: "bold" }}>{emp.name}</td>
                  <td style={{ padding: "12px" }}>{emp.email}</td>
                  <td style={{ padding: "12px" }}>
                    <span style={{ backgroundColor: "#e2e3e5", padding: "4px 8px", borderRadius: "4px", fontSize: "13px" }}>
                      {emp.department_name || "Unassigned"}
                    </span>
                  </td>
                  <td style={{ padding: "12px" }}>{emp.designation}</td>
                  <td style={{ padding: "12px" }}>${Number(emp.salary).toLocaleString()}</td>
                  <td style={{ padding: "12px" }}>
                    <div style={{ display: "flex", gap: "5px", flexWrap: "wrap" }}>
                      {emp.skills.length > 0 && emp.skills[0] !== null ? (
                        emp.skills.map((skill, index) => (
                          <span key={index} style={{ backgroundColor: "#cff4fc", color: "#055160", padding: "2px 6px", borderRadius: "4px", fontSize: "12px" }}>
                            {skill}
                          </span>
                        ))
                      ) : (
                        <span style={{ color: "#999", fontSize: "12px" }}>None</span>
                      )}
                    </div>
                  </td>
                  <td style={{ padding: "12px" }}>
                    <div style={{ display: "flex", gap: "8px" }}>
                      {emp.images.length > 0 && emp.images[0] !== null ? (
                        emp.images.map((img, i) => (
                          <a href={`http://localhost:5000${img}`} target="_blank" rel="noreferrer" key={i} style={{ fontSize: "13px", color: "#007bff", textDecoration: "none", border: "1px solid #007bff", padding: "2px 6px", borderRadius: "3px" }}>
                            Doc {i + 1}
                          </a>
                        ))
                      ) : (
                        <span style={{ color: "#999", fontSize: "12px" }}>No Files</span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default EmployeeList;