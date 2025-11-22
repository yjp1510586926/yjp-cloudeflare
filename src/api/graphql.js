// GraphQL API 配置
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8787/graphql';

/**
 * 通用 GraphQL 请求函数
 */
async function graphqlRequest(query, variables = {}) {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables
      })
    });

    const result = await response.json();
    
    if (result.errors) {
      throw new Error(result.errors[0].message);
    }
    
    return result.data;
  } catch (error) {
    console.error('GraphQL 请求错误:', error);
    throw error;
  }
}

/**
 * 获取所有用户
 */
export async function fetchUsers() {
  const query = `
    query {
      users {
        id
        name
        email
        createdAt
      }
    }
  `;
  
  const data = await graphqlRequest(query);
  return data.users;
}

/**
 * 获取单个用户
 */
export async function fetchUser(id) {
  const query = `
    query GetUser($id: ID!) {
      user(id: $id) {
        id
        name
        email
        createdAt
      }
    }
  `;
  
  const data = await graphqlRequest(query, { id });
  return data.user;
}

/**
 * 创建新用户
 */
export async function createUser(name, email) {
  const query = `
    mutation CreateUser($name: String!, $email: String!) {
      createUser(name: $name, email: $email) {
        id
        name
        email
        createdAt
      }
    }
  `;
  
  const data = await graphqlRequest(query, { name, email });
  return data.createUser;
}

/**
 * 测试 Hello 查询
 */
export async function testHello() {
  const query = `
    query {
      hello
    }
  `;
  
  const data = await graphqlRequest(query);
  return data.hello;
}
