export interface Customer {
  _id: string;
  name: string;
  email: string;
  password: string;
}

export interface SignUpDTO {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  message: string;
  accessToken: string;
}

export interface LoginDTO {
  email: string;
  password: string;
}
