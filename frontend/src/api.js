const API_URL = "http://localhost:5000";

// Fetch all recipes
export async function getAllRecipes() {
  const res = await fetch(`${API_URL}/recipes`);
  if (!res.ok) throw new Error("Failed to fetch recipes");
  return res.json();
}

// Add a new recipe
export async function addRecipe(recipe) {
  const token = localStorage.getItem('token');
  const res = await fetch(`${API_URL}/recipes`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(recipe),
  });
  if (!res.ok) throw new Error("Failed to add recipe");
  return res.json();
}

// Delete a recipe by _id
export async function deleteRecipe(id) {
  const token = localStorage.getItem('token');
  const res = await fetch(`${API_URL}/recipes/${id}`, {
    method: 'DELETE',
    headers: { 
      'Authorization': `Bearer ${token}`
    },
  });
  if (!res.ok) throw new Error("Failed to delete recipe");
  return res.json();
}
// User registration
export async function registerUser(userData) {
  const res = await fetch(`${API_URL}/users/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || "Failed to register user");
  }
  return res.json();
}

// User login
export async function loginUser(credentials) {
  const res = await fetch(`${API_URL}/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || "Failed to login");
  }
  return res.json();
}

// Get user profile
export async function getUserProfile(token) {
  const res = await fetch(`${API_URL}/users/profile`, {
    headers: { 
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json' 
    },
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || "Failed to get profile");
  }
  return res.json();
}