const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1';

export interface HealthResponse {
  status: string;
  platform: string;
  version: string;
  timestamp: string;
}

export interface ComponentStatus {
  status: 'ready' | 'unavailable' | 'degraded';
  message?: string;
}

export interface ReadinessResponse {
  status: 'ready' | 'not_ready';
  timestamp: string;
  components: {
    database: ComponentStatus;
    service_registry: ComponentStatus;
    [key: string]: ComponentStatus;
  };
}

export interface RegisteredService {
  service_id: string;
  name: string;
  module_type: string;
  status: 'operational' | 'degraded' | 'planned' | 'offline';
  version: string;
  is_active: boolean;
  details?: {
    phase?: string;
    registered_at?: string;
    [key: string]: any;
  };
}

export interface ServicesResponse {
  total: number;
  services: RegisteredService[];
}

export const apiService = {
  async getHealth(): Promise<HealthResponse> {
    const res = await fetch(`${API_BASE_URL}/health`);
    if (!res.ok) {
      throw new Error(`Health check failed with status: ${res.status}`);
    }
    return res.json();
  },

  async getReadiness(): Promise<ReadinessResponse> {
    const res = await fetch(`${API_BASE_URL}/ready`);
    return res.json();
  },

  async getServices(): Promise<ServicesResponse> {
    const res = await fetch(`${API_BASE_URL}/services`);
    if (!res.ok) {
      throw new Error(`Failed to fetch services: ${res.status}`);
    }
    return res.json();
  }
};
