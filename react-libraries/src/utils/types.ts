export type TemperatureUnit = 'C' | 'K' | 'F';

export interface WeatherReport {
	id: string;
	temperature: number;
	unit: TemperatureUnit;
	city: string;
	date: string;
}

export type FormValues = {
	city: string;
	temperature: number;
	unit: TemperatureUnit;
	date: string;
	id?: string;
};