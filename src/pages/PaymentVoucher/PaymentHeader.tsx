// import { useState } from "react";

// const PaymentHeader = () => {

//     const [type, setType] = useState<"Payment" | "Receipt">("Payment");
//     const [date, setDate] = useState<string>(new Date().toISOString().slice(0, 10));
//     const [cashAccount, setCashAccount] = useState("");
//     const [voucherNo, setVoucherNo] = useState("");
//     const [currency, setCurrency] = useState("OMR");
//   return (
//     <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 items-center">
//             {/* Type */}
//             <div className="lg:col-span-2 flex flex-wrap sm:flex-nowrap items-center gap-3">
//               <label className="font-medium text-gray-700 dark:text-gray-200">Type:</label>
//               <div className="flex gap-4">
//                 {["Payment", "Receipt"].map((t) => (
//                   <label key={t} className="flex items-center gap-1 dark:text-gray-300">
//                     <input
//                       type="radio"
//                       checked={type === t}
//                       onChange={() => setType(t as "Payment" | "Receipt")}
//                       className="accent-blue-600"
//                     />
//                     {t}
//                   </label>
//                 ))}
//               </div>
//             </div>

//             {/* Date */}
//             <div>
//               <label className="font-medium text-gray-700 dark:text-gray-200">Date:</label>
//               <input
//                 type="date"
//                 value={date}
//                 onChange={(e) => setDate(e.target.value)}
//                 className="border rounded-md px-2 py-1 w-full focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
//               />
//             </div>

//             {/* Cash Account */}
//             <div>
//               <label className="font-medium text-gray-700 dark:text-gray-200">Cash Account:</label>
//               <select
//                 value={cashAccount}
//                 onChange={(e) => setCashAccount(e.target.value)}
//                 className="border rounded-md px-2 py-1 w-full focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
//               >
//                 <option value="">Choose a cash account</option>
//                 {accounts.map((acc) => (
//                   <option key={acc.PKAccID} value={acc.AccCode}>
//                     {acc.AccName}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {/* Voucher No */}
//             <div>
//               <label className="font-medium text-gray-700 dark:text-gray-200">Voucher No:</label>
//               <input
//                 type="text"
//                 value={voucherNo}
//                 onChange={(e) => setVoucherNo(e.target.value)}
//                 placeholder="Auto / Manual"
//                 className="border rounded-md px-2 py-1 w-full focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
//               />
//             </div>

//             {/* Currency */}
//             <div>
//               <label className="font-medium text-gray-700 dark:text-gray-200">Currency:</label>
//               <select
//                 value={currency}
//                 onChange={(e) => setCurrency(e.target.value)}
//                 className="border rounded-md px-2 py-1 w-full focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
//               >
//                 <option value="OMR">OMR</option>
//                 <option value="USD">USD</option>
//                 <option value="INR">INR</option>
//               </select>
//             </div>
//           </div>
//         </div>
//   )
// }

// export default PaymentHeader