import { useState, ChangeEvent, FormEvent } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Input,
  Button,
  Typography,
  Textarea,
} from "@material-tailwind/react";
import { CreateAxiosDefaults } from "useipa";
import Env from "@/config/env";

interface EmployeeForm {
  FirstName: string;
  LastName: string;
  CountryCode: string;
  Phone: string;
  Email: string;
  Address: string;
  job: string;
}

export default function Employee() {
  const [formData, setFormData] = useState<EmployeeForm>({
    FirstName: "",
    LastName: "",
    CountryCode: "",
    Phone: "",
    Email: "",
    Address: "",
    job: "",
  });
  const client: CreateAxiosDefaults= {
        baseURL: Env.VITE_BASE_URL,
        withCredentials: true,
      }

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

    const handleSubmit = async(e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
      try {
        const Req=await fetch(`${client?.baseURL}/staff/register`,{
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

  // const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
  //   e.preventDefault();
  //   console.log("Employee Submitted:", formData);
  //   // Send to backend API
  // };

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
            Add New Employee
          </Typography>
        </CardHeader>

        <CardBody>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <Input
              label="First Name"
              name="FirstName"
              value={formData.FirstName}
              onChange={handleChange}
              required
              crossOrigin={undefined}
            />
            <Input
              label="Last Name"
              name="LastName"
              value={formData.LastName}
              onChange={handleChange}
              required
              crossOrigin={undefined}
            />
            <Input
              label="Country Code"
              name="CountryCode"
              value={formData.CountryCode}
              onChange={handleChange}
              required
              crossOrigin={undefined}
            />
            <Input
              label="Phone"
              name="Phone"
              value={formData.Phone}
              onChange={handleChange}
              required
              crossOrigin={undefined}
            />
            <Input
              label="Email"
              type="email"
              name="Email"
              value={formData.Email}
              onChange={handleChange}
              required
              crossOrigin={undefined}
            />
            <Input
              label="Job Position"
              type="text"
              name="job"
              value={formData.job}
              onChange={handleChange}
              required
              crossOrigin={undefined}
            />
            <Textarea
              label="Address"
              name="Address"
              value={formData.Address}
              onChange={handleChange}
              required
              className="col-span-1 md:col-span-2"
            />

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
