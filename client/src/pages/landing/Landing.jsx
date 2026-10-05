import './Landing.css';
import Navbar from '../../components/landing/Navbar';
import Hero from '../../components/landing/Hero';
import ProductPreview from '../../components/landing/ProductPreview';
import Features from '../../components/landing/Features';
import HowItWorks from '../../components/landing/HowItWorks';
import CTA from '../../components/landing/CTA';
import Footer from '../../components/landing/Footer';

const Landing = () => {
  return (
    <div className="landing-page">
      <Navbar />
      <main>
        <Hero />
        <ProductPreview />
        <Features />
        <HowItWorks />
        <CTA />
      </main>
      <Footer />
    </div>
  );
};

export default Landing;