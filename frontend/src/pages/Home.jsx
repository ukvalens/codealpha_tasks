import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const features = [
  { icon: '🪑', title: 'Table Management', desc: 'Track table availability, capacity and status in real time.' },
  { icon: '🍽️', title: 'Menu Management', desc: 'Manage categories, items, prices and availability with ease.' },
  { icon: '📋', title: 'Order Tracking', desc: 'Create and track orders from pending to served, live.' },
  { icon: '📅', title: 'Reservations', desc: 'Accept and manage customer reservations seamlessly.' },
  { icon: '💳', title: 'Payments', desc: 'Process cash, card or online payments and track revenue.' },
  { icon: '👥', title: 'Role-Based Access', desc: 'Admin, Manager, Waiter and Chef roles with proper permissions.' },
];

const stats = [
  { value: '100%', label: 'Uptime' },
  { value: '6+', label: 'Modules' },
  { value: '4', label: 'User Roles' },
  { value: '24/7', label: 'Support' },
];

const Home = () => {
  const { token } = useAuth();

  return (
    <div className="home">
      {/* Navbar */}
      <nav className="home-nav">
        <div className="home-nav-brand">🍴 RestaurantMS</div>
        <div className="home-nav-links">
          <a href="#features">Features</a>
          <a href="#about">About</a>
          {token ? (
            <Link to="/app/dashboard" className="home-nav-btn">Go to Dashboard</Link>
          ) : (
            <>
              <Link to="/login" className="home-nav-btn-outline">Sign In</Link>
              <Link to="/register" className="home-nav-btn">Get Started</Link>
            </>
          )}
        </div>
      </nav>

      {/* Hero */}
      <section className="hero">
        <div className="hero-content">
          <span className="hero-badge">🚀 Restaurant Management Made Simple</span>
          <h1>Run Your Restaurant<br /><span className="hero-highlight">Smarter & Faster</span></h1>
          <p>A complete management system for tables, orders, reservations, menu and payments — all in one place.</p>
          <div className="hero-actions">
            {token ? (
              <Link to="/app/dashboard" className="hero-btn-primary">Go to Dashboard →</Link>
            ) : (
              <>
                <Link to="/register" className="hero-btn-primary">Get Started Free →</Link>
                <Link to="/login" className="hero-btn-secondary">Sign In</Link>
              </>
            )}
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-card-float card-1">
            <span>📋</span>
            <div>
              <p className="hc-label">Active Orders</p>
              <p className="hc-value">24</p>
            </div>
          </div>
          <div className="hero-card-float card-2">
            <span>🪑</span>
            <div>
              <p className="hc-label">Tables Available</p>
              <p className="hc-value">8 / 12</p>
            </div>
          </div>
          <div className="hero-card-float card-3">
            <span>💰</span>
            <div>
              <p className="hc-label">Today's Revenue</p>
              <p className="hc-value">$1,240</p>
            </div>
          </div>
          <div className="hero-mockup">
            <div className="mockup-bar">
              <span /><span /><span />
            </div>
            <div className="mockup-body">
              <div className="mockup-sidebar" />
              <div className="mockup-content">
                <div className="mockup-row" />
                <div className="mockup-row short" />
                <div className="mockup-grid">
                  <div className="mockup-block" />
                  <div className="mockup-block" />
                  <div className="mockup-block" />
                  <div className="mockup-block" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="home-stats">
        {stats.map((s, i) => (
          <div key={i} className="home-stat">
            <h2>{s.value}</h2>
            <p>{s.label}</p>
          </div>
        ))}
      </section>

      {/* Features */}
      <section className="home-features" id="features">
        <div className="section-header">
          <h2>Everything You Need</h2>
          <p>Powerful modules designed for modern restaurants</p>
        </div>
        <div className="features-grid">
          {features.map((f, i) => (
            <div key={i} className="feature-card">
              <div className="feature-icon">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* About */}
      <section className="home-about" id="about">
        <div className="about-content">
          <h2>Built for Restaurant Teams</h2>
          <p>RestaurantMS gives your entire team — from admins to waiters — the tools they need to deliver exceptional dining experiences. Role-based access ensures everyone sees exactly what they need.</p>
          <div className="about-roles">
            {[
              { role: 'Admin', desc: 'Full access to all modules', icon: '👑' },
              { role: 'Manager', desc: 'Manage staff, menu & payments', icon: '🧑‍💼' },
              { role: 'Waiter', desc: 'Handle orders & reservations', icon: '🧑‍🍳' },
              { role: 'Chef', desc: 'View orders & menu items', icon: '👨‍🍳' },
            ].map((r, i) => (
              <div key={i} className="role-card">
                <span>{r.icon}</span>
                <strong>{r.role}</strong>
                <p>{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="home-cta">
        <h2>Ready to streamline your restaurant?</h2>
        <p>Join now and manage everything from one dashboard.</p>
        {token ? (
          <Link to="/app/dashboard" className="hero-btn-primary">Open Dashboard →</Link>
        ) : (
          <Link to="/register" className="hero-btn-primary">Create Free Account →</Link>
        )}
      </section>

      {/* Footer */}
      <footer className="home-footer">
        <p>🍴 RestaurantMS &copy; {new Date().getFullYear()} — Built with React & Node.js</p>
      </footer>
    </div>
  );
};

export default Home;
