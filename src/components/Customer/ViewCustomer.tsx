import { useState } from "react";
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

const dummyCustomers = [
  {
    name: "John Doe",
    email: "john@example.com",
    countryCode: "+968",
    phone: "91234567",
  },
  {
    name: "Sara Ahmed",
    email: "sara@example.com",
    countryCode: "+968",
    phone: "92345678",
    address: "Salalah, Oman",
  },
  {
    name: "Ali Hassan",
    email: "ali@example.com",
    countryCode: "+968",
    phone: "93456789",
  },
  {
    name: "Fatima Noor",
    email: "fatima@example.com",
    countryCode: "+968",
    phone: "94567890",
  },
  {
    name: "Ahmed Said",
    email: "ahmed@example.com",
    countryCode: "+968",
    phone: "95678901",
    address: "Ibri, Oman",
  },
  {
    name: "Layla Yousuf",
    email: "layla@example.com",
    countryCode: "+968",
    phone: "96789012",
  },
];

export default function ViewCustomer() {
  const [open, setOpen] = useState(false);
  const [editCustomer, setEditCustomer] = useState<any>(null);

  const handleEdit = (customer: any) => {
    setEditCustomer({ ...customer });
    setOpen(true);
  };

  const handleSave = () => {
    const fullPhone = `${editCustomer.countryCode}${editCustomer.phone}`;
    console.log("Updated Customer:", {
      ...editCustomer,
      fullPhone,
    });
    setOpen(false);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setEditCustomer((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="p-6">
      <Typography variant="h5" className="mb-4 text-blue-gray-700">
        Customer List
      </Typography>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {dummyCustomers.map((customer, index) => (
          <Card key={index} className="shadow-md border border-blue-gray-100">
            <CardBody>
              <Typography variant="h6" color="blue-gray">
                {customer.name}
              </Typography>
              <Typography variant="small" className="text-gray-700">
                📧 {customer.email}
              </Typography>
              <Typography variant="small" className="text-gray-700">
                📞 {customer.countryCode} {customer.phone}
              </Typography>

              <div className="mt-4 flex justify-end">
                <Button
                  size="sm"
                  color="blue"
                  onClick={() => handleEdit(customer)}
                >
                  Edit
                </Button>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>

      {/* Modal */}
      <Dialog open={open} handler={() => setOpen(false)} size="sm">
        <DialogHeader>Edit Customer</DialogHeader>
        <DialogBody className="grid gap-4">
          <Input
            label="Name"
            name="name"
            value={editCustomer?.name || ""}
            onChange={handleInputChange}
            crossOrigin={undefined}
          />
          <Input
            label="Email"
            name="email"
            value={editCustomer?.email || ""}
            onChange={handleInputChange}
            crossOrigin={undefined}
          />
          <Input
            label="Country Code"
            name="countryCode"
            value={editCustomer?.countryCode || ""}
            onChange={handleInputChange}
            crossOrigin={undefined}
          />
          <Input
            label="Phone Number"
            name="phone"
            value={editCustomer?.phone || ""}
            onChange={handleInputChange}
            crossOrigin={undefined}
          />
        </DialogBody>
        <DialogFooter>
          <Button variant="text" onClick={() => setOpen(false)} className="mr-2">
            Cancel
          </Button>
          <Button color="blue" onClick={handleSave}>
            Save
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
}
