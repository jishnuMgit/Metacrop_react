import AddCustomerPage from "@/components/Customer/AddCustomerPage";
import ViewCustomer from "@/components/Customer/ViewCustomer";
import { useState } from "react";

const Customer = () => {
  const [activeTab, setActiveTab] = useState("show");

  return (
    <div className="p-4">
      {/* Nav Tabs */}
      <div className="flex gap-6 mb-4">
        <button
          onClick={() => setActiveTab("show")}
          className={`relative pb-2 font-medium text-sm transition-all ${
            activeTab === "show" ? "text-blue-600" : "text-gray-500"
          }`}
        >
          <span className="inline-block relative">
            Add Customer
            {activeTab === "show" && (
              <span className="absolute left-0 bottom-0 w-full h-[2px] bg-blue-600"></span>
            )}
          </span>
        </button>

        <button
          onClick={() => setActiveTab("enter")}
          className={`relative pb-2 font-medium text-sm transition-all ${
            activeTab === "enter" ? "text-blue-600" : "text-gray-500"
          }`}
        >
          <span className="inline-block relative">
            View Customer
            {activeTab === "enter" && (
              <span className="absolute left-0 bottom-0 w-full h-[2px] bg-blue-600"></span>
            )}
          </span>
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === "show" && <AddCustomerPage />}
      {activeTab === "enter" && <ViewCustomer />}
    </div>
  );
};

export default Customer;
