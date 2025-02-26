import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog.tsx";
import { WeatherReport } from "../utils/types";
import WeatherReportForm from "./WeatherReportForm.tsx";

interface WeatherReportDialogProps {
	isOpen: boolean;
	onClose: () => void;
	report: WeatherReport | null;
	onSubmit: (data: WeatherReport) => void;
}

const WeatherReportDialog: React.FC<WeatherReportDialogProps> = ({ isOpen, onClose, report, onSubmit }) => (
	<Dialog open={isOpen} onOpenChange={onClose}>
		<DialogContent>
			<DialogHeader>
				<DialogTitle>{report ? "Edit Weather Report" : "Add New Weather Report"}</DialogTitle>
			</DialogHeader>
			<WeatherReportForm defaultValues={report || undefined} onSubmit={onSubmit} onCancel={onClose} />
		</DialogContent>
	</Dialog>
);

export default WeatherReportDialog;
