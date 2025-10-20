import { FlowerListDTO } from "../dtos/flowerListDto";

interface FlowerTableProps {
  flowers: FlowerListDTO[];
}

const FlowerTable = ({ flowers }: FlowerTableProps) => {
    return (
        <div className="mt-10 w-full max-w-4xl mx-auto px-4">
            <div className="overflow-x-auto bg-white shadow-lg rounded-2xl border border-gray-200">
                <table className="min-w-full table-auto text-center rounded-2xl overflow-hidden">
                    <thead className="bg-blue-400 text-white text-sm uppercase tracking-wider">
                        <tr>
                            <th className="px-6 py-4 font-semibold">Flower No</th>
                            <th className="px-6 py-4 font-semibold">Date of Birth</th>
                            <th className="px-6 py-4 font-semibold">Date of Death</th>
                            <th className="px-6 py-4 font-semibold">Time Survived</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200 text-gray-700">
                        {flowers && flowers.length > 0 ? (
                        flowers.map((flower: FlowerListDTO, index) => (
                            <tr
                            key={flower.flowerNumber}
                            className={`hover:bg-indigo-50 transition ${
                                index % 2 === 0 ? "bg-gray-50" : "bg-white"
                            }`}
                            >
                                <td className="px-6 py-4 font-medium text-indigo-600">{flower.flowerNumber}</td>
                                <td className="px-6 py-4">{flower.createdAt}</td>
                                <td className="px-6 py-4">{flower.diedAt || "-"}</td>
                                <td className="px-6 py-4">{flower.timeSurvived}</td>
                            </tr>
                        ))
                        ) : (
                        <tr>
                            <td colSpan={4} className="px-6 py-6 text-gray-500">
                                No flowers found.
                            </td>
                        </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default FlowerTable;
