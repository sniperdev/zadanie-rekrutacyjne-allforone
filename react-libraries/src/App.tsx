import React, { useState } from 'react';
import { useWeatherReports } from './hooks/useWeatherReports';
import WeatherReportList from './components/WeatherReportList';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
import { Button } from './components/ui/button';
import WeatherReportDialog from './components/WeatherReportDialog';
import { WeatherReport } from './utils/types';

const App: React.FC = () => {
  const { reports, addOrUpdateReport, deleteReport } = useWeatherReports();
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [editingReport, setEditingReport] = useState<WeatherReport | null>(null);

  const handleOpenDialog = (report?: WeatherReport) => {
    setEditingReport(report || null);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setEditingReport(null);
    setDialogOpen(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screend p-6">
      <Card className="w-full lg:w-3/4">
        <CardHeader className="flex justify-between items-center">
          <CardTitle className="text-2xl font-bold">Weather Reports</CardTitle>
          <Button onClick={() => handleOpenDialog()} variant="outline">
            + Add Report
          </Button>
        </CardHeader>
        <CardContent>
          <WeatherReportList reports={reports} onEdit={handleOpenDialog} onDelete={deleteReport.mutate} />
        </CardContent>
      </Card>
      <WeatherReportDialog
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        report={editingReport}
        onSubmit={addOrUpdateReport.mutate}
      />
    </div>
  );
};

export default App;
