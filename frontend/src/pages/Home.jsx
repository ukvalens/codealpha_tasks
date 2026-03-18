import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const features = [
  { icon: '🪑', title: 'Table Management', desc: 'Track table availability and status in real time.' },
  { icon: '📋', title: 'Order Tracking', desc: 'Create and track orders from pending to served.' },
  { icon: '💳', title: 'Payments', desc: 'Process cash, card or online payments instantly.' },
];

const Home = () => {
  const { token } = useAuth();

  return (
    <div className="home">

      {/* Navbar */}
      <nav className="home-nav">
        <div className="home-nav-brand">🍴 RestaurantMS</div>
        <div className="home-nav-links">
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
          <p>A complete system for tables, orders, and payments — all in one place.</p>
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
      </section>

      {/* 3 Features */}
      <section className="home-features">
        <div className="section-header">
          <h2>Key Features</h2>
          <p>Everything your restaurant needs</p>
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

      {/* Footer */}
      <footer className="home-footer">
        <div className="footer-inner">
          <p className="footer-brand">🍴 RestaurantMS</p>
          <p className="footer-links">
            <Link to="/login">Sign In</Link>
            <Link to="/register">Register</Link>
          </p>
          <p className="footer-copy">© {new Date().getFullYear()} RestaurantMS — Built with React & Node.js</p>
        </div>
      </footer>

    </div>
  );
};

export default Home;
