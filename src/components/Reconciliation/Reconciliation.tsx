
import Env from "@/config/env";
import { useEffect, useState } from "react";
import { CreateAxiosDefaults } from "useipa";

interface Transaction {
  PKSettlementID: any;
  id: number;
  ReconcileCode: string;
  settlementDate: string;
  status: "Success" | "Pending";
  children: ChildRow[];
}

interface ChildRow {
  id: number;
  FKManufactureID: number; // ✅ Added field
  supplier: string;
  transactedAmount: number;
  actualAmount: number;
  remarks: string;
}

const client: CreateAxiosDefaults = {
  baseURL: Env.VITE_BASE_URL,
  withCredentials: true,
};

export default function Reconciliation() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [selectedTx, setSelectedTx] = useState<Transaction | null>(null);
  const [rows, setRows] = useState<ChildRow[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const rowsPerPage = 10;
  const totalPages = Math.ceil(transactions.length / rowsPerPage);

  const FetchData = async () => {
    try {
      const res = await fetch(`${client.baseURL}/reconciliation/get`, {
        method: "GET",
        credentials: "include",
      });

      const result = await res.json();

      const mapped: Transaction[] =
        result?.data?.map((item: any) => ({
          id: item.PKRecSettlementID || item.PKSettlementID,
          PKSettlementID: item.PKSettlementID,
          ReconcileCode: item.ReconcileCode || item.SettlementCode || "-",
          settlementDate: new Date(item.CreatedAt).toLocaleString(),
          status: item.Reconcile_Status === 1 ? "Success" : "Pending",

          children:
            item.children?.map((child: any, index: number) => ({
              id: index + 1,
              FKManufactureID: child.FKManufactureID, // ✅ Include Manufacture ID
              supplier: child.RetailName,
              transactedAmount: child.AmountPaid,
              actualAmount: child.AmountPaid,
              remarks: "",
            })) || [],
        })) || [];

      setTransactions(mapped);
    } catch (err) {
      console.error("Error fetching data:", err);
      setTransactions([]);
    }
  };

  useEffect(() => {
    FetchData();
  }, []);

  const handleRowChange = (
    id: number,
    field: keyof ChildRow,
    value: string | number
  ) => {
    setRows((prev) =>
      prev.map((row) => (row.id === id ? { ...row, [field]: value } : row))
    );
  };

  const paginatedTx = transactions.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Reconciliation</h2>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border">#</th>
              <th className="px-4 py-2 border">Reconcile Code</th>
              <th className="px-4 py-2 border">Date</th>
              <th className="px-4 py-2 border">Status</th>
              <th className="px-4 py-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {paginatedTx.map((tx) => (
              <tr key={tx.id} className="text-center">
                <td className="px-4 py-2 border">{tx.id}</td>
                <td className="px-4 py-2 border">{tx.ReconcileCode}</td>
                <td className="px-4 py-2 border">{tx.settlementDate}</td>
                <td className="px-4 py-2 border">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      tx.status === "Success"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {tx.status}
                  </span>
                </td>
                <td className="px-4 py-2 border">
                  <button
                    onClick={() => {
                      setSelectedTx(tx);
                      setRows(tx.children || []);
                    }}
                    className="px-4 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => p - 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((p) => p + 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* Modal */}
      {selectedTx && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-3xl">
            <h3 className="text-lg font-bold mb-4 text-gray-800">
              Reconciliation Details - {selectedTx.ReconcileCode}
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full bg-white border border-gray-200 text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-3 py-2 border">Supplier Name</th>
                    <th className="px-3 py-2 border">Transacted Amount</th>
                    <th className="px-3 py-2 border">Actual Amount</th>
                    <th className="px-3 py-2 border">Remarks</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row) => (
                    <tr key={row.id} className="text-center">
                      <td className="px-3 py-2 border">{row.supplier}</td>
                      <td className="px-3 py-2 border">
                        <input
                          type="number"
                          value={row.transactedAmount}
                          readOnly
                          className="w-full border rounded p-1 bg-gray-100 text-gray-600"
                        />
                      </td>
                      <td className="px-3 py-2 border">
                        <input
                          type="number"
                          value={row.actualAmount}
                          onChange={(e) =>
                            handleRowChange(
                              row.id,
                              "actualAmount",
                              Number(e.target.value)
                            )
                          }
                          className="w-full border rounded p-1"
                        />
                      </td>
                      <td className="px-3 py-2 border">
                        <input
                          type="text"
                          value={row.remarks}
                          onChange={(e) =>
                            handleRowChange(row.id, "remarks", e.target.value)
                          }
                          className="w-full border rounded p-1"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setSelectedTx(null)}
                className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
              >
                Close
              </button>

              {/* ✅ Confirm button */}
              <button
                onClick={async () => {
                  try {
                    if (!selectedTx) return;

                    const payload = {
                      settlementId: selectedTx.PKSettlementID,
                      rows: rows.map((r) => ({
                        ...r,
                        PKSettlementID: selectedTx.PKSettlementID,
                        FKManufactureID: r.FKManufactureID, // ✅ Important
                      })),
                    };

                    const res = await fetch(`${client.baseURL}/reconciliation/post`, {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      credentials: "include",
                      body: JSON.stringify(payload),
                    });

                    if (!res.ok) throw new Error("Failed to submit reconciliation");

                    const data = await res.json();
                    console.log("Reconciliation submitted:", data);
                    alert("Reconciliation submitted ✅");

                    setSelectedTx(null);
                    setRows([]);
                    FetchData();
                  } catch (err) {
                    console.error("Error submitting reconciliation:", err);
                    alert("❌ Error submitting reconciliation");
                  }
                }}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

