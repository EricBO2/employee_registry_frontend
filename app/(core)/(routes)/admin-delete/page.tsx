'use client'

import { Employee } from "@/app/_types/employee"

const columns = [
  { key: "id", label: "ID" },
  { key: "firstName", label: "Förnamn" },
  { key: "lastName", label: "Efternamn" },
  { key: "email", label: "Email" },
  { key: "roles", label: "Roll" },
  { key: "isAccountNonExistent",
	 label: "NonExistent"
  { key: "isAccountNonLocked", label: "NonLocked" },
  { key: "isCredentialsNonExpired", label: "NonExpired" },
  { key: "isEnabled", label: "Enabled" },
] as const;

export default function Page() {
	const listOfEmplyee: Employee[] = [
		{id:1,firstName:"Martin",lastName:"Eriksson",email:"bannas.com"
			,isAccountNonExistent:"true"
			,isAccountNonLocked:"true"
			,isCredentialsNonExpired:"true",
			isEnabled:"false",
			roles:"ADMIN"
		},
		{id:2,firstName:"Eric",lastName:"Carlsson",email:"pinapel.com"
			,isAccountNonExistent:"true"
			,isAccountNonLocked:"false"
			,isCredentialsNonExpired:"true",
			isEnabled:"true",
			roles:"USER"
		},
		{id:3,firstName:"Martin",lastName:"Eriksson",email:"bannas.com"
			,isAccountNonExistent:"true"
			,isAccountNonLocked:"true"
			,isCredentialsNonExpired:"true",
			isEnabled:"false",
			roles:"ADMIN"
		}
	];

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
            {listOfEmplyee.map((emp, rowIndex) => (
              <tr
                key={emp.id}
            	className={`border-b  hover:bg-blue-50 border-gray-600  dark:hover:bg-blue-900 ${
              	rowIndex % 2 === 0 ? "bg-white dark:bg-gray-800" : "bg-gray-50 dark:bg-gray-700"
			  	}`}
              >
                {columns.map(col => (
                  <td key={col.key} className="px-4 py-2 border-r border-gray-600">
                    {emp[col.key]}
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
