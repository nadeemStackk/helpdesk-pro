import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';

const Hero = () => {
  return (
    <section className="landing-hero">
      <div className="landing-container hero-grid">
        <div className="hero-content">
          <div className="hero-badge">
            <Sparkles size={15} />
            <span>Modern support, made simple</span>
          </div>

          <h1>
            Support your customers.
            <span> Delight your team.</span>
          </h1>

          <p className="hero-description">
            Helpdesk Pro brings tickets, customer conversations, and support
            workflows together in one simple, powerful workspace.
          </p>

          <div className="hero-actions">
            <Link to="/signup" className="hero-primary-btn">
              Get started
              <ArrowRight size={18} />
            </Link>

            <Link to="/login" className="hero-secondary-btn">
              Sign in
            </Link>
          </div>

          <div className="hero-trust">
            <div className="hero-trust-item">
              <CheckCircle2 size={17} />
              <span>Simple ticket management</span>
            </div>

            <div className="hero-trust-item">
              <CheckCircle2 size={17} />
              <span>Built for growing teams</span>
            </div>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-glow hero-glow-one" />
          <div className="hero-glow hero-glow-two" />

          <div className="dashboard-window">
            <div className="dashboard-topbar">
              <div className="dashboard-dots">
                <span />
                <span />
                <span />
              </div>

              <div className="dashboard-title">
                Helpdesk Pro
              </div>
            </div>

            <div className="dashboard-body">
              <aside className="dashboard-sidebar">
                <div className="sidebar-logo">
                  <div className="sidebar-logo-icon">H</div>
                  <span>Helpdesk</span>
                </div>

                <div className="sidebar-menu">
                  <div className="sidebar-item active">
                    <span className="sidebar-icon">▦</span>
                    Dashboard
                  </div>

                  <div className="sidebar-item">
                    <span className="sidebar-icon">✓</span>
                    My Tickets
                  </div>

                  <div className="sidebar-item">
                    <span className="sidebar-icon">◷</span>
                    Recent
                  </div>
                </div>
              </aside>

              <div className="dashboard-main">
                <div className="dashboard-heading">
                  <div>
                    <span className="dashboard-eyebrow">
                      Support overview
                    </span>

                    <h3>Good morning 👋</h3>
                  </div>

                  <div className="dashboard-avatar">
                    A
                  </div>
                </div>

                <div className="dashboard-stats">
                  <div className="stat-card">
                    <span>Open tickets</span>
                    <strong>24</strong>
                    <small>+8% this week</small>
                  </div>

                  <div className="stat-card">
                    <span>Resolved</span>
                    <strong>186</strong>
                    <small>+14% this week</small>
                  </div>

                  <div className="stat-card">
                    <span>Response time</span>
                    <strong>18m</strong>
                    <small>12% faster</small>
                  </div>
                </div>

                <div className="ticket-panel">
                  <div className="ticket-panel-header">
                    <div>
                      <span className="dashboard-eyebrow">
                        Recent tickets
                      </span>
                      <h4>Customer requests</h4>
                    </div>

                    <span className="view-all">View all</span>
                  </div>

                  <div className="ticket-row">
                    <div className="ticket-avatar">J</div>

                    <div className="ticket-info">
                      <strong>Unable to access my account</strong>
                      <span>John Smith · 8 min ago</span>
                    </div>

                    <span className="ticket-status open">
                      Open
                    </span>
                  </div>

                  <div className="ticket-row">
                    <div className="ticket-avatar">S</div>

                    <div className="ticket-info">
                      <strong>Payment confirmation needed</strong>
                      <span>Sarah Miller · 21 min ago</span>
                    </div>

                    <span className="ticket-status pending">
                      Pending
                    </span>
                  </div>

                  <div className="ticket-row">
                    <div className="ticket-avatar">M</div>

                    <div className="ticket-info">
                      <strong>Feature request</strong>
                      <span>Mike Johnson · 43 min ago</span>
                    </div>

                    <span className="ticket-status resolved">
                      Resolved
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="floating-card floating-card-one">
            <CheckCircle2 size={19} />
            <div>
              <strong>Ticket resolved</strong>
              <span>Just now</span>
            </div>
          </div>

          <div className="floating-card floating-card-two">
            <div className="floating-ticket-icon">+</div>
            <div>
              <strong>New ticket</strong>
              <span>Customer request</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;