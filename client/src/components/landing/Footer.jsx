import { Link } from 'react-router-dom';
import Logo from './Logo';

const Footer = () => {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);

    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <footer id="contact" className="landing-footer">
      <div className="landing-container">
        <div className="footer-main">
          <div className="footer-brand">
            <Link to="/">
              <Logo size="medium" />
            </Link>

            <p>
              A simple, modern helpdesk for teams that want to deliver better
              customer support.
            </p>
          </div>

          <div className="footer-links">
            <div className="footer-column">
              <h4>Product</h4>

              <button
                type="button"
                onClick={() => scrollToSection('features')}
              >
                Features
              </button>

              <button
                type="button"
                onClick={() => scrollToSection('product')}
              >
                Product
              </button>

              <button
                type="button"
                onClick={() => scrollToSection('how-it-works')}
              >
                How it works
              </button>
            </div>

            <div className="footer-column">
              <h4>Account</h4>

              <Link to="/login">
                Sign in
              </Link>

              <Link to="/signup">
                Get started
              </Link>
            </div>

            <div className="footer-column">
              <h4>Support</h4>

              <button
                type="button"
                onClick={() => scrollToSection('contact')}
              >
                Contact
              </button>

              <Link to="/dashboard">
                Dashboard
              </Link>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} Helpdesk Pro. All rights reserved.
          </span>

          <span>
            Built for better support.
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;