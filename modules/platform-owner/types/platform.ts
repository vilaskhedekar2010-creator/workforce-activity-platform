export interface CreateSuperAdminRequest {
  full_name: string;
  email: string;
  password: string;
  mobile_number?: string;
}

export interface PlatformDashboardData {
  totalUsers: number;
}

export interface PlatformState {
  loading: boolean;
}