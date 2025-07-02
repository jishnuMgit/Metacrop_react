import { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  Checkbox,
  Typography,
  DialogBody,
  IconButton,
  DialogHeader,
  DialogFooter,
} from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Select, { StylesConfig, SingleValue } from "react-select";
import Env from "@/config/env";

type OptionType = {
  value: string;
  label: string;
};

interface FilterProps {
  onApply: (data: any) => void;
}

export const Filter: React.FC<FilterProps> = ({ onApply }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [isDateEnabled, setIsDateEnabled] = useState<boolean>(true);
  const [isCustomerEnabled, setIsCustomerEnabled] = useState<boolean>(false);
  const [isRangeEnabled, setIsRangeEnabled] = useState<boolean>(false);
  const [selectedCustomer, setSelectedCustomer] = useState<SingleValue<OptionType>>(null);
  const [selectedRange, setSelectedRange] = useState<SingleValue<OptionType>>(null);

  const today = new Date().toISOString().split("T")[0];
  const sevenDaysAgo = new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];
  const [startDate, setStartDate] = useState<string>(sevenDaysAgo);
  const [endDate, setEndDate] = useState<string>(today);

  const [customerOptions, setCustomerOptions] = useState<OptionType[]>([]);
  const [productOptions, setProductOptions] = useState<OptionType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const handleOpen = () => setOpen(!open);

  const handleSave = () => {
    onApply({
      startDate,
      endDate,
      customer: selectedCustomer,
      range: selectedRange,
    });
    setOpen(false);
  };

  const FetchData = async () => {
    try {
      const response = await fetch(`${Env.VITE_BASE_URL}/sales/getAllUserAndProduct`, {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) throw new Error("Failed to fetch data");
      const result = await response.json();

      const mappedCustomers: OptionType[] = result.Alluser.map((user: any) => ({
        value: user.PKCustomerID.toString(),
        label: user.Name,
      }));

      const mappedProducts: OptionType[] = result.AllItemDetails.map((item: any) => ({
        value: item.PKItemID.toString(),
        label: item.ItemName,
      }));

      setCustomerOptions(mappedCustomers);
      setProductOptions(mappedProducts);
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Error loading data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    FetchData();
  }, []);

  const customStyles: StylesConfig<OptionType, false> = {
    menuPortal: (base) => ({ ...base, zIndex: 9999 }),
    control: (base, state) => ({
      ...base,
      backgroundColor: state.isDisabled ? "#3a3a3a" : "#1e1e1e",
      border: state.isDisabled
        ? "1px solid #555"
        : state.isFocused
        ? "2px solid #00bfff"
        : "1px solid rgba(255,255,255,0.6)",
      boxShadow: state.isFocused ? "0 0 5px #00bfff" : "none",
      color: "white",
      minHeight: "42px",
      borderRadius: "8px",
      transition: "border-color 0.2s, box-shadow 0.2s",
    }),
    singleValue: (base) => ({ ...base, color: "white" }),
    placeholder: (base) => ({ ...base, color: "rgba(255,255,255,0.7)" }),
    menu: (base) => ({
      ...base,
      backgroundColor: "rgba(30,30,30,0.95)",
      color: "white",
      zIndex: 9999,
      border: "1px solid #888",
    }),
    option: (base, { isFocused }) => ({
      ...base,
      backgroundColor: isFocused ? "#555" : "transparent",
      color: "white",
      cursor: "pointer",
    }),
  };

  if (loading)
    return (
      <div>
        <Button variant="gradient">Loading...</Button>
      </div>
    );

  if (error)
    return (
      <div>
        <Button variant="gradient">Error loading data</Button>
      </div>
    );

  return (
    <>
      <Button onClick={handleOpen} variant="gradient">
        Filter
      </Button>

      <Dialog size="sm" open={open} handler={handleOpen} className="p-4">
        <DialogHeader className="relative m-0 block">
          <Typography variant="h4" color="blue-gray">
            Advanced Filter
          </Typography>
          <IconButton
            size="sm"
            variant="text"
            className="!absolute right-3.5 top-3.5"
            onClick={handleOpen}
          >
            <XMarkIcon className="h-4 w-4 stroke-2" />
          </IconButton>
        </DialogHeader>

        <DialogBody className="space-y-6 px-2 bg-gray-500 text-white rounded-lg">
          {/* Date Range Checkbox */}
          <Checkbox
            label={
              <div>
                <Typography color="white" className="font-medium">
                  Date Range
                </Typography>
                <Typography variant="small" className="font-normal text-white">
                  Enable Start and End Date
                </Typography>
              </div>
            }
            checked={isDateEnabled}
            onChange={(e) => {
              const checked = e.target.checked;
              setIsDateEnabled(checked);
              if (!checked) {
                setStartDate("");
                setEndDate("");
              } else {
                setStartDate(sevenDaysAgo);
                setEndDate(today);
              }
            }}
            containerProps={{
              className: "border border-gray-500 rounded-md p-2 -mt-3",
            }}
            crossOrigin={undefined}
          />

          <div className="flex gap-4">
            <div className="flex flex-col w-1/2">
              <label className="text-white mb-2 text-sm">From</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                disabled={!isDateEnabled}
                className={`bg-transparent rounded-md px-4 py-2 text-white placeholder-white focus:outline-none focus:ring [&::-webkit-calendar-picker-indicator]:invert ${
                  isDateEnabled
                    ? "border border-white/30 focus:border-white/50"
                    : "border border-gray-500 opacity-50 cursor-not-allowed"
                }`}
              />
            </div>

            <div className="flex flex-col w-1/2">
              <label className="text-white mb-2 text-sm">To</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                disabled={!isDateEnabled}
                className={`bg-transparent rounded-md px-4 py-2 text-white placeholder-white focus:outline-none focus:ring [&::-webkit-calendar-picker-indicator]:invert ${
                  isDateEnabled
                    ? "border border-white/30 focus:border-white/50"
                    : "border border-gray-500 opacity-50 cursor-not-allowed"
                }`}
              />
            </div>
          </div>

          {/* Customer Filter */}
          <Checkbox
            label={
              <div>
                <Typography color="white" className="font-medium">
                  Customer
                </Typography>
                <Typography variant="small" className="font-normal text-white">
                  Enable Customer Selection
                </Typography>
              </div>
            }
            checked={isCustomerEnabled}
            onChange={(e) => {
              setIsCustomerEnabled(e.target.checked);
              if (!e.target.checked) setSelectedCustomer(null);
            }}
            containerProps={{
              className: "border border-gray-500 rounded-md p-2 -mt-3",
            }}
            crossOrigin={undefined}
          />

          <Checkbox
            label={
              <div>
                <Typography color="white" className="font-medium">
                  Product
                </Typography>
                <Typography variant="small" className="font-normal text-white">
                  Enable Product Selection
                </Typography>
              </div>
            }
            checked={isRangeEnabled}
            onChange={(e) => {
              setIsRangeEnabled(e.target.checked);
              if (!e.target.checked) setSelectedRange(null);
            }}
            containerProps={{
              className: "border border-gray-500 rounded-md p-2 -mt-3",
            }}
            crossOrigin={undefined}
          />

          <div className="relative">
            <label className="text-white mb-2 text-sm block">Select Customer</label>
            <Select
              options={customerOptions}
              value={selectedCustomer}
              placeholder="Select option"
              onChange={(selected) => setSelectedCustomer(selected)}
              isDisabled={!isCustomerEnabled}
              styles={customStyles}
              menuPortalTarget={document.body}
              menuPosition="fixed"
            />
          </div>

          <div className="relative">
            <label className="text-white mb-2 text-sm block">Select Product</label>
            <Select
              options={productOptions}
              value={selectedRange}
              placeholder="Select option"
              onChange={(selected) => setSelectedRange(selected)}
              isDisabled={!isRangeEnabled}
              styles={customStyles}
              menuPortalTarget={document.body}
              menuPosition="fixed"
            />
          </div>
        </DialogBody>

        <DialogFooter>
          <Button className="ml-auto" onClick={handleSave}>
            Filter
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};
