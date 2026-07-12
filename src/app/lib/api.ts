// ---------------------------------------------------------------------------
// API client — all data fetching goes through here.
// Replace BASE_URL with the real backend URL when the API is ready.
// ---------------------------------------------------------------------------

export const BASE_URL = import.meta.env.VITE_API_URL ?? "/api";

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = "ApiError";
  }
}

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json", ...options?.headers },
    ...options,
  });
  if (!res.ok) {
    const text = await res.text().catch(() => res.statusText);
    throw new ApiError(res.status, text);
  }
  return res.json() as Promise<T>;
}

export const api = {
  get: <T>(path: string) => request<T>(path),
  post: <T>(path: string, body: unknown) =>
    request<T>(path, { method: "POST", body: JSON.stringify(body) }),
  put: <T>(path: string, body: unknown) =>
    request<T>(path, { method: "PUT", body: JSON.stringify(body) }),
  delete: <T>(path: string) => request<T>(path, { method: "DELETE" }),
};

// ---------------------------------------------------------------------------
// Typed endpoint definitions — update paths once the backend is ready
// ---------------------------------------------------------------------------

export const endpoints = {
  // Alumni
  alumni: {
    list: (params?: string) => `/alumni${params ? `?${params}` : ""}`,
    detail: (id: string | number) => `/alumni/${id}`,
  },
  // Events
  events: {
    list: () => `/events`,
    past: () => `/events?status=past`,
    detail: (id: string | number) => `/events/${id}`,
    register: (id: string | number) => `/events/${id}/register`,
  },
  // News
  news: {
    list: (params?: string) => `/news${params ? `?${params}` : ""}`,
    detail: (id: string | number) => `/news/${id}`,
  },
  // Jobs
  jobs: {
    list: (params?: string) => `/jobs${params ? `?${params}` : ""}`,
    detail: (id: string | number) => `/jobs/${id}`,
    apply: (id: string | number) => `/jobs/${id}/apply`,
    internships: () => `/jobs?type=internship`,
  },
  // Market
  market: {
    listings: (params?: string) => `/market${params ? `?${params}` : ""}`,
    detail: (id: string | number) => `/market/${id}`,
    featured: () => `/market?featured=true`,
  },
  // Spotlight
  spotlight: {
    list: () => `/spotlight`,
  },
  // Auth
  auth: {
    login: () => `/auth/login`,
    register: () => `/auth/register`,
    me: () => `/auth/me`,
    logout: () => `/auth/logout`,
  },
  // Admin
  admin: {
    stats: () => `/admin/stats`,
    recentAlumni: () => `/admin/alumni/recent`,
    recentJobs: () => `/admin/jobs/recent`,
    events: () => `/admin/events`,
    donations: () => `/admin/donations`,
  },
  // Donations
  donate: () => `/donations`,
};
