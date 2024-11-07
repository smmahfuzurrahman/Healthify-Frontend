import React, { useState } from 'react';

// TypeScript interface for blood pressure data
interface BloodPressure {
    systolic: number;
    diastolic: number;
    date: string;
}

const UserBloodPressure: React.FC = () => {
    const [systolic, setSystolic] = useState<number | "">("");
    const [diastolic, setDiastolic] = useState<number | "">("");
    const [records, setRecords] = useState<BloodPressure[]>([]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (systolic !== "" && diastolic !== "") {
            const newRecord: BloodPressure = {
                systolic: Number(systolic),
                diastolic: Number(diastolic),
                date: new Date().toLocaleString(),
            };
            setRecords([...records, newRecord]);
            setSystolic("");
            setDiastolic("");
            console.log(records)
        }
    };

    const handleDelete = (index: number) => {
        console.log(index)
        const updatedRecords = records.filter((_, i) => i !== index);
        setRecords(updatedRecords);
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center font-sans">
            <div className="w-full max-w-4xl flex flex-col md:flex-row bg-white rounded-lg shadow-lg p-6">
                {/* Blood Pressure Tracker Form */}
                <div className="w-full md:w-1/2 p-4">
                    <h2 className="text-2xl font-bold mb-4 text-gray-800">Blood Pressure Tracker</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="flex flex-col">
                            <label className="text-gray-700 font-medium">Systolic (mmHg):</label>
                            <input
                                type="number"
                                value={systolic}
                                onChange={(e) => setSystolic(e.target.value !== "" ? Number(e.target.value) : "")}
                                className="mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter Systolic value"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-gray-700 font-medium">Diastolic (mmHg):</label>
                            <input
                                type="number"
                                value={diastolic}
                                onChange={(e) => setDiastolic(e.target.value !== "" ? Number(e.target.value) : "")}
                                className="mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter Diastolic value"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
                        >
                            Add Record
                        </button>
                    </form>
                </div>

                {/* Records Section */}
                <div className="w-full md:w-1/2 p-4 border-l border-gray-200">
                    <h3 className="text-xl font-semibold mb-4 text-gray-800">Records</h3>
                    <div className="h-64 overflow-y-auto bg-gray-50 rounded-lg p-4 border border-gray-200">
                        {records.length > 0 ? (
                            <ul className="space-y-2">
                                {records.map((record, index) => (
                                    <li key={index} className="p-3 bg-white border rounded-md shadow-sm flex justify-between items-center">
                                        <div>
                                            <p className="text-gray-700 font-medium">
                                                Systolic: <span className="font-semibold">{record.systolic} mmHg</span> <br />
                                                Diastolic: <span className="font-semibold">{record.diastolic} mmHg</span>
                                            </p>
                                            <p className="text-xs text-gray-500 mt-1">Recorded on {record.date}</p>
                                        </div>
                                        <button
                                            onClick={() => handleDelete(index)}
                                            className="text-red-500 hover:text-red-700 text-sm font-medium ml-4"
                                        >
                                            Delete
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-gray-600 text-center">No records added yet.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserBloodPressure;
