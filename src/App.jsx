import { useState, useEffect } from "react";
import "./App.css";
import { fetchUsers, createUser, testHello } from "./api/graphql";

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [helloMessage, setHelloMessage] = useState("");
  const [newUser, setNewUser] = useState({ name: "", email: "" });

  // 加载用户列表
  const loadUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchUsers();
      setUsers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // 测试 Hello 查询
  const loadHello = async () => {
    try {
      const message = await testHello();
      setHelloMessage(message);
    } catch (err) {
      console.error("Hello 查询失败:", err);
    }
  };

  // 创建新用户
  const handleCreateUser = async (e) => {
    e.preventDefault();
    if (!newUser.name || !newUser.email) {
      alert("请填写姓名和邮箱");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      await createUser(newUser.name, newUser.email);
      setNewUser({ name: "", email: "" });
      await loadUsers(); // 重新加载用户列表
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // 组件加载时获取数据
  useEffect(() => {
    loadUsers();
    loadHello();
  }, []);

  return (
    <div className="app">
      <header className="app-header">
        <h1>🚀 YJP Cloudflare 全栈应用</h1>
        <p className="subtitle">前端: Cloudflare Pages | 后端: Cloudflare Workers + GraphQL</p>
        {helloMessage && <p className="hello-message">📡 {helloMessage}</p>}
      </header>

      <main className="app-main">
        {/* 创建用户表单 */}
        <section className="card form-card">
          <h2>➕ 创建新用户</h2>
          <form onSubmit={handleCreateUser}>
            <div className="form-group">
              <input
                type="text"
                placeholder="姓名"
                value={newUser.name}
                onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                disabled={loading}
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                placeholder="邮箱"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                disabled={loading}
              />
            </div>
            <button type="submit" disabled={loading}>
              {loading ? "创建中..." : "创建用户"}
            </button>
          </form>
        </section>

        {/* 错误提示 */}
        {error && (
          <div className="error-message">
            ❌ 错误: {error}
          </div>
        )}

        {/* 用户列表 */}
        <section className="card users-card">
          <div className="card-header">
            <h2>👥 用户列表</h2>
            <button onClick={loadUsers} disabled={loading} className="refresh-btn">
              {loading ? "加载中..." : "🔄 刷新"}
            </button>
          </div>

          {loading && users.length === 0 ? (
            <p className="loading">加载中...</p>
          ) : users.length === 0 ? (
            <p className="empty">暂无用户数据</p>
          ) : (
            <div className="users-grid">
              {users.map((user) => (
                <div key={user.id} className="user-item">
                  <div className="user-avatar">
                    {user.name.charAt(0)}
                  </div>
                  <div className="user-info">
                    <h3>{user.name}</h3>
                    <p className="user-email">{user.email}</p>
                    <p className="user-date">
                      创建于: {new Date(user.createdAt).toLocaleString('zh-CN')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      <footer className="app-footer">
        <p>由 Cloudflare 强力驱动 ⚡</p>
      </footer>
    </div>
  );
}

export default App;
