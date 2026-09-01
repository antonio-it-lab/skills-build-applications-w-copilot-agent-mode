export function getApiBaseUrl() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME

  if (codespaceName && typeof codespaceName === 'string' && codespaceName.trim()) {
    return `https://${codespaceName.trim()}-8000.app.github.dev`
  }

  return 'http://localhost:8000'
}

export function getApiUrl(path) {
  return `${getApiBaseUrl()}${path}`
}

export async function fetchJson(path) {
  const response = await fetch(getApiUrl(path))

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`)
  }

  const payload = await response.json()

  if (Array.isArray(payload)) {
    return payload
  }

  if (Array.isArray(payload?.results)) {
    return payload.results
  }

  if (Array.isArray(payload?.data)) {
    return payload.data
  }

  if (Array.isArray(payload?.items)) {
    return payload.items
  }

  if (Array.isArray(payload?.docs)) {
    return payload.docs
  }

  return []
}
