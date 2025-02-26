import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { WeatherReport } from '../utils/types';

const API_URL = "http://localhost:8000/api/reports";

export const useWeatherReports = () => {
	const queryClient = useQueryClient();

	const { data: reports = [], isLoading, error } = useQuery({
		queryKey: ['reports'],
		queryFn: async () => {
			const res = await fetch(API_URL);
			if (!res.ok) throw new Error('Error fetching reports');
			return res.json();
		},
	});

	const addOrUpdateReport = useMutation({
		mutationFn: async (data: Partial<WeatherReport> & { id?: string }) => {
			const url = data.id ? `${API_URL}/${data.id}` : API_URL;
			const method = data.id ? "PUT" : "POST";

			const res = await fetch(url, {
				method,
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(data),
			});

			if (!res.ok) throw new Error('Error submitting report');
			return res.json();
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['reports'] });
		},
	});

	const deleteReport = useMutation({
		mutationFn: async (id: string) => {
			const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
			if (!res.ok) throw new Error('Error deleting report');
			return id;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['reports'] });
		},
	});

	return { reports, isLoading, error, addOrUpdateReport, deleteReport };
};
