import { useState, ChangeEvent, FormEvent } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";
import { CreateAxiosDefaults } from "useipa";
import Env from "@/config/env";

interface CustomerForm {
  Name: string;
  // FKCmpID: number | string;
  country_code: string;
  Phone: string;
  Email: string;
  Address:string;
      VatNo:string
  // CreatedBy: number | string;
  // ModifiedBy: number | string;
  // DelFlag: number;
}


export default function AddCustomerPage() {


  const [formData, setFormData] = useState<CustomerForm>({
    Name: "",
    // FKCmpID: "",
    country_code: "",
    Phone: "",
    Email: "",
    	Address:"",
      VatNo:""

    // CreatedBy: "",
    // ModifiedBy: "",
    // DelFlag: 0,
  });
const client: CreateAxiosDefaults= {
    baseURL: Env.VITE_BASE_URL,
    withCredentials: true,
  }
  
  const handleChange = (
    e: ChangeEvent<HTMLInputElement>
  ): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "DelFlag" ? parseInt(value) : value,
    }));
  };

  const handleSubmit = async(e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
      try {
        const Req=await fetch(`${client?.baseURL}/customer/register`,{
          method:'post',
          headers: {
    'Content-Type': 'application/json' // 👈 Needed for JSON body
  },
          body:JSON.stringify(formData),
          credentials:'include'
        })
        const res=await Req.json()
        console.log(res);
        window.location.reload()

      } catch (error) {
        throw new Error()
      }
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
            {/* <Input
              label="Company ID"
              name="FKCmpID"
              value={formData.FKCmpID}
              onChange={handleChange}
              required crossOrigin={undefined}            /> */}
            <Input
              label="Country Code Eg: 968"
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
              label="Value added tax No"
              name="VatNo"
              value={formData.VatNo}
              onChange={handleChange}
              required crossOrigin={undefined}            />
            
<div>
  <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-white">
    Address
  </label>
  <textarea
    name="Address"
    value={formData.Address}
    onChange={(e) =>
      setFormData((prev) => ({ ...prev, Address: e.target.value }))
    }
    required
    rows={4}
    className="w-full rounded-md border border-gray-300 dark:border-gray-600 p-2 dark:bg-dark-primary-bg dark:text-white"
  />
</div>

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
