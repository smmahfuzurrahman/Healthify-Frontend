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
        }
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center font-sans overflow-x-hidden">
            <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-4 text-gray-800">Blood Pressure Tracker</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex flex-col">
                        <label className="text-gray-700 font-medium">Systolic (mmHg):</label>
                        <input
                            type="number"
                            value={systolic}
                            onChange={(e) =>
                                setSystolic(e.target.value !== "" ? Number(e.target.value) : "")
                            }
                            className="mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-gray-700 font-medium">Diastolic (mmHg):</label>
                        <input
                            type="number"
                            value={diastolic}
                            onChange={(e) =>
                                setDiastolic(e.target.value !== "" ? Number(e.target.value) : "")
                            }
                            className="mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
                    >
                        Add Record
                    </button>
                </form>

                <h3 className="text-xl font-semibold mt-6 text-gray-800">Records</h3>
                <div className="mt-4 h-48 overflow-y-scroll border-t border-gray-200 pt-4">
                    {records.length > 0 ? (
                        <ul className="space-y-2 mt-2">
                            {records.map((record, index) => (
                                <li
                                    key={index}
                                    className="p-3 border rounded-md bg-gray-50 text-gray-700"
                                >
                                    {`Systolic: ${record.systolic} mmHg, Diastolic: ${record.diastolic} mmHg - Recorded on ${record.date}`}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-600 mt-2">No records added yet.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserBloodPressure;
