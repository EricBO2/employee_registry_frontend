import { UUID } from "crypto"

export interface Employee {
  id: UUID
  firstName: string
  lastName: string
  email: string
  accountNonExistent: boolean
  accountNonLocked: boolean
  credentialsNonExpired: boolean
  enabled: boolean
  roles: string[]
}
