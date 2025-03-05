import axios from "axios";

export const getWeatherReports = async () => {
  const { data } = await axios.get("http://localhost:8000/api/reports");
  return data;
};

export const addOrUpdateWeatherReport = async (report: {
  id?: string;
  temperature: number;
  unit: "C" | "K" | "F";
  city: string;
  date: string;
}) => {
  if (report.id) {
    await axios.put(`http://localhost:8000/api/reports/${report.id}`, report);
  } else {
    await axios.post("http://localhost:8000/api/reports", report);
  }
};

export const deleteWeatherReport = async (id: string) => {
  await axios.delete(`http://localhost:8000/api/reports/${id}`);
};
