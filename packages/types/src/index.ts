export interface HealthStatus {
  service: string;
  status: 'ok' | 'degraded';
}
