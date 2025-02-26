import { TemperatureUnit } from './types';

export const convertToKelvin = (temperature: number, unit: TemperatureUnit): number => {
	switch (unit) {
		case 'C':
			return Math.round(temperature + 273.15);
		case 'F':
			return Math.round(((temperature - 32) * 5) / 9 + 273.15);
		default:
			return Math.round(temperature);
	}
};
