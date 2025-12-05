import { Employee } from "@/app/_types/employee"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  try {
    const newEmployee: Employee = {
        id: 0,
        firstName: "hej",
        lastName: "hej",
        email: "hej",
        accountNonExistent: true,
        accountNonLocked: true,
        credentialsNonExpired: true,
        enabled: true,
        roles: ["hej"]
    }

    return NextResponse.json(newEmployee)
  } catch (error) {
    return NextResponse.error()
  }
}