import Env from "@/config/env"
import { useEffect, useState } from "react"
import { CreateAxiosDefaults } from "useipa"

interface Transaction {
  id: number
  totalSales: number
  cardSales: number
  amountReceived: number
  paidToManufacturer: number
  paidToBank: number
  settlementDate: string
  status: "Success" | "Failed"
}

interface ModalRow {
  id: number
  supplier: string
  transactedAmount: number
  actualAmount: number
  remarks: string
}

const client: CreateAxiosDefaults = {
  baseURL: Env.VITE_BASE_URL,
  withCredentials: true,
}

export default function Reconciliation() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [selectedTx, setSelectedTx] = useState<Transaction | null>(null)
  const [rows, setRows] = useState<ModalRow[]>([])
  const [currentPage, setCurrentPage] = useState(1)

  const rowsPerPage = 10
  const totalPages = Math.ceil(transactions.length / rowsPerPage)

const FetchData = async () => {
  try {
    const res = await fetch(`${client.baseURL}/reconciliation/get`, {
      method: "GET",
      credentials: "include",
    });

    const result = await res.json();

    // Map API response into Transaction format
    const mapped: Transaction[] =
      result?.data?.map((item: any) => ({
        id: item.PKSettlementID,
        totalSales: item.TotalSalesAmount,
        cardSales: item.TotalCardSalesAmount,
        amountReceived: item.AmontRecived,
        paidToManufacturer: item.PaidToManufacture,
        paidToBank: item.PaidToBank,
        settlementDate: new Date(item.CreatedAt).toLocaleString(),
        status: item.Status === 1 ? "Success" : "Failed",
      })) || [];

    setTransactions(mapped);
  } catch (err) {
    console.error("Error fetching data:", err);
    setTransactions([]); // empty if error
  }
};


  useEffect(() => {
    FetchData()
  }, [])

  const handleAddRow = () => {
    if (!selectedTx) return
    setRows((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        supplier: "",
        transactedAmount: selectedTx.amountReceived,
        actualAmount: 0,
        remarks: "",
      },
    ])
  }

  const handleRowChange = (
    id: number,
    field: keyof ModalRow,
    value: string | number
  ) => {
    setRows((prev) =>
      prev.map((row) =>
        row.id === id ? { ...row, [field]: value } : row
      )
    )
  }

  const paginatedTx = transactions.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  )

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Raise a Complaint</h2>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border">#</th>
              <th className="px-4 py-2 border">Total Sales</th>
              <th className="px-4 py-2 border">Card Sales</th>
              <th className="px-4 py-2 border">Amount Received</th>
              <th className="px-4 py-2 border">Paid to Manufacturer</th>
              <th className="px-4 py-2 border">Paid to Bank</th>
              <th className="px-4 py-2 border">Settlement Date</th>
              <th className="px-4 py-2 border">Status</th>
              <th className="px-4 py-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {paginatedTx.map((tx) => (
              <tr key={tx.id} className="text-center">
                <td className="px-4 py-2 border">{tx.id}</td>
                <td className="px-4 py-2 border">{tx.totalSales}</td>
                <td className="px-4 py-2 border">{tx.cardSales}</td>
                <td className="px-4 py-2 border">{tx.amountReceived}</td>
                <td className="px-4 py-2 border">{tx.paidToManufacturer}</td>
                <td className="px-4 py-2 border">{tx.paidToBank}</td>
                <td className="px-4 py-2 border">{tx.settlementDate}</td>
                <td className="px-4 py-2 border">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      tx.status === "Success"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {tx.status}
                  </span>
                </td>
                <td className="px-4 py-2 border">
                  <button
                    onClick={() => {
                      setSelectedTx(tx)
                      setRows([])
                    }}
                    className="px-4 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Reconcile
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
              Reconciliation Details
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
                      <td className="px-3 py-2 border">
                        <input
                          type="text"
                          value={row.supplier}
                          onChange={(e) =>
                            handleRowChange(row.id, "supplier", e.target.value)
                          }
                          className="w-full border rounded p-1"
                        />
                      </td>
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
                          // value={row.actualAmount}
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

            <button
              onClick={handleAddRow}
              className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              + Add Row
            </button>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setSelectedTx(null)}
                className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
              >
                Close
              </button>
             <button
  onClick={async () => {
    if (!selectedTx) return;

    try {
      const res = await fetch(`${client.baseURL}/reconciliation/post`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          settlementId: selectedTx.id,
          rows: rows,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to submit reconciliation");
      }

      const data = await res.json();
      console.log("Reconciliation submitted:", data);
      alert("Reconciliation submitted ✅");

      // Close modal after success
      setSelectedTx(null);
      setRows([]);
      FetchData(); // refresh table after submit
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
  )
}
