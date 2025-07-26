import { useEffect, useState } from "react";
import CustomerTableSkeleton  from '../../skeletons/customerTableSkeleton'

import {
  Card,
  CardBody,
  Typography,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
} from "@material-tailwind/react";
import { CreateAxiosDefaults } from "useipa";
import Env from "@/config/env";

interface DataInterface {
  id: number;
  name: string;
  email: string;
  countryCode: string;
  phone: string;
}

export default function ViewCustomer() {
  const [open, setOpen] = useState(false);
  const [editCustomer, setEditCustomer] = useState<DataInterface | null>(null);
  const [Data, setData] = useState<DataInterface[]>([]);

  const handleEdit = (customer: DataInterface) => {
    setEditCustomer({ ...customer });
    setOpen(true);
  };
  const client: CreateAxiosDefaults= {
      baseURL: Env.VITE_BASE_URL,
      withCredentials: true,
    }

  const handleSave = async () => {
    if (!editCustomer) return;

    const fullPhone = `${editCustomer.countryCode}${editCustomer.phone}`;
    const payload = {
      ...editCustomer,
      fullPhone,
    };


    try {
      await fetch(`${client?.baseURL}/customer/updatecustomer/`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(payload),
      });

      await handleFetch();
      setOpen(false);
    } catch (err) {
      console.error("Failed to update customer", err);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditCustomer((prev) => prev ? { ...prev, [name]: value } : null);
  };

  const handleFetch = async () => {
    try {
      const Req = await fetch(`${client?.baseURL}/customer/GetCustomer`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });

      const res = await Req.json();

      const normalized = res.data.map((item: any) => ({
        id: item.PKCustomerID,
        name: item.Name,
        email: item.Email,
        countryCode: item.country_code,
        phone: item.Phone,
      }));

      setData(normalized);
    } catch (error) {
      console.error("Fetch failed", error);
    }
  };

  useEffect(() => {
    handleFetch();
  }, []);

  return (
    <div className="w-full h-screen">
      <div className="p-6 w-full h-screen">
      <Typography variant="h5" className="mb-4 text-blue-gray-700 dark:text-white">
        Customer List
      </Typography>
{Data.length==0 && <CustomerTableSkeleton />}

      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">


        {Data.map((customer, index) => (
          <Card
            key={index}
            className="shadow-md border border-blue-gray-100 dark:bg-dark-primary-bg dark:border-gray-800"
          >
            <CardBody>
              <Typography variant="h6" className="text-blue-gray-900 dark:text-white">
                {customer?.name}
              </Typography>
              <Typography variant="small" className="text-gray-700 dark:text-gray-300">
                📧 {customer?.email}
              </Typography>
              <Typography variant="small" className="text-gray-700 dark:text-gray-300">
                📞 {customer.countryCode} {customer.phone}
              </Typography>

              <div className="mt-4 flex justify-end">
                <Button size="sm" color="blue" onClick={() => handleEdit(customer)}>
                  Edit
                </Button>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>

      {/* Edit Modal */}
      <Dialog open={open} handler={() => setOpen(false)} size="sm">
        <DialogHeader className="dark:bg-dark-primary-bg dark:text-white">
          Edit Customer
        </DialogHeader>
        <DialogBody className="grid gap-4 dark:bg-dark-primary-bg">
          <Input
            label="Name"
            name="name"
            value={editCustomer?.name || ""}
            onChange={handleInputChange}
            crossOrigin={undefined}
            className="dark:text-white"
          />
          <Input
            label="Email"
            name="email"
            value={editCustomer?.email || ""}
            onChange={handleInputChange}
            crossOrigin={undefined}
            className="dark:text-white"
          />
          <Input
            label="Country Code"
            name="countryCode"
            value={editCustomer?.countryCode || ""}
            onChange={handleInputChange}
            crossOrigin={undefined}
            className="dark:text-white"
          />
          <Input
            label="Phone Number"
            name="phone"
            value={editCustomer?.phone || ""}
            onChange={handleInputChange}
            crossOrigin={undefined}
            className="dark:text-white"
          />
        </DialogBody>
        <DialogFooter className="dark:bg-dark-primary-bg">
          <Button variant="text" onClick={() => setOpen(false)} className="mr-2">
            Cancel
          </Button>
          <Button color="blue" onClick={handleSave}>
            Save
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
    </div>
  );
}
