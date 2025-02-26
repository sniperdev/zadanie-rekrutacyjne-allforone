import React, { useState } from 'react';
import { WeatherReport } from '../utils/types';
import { convertToKelvin } from '../utils/convertToKelvin';
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import {useWeatherReports} from "../hooks/useWeatherReports.ts";

interface WeatherReportListProps {
	reports: WeatherReport[];
	onEdit: (report: WeatherReport) => void;
	onDelete: (id: string) => void;
}

const WeatherReportList: React.FC<WeatherReportListProps> = ({ reports, onEdit, onDelete }) => {
	const { isLoading, error} = useWeatherReports();
	const [sortKey, setSortKey] = useState<'temperature' | 'date' | 'city'>('date');
	const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

	const sortedReports = [...reports].sort((a, b) => {
		let valueA: number | string;
		let valueB: number | string;

		if (sortKey === 'temperature') {
			valueA = convertToKelvin(a.temperature, a.unit);
			valueB = convertToKelvin(b.temperature, b.unit);
		} else if (sortKey === 'date') {
			valueA = new Date(a.date).getTime();
			valueB = new Date(b.date).getTime();
		} else {
			valueA = a.city.toLowerCase();
			valueB = b.city.toLowerCase();
		}

		return valueA > valueB ? (sortOrder === 'asc' ? 1 : -1) : valueA < valueB ? (sortOrder === 'asc' ? -1 : 1) : 0;
	});

	const toggleSort = (key: 'temperature' | 'date' | 'city') => {
		if (sortKey === key) {
			setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
		} else {
			setSortKey(key);
			setSortOrder('asc');
		}
	};

	return (
		<div className="p-4">
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>
							<Button variant="ghost" onClick={() => toggleSort('city')}>
								City {sortKey === 'city' && (sortOrder === 'asc' ? '⬆️' : '⬇️')}
							</Button>
						</TableHead>
						<TableHead>
							<Button variant="ghost" onClick={() => toggleSort('temperature')}>
								Temperature {sortKey === 'temperature' && (sortOrder === 'asc' ? '⬆️' : '⬇️')}
							</Button>
						</TableHead>
						<TableHead>
							<Button variant="ghost" onClick={() => toggleSort('date')}>
								Date {sortKey === 'date' && (sortOrder === 'asc' ? '⬆️' : '⬇️')}
							</Button>
						</TableHead>
						<TableHead>Actions</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{sortedReports.map(report => (
						<TableRow key={report.id}>
							<TableCell>{report.city}</TableCell>
							<TableCell>{convertToKelvin(report.temperature, report.unit)}</TableCell>
							<TableCell>{report.date}</TableCell>
							<TableCell className="flex gap-2">
								<Button variant="outline" size="sm" onClick={() => onEdit(report)}>Edit</Button>
								<Button variant="destructive" size="sm" onClick={() => onDelete(report.id)}>Delete</Button>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
			{isLoading && <p className="text-center text-2xl">Loading...</p>}
			{error && <p className="text-red-500 text-center text-2xl">Error fetching reports</p>}
		</div>
	);
};

export default WeatherReportList;
