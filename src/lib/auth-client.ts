export const isAuthenticated = async (): Promise<boolean> => {
  try {
    const res = await fetch('/api/auth/user');
    return res.ok;
  } catch {
    return false;
  }
};
