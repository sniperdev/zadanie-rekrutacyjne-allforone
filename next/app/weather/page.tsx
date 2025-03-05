"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/app/weather/components/DataTable";
import { useState } from "react";
import { WeatherReportModal } from "@/app/weather/components/WeatherReportModal";
import { useQueryClient } from "@tanstack/react-query";
import { WeatherReport } from "@/lib/types";

export default function WeatherPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingReport, setEditingReport] = useState<WeatherReport | null>(
    null,
  );
  const queryClient = useQueryClient();

  const handleAddReport = () => {
    setEditingReport(null);
    setIsModalOpen(true);
  };

  const handleEditReport = (report: WeatherReport) => {
    setEditingReport(report);
    setIsModalOpen(true);
  };

  const handleReportAdded = () => {
    setIsModalOpen(false);
    queryClient.invalidateQueries({ queryKey: ["weatherReports"] });
  };

  return (
    <Card className="w-full lg:w-3/4">
      <CardHeader className="flex justify-between items-center">
        <CardTitle className="text-2xl font-bold">Weather Reports</CardTitle>
        <Button variant="outline" onClick={handleAddReport}>
          + Add Report
        </Button>
      </CardHeader>
      <CardContent>
        <DataTable onEditReport={handleEditReport} />
      </CardContent>
      {isModalOpen && (
        <WeatherReportModal
          isOpen={isModalOpen}
          setIsOpen={setIsModalOpen}
          initialData={editingReport}
          onReportAdded={handleReportAdded}
        />
      )}
    </Card>
  );
}
