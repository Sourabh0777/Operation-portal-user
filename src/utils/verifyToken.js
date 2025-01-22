/* eslint-disable prettier/prettier */
import { jwtDecode } from 'jwt-decode'

export const verifyToken = (token) => {
  return jwtDecode(token)
}
