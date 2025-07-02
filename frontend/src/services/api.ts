const API_URL = 'http://localhost:5000';

interface ApiResponse<T> {
  data?: T;
  error?: string;
}

export const api = {
  async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const token = localStorage.getItem('token');
      const headers = {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers,
      };

      const response = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      return { data };
    } catch (error) {
      return { error: error instanceof Error ? error.message : 'Something went wrong' };
    }
  },

  // Auth endpoints
  async login(email: string, password: string) {
    return this.request('/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  },

  async register(name: string, email: string, password: string) {
    return this.request('/users/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    });
  },

  // Recipe endpoints
  async getRecipes() {
    return this.request('/recipes');
  },

  async getMyRecipes() {
    return this.request('/recipes/my');
  },

  async createRecipe(recipe: any) {
    return this.request('/recipes', {
      method: 'POST',
      body: JSON.stringify(recipe),
    });
  },

  // User endpoints
  async getProfile() {
    return this.request('/users/profile');
  },
}; 