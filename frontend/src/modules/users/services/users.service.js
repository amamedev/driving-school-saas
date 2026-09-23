import { API_URL } from "@/services/api";

const usersService = {
  getUsers: async (token) => {
    const response = await fetch(`${API_URL}/users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();

    if (!response.ok) {
      const error = new Error(data.message);
      error.status = response.status;
      throw error;
    }

    return data;
  },
};

export default usersService;
