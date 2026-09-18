import { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:5000/api/students";

const emptyForm = {
  name: "",
  rollNumber: "",
  email: "",
  department: "",
  year: ""
};

export default function App() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const loadStudents = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(API);
      setStudents(data);
    } catch (error) {
      setMessage(error.response?.data?.message || "Could not connect to backend.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStudents();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      if (editingId) {
        await axios.put(`${API}/${editingId}`, form);
        setMessage("Student updated successfully.");
      } else {
        await axios.post(API, form);
        setMessage("Student added successfully.");
      }

      setForm(emptyForm);
      setEditingId(null);
      await loadStudents();
    } catch (error) {
      setMessage(error.response?.data?.message || "Operation failed.");
    }
  };

  const editStudent = (student) => {
    setEditingId(student._id);
    setForm({
      name: student.name,
      rollNumber: student.rollNumber,
      email: student.email,
      department: student.department,
      year: student.year
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const deleteStudent = async (id) => {
    if (!window.confirm("Delete this student?")) return;

    try {
      await axios.delete(`${API}/${id}`);
      setMessage("Student deleted successfully.");
      await loadStudents();
    } catch (error) {
      setMessage(error.response?.data?.message || "Delete failed.");
    }
  };

  const filteredStudents = students.filter((student) =>
    `${student.name} ${student.rollNumber} ${student.email} ${student.department}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="app">
      <header className="hero">
        <div>
          <p className="eyebrow">FULL-STACK CRUD APPLICATION</p>
          <h1>Student Management</h1>
          <p className="subtitle">
            React + Express + MongoDB. Your data survives refreshes.
          </p>
        </div>
        <div className="count-card">
          <strong>{students.length}</strong>
          <span>Total Students</span>
        </div>
      </header>

      <main className="container">
        {message && <div className="message">{message}</div>}

        <section className="card">
          <div className="section-title">
            <h2>{editingId ? "Edit Student" : "Add Student"}</h2>
            {editingId && (
              <button
                className="secondary"
                onClick={() => {
                  setEditingId(null);
                  setForm(emptyForm);
                }}
              >
                Cancel
              </button>
            )}
          </div>

          <form onSubmit={handleSubmit} className="form-grid">
            <input name="name" placeholder="Full Name" value={form.name} onChange={handleChange} required />
            <input name="rollNumber" placeholder="Roll Number" value={form.rollNumber} onChange={handleChange} required />
            <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
            <input name="department" placeholder="Department" value={form.department} onChange={handleChange} required />
            <select name="year" value={form.year} onChange={handleChange} required>
              <option value="">Select Year</option>
              <option value="1st Year">1st Year</option>
              <option value="2nd Year">2nd Year</option>
              <option value="3rd Year">3rd Year</option>
              <option value="4th Year">4th Year</option>
            </select>
            <button className="primary" type="submit">
              {editingId ? "Update Student" : "Add Student"}
            </button>
          </form>
        </section>

        <section className="card">
          <div className="section-title">
            <h2>Students</h2>
            <input
              className="search"
              placeholder="Search students..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {loading ? (
            <p className="empty">Loading...</p>
          ) : filteredStudents.length === 0 ? (
            <p className="empty">No students found.</p>
          ) : (
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Roll Number</th>
                    <th>Email</th>
                    <th>Department</th>
                    <th>Year</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.map((student) => (
                    <tr key={student._id}>
                      <td>{student.name}</td>
                      <td>{student.rollNumber}</td>
                      <td>{student.email}</td>
                      <td>{student.department}</td>
                      <td>{student.year}</td>
                      <td className="actions">
                        <button className="edit" onClick={() => editStudent(student)}>Edit</button>
                        <button className="delete" onClick={() => deleteStudent(student._id)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}