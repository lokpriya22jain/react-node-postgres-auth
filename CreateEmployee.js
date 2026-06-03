import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function CreateEmployee() {
  const navigate = useNavigate();

  // Basic form states
  const [userId, setUserId] = useState(""); // Enter a valid user ID from your users table
  const [departmentId, setDepartmentId] = useState("");
  const [designation, setDesignation] = useState("");
  const [salary, setSalary] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  // Skills multi-select state (Tracks selected skill IDs)
  const [selectedSkills, setSelectedSkills] = useState([]);

  // Multiple files upload state
  const [selectedFiles, setSelectedFiles] = useState([]);

  // Hardcoded master lists matching your database seed values
  const departmentsList = [
    { id: 1, name: "IT" },
    { id: 2, name: "HR" },
    { id: 3, name: "Finance" },
    { id: 4, name: "Marketing" },
  ];

  const skillsList = [
    { id: 1, name: "React" },
    { id: 2, name: "NodeJS" },
    { id: 3, name: "PostgreSQL" },
    { id: 4, name: "Python" },
    { id: 5, name: "Java" },
  ];

  // Handle skill checkbox changes
  const handleSkillChange = (skillId) => {
    if (selectedSkills.includes(skillId)) {
      setSelectedSkills(selectedSkills.filter((id) => id !== skillId));
    } else {
      setSelectedSkills([...selectedSkills, skillId]);
    }
  };

  // Handle file input changes
  const handleFileChange = (e) => {
    setSelectedFiles(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Since we are uploading files, we MUST use FormData instead of a regular JSON object
    const formData = new FormData();
    formData.append("user_id", userId);
    formData.append("department_id", departmentId);
    formData.append("designation", designation);
    formData.append("salary", salary);
    formData.append("phone", phone);
    formData.append("address", address);
    
    // Convert array to a string so the backend can safely parse it
    formData.append("skills", JSON.stringify(selectedSkills));

    // Append up to 5 files to the request
    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append("images", selectedFiles[i]);
    }

    try {
      await axios.post("http://localhost:5000/api/employees", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Employee Profile Created Successfully!");
      navigate("/dashboard"); // Take them back to check updated statistics counters
    } catch (err) {
      console.error("Error creating employee profile:", err);
      alert("Failed to create profile. Check console.");
    }
  };

  return (
    <div style={{ padding: "30px", fontFamily: "sans-serif", maxWidth: "500px" }}>
      <h2>➕ Create Employee Profile</h2>
      <form onSubmit={handleSubmit}>
        
        <label><b>User ID (From Users Table):</b></label><br />
        <input type="number" placeholder="e.g. 1" value={userId} onChange={(e) => setUserId(e.target.value)} required style={{ width: "100%", padding: "8px", margin: "8px 0" }} />
        <br /><br />

        <label><b>Designation:</b></label><br />
        <input type="text" placeholder="Software Engineer" value={designation} onChange={(e) => setDesignation(e.target.value)} required style={{ width: "100%", padding: "8px", margin: "8px 0" }} />
        <br /><br />

        <label><b>Salary:</b></label><br />
        <input type="number" placeholder="50000" value={salary} onChange={(e) => setSalary(e.target.value)} required style={{ width: "100%", padding: "8px", margin: "8px 0" }} />
        <br /><br />

        <label><b>Phone Number:</b></label><br />
        <input type="text" placeholder="1234567890" value={phone} onChange={(e) => setPhone(e.target.value)} style={{ width: "100%", padding: "8px", margin: "8px 0" }} />
        <br /><br />

        <label><b>Address:</b></label><br />
        <textarea placeholder="Street Address, City" value={address} onChange={(e) => setAddress(e.target.value)} style={{ width: "100%", padding: "8px", margin: "8px 0", height: "60px" }} />
        <br /><br />

        {/* 🏢 DEPARTMENT DROPDOWN */}
        <label><b>Assign Department:</b></label><br />
        <select value={departmentId} onChange={(e) => setDepartmentId(e.target.value)} required style={{ width: "100%", padding: "8px", margin: "8px 0" }}>
          <option value="">-- Select Department --</option>
          {departmentsList.map((dept) => (
            <option key={dept.id} value={dept.id}>{dept.name}</option>
          ))}
        </select>
        <br /><br />

        {/* 🛠️ SKILLS CHECKBOX MULTI-SELECT */}
        <label><b>Assign Skills:</b></label><br />
        <div style={{ margin: "10px 0", display: "flex", flexDirection: "column", gap: "5px" }}>
          {skillsList.map((skill) => (
            <label key={skill.id} style={{ cursor: "pointer" }}>
              <input type="checkbox" checked={selectedSkills.includes(skill.id)} onChange={() => handleSkillChange(skill.id)} />
              {" "}{skill.name}
            </label>
          ))}
        </div>
        <br />

        {/* 📷 MULTIPLE IMAGE UPLOAD */}
        <label><b>Upload Verification Documents (Max 5):</b></label><br />
        <input type="file" multiple accept="image/*" onChange={handleFileChange} style={{ margin: "10px 0" }} />
        <br /><br />

        <button type="submit" style={{ padding: "10px 20px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "5px", cursor: "pointer", fontWeight: "bold" }}>
          Save Profile
        </button>
      </form>
    </div>
  );
}

export default CreateEmployee;