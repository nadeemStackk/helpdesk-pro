import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ArrowRight } from 'lucide-react';
import Logo from './Logo';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  const scrollToSection = (id) => {
    closeMenu();

    const element = document.getElementById(id);

    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <header className="landing-navbar">
      <div className="landing-container navbar-inner">
        <Link to="/" className="landing-logo-link" onClick={closeMenu}>
          <Logo size="medium" />
        </Link>

        <nav className={`landing-nav ${isOpen ? 'open' : ''}`}>
          <button
            type="button"
            onClick={() => scrollToSection('features')}
          >
            Features
          </button>

          <button
            type="button"
            onClick={() => scrollToSection('how-it-works')}
          >
            How it works
          </button>

          <button
            type="button"
            onClick={() => scrollToSection('product')}
          >
            Product
          </button>

          <button
            type="button"
            onClick={() => scrollToSection('contact')}
          >
            Contact
          </button>

          <div className="mobile-nav-actions">
            <Link to="/login" onClick={closeMenu}>
              Sign in
            </Link>

            <Link
              to="/signup"
              className="landing-nav-cta"
              onClick={closeMenu}
            >
              Get started
              <ArrowRight size={16} />
            </Link>
          </div>
        </nav>

        <div className="navbar-actions">
          <Link to="/login" className="navbar-signin">
            Sign in
          </Link>

          <Link to="/signup" className="navbar-cta">
            Get started
            <ArrowRight size={16} />
          </Link>
        </div>

        <button
          type="button"
          className="mobile-menu-btn"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </header>
  );
};

export default Navbar;