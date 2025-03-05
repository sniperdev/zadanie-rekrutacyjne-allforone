"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { zodResolver } from "@hookform/resolvers/zod";
import { addOrUpdateWeatherReport } from "@/lib/api";
import { TemperatureUnit, WeatherReport } from "@/lib/types";

interface WeatherReportModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  initialData?: WeatherReport | null;
  onReportAdded: () => void;
}

const reportSchema = yup.object().shape({
  city: yup.string().required("City is required"),
  temperature: yup
    .number()
    .min(-273.15, "Temperature must be above absolute zero")
    .required(),
  unit: yup.mixed<TemperatureUnit>().oneOf(["C", "F", "K"]).required(),
  date: yup.string().required(),
});

export function WeatherReportModal({
  isOpen,
  setIsOpen,
  initialData,
  onReportAdded,
}: WeatherReportModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(reportSchema),
    defaultValues: initialData || {
      city: "",
      temperature: 0,
      unit: "C",
      date: "",
    },
  });

  const onSubmit = async (data: any) => {
    await addOrUpdateWeatherReport({ ...data, id: initialData?.id });
    onReportAdded();
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {initialData ? "Edit Report" : "Add Report"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <Input {...register("city")} placeholder="City" />
          {errors.city && (
            <p className="text-red-500 text-sm">{errors.city.message}</p>
          )}

          <Input
            type="number"
            {...register("temperature")}
            placeholder="Temperature"
          />
          {errors.temperature && (
            <p className="text-red-500 text-sm">{errors.temperature.message}</p>
          )}
          <select {...register("unit")} className="border rounded-lg p-2">
            <option value="C">Celsius (°C)</option>
            <option value="K">Kelvin (K)</option>
            <option value="F">Fahrenheit (°F)</option>
          </select>
          {errors.unit && (
            <p className="text-red-500 text-sm">{errors.unit.message}</p>
          )}

          <Input type="date" {...register("date")} />
          {errors.date && (
            <p className="text-red-500 text-sm">{errors.date.message}</p>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">
              {initialData ? "Save Changes" : "Add Report"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
