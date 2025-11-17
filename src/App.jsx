import { useEffect, useRef, useState } from 'react';
import './styles.css';
import heroVideo from './assets/hero_vid_background.mp4';

const stats = [
  { value: 30, suffix: 'K+', label: 'YouTube Subscribers' },
  { value: 15, suffix: '+', label: 'Happy Customers' },
  { value: 1, prefix: '#', label: 'Creative Team' }
];

const services = [
  {
    icon: '🎙️',
    title: 'Podcast Production',
    description: 'Professional podcast recording, editing, and distribution to reach your audience effectively.'
  },
  {
    icon: '📹',
    title: 'Video Content',
    description: 'High-quality video production for YouTube, social media, and marketing campaigns.'
  },
  {
    icon: '🎨',
    title: 'Brand Strategy',
    description: 'Comprehensive branding and marketing strategies to elevate your digital presence.'
  },
  {
    icon: '📱',
    title: 'Social Media',
    description: 'Engaging social media content and management to grow your online community.'
  }
];

const useCountUp = (value, { prefix = '', suffix = '' } = {}) => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.textContent = `${prefix}0${suffix}`;
    let frameId;
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          const start = performance.now();
          const duration = 1100;

          const tick = now => {
            const progress = Math.min((now - start) / duration, 1);
            const currentValue = Math.floor(value * progress);
            el.textContent = `${prefix}${currentValue}${suffix}`;
            if (progress < 1) frameId = requestAnimationFrame(tick);
          };

          frameId = requestAnimationFrame(tick);
          observer.unobserve(el);
        });
      },
      { threshold: 0.6 }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, [prefix, suffix, value]);

  return ref;
};

const StatCard = ({ value, label, prefix, suffix }) => {
  const ref = useCountUp(value, { prefix, suffix });

  return (
    <article className="stat-card">
      <div className="stat-value" ref={ref}>{`${prefix ?? ''}${value}${suffix ?? ''}`}</div>
      <p className="stat-label">{label}</p>
    </article>
  );
};

const RotatingText = () => {
  const words = ['podcast', 'media', 'marketing'];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [phase, setPhase] = useState('fadeIn'); // fadeIn, typing, stay, fadeOut

  useEffect(() => {
    const currentWord = words[currentIndex];
    
    if (phase === 'fadeIn') {
      const timer = setTimeout(() => {
        setPhase('typing');
        setDisplayText('');
      }, 800);
      return () => clearTimeout(timer);
    }
    
    if (phase === 'typing') {
      if (displayText.length < currentWord.length) {
        const timer = setTimeout(() => {
          setDisplayText(currentWord.slice(0, displayText.length + 1));
        }, 100);
        return () => clearTimeout(timer);
      } else {
        setPhase('stay');
      }
    }
    
    if (phase === 'stay') {
      const timer = setTimeout(() => {
        setPhase('fadeOut');
      }, 3500);
      return () => clearTimeout(timer);
    }
    
    if (phase === 'fadeOut') {
      const timer = setTimeout(() => {
        setDisplayText('');
        setCurrentIndex((prev) => (prev + 1) % words.length);
        setPhase('fadeIn');
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [phase, displayText, currentIndex]);

  return (
    <span className={`rotating-word ${phase}`}>
      {displayText}
      {phase === 'typing' && displayText.length < words[currentIndex].length && <span className="cursor">|</span>}
    </span>
  );
};

const App = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <div className="page-glow" aria-hidden="true" />
      
      <header className={`site-header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="header-content">
          <div className="logo-chip">
            <span>#</span>
            <strong>Gashtak</strong>
          </div>
          <nav className="primary-nav" aria-label="Main navigation">
            <a href="#home" className="active">
              home
            </a>
            <a href="#about">about</a>
            <a href="#services">services</a>
            <a href="#contact">contact</a>
          </nav>
        </div>
      </header>

    <div className="container">

      <main id="home" className="hero">
        <video className="hero-video" autoPlay loop muted playsInline>
          <source src={heroVideo} type="video/mp4" />
        </video>
        <div className="hero-overlay" />
        
        <div className="hero-content">
          <div className="hero-text">
            <h1>
              One Home For
              <span className="gradient-text">Podcasts, Media & Marketing</span>
              with <span className="hash">#Gashtak!</span>
            </h1>
            <p className="lede">
              We are a professional media and marketing team dedicated to creating exceptional content
              and bold strategies for our clients. With over 30k+ YouTube subscribers and 15+ happy
              customers, we've proven our expertise in the digital media landscape.
            </p>
            <div className="cta-row">
              <a className="btn primary" href="#contact">
                Start a Project
              </a>
              <a className="btn ghost" href="#portfolio">
                View Portfolio
              </a>
            </div>
          </div>
          
          <div className="stats-row">
            {stats.map(stat => (
              <StatCard key={stat.label} {...stat} />
            ))}
          </div>
        </div>

        <div className="eyebrow-badge">
          gashtak <RotatingText />
        </div>
      </main>

      <section id="about" className="section about-section">
        <div className="section-header">
          <div className="eyebrow">who we are</div>
          <h2>About Gashtak</h2>
          <p className="section-subtitle">
            A creative media powerhouse transforming ideas into compelling digital experiences
          </p>
        </div>
        
        <div className="about-content">
          <div className="about-card">
            <h3>Our Story</h3>
            <p>
              Founded with a passion for storytelling, Gashtak has grown from a small podcast into 
              a full-service media and marketing agency. We combine creativity with strategy to help 
              brands connect with their audiences in meaningful ways.
            </p>
          </div>
          
          <div className="about-card">
            <h3>Our Mission</h3>
            <p>
              To empower creators and businesses with exceptional media content and innovative marketing 
              strategies that drive real results. We believe in the power of authentic storytelling and 
              data-driven creativity.
            </p>
          </div>
        </div>
      </section>

      <section id="services" className="section services-section">
        <div className="section-header">
          <div className="eyebrow">what we do</div>
          <h2>Our Services</h2>
          <p className="section-subtitle">
            Comprehensive media and marketing solutions tailored to your needs
          </p>
        </div>
        
        <div className="services-grid">
          {services.map((service, index) => (
            <div key={index} className="service-card">
              <div className="service-icon">{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="contact" className="section contact-section">
        <div className="contact-card">
          <div className="section-header">
            <div className="eyebrow">get in touch</div>
            <h2>Let's Work Together</h2>
            <p className="section-subtitle">
              Ready to elevate your brand? Drop us a message and let's create something amazing.
            </p>
          </div>
          
          <form className="contact-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input type="text" id="name" name="name" placeholder="Your name" required />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" placeholder="your@email.com" required />
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input type="text" id="subject" name="subject" placeholder="How can we help?" required />
            </div>
            
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" rows="5" placeholder="Tell us about your project..." required></textarea>
            </div>
            
            <button type="submit" className="btn primary">Send Message</button>
          </form>
        </div>
      </section>

      <footer className="site-footer">
        <div className="footer-content">
          <div className="logo-chip">
            <span>#</span>
            <strong>Gashtak</strong>
          </div>
          <p className="footer-text">© 2025 Gashtak Media. All rights reserved.</p>
        </div>
      </footer>
    </div>
  </>
  );
};

export default App;
