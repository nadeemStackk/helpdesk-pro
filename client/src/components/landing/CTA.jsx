import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const CTA = () => {
  return (
    <section className="cta-section">
      <div className="landing-container">
        <div className="cta-card">
          <div className="cta-content">
            <span className="cta-eyebrow">
              Ready to simplify support?
            </span>

            <h2>
              Give your team a better way
              <span> to handle support.</span>
            </h2>

            <p>
              Bring customer requests, ticket management, and support
              workflows into one focused workspace.
            </p>

            <div className="cta-actions">
              <Link to="/signup" className="cta-primary-btn">
                Get started
                <ArrowRight size={18} />
              </Link>

              <Link to="/login" className="cta-secondary-btn">
                Sign in
              </Link>
            </div>

            <div className="cta-benefits">
              <span>
                <CheckCircle2 size={16} />
                Simple setup
              </span>

              <span>
                <CheckCircle2 size={16} />
                Easy ticket management
              </span>

              <span>
                <CheckCircle2 size={16} />
                Built for teams
              </span>
            </div>
          </div>

          <div className="cta-decoration" aria-hidden="true">
            <div className="cta-orb cta-orb-one" />
            <div className="cta-orb cta-orb-two" />

            <div className="cta-mini-card">
              <CheckCircle2 size={20} />
              <div>
                <strong>Support simplified</strong>
                <span>Everything in one place</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;