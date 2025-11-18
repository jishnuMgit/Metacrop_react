import Env from "@/config/env";
import { TrashIcon, XMarkIcon } from "@heroicons/react/24/solid";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface PaymentItem {
  id: number;
  acName: string;
  acCode: string;
  payment: string;
  narration: string;
  costCenter: string;
  project: string;
  subhead: string;
}

const PaymentVoucher: React.FC = () => {
  const [type, setType] = useState<"Payment" | "Receipt">("Payment");
  const [date, setDate] = useState<string>(new Date().toISOString().slice(0, 10));
  const [cashAccount, setCashAccount] = useState("");
  const [voucherNo, setVoucherNo] = useState("");
  const [Total, setTotal] = useState("");
  const [currency, setCurrency] = useState("");
const [cashAccounts, setCashAccounts] = useState<any[]>([]);
const [subHeads, setSubHeads] = useState<any[]>([]);
const [currencyList, setCurrencyList] = useState<any[]>([]);

  const [accounts, setAccounts] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [costCenters, setCostCenters] = useState<any[]>([]);

  const [items, setItems] = useState<PaymentItem[]>([
    { id: 1, acName: "", acCode: "", payment: "", narration: "", costCenter: "", project: "", subhead: "" },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchPaymentVoucher = async () => {
    try {
      const response = await fetch(`${Env.VITE_BASE_URL}/PaymentVoucher/get`, {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      const data = await response.json();
      setAccounts(data.Accounts || []);
      setProjects(data.project || []);
      setCostCenters(data.CostCenter || []);
      setAccounts(data.Accounts || []);
setCashAccounts(data.CashAccounts || []);
setProjects(data.project || []);
setCostCenters(data.CostCenter || []);
setSubHeads(data.subHead || []);
setCurrencyList(data.currency ? [data.currency] : []);
setCurrency(data.currency?.PKCurrID || "");

    } catch (error) {
      console.error("Error fetching payment voucher:", error);
      toast.error("Failed to load Payment Voucher data");
    }
  };

  useEffect(() => {
    fetchPaymentVoucher();
  }, []);

  const handleAddRow = () => {
    setItems([
      ...items,
      {
        id: items.length + 1,
        acName: "",
        acCode: "",
        payment: "",
        narration: "",
        costCenter: "",
        project: "",
        subhead: "",
      },
    ]);
  };

  const handleChange = (id: number, field: keyof PaymentItem, value: string) => {
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, [field]: value } : item)));
  };

  const handleDeleteRow = (id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleSelectAccount = (acc: any) => {
    if (selectedRowId !== null) {
      handleChange(selectedRowId, "acName", acc.AccName);
      handleChange(selectedRowId, "acCode", acc.AccCode);
      setShowModal(false);
    }
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (Total === "") {
    toast.error("Add Total");
    return;
  }

  const selectedCashAcc = cashAccounts.find(
    (acc) => acc.AccCode === cashAccount
  );
  const selectedCurrency = currencyList.find(
    (c) => c.PKCurrID == currency
  );

  const mappedItems = items.map((item) => {
    return {
      acName: item.acName,
      acCode: item.acCode,
      payment: item.payment,
      narration: item.narration,
      subhead: item.subhead,
      costCenter: item.costCenter,
      project: item.project,
    };
  });

  const finalData = {
    type,
    date,
    cashAccount: selectedCashAcc ? selectedCashAcc.AccName : "",
    cashAccountCode: selectedCashAcc ? selectedCashAcc.AccCode : "",
    voucherNo,
    currency: selectedCurrency ? selectedCurrency.PPKCurrID : "",
    currencyCode: selectedCurrency ? selectedCurrency.CurrCode : "",
    total: Total,
    items: mappedItems,
  };

  console.log("SUBMIT DATA:", finalData);

  try {
    const response = await fetch(`${Env.VITE_BASE_URL}/PaymentVoucher/save`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // 🔥 include cookies / tokens
      body: JSON.stringify(finalData),
    });

    if (!response.ok) {
      throw new Error("Failed to save data");
    }

    const data = await response.json();
    console.log("SAVE SUCCESS:", data);

    toast.success("Form submitted & saved successfully!");

setTimeout(() => {
  window.location.reload();
}, 3000);

         
  } catch (error) {
    console.error("SAVE ERROR:", error);
    toast.error("Error saving form!");
  }
};



  const filteredAccounts = accounts.filter(
    (acc) =>
      acc.AccName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      acc.AccCode.toLowerCase().includes(searchTerm.toLowerCase())
  );

  //@ts-ignore
  const isDark = document.documentElement.classList.contains("dark");
console.log(isDark);

  return (
    <div className="p-4 sm:p-6 md:p-10 mb-36 bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors duration-300">
      <h2 className="text-2xl md:text-3xl font-semibold mb-8 text-center text-gray-800 dark:text-gray-100">
        Cash Voucher
      </h2>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Top Section */}
        <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 items-center">
            {/* Type */}
            <div className="lg:col-span-2 flex flex-wrap sm:flex-nowrap items-center gap-3">
              <label className="font-medium text-gray-700 dark:text-gray-200">Type:</label>
              <div className="flex gap-4">
                {["Payment", "Receipt"].map((t) => (
                  <label key={t} className="flex items-center gap-1 dark:text-gray-300">
                    <input
                      type="radio"
                      checked={type === t}
                      className="accent-blue-600"
                      onChange={() => {
  setType(t as "Payment" | "Receipt");

  const selected = cashAccounts.find(acc => acc.AccCode === cashAccount);
  if (selected) {
    if (t === "Payment") {
      setVoucherNo(String((selected.PaymentSeries || 0) + 1));
    } else {
      setVoucherNo(String((selected.ReceiptSeries || 0) + 1));
    }
  }
}}

                    />
                    {t}
                  </label>
                ))}
              </div>
            </div>

            {/* Date */}
            <div>
              <label className="font-medium text-gray-700 dark:text-gray-200">Date:</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="border rounded-md px-2 py-1 w-full focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
              />
            </div>

            {/* Cash Account */}
            <div>
              <label className="font-medium text-gray-700 dark:text-gray-200">Cash Account:</label>
             <select
  value={cashAccount}
  onChange={(e) => {
    const selected = cashAccounts.find(acc => acc.AccCode === e.target.value);
    setCashAccount(e.target.value);

    if (selected) {
      if (type === "Payment") {
        setVoucherNo(String((selected.PaymentSeries || 0) + 1));
      } else {
        setVoucherNo(String((selected.ReceiptSeries || 0) + 1));
      }
    }
  }}
  className="border rounded-md px-2 py-1 w-full focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
>
  <option value="">Choose Cash Account</option>
  {cashAccounts.map((acc) => (
    <option key={acc.PKAccID} value={acc.AccCode}>
      {acc.AccName}
    </option>
  ))}
</select>

            </div>

            {/* Voucher No */}
            <div>
              <label className="font-medium text-gray-700 dark:text-gray-200">Voucher No:</label>
              <input
  type="text"
  value={voucherNo}
  readOnly
  placeholder="Auto generated"
  className="border rounded-md px-2 py-1 w-full bg-gray-100 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
/>

            </div>

            {/* Currency */}
            <div>
              <label className="font-medium text-gray-700 dark:text-gray-200">Currency:</label>
  <select
  value={currency}
  onChange={(e) => setCurrency(e.target.value)}
  className="border rounded-md px-2 py-1 w-full"
>
  {currencyList.map((cur) => (
    <option key={cur.PKCurrID} value={cur.PKCurrID}>
      {cur.CurrCode} - {cur.CurrDescr}
    </option>
  ))}
</select>


            </div>
          </div>
        </div>

        {/* Table Section */}
        <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
          <div className="overflow-x-auto mt-4">
            <table className="w-full border border-gray-300 dark:border-gray-700 text-sm text-left">
              <thead className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
                <tr>
                  {["Sl No", "A/C Name", "A/C Code", "Payment", "Narration", "Subhead", "Cost Center", "Project", "Action"].map(
                    (header) => (
                      <th key={header} className="border px-2 py-2 dark:border-gray-600">
                        {header}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr
                    key={item.id}
                    className="odd:bg-white even:bg-gray-50 dark:odd:bg-gray-800 dark:even:bg-gray-700"
                  >
                    <td className="border px-2 py-1 text-center dark:border-gray-600 dark:text-gray-200">
                      {item.id}
                    </td>

                    {/* A/C Name — Opens Modal */}
                    <td
                      className="border px-2 py-1 cursor-pointer dark:border-gray-600 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-600"
                      onClick={() => {
                        setSelectedRowId(item.id);
                        setShowModal(true);
                      }}
                    >
                      {item.acName || (
                        <span className="text-gray-400 dark:text-gray-400 italic">Click to select</span>
                      )}
                    </td>

                    {/* A/C Code */}
                    <td className="border px-2 py-1 dark:border-gray-600">
                      <input
                        type="text"
                        value={item.acCode}
                        readOnly
                        className="w-full border rounded-md px-1 py-1 bg-gray-100 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                      />
                    </td>

                    {/* Payment */}
                    <td className="border px-2 py-1 dark:border-gray-600">
                      <input
                        type="number"
                        value={item.payment}
                        onChange={(e) => handleChange(item.id, "payment", e.target.value)}
                        className="w-full border rounded-md px-1 py-1 focus:ring-1 focus:ring-blue-400 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                      />
                    </td>

                    {/* Narration */}
                    <td className="border px-2 py-1 dark:border-gray-600">
                      <input
                        type="text"
                        value={item.narration}
                        onChange={(e) => handleChange(item.id, "narration", e.target.value)}
                        className="w-full border rounded-md px-1 py-1 focus:ring-1 focus:ring-blue-400 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                      />
                    </td>

                    {/* Subhead */}
                    <td className="border px-2 py-1 dark:border-gray-600">
                     <select
  value={item.subhead}
  onChange={(e) => handleChange(item.id, "subhead", e.target.value)}
  className="w-full border rounded-md px-1 py-1 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
>
  <option value="">Choose SubHead</option>
  {subHeads.map((sh) => (
    <option key={sh.PKSubHeadID} value={sh.SubHeadName}>
      {sh.SubHeadName}
    </option>
  ))}
</select>

                    </td>

                    {/* Cost Center */}
                    <td className="border px-2 py-1 dark:border-gray-600">
                      <select
                        value={item.costCenter}
                        onChange={(e) => handleChange(item.id, "costCenter", e.target.value)}
                        className="w-full border rounded-md px-1 py-1 focus:ring-1 focus:ring-blue-400 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                      >
                        <option value="">Choose Cost Center</option>
                        {costCenters.map((cs) => (
                          <option key={cs.PKCsID} value={cs.CsName}>
                            {cs.CsName}
                          </option>
                        ))}
                      </select>
                    </td>

                    {/* Project */}
                    <td className="border px-2 py-1 dark:border-gray-600">
                      <select
                        value={item.project}
                        onChange={(e) => handleChange(item.id, "project", e.target.value)}
                        className="w-full border rounded-md px-1 py-1 focus:ring-1 focus:ring-blue-400 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                      >
                        <option value="">Choose Project</option>
                        {projects.map((proj) => (
                          <option key={proj.PKProjectID} value={proj.ProjectName}>
                            {proj.ProjectName}
                          </option>
                        ))}
                      </select>
                    </td>

                    {/* Delete */}
                    <td className="border px-2 py-1 text-center dark:border-gray-600">
                      <button
                        type="button"
                        onClick={() => handleDeleteRow(item.id)}
                        className="bg-red-500 text-white px-3 py-1 flex justify-center items-center gap-2 rounded-md hover:bg-red-600"
                      >
                        <TrashIcon width={17} /> Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row justify-between gap-3 mt-6">
            <button
              type="button"
              onClick={handleAddRow}
              className="bg-teal-600 text-white px-5 py-2 rounded-md hover:bg-teal-700 w-full sm:w-auto"
            >
              + Add Row
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 flex justify-center items-center gap-2 rounded-md hover:bg-blue-700 w-full sm:w-auto"
            >
              Submit
            </button>
          </div>

          {/* Total */}
          <div className="flex flex-col sm:flex-row justify-end sm:items-center gap-3 mt-8 w-full">
            <div className="flex flex-col sm:flex-row gap-3 items-center">
              <label htmlFor="total" className="font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                Total
              </label>
              <input
                id="total"
                value={Total}
                onChange={(e) => setTotal(e.target.value)}
                type="text"
                placeholder="Total"
                className="border rounded-md px-2 py-1 w-full sm:w-40 focus:ring-1 focus:ring-blue-400 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
              />
            </div>
          </div>
        </div>
      </form>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-60">
          <div className="bg-white dark:bg-gray-800 w-11/12 max-w-2xl rounded-xl shadow-lg p-6 relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-gray-700 dark:text-gray-300 hover:text-red-500"
            >
              <XMarkIcon width={24} />
            </button>

            <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">
              Select Account
            </h3>

            <input
              type="text"
              placeholder="Search by name or code..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full mb-4 px-3 py-2 border rounded-md focus:ring-1 focus:ring-blue-400 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
            />

            <div className="overflow-y-auto max-h-80 border rounded-md dark:border-gray-700">
              <table className="w-full text-sm">
                <thead className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 sticky top-0">
                  <tr>
                    <th className="px-3 py-2 text-left border-b dark:border-gray-600">A/C Name</th>
                    <th className="px-3 py-2 text-left border-b dark:border-gray-600">A/C Code</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAccounts.length > 0 ? (
                    filteredAccounts.map((acc) => (
                      <tr
                        key={acc.PKAccID}
                        onClick={() => handleSelectAccount(acc)}
                        className="cursor-pointer hover:bg-blue-100 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200"
                      >
                        <td className="px-3 py-2 border-b dark:border-gray-600">{acc.AccName}</td>
                        <td className="px-3 py-2 border-b dark:border-gray-600">{acc.AccCode}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={2} className="px-3 py-3 text-center text-gray-500 dark:text-gray-400">
                        No results found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentVoucher;
