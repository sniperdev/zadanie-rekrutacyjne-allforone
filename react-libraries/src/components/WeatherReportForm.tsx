import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { FormValues, TemperatureUnit } from '../utils/types';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const schema = yup.object().shape({
	city: yup.string().required('City is required'),
	temperature: yup.number().min(-273.15, 'Temperature must be above absolute zero').required(),
	unit: yup.mixed<TemperatureUnit>().oneOf(['C', 'F', 'K']).required(),
	date: yup.string().required(),
});

interface WeatherReportFormProps {
	defaultValues?: FormValues;
	onSubmit: (data: FormValues & { id?: string }) => void;
	onCancel: () => void;
}

const WeatherReportForm: React.FC<WeatherReportFormProps> = ({ defaultValues, onSubmit, onCancel }) => {
	const form = useForm<FormValues>({
		resolver: yupResolver(schema),
		defaultValues: defaultValues || {
			city: '',
			temperature: 0,
			unit: 'C',
			date: new Date().toISOString().split('T')[0],
		},
	});

	useEffect(() => {
		form.reset(defaultValues || {
			city: '',
			temperature: 0,
			unit: 'C',
			date: new Date().toISOString().split('T')[0],
		});
	}, [defaultValues, form]);

	const handleSubmit = async (data: FormValues & { id?: string }) => {
		await onSubmit(data);
		onCancel();
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
				<FormField
					control={form.control}
					name="city"
					render={({ field }) => (
						<FormItem>
							<FormLabel>City</FormLabel>
							<FormControl>
								<Input placeholder="Enter city" {...field} />
							</FormControl>
							<FormMessage>{form.formState.errors.city?.message}</FormMessage>
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="temperature"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Temperature</FormLabel>
							<FormControl>
								<Input type="number" placeholder="Temperature" {...field} />
							</FormControl>
							<FormMessage>{form.formState.errors.temperature?.message}</FormMessage>
						</FormItem>
					)}
				/>

				<Controller
					control={form.control}
					name="unit"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Unit</FormLabel>
							<Select onValueChange={field.onChange} defaultValue={field.value}>
								<SelectTrigger>
									<SelectValue placeholder="Select unit" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="C">Celsius</SelectItem>
									<SelectItem value="F">Fahrenheit</SelectItem>
									<SelectItem value="K">Kelvin</SelectItem>
								</SelectContent>
							</Select>
							<FormMessage>{form.formState.errors.unit?.message}</FormMessage>
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="date"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Date</FormLabel>
							<FormControl>
								<Input type="date" {...field} />
							</FormControl>
							<FormMessage>{form.formState.errors.date?.message}</FormMessage>
						</FormItem>
					)}
				/>

				<div className="flex justify-between pt-4">
					<Button type="submit">{defaultValues ? 'Update Report' : 'Add Report'}</Button>
					<Button type="button" variant="secondary" onClick={onCancel}>
						Cancel
					</Button>
				</div>
			</form>
		</Form>
	);
};

export default WeatherReportForm;
