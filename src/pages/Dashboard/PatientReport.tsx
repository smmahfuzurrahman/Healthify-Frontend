import PatientReportComponent from "@/components/dashboard/PatientReportComponent";
import PatientReportList from "@/components/dashboard/PatientReportList";

const PatientReport = () => {
  return (
    <>
      <h1 className="text-center font-semibold text-3xl border-b-2 text-gradient mb-5">
        Patient Medical History
      </h1>
      <div className="flex justify-end mb-10">
        <PatientReportComponent />
      </div>
      <PatientReportList />
    </>
  );
};

export default PatientReport;
