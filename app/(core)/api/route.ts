import { Employee } from "@/app/_types/employee"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  try {
    const newEmployee: Employee = {
        id: 0,
        firstName: "hej",
        lastName: "hje",
        email: "hej",
        isAccountNonExistent: "hej",
        isAccountNonLocked: "hej",
        isCredentialsNonExpired: "hej",
        isEnabled: "hej",
        roles: "hej"
    }

    return NextResponse.json(newEmployee)
  } catch (error) {
    return NextResponse.error()
  }
}