import { fetchWithCsrf } from './csrf';

export async function handleSignout(setUser) {
  try {
    // Clear cache before signing out
    clearAuthCache();

    const res = await fetchWithCsrf('/api/session/signout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    await res.json();
    // Force refresh to get updated state from server
    await checkUser(setUser, true);
  } catch (err) {
    console.error(err);
  }
}

export async function handleSignup(info, phone) {
  const { email, firstName, lastName, password, organization } = info;
  try {
    const res = await fetchWithCsrf('/api/session/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName,
        organization: organization,
        phone: phone,
      }),
    });
    const data = await res.json();

    return data;
  } catch (err) {
    console.error(err);
  }
}

export async function handleLogin(setUser, info) {
  const { email, password } = info;
  try {
    const res = await fetchWithCsrf('/api/session/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      // Clear old cache and force refresh on successful login
      clearAuthCache();
      await checkUser(setUser, true);
    } else {
      return data;
    }
  } catch (err) {
    console.error(err);
  }
}

// Cache configuration
const AUTH_CACHE_KEY = 'recro_auth_cache';
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes in milliseconds

// Get cached auth state if still valid
function getCachedAuth() {
  if (typeof window === 'undefined') return null;

  try {
    const cached = sessionStorage.getItem(AUTH_CACHE_KEY);
    if (!cached) return null;

    const { user, timestamp } = JSON.parse(cached);
    const isExpired = Date.now() - timestamp > CACHE_TTL;

    if (isExpired) {
      sessionStorage.removeItem(AUTH_CACHE_KEY);
      return null;
    }

    return user;
  } catch {
    return null;
  }
}

// Save auth state to cache
function setCachedAuth(user) {
  if (typeof window === 'undefined') return;

  try {
    sessionStorage.setItem(AUTH_CACHE_KEY, JSON.stringify({ user, timestamp: Date.now() }));
  } catch {
    // Ignore storage errors (private browsing, quota exceeded, etc.)
  }
}

// Clear auth cache (used on login/logout)
export function clearAuthCache() {
  if (typeof window === 'undefined') return;
  try {
    sessionStorage.removeItem(AUTH_CACHE_KEY);
  } catch {
    // Ignore
  }
}

export async function checkUser(setUser, forceRefresh = false) {
  // Try cache first unless force refresh is requested
  if (!forceRefresh) {
    const cachedUser = getCachedAuth();
    if (cachedUser !== null) {
      setUser(cachedUser);
      return;
    }
  }

  // Cache miss or force refresh - fetch from API
  try {
    const res = await fetch('/api/session/user', {
      method: 'GET',
      credentials: 'include',
    });

    if (!res.ok) {
      setUser(null);
      setCachedAuth(null);
      return;
    }

    const data = await res.json();
    const user = data.user || null;
    setUser(user);
    setCachedAuth(user);
  } catch {
    setUser(null);
    setCachedAuth(null);
  }
}

export async function handleDownload(pdfUrl, type) {
  try {
    const res = await fetchWithCsrf('/api/download', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        pdfUrl: pdfUrl,
        type: type,
      }),
    });
    const data = await res.json();

    return data;
  } catch (err) {
    console.error(err);
  }
}
