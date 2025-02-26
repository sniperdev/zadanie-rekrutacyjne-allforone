import React, { useState, useEffect } from 'react';
import './App.css';

interface WeatherReport {
  id: string;
  temperature: number;
  unit: TemperatureUnit;
  city: string;
  date: string;
}

type TemperatureUnit = 'C' | 'K' | 'F';

const convertToKelvin = (temperature: number, unit: TemperatureUnit): number => {
  switch (unit) {
    case 'C':
      return Math.round(temperature + 273.15);
    case 'F':
      return Math.round(((temperature - 32) * 5) / 9 + 273.15);
    default:
      return Math.round(temperature);
  }
};

const App: React.FC = () => {
  const [reports, setReports] = useState<WeatherReport[]>([]);
  const [form, setForm] = useState<Omit<WeatherReport, 'id'>>({
    temperature: 0,
    unit: 'K',
    city: '',
    date: new Date().toISOString().split('T')[0],
  });
  const [editId, setEditId] = useState<string | null>(null);
  const [filterCity, setFilterCity] = useState('');
  const [sortKey, setSortKey] = useState<'temperature' | 'date' | 'city'>('date');
  const [error, setError] = useState<string | null>(null);

  const fetchReports = () => {
    fetch("http://localhost:8000/api/reports")
      .then(response => response.json())
      .then(data => setReports(data.map((report: WeatherReport) => ({
        ...report,
        temperature: convertToKelvin(report.temperature, report.unit)
      }))))
      .catch(error => console.error("Error fetching reports:", error));
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (!form.city.trim()) return "City is required";
    if (isNaN(form.temperature) || form.temperature <= -273.15) return "Temperature must be a valid number above absolute zero";
    if (!form.date) return "Date is required";
    return null;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }
    setError(null);

    const formData = {
      ...form,
      temperature: Number(form.temperature)
    }

    const url = editId ? `http://localhost:8000/api/reports/${editId}` : "http://localhost:8000/api/reports";
    const method = editId ? "PUT" : "POST";

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    })
      .then(response => response.json())
      .then(data => setReports(data.map((report: WeatherReport) => ({
        ...report,
        temperature: convertToKelvin(report.temperature, report.unit)
      }))))
      .then(() => {
        setEditId(null);
        setForm({ temperature: 0, unit: 'K', city: '', date: new Date().toISOString().split('T')[0] });
      })
      .catch(error => console.error("Error submitting report:", error));
  };

  const handleEdit = (report: WeatherReport) => {
    setEditId(report.id);
    setForm({ temperature: report.temperature, unit: report.unit, city: report.city, date: report.date });
  };

  const handleDelete = (id: string) => {
    fetch(`http://localhost:8000/api/reports/${id}`, { method: "DELETE" })
      .then(response => {
        if (!response.ok) {
          throw new Error("Failed to delete report");
        }
        fetchReports()
      })
      .catch(error => console.error("Error deleting report:", error));
  };

  const sortedReports = reports
    .filter(report => (filterCity ? report.city.includes(filterCity) : true))
    .sort((a, b) => (a[sortKey] > b[sortKey] ? 1 : -1));

  const handleCancel = () => {
    setEditId(null)
    setForm({ temperature: 0, unit: 'K', city: '', date: new Date().toISOString().split('T')[0] });
  }

  return (
    <div className="wrapper">
      <div className="container">
        <h1>Weather Reports</h1>
        {error && <p className="error">{error}</p>}
        <form className="form" onSubmit={handleSubmit}>
          <input className="input" name="city" value={form.city} onChange={handleChange} placeholder="City" required/>
          <input className="input" type="number" name="temperature" value={form.temperature} onChange={handleChange}
                 required/>
          <select className="select" name="unit" value={form.unit} onChange={handleChange}>
            <option value="K">K</option>
            <option value="C">°C</option>
            <option value="F">°F</option>
          </select>
          <input className="input" type="date" name="date" value={form.date} onChange={handleChange} required/>
          <button className="button" type="submit">{editId ? "Update" : "Submit"}</button>
          {editId && <button className="cancel-button" type="button" onClick={handleCancel}>Cancel</button>}
        </form>
        <hr/>
        <input className="input" placeholder="Filter by city" value={filterCity}
               onChange={e => setFilterCity(e.target.value)}/>
        <select className="select" onChange={e => setSortKey(e.target.value as 'temperature' | 'date' | 'city')}>
          <option value="temperature">Sort by Temperature</option>
          <option value="date">Sort by Date</option>
          <option value="city">Sort by City</option>
        </select>

        <table className="table">
          <thead>
            <tr>
              <th>City</th>
              <th>Temperature [K]</th>
              <th>Data</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {sortedReports.map(report => (
              <tr key={report.id}>
                <td>
                  {report.city}
                </td>
                <td>
                  {report.temperature}
                </td>
                <td>
                  {report.date}
                </td>
                <td>
                  <button className="edit-button" onClick={() => handleEdit(report)}>Edit</button>
                  <button className="delete-button" onClick={() => handleDelete(report.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default App;