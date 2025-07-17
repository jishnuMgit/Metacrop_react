import { useState, ChangeEvent, FormEvent } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";

interface CustomerForm {
  Name: string;
  FKCmpID: number | string;
  country_code: string;
  Phone: string;
  Email: string;
  CreatedBy: number | string;
  // ModifiedBy: number | string;
  // DelFlag: number;
}

export default function AddCustomerPage() {
  const [formData, setFormData] = useState<CustomerForm>({
    Name: "",
    FKCmpID: "",
    country_code: "",
    Phone: "",
    Email: "",
    CreatedBy: "",
    // ModifiedBy: "",
    // DelFlag: 0,
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement>
  ): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "DelFlag" ? parseInt(value) : value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    // You can now send this data to your backend via Axios or Fetch
  };

  return (
    <div className="p-6">
      <Card className="border border-blue-gray-100 shadow-sm dark:bg-dark-primary-bg dark:border-none">
        <CardHeader
          className="dark:bg-dark-primary-bg p-4"
          variant="gradient"
          floated={false}
          shadow={false}
        >
          <Typography variant="h6" color="blue-gray" className="dark:text-white">
            Add New Customer
          </Typography>
        </CardHeader>

        <CardBody>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Name"
              name="Name"
              value={formData.Name}
              onChange={handleChange}
              required crossOrigin={undefined}            />
            <Input
              label="Company ID"
              name="FKCmpID"
              value={formData.FKCmpID}
              onChange={handleChange}
              required crossOrigin={undefined}            />
            <Input
              label="Country Code"
              name="country_code"
              value={formData.country_code}
              onChange={handleChange}
              required crossOrigin={undefined}            />
            <Input
              label="Phone"
              name="Phone"
              value={formData.Phone}
              onChange={handleChange}
              required crossOrigin={undefined}            />
            <Input
              label="Email"
              type="email"
              name="Email"
              value={formData.Email}
              onChange={handleChange}
              required crossOrigin={undefined}            />
            <Input
              label="Created By"
              name="CreatedBy"
              value={formData.CreatedBy}
              onChange={handleChange} crossOrigin={undefined}            />
            {/* <Input
              label="Modified By"
              name="ModifiedBy"
              value={formData.ModifiedBy}
              onChange={handleChange}
            />
            <Input
              label="Delete Flag"
              type="number"
              name="DelFlag"
              value={formData.DelFlag.toString()}
              onChange={handleChange}
            /> */}

            <div className="col-span-1 md:col-span-2 flex justify-end">
              <Button type="submit" color="blue">
                Submit
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}
