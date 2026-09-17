// Central API abstraction. No component should call fetch directly.
// The real backend base URL comes from VITE_API_URL (e.g. http://localhost:5000/api).

const BASE_URL = import.meta.env.VITE_API_URL || "";

async function request(method, path, body, options = {}) {
  if (!BASE_URL) {
    // Backend is not connected yet in this phase.
    throw new Error("API_NOT_CONFIGURED");
  }
  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    body: body ? JSON.stringify(body) : undefined,
    credentials: "include",
  });
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  return res.status === 204 ? null : res.json();
}

export const api = {
  get: (path, options) => request("GET", path, undefined, options),
  post: (path, body, options) => request("POST", path, body, options),
  put: (path, body, options) => request("PUT", path, body, options),
  delete: (path, options) => request("DELETE", path, undefined, options),
  isConfigured: () => Boolean(BASE_URL),
};

export default api;
