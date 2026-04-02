export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  phone: string;
  address: string;
  avatar?: string;
  status: 'Active' | 'Inactive';
  joinedDate: string;
}

export interface Admin {
  id: number;
  name: string;
  email: string;
  role: 'AdminX' | 'Admin' | 'Moderator';
  status: 'Active' | 'Inactive';
  createdAt: string;
}
