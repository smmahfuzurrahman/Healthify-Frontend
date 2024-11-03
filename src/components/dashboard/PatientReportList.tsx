import ReportDetailsModal from "./reportDetailsModal";


const PatientReportList = () => {
    const list = true
    return (
        <div>
            { list ?
            
            <ReportDetailsModal id=""/>
            :

            <p className="text-red-500">No Medical Details Added Yet</p>
            }
        </div>
    );
};

export default PatientReportList;