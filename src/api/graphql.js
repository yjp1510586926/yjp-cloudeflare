// GraphQL API 配置
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8787/graphql';

async function graphqlRequest(query, variables = {}) {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, variables })
    });
    const result = await response.json();
    if (result.errors) throw new Error(result.errors[0].message);
    return result.data;
  } catch (error) {
    console.error('GraphQL Error:', error);
    throw error;
  }
}

export const fetchUsers = async () => {
  const data = await graphqlRequest(`query { users { id name email createdAt } }`);
  return data.users;
};

export const fetchUser = async (id) => {
  const data = await graphqlRequest(`query GetUser($id: ID!) { user(id: $id) { id name email createdAt } }`, { id });
  return data.user;
};

export const createUser = async (name, email) => {
  const data = await graphqlRequest(
    `mutation CreateUser($name: String!, $email: String!) { createUser(name: $name, email: $email) { id name email createdAt } }`,
    { name, email }
  );
  return data.createUser;
};

export const deleteUser = async (id) => {
  const data = await graphqlRequest(
    `mutation DeleteUser($id: ID!) { deleteUser(id: $id) { id } }`,
    { id }
  );
  return data.deleteUser;
};

export const testHello = async () => {
  const data = await graphqlRequest(`query { hello }`);
  return data.hello;
};
