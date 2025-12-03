export interface Employee {
  id: number
  firstName: string
  lastName: string
  email: string
  accountNonExistent: boolean
  accountNonLocked: boolean
  credentialsNonExpired: boolean
  enabled: boolean
  roles: string[]
}
