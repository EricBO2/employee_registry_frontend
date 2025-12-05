'use client'
import { Employee } from "@/app/_types/employee"
import { apiFetch } from "@/app/_utility/api"
import { useEffect, useState } from "react";

type Column<T> = {
  key: keyof T;           
  label: string;
  render?: (row: T) => React.ReactNode;
};


export default function Page() {
  const [listOfEmployee, setlistOfEmployee] = useState<Employee[]>([]);
    const [id, setid] = useState("")
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState<boolean>(false)

  const load = async () => {
	  console.log("Load function running...");
	  const data = await apiFetch<Employee[]>("http://localhost:8080/api/get-all",{
    method: "GET",
    credentials: "include"
})
	  if (!data) return
	  setlistOfEmployee(data)
  }

  const columns: Column<Employee>[] = [
  { key: "id", label: "ID" },
  { key: "firstName", label: "First name" },
  { key: "lastName", label: "Last name" },
  { key: "email", label: "Email" },
  { key: "roles", label: "Roll" },
  { key: "accountNonExistent", label: "NonExistent" },
  { key: "accountNonLocked", label: "NonLocked" },
  { key: "credentialsNonExpired", label: "NonExpired" },
  { key: "enabled", label: "Enabled" },
  {
    key: "action" as keyof Employee,
    label: "Actions",
    render: (row) => (
      <button
        className="bg-red-500 text-white px-2 py-1 rounded"
        onClick={() => del(row.id)}
      >
        Delete
      </button>
    ),
  },
];

   const del = async (id: string) => {
    setError(null)
    setSuccess(false)
    
    try {
      // TODO - Change to apiFetch() utility
      console.log("Deleting id:", id);
      const res = await fetch(`http://localhost:8080/api/admin/delete/${id}`, {
        method: "DELETE",
        credentials: "include", // Include Cookies
      })
      
      if (!res.ok) {
        const errorBody = await res.text() // try to read message
        setError(errorBody || "Login failed.")
        return
      }
      
      setSuccess(true)
    } catch (err) {
      setError("Network error: backend unreachable")
    }
  }
  useEffect(() => {
	  load(); 

  }, []);
  
  useEffect(() => {
  console.log("Updated listOfEmployee:", listOfEmployee);
}, [listOfEmployee]);
	return (
	
			<div className="p-4">
	  <div className="overflow-x-auto rounded-lg border border-gray-600 shadow">
		<table className="min-w-full border border-gray-600 bg-(--bg) text-(--text)">
			<thead className="border-b border-gray-600 bg-(--bg-alt)">
			<tr>
			  {columns.map(col => (
				<th
				  key={col.key}
				  className="px-4 py-2 text-left font-semibold border-r border-gray-600"
				>
				  {col.label}
				</th>
			  ))}
			</tr>
		  </thead>
		  
		  <tbody>
			{listOfEmployee.map((emp, rowIndex) => (
			  <tr
				key={emp.id}
				className={`border-b  hover:bg-blue-50 border-gray-600  dark:hover:bg-blue-900 ${
				rowIndex % 2 === 0 ? "bg-white dark:bg-gray-800" : "bg-gray-50 dark:bg-gray-700"
				}`}
			  >
				{columns.map(col => (
				  <td key={col.key} className="px-4 py-2 border-r border-gray-600">
            
					{col.render
            ? col.render(emp)
            : typeof emp[col.key as keyof Employee] === "boolean"? emp[col.key as keyof Employee]? "✔️": "❌"
            : Array.isArray(emp[col.key as keyof Employee])? (emp[col.key as keyof Employee] as string[]).join(", ")
            : typeof emp[col.key as keyof Employee] === "string"? emp[col.key as keyof Employee]
            : typeof emp[col.key as keyof Employee] === "number"? emp[col.key as keyof Employee]
            : null
          }
				  </td>
				))}
			  </tr>
			))}
		  </tbody>
		</table>
	  </div>
	</div>
	);
}
