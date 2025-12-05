'use client'
import { Employee } from "@/app/_types/employee"
import { apiFetch } from "@/app/_utility/api"
import { useEffect, useState } from "react";


const columns = [
  { key: "firstName", label: "First name" },
  { key: "lastName", label: "Last name" },
  { key: "email", label: "Email" },
  { key: "roles", label: "Roll" },
  { key: "accountNonExistent", label: "NonExistent" },
  { key: "accountNonLocked", label: "NonLocked" },
  { key: "credentialsNonExpired", label: "NonExpired" },
  { key: "enabled", label: "Enabled" }
] as const;

export default function Page() {
  const [listOfEmployee, setlistOfEmployee] = useState<Employee[]>([]);
  
  const load = async () => {
    console.log("Load function running...");
    const data = await apiFetch<Employee[]>("http://localhost:8080/api/get-all", {
    method: "GET",
    credentials: "include"
}
      
    )
    if (!data) return
    
    
    setlistOfEmployee(data)
    
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
                    {typeof emp[col.key] === "boolean" ? (emp[col.key] ? "✔️" : "❌") : ""}
                    {Array.isArray(emp[col.key]) ? (emp[col.key] as string[]).join(", ") : ""}
                    {typeof emp[col.key] === "string" ? emp[col.key] : null}
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
