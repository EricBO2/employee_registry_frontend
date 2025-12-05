'use client'
import { useState } from "react";

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isAccountNonExistent: boolean;
  isAccountNonLocked: boolean;
  isCredentialsNonExpired: boolean;
  isEnabled: boolean;
  roles: string[];
};

export default function RegisterPage() {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    isAccountNonExistent: true,
    isAccountNonLocked: true,
    isCredentialsNonExpired: true,
    isEnabled: true,
    roles: ["EMPLOYEE"],
  });

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else if (name === "roles") {
      setFormData(prev => ({
        ...prev,
        roles: value.split(",").map(r => r.trim()),
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    try {
      const res = await fetch("http://localhost:8080/api/admin/register", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        let msg = `Registration failed: ${res.status}`;
        try {
          const data = await res.json();
          if (data?.message) msg = data.message;
        } catch {}
        throw new Error(msg);
      }

      setSuccess(true);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        isAccountNonExistent: true,
        isAccountNonLocked: true,
        isCredentialsNonExpired: true,
        isEnabled: true,
        roles: ["EMPLOYEE"],
      });
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError("An unknown error occurred.");
      console.error(err);
    }
  };

  const textFields = [
    { label: "First Name", name: "firstName", type: "text", required: true },
    { label: "Last Name", name: "lastName", type: "text", required: true },
    { label: "Email", name: "email", type: "email", required: true },
    { label: "Password", name: "password", type: "password", required: true },
  ] as const;

  const checkboxFields = [
    { label: "Account does not exist", name: "isAccountNonExistent" },
    { label: "Account is locked", name: "isAccountNonLocked" },
    { label: "Credentials are valid", name: "isCredentialsNonExpired" },
    { label: "Account is enabled", name: "isEnabled" },
  ] as const;

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900 text-gray-900 dark:text-white font-sans p-6">
      <div className="w-full max-w-lg bg-gray-100 dark:bg-gray-800 p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Register New User</h1>

        {success && <p className="mb-4 text-green-500">User successfully registered!</p>}
        {error && <p className="mb-4 text-red-500">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {textFields.map(field => (
            <div key={field.name}>
              <label className="block mb-1">{field.label}</label>
              <input
                type={field.type}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                required={field.required}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ))}

          {checkboxFields.map(field => (
            <div key={field.name} className="flex items-center">
              <input
                type="checkbox"
                name={field.name}
                checked={formData[field.name]}
                onChange={handleChange}
                className="mr-2 w-4 h-4 text-blue-600 bg-gray-200 border-gray-300 rounded focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
              />
              <label>{field.label}</label>
            </div>
          ))}

          <div>
            <label className="block mb-1">Roles (comma-separated)</label>
            <input
              type="text"
              name="roles"
              value={formData.roles.join(",")}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
