const API_URL = "https://euphoria-ooqv.onrender.com/api";

export const fetchWebsite = async () => {
  const res = await fetch(`${API_URL}/website`);

  if (!res.ok) {
    throw new Error("Failed to fetch website data");
  }

  return res.json();
};
