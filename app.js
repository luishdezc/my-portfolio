const { useState, useEffect, useRef } = React;

const DATA = {
  name: "Luis Hernandez",
  firstName: "Luis",
  lastName: "Hernandez",
  title: "Software Development Engineer",
  tagline: "I enjoy creating software that solves real problems in a simple and practical way.",
  email: "lh140534@gmail.com",
  github: "https://github.com/luishdezc",
  linkedin: "https://www.linkedin.com/in/luis-guillermo-hernandez-casillas",
  photo: "./assets/photo.jpg",

  projects: [
    {
      name: "Mediconnect",
      desc: "Full-stack telemedicine platform built with React and Express that connects patients with doctors through real-time chat, WebRTC video consultations, and appointment scheduling.",
      techs: ["React", "TypeScript", "Express", "MongoDB", "Socket.IO", "WebRTC", "Stripe", "AWS S3", "Passport.js", "Zustand", "Zod", "Leaflet", "Vitest"],
      github: "https://github.com/luishdezc/mediconnect.git",
      demo: "https://mediconnect-rosy-tau.vercel.app"
    },
    {
      name: "Savor",
      desc: "Full-stack social recipe platform built with Angular and FastAPI where users share, discover, and save recipes through a community-driven feed.",
      techs: ["Angular", "TypeScript", "FastAPI", "Python", "MongoDB", "Motor", "Pydantic", "JWT", "Tailwind CSS", "Pillow", "Google OAuth"],
      github: "https://github.com/luishdezc/recipe-social.git",
      demo: "https://recipe-social-one.vercel.app"
    },
    {
      name: "FinanceTrack",
      desc: "Full-stack personal finance SaaS built with React, Node.js, and MongoDB. Features JWT and Google OAuth authentication, transaction management with category-aware validation, monthly budgets with overspend alerts, savings goals with real balance-deducting contributions and audit history, and interactive analytics dashboards.",
      techs: ["React", "TypeScript", "Node.js", "Express", "MongoDB", "Tailwind CSS", "Zustand", "Recharts", "JWT", "Google OAuth", "Zod", "Vite", "GitHub Actions"],
      github: "https://github.com/luishdezc/financetrack.git",
      demo: "https://financetrack-phi.vercel.app"
    },
    {
      name: "ScrabbleC",
      desc: "Console-based Scrabble game implemented in C featuring a dynamic board with linked cells, dictionary validation using a binary search tree (BST), tile management, scoring system with special squares, and full turn-based gameplay for two players.",
      techs: ["C", "Data Structures", "Pointers", "Binary Search Tree", "Dynamic Memory"],
      github: "https://github.com/luishdezc/Scrabble.git",
      demo: "#"
    },
    {
      name: "Vector2D Grapher",
      desc: "Java-based application for visualizing and manipulating 2D vectors, allowing users to perform operations such as addition, subtraction, and scaling while dynamically plotting the results on a coordinate plane.",
      techs: ["Java", "OOP", "Data Visualization", "Mathematics"],
      github: "https://github.com/luishdezc/Graficador-de-vectores.git",
      demo: "#"
    },
    {
      name: "Pystation",
      desc: "Desktop game suite built entirely in Python and Pygame, featuring six games. Each game is a self-contained module with its own assets, sound effects, and test suite. The project enforces code quality through GitHub Actions CI pipelines with Flake8 linting, coverage thresholds, and BDD system tests written in Behave.",
      techs: ["Python", "Pygame", "Behave", "Unittest", "GitHub Actions", "Flake8", "Coverage"],
      github: "https://github.com/ErickDarkFire/Pystation.git",
    }
  ],

  skills: {
    languages: [
      { name: "Java", pct: 80 },
      { name: "JavaScript / TypeScript", pct: 85 },
      { name: "Python", pct: 85 },
      { name: "C / C++", pct: 70 },
      { name: "SQL", pct: 80 },
    ],
    frontend: ["React", "Angular", "HTML5", "CSS3", "Tailwind", "Figma"],
    backend: ["Node.js", "Express", "Spring Boot", "REST APIs", "GraphQL"],
    tools: ["Git", "GitHub", "Docker", "VS Code", "Eclipse", "Postman", "Jira"],
    concepts: ["OOP", "Data Structures", "Algorithms", "Design Patterns", "Agile / Scrum", "UX/UI Design", "Software Testing"]
  },

  certifications: [
    {
      name: "Python",
      institution: "Kaggle",
      date: "Feb 2023",
      link: null,
      icon: "fab fa-python"
    },
    {
      name: "Fundamentos de ChatGPT",
      institution: "Santander Open Academy",
      date: "Jul 2025",
      link: null,
      icon: "fas fa-robot"
    },
    {
      name: "JavaScript (Basic) Certificate",
      institution: "HackerRank",
      date: "Aug 2025",
      link: "https://www.hackerrank.com/certificates/437d01364dc2",
      icon: "fab fa-js-square"
    },
    {
      name: "JavaScript (Intermediate) Certificate",
      institution: "HackerRank",
      date: "Aug 2025",
      link: "https://www.hackerrank.com/certificates/3f5bc2abdde9",
      icon: "fab fa-js-square"
    }
  ]
};


function Cursor() {
  const dot = useRef(null);
  const ring = useRef(null);

  useEffect(() => {
    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;
    let animId;

    const move = (e) => {
      mouseX = e.clientX; mouseY = e.clientY;
      if (dot.current) {
        dot.current.style.left = mouseX + 'px';
        dot.current.style.top = mouseY + 'px';
      }
    };

    const lerp = () => {
      if (ring.current) {
        ringX += (mouseX - ringX) * 0.12;
        ringY += (mouseY - ringY) * 0.12;
        ring.current.style.left = ringX + 'px';
        ring.current.style.top = ringY + 'px';
      }
      animId = requestAnimationFrame(lerp);
    };

    const enter = () => {
      dot.current?.classList.add('hover');
      ring.current?.classList.add('hover');
    };
    const leave = () => {
      dot.current?.classList.remove('hover');
      ring.current?.classList.remove('hover');
    };

    window.addEventListener('mousemove', move);
    document.querySelectorAll('a, button, .project-card, .skill-tag').forEach(el => {
      el.addEventListener('mouseenter', enter);
      el.addEventListener('mouseleave', leave);
    });
    animId = requestAnimationFrame(lerp);

    return () => {
      window.removeEventListener('mousemove', move);
      cancelAnimationFrame(animId);
    };
  }, []);

  return <>
    <div className="cursor-dot" ref={dot}></div>
    <div className="cursor-ring" ref={ring}></div>
  </>;
}

function ScrollProgress() {
  const barRef = useRef(null);

  useEffect(() => {
    const update = () => {
      const scrolled = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrolled / total;
      if (barRef.current) barRef.current.style.transform = `scaleX(${progress})`;
    };
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  return <div className="scroll-progress" ref={barRef} />;
}

// ─── LOADER ────────────────────────────────────────────
function Loader({ onDone }) {
  const [num, setNum] = useState(0);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const start = Date.now();
    const tick = () => {
      const elapsed = Date.now() - start;
      const pct = Math.min(Math.floor((elapsed / 1800) * 100), 100);
      setNum(pct);
      if (pct < 100) requestAnimationFrame(tick);
      else setTimeout(() => {
        setGone(true);
        setTimeout(onDone, 600);
      }, 200);
    };
    requestAnimationFrame(tick);
  }, []);

  return (
    <div id="loader" style={{
      opacity: gone ? 0 : 1,
      pointerEvents: gone ? 'none' : 'all',
      transition: 'opacity 0.6s ease'
    }}>
      <div className="loader-num">{String(num).padStart(3, '0')}</div>
      <div className="loader-bar"><div className="loader-fill"></div></div>
      <div className="loader-text">Initializing portfolio</div>
    </div>
  );
}

function Navbar({ theme, toggleTheme }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const links = ['About', 'Projects', 'Skills', 'Certifications', 'Contact', 'CV'];
  const close = () => setMobileOpen(false);

  return <>
    <nav className={scrolled ? 'scrolled' : ''}>
      <a href="#hero" className="nav-logo">&lt;luis.hernandez /&gt;</a>
      <ul className="nav-links">
        {links.map(l => <li key={l}><a href={`#${l.toLowerCase()}`}>{l}</a></li>)}
      </ul>
      <div className="nav-right">
        <button className="theme-toggle" onClick={toggleTheme} title="Toggle theme">
          <i className={`fas fa-${theme === 'dark' ? 'sun' : 'moon'}`}></i>
        </button>
        <button className="nav-burger" onClick={() => setMobileOpen(v => !v)}>
          <i className={`fas fa-${mobileOpen ? 'xmark' : 'bars'}`}></i>
        </button>
      </div>
    </nav>
    <div className={`mobile-nav ${mobileOpen ? 'open' : ''}`}>
      {links.map(l => <a key={l} href={`#${l.toLowerCase()}`} onClick={close}>{l}</a>)}
      <div style={{ display: 'flex', gap: 20 }}>
        <a href={DATA.github} target="_blank" rel="noreferrer" onClick={close}><i className="fab fa-github"></i></a>
        <a href={DATA.linkedin} target="_blank" rel="noreferrer" onClick={close}><i className="fab fa-linkedin"></i></a>
      </div>
    </div>
  </>;
}

function Hero() {
  const nameRef = useRef(null);

  useEffect(() => {
    if (!window.gsap) return;
    gsap.from('.hero-tag', { opacity: 0, y: 20, duration: 0.8, delay: 0.2, ease: 'power3.out' });
    gsap.from('.hero-name', { opacity: 0, y: 60, duration: 1, delay: 0.4, ease: 'power4.out' });
    gsap.from('.hero-title', { opacity: 0, y: 30, duration: 0.8, delay: 0.7, ease: 'power3.out' });
    gsap.from('.hero-tagline', { opacity: 0, x: -20, duration: 0.8, delay: 0.9, ease: 'power3.out' });
    gsap.from('.hero-cta', { opacity: 0, y: 20, duration: 0.8, delay: 1.1, ease: 'power3.out' });
    gsap.from('.hero-photo-wrapper', { opacity: 0, x: 40, duration: 1, delay: 0.6, ease: 'power3.out' });
    gsap.from('.hero-bg-text', { opacity: 0, scale: 0.95, duration: 1.5, delay: 0.1, ease: 'power3.out' });
  }, []);

  return (
    <section id="hero">
      <div className="hero-bg-text">{DATA.lastName}</div>

      <div className="hero-photo-wrapper">
        {DATA.photo
          ? <img src={DATA.photo} alt={DATA.name} />
          : <div className="hero-photo-placeholder">
              <i className="fas fa-user"></i>
              <span>Replace DATA.photo with your image path</span>
            </div>
        }
      </div>

      <div className="hero-content">
        <div className="hero-tag">
          <i className="fas fa-circle" style={{ fontSize: '0.4rem', color: 'var(--accent)' }}></i>
          &nbsp; Open to new challenges
        </div>
        <h1 className="hero-name" ref={nameRef}>
          {DATA.firstName}<br />
          <span>{DATA.lastName}</span>
        </h1>
        <p className="hero-title">{DATA.title}</p>
        <p className="hero-tagline">{DATA.tagline}</p>
        <div className="hero-cta">
          <a href="#projects" className="btn-primary">View Work <i className="fas fa-arrow-right"></i></a>
          <a href="#contact" className="btn-outline">Get In Touch</a>
          <a href="./assets/cv.pdf" download className="btn-outline">Download CV <i className="fas fa-download"></i></a>
          
        </div>
      </div>

      <div className="hero-scroll">
        <div className="hero-scroll-line"></div>
        Scroll to explore
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about">
      <div className="section-label">01 — About</div>
      <div className="about-grid">
        <div className="about-heading reveal">
          Who<br />I <em>Am.</em>
        </div>
        <div>
          <div className="about-text">
            <p className="reveal reveal-delay-1">
              I'm <strong>{DATA.name}</strong>, a Software Development Engineering student with a broad foundation in computer science and a deep passion for crafting software that is both technically solid and delightful to use.
            </p>
            <p className="reveal reveal-delay-2">
              My academic journey has given me rigorous grounding in <strong>software engineering fundamentals</strong>, from algorithms, data structures, and databases, which help me approach problems in a logical and effective way.
            </p>
            <p className="reveal reveal-delay-3">
              I feel comfortable working on both <strong>backend</strong> and <strong>frontend</strong> development, always focusing on making solutions simple and reliable.
            </p>
            <p className="reveal reveal-delay-4">
              Beyond code, I work fluently within <strong>Agile environments</strong>, paying attention to both functionality and user experience. I believe good software should be easy to use and feel natural.
            </p>
          </div>
          <div className="about-stats reveal">
            {[
              { num: '4+', label: 'Courses Completed' },
              { num: '6+', label: 'Projects Built' },
              { num: '5+', label: 'Languages Known' },
              { num: '∞', label: 'Problems Solved' },
            ].map(s => (
              <div className="stat" key={s.label}>
                <div className="stat-num">{s.num}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section id="projects">
      <div className="section-label">02 — Projects</div>
      <div className="projects-header">
        <h2 className="projects-heading reveal">
          Selected<br /><em>Work.</em>
        </h2>
        <span className="projects-count reveal">{String(DATA.projects.length).padStart(2,'0')} projects</span>
      </div>
      <div className="projects-grid">
        {DATA.projects.map((p, i) => (
          <div className="project-card reveal" key={p.name}
               style={{ transitionDelay: `${(i % 3) * 0.1}s` }}>
            <span className="project-num">{String(i+1).padStart(2,'0')}</span>
            <h3 className="project-name">{p.name}</h3>
            <p className="project-desc">{p.desc}</p>
            <div className="project-tags">
              {p.techs.map(t => <span className="tag" key={t}>{t}</span>)}
            </div>
            <div className="project-links">
              <a href={p.github} target="_blank" rel="noreferrer" className="project-link">
                <i className="fab fa-github"></i> GitHub
              </a>
              {p.demo && p.demo !== '#' && (
                <a href={p.demo} target="_blank" rel="noreferrer" className="project-link">
                  <i className="fas fa-arrow-up-right-from-square"></i> Live Demo
                </a>
              )}
            </div>
            <i className="fas fa-arrow-right project-arrow"></i>
          </div>
        ))}
      </div>
    </section>
  );
}

function Skills() {
  const barsRef = useRef(null);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && !animated) {
        setAnimated(true);
        setTimeout(() => {
          document.querySelectorAll('.skill-bar-fill').forEach(el => {
            el.style.width = el.dataset.pct + '%';
          });
        }, 300);
      }
    }, { threshold: 0.3 });
    if (barsRef.current) obs.observe(barsRef.current);
    return () => obs.disconnect();
  }, [animated]);

  return (
    <section id="skills">
      <div className="section-label">03 — Skills</div>
      <div className="skills-layout">
        <h2 className="skills-heading reveal">
          Tech<br /><em>Stack.</em>
        </h2>
        <div className="skills-content">
          <div ref={barsRef} className="reveal">
            <div className="skill-category-title">Core Languages</div>
            <div className="skill-bars">
              {DATA.skills.languages.map(s => (
                <div className="skill-bar-item" key={s.name}>
                  <div className="skill-bar-header">
                    <span className="skill-bar-name">{s.name}</span>
                    <span className="skill-bar-pct">{s.pct}%</span>
                  </div>
                  <div className="skill-bar-track">
                    <div className="skill-bar-fill" data-pct={s.pct}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="reveal reveal-delay-1">
            <div className="skill-category-title">Frontend</div>
            <div className="skill-tags-group">
              {DATA.skills.frontend.map(s => <span className="skill-tag" key={s}>{s}</span>)}
            </div>
          </div>

          <div className="reveal reveal-delay-2">
            <div className="skill-category-title">Backend & APIs</div>
            <div className="skill-tags-group">
              {DATA.skills.backend.map(s => <span className="skill-tag" key={s}>{s}</span>)}
            </div>
          </div>

          <div className="reveal reveal-delay-3">
            <div className="skill-category-title">Tools & Platforms</div>
            <div className="skill-tags-group">
              {DATA.skills.tools.map(s => <span className="skill-tag" key={s}>{s}</span>)}
            </div>
          </div>

          <div className="reveal reveal-delay-4">
            <div className="skill-category-title">Concepts & Methodologies</div>
            <div className="skill-tags-group">
              {DATA.skills.concepts.map(s => <span className="skill-tag" key={s}>{s}</span>)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


function Certifications() {
  return (
    <section id="certifications">
      <div className="section-label">04 — Certifications</div>
      <div className="certs-layout">
        <h2 className="certs-heading reveal">
          Certified<br /><em>Knowledge.</em>
        </h2>
        <div className="certs-grid">
          {DATA.certifications.map((c, i) => (
            <div className={`cert-card reveal reveal-delay-${i % 4}`} key={c.name + c.institution}>
              <div className="cert-icon">
                <i className={c.icon}></i>
              </div>
              <div className="cert-content">
                <h3 className="cert-name">{c.name}</h3>
                <div className="cert-institution">{c.institution}</div>
                <div className="cert-date">
                  <i className="fas fa-calendar-alt" style={{ fontSize: '0.6rem', marginRight: '6px' }}></i>
                  {c.date}
                </div>
              </div>
              {c.link && (
                <a href={c.link} target="_blank" rel="noreferrer" className="cert-verify">
                  <i className="fas fa-arrow-up-right-from-square"></i> Verify
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const mailto = `mailto:${DATA.email}?subject=Portfolio Contact from ${form.name}&body=${encodeURIComponent(form.message + '\n\nFrom: ' + form.email)}`;
    window.open(mailto);
    setStatus('Opening your email client...');
    setTimeout(() => setStatus(''), 3000);
  };

  return (
    <section id="contact">
      <div className="section-label">05 — Contact</div>
      <div className="contact-grid">
        <div>
          <h2 className="contact-heading reveal">
            Let's<br /><em>Talk.</em>
          </h2>
          <p className="contact-body reveal reveal-delay-1">
            I'm always open to new projects, collaborations, or just a good conversation about technology. Drop me a message and I'll get back to you.
          </p>
          <div className="contact-info">
            <div className="contact-item reveal reveal-delay-2">
              <div className="contact-item-icon"><i className="fas fa-envelope"></i></div>
              <div>
                <div className="contact-item-label">Email</div>
                <a href={`mailto:${DATA.email}`} className="contact-item-text" style={{ textDecoration: 'none' }}>{DATA.email}</a>
              </div>
            </div>
            <div className="contact-item reveal reveal-delay-3">
              <div className="contact-item-icon"><i className="fab fa-github"></i></div>
              <div>
                <div className="contact-item-label">GitHub</div>
                <a href={DATA.github} target="_blank" rel="noreferrer" className="contact-item-text" style={{ textDecoration: 'none' }}>
                  {DATA.github.replace('https://', '')}
                </a>
              </div>
            </div>
            <div className="contact-item reveal reveal-delay-4">
              <div className="contact-item-icon"><i className="fab fa-linkedin"></i></div>
              <div>
                <div className="contact-item-label">LinkedIn</div>
                <a href={DATA.linkedin} target="_blank" rel="noreferrer" className="contact-item-text" style={{ textDecoration: 'none' }}>
                  {DATA.linkedin.replace('https://', '')}
                </a>
              </div>
            </div>
          </div>
        </div>

        <form className="contact-form reveal" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Your Name</label>
            <input className="form-input" type="text" required
              placeholder="John Doe"
              value={form.name}
              onChange={e => setForm(p => ({...p, name: e.target.value}))} />
          </div>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input className="form-input" type="email" required
              placeholder="john@example.com"
              value={form.email}
              onChange={e => setForm(p => ({...p, email: e.target.value}))} />
          </div>
          <div className="form-group">
            <label className="form-label">Message</label>
            <textarea className="form-textarea" required
              placeholder="Tell me about your project..."
              value={form.message}
              onChange={e => setForm(p => ({...p, message: e.target.value}))}></textarea>
          </div>
          {status && <p className="form-status">{status}</p>}
          <button type="submit" className="btn-primary" style={{ width: 'fit-content' }}>
            Send Message <i className="fas fa-paper-plane"></i>
          </button>
        </form>
      </div>
    </section>
  );
}

function CVSection() {
  return (
    <section id="cv">
      <div className="section-label">06 — CV</div>
      <h2 className="projects-heading">Download <em>CV.</em></h2>
      <p style={{ marginTop: "20px", color: "var(--muted)" }}>
        You can download my full resume in PDF format.
      </p>
      <div style={{ marginTop: "30px" }}>
        <a href="./assets/cv.pdf" download className="btn-primary">
          Download CV <i className="fas fa-download"></i>
        </a>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer>
      <span className="footer-copy">
        © {new Date().getFullYear()} {DATA.name}
      </span>
      <div className="footer-socials">
        <a href={DATA.github} target="_blank" rel="noreferrer" className="social-link">
          <i className="fab fa-github"></i>
        </a>
        <a href={DATA.linkedin} target="_blank" rel="noreferrer" className="social-link">
          <i className="fab fa-linkedin"></i>
        </a>
        <a href={`mailto:${DATA.email}`} className="social-link">
          <i className="fas fa-envelope"></i>
        </a>
      </div>
    </footer>
  );
}

function App() {
  const [loaded, setLoaded] = useState(false);
  const [theme, setTheme] = useState('dark');

  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark');

  // Apply theme
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    if (!loaded) return;
    const obs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, [loaded]);

  return <>
    <Loader onDone={() => setLoaded(true)} />
    {loaded && <>
      <Cursor />
      <ScrollProgress />
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <main>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Certifications />
        <Contact />
        <CVSection />
      </main>
      <Footer />
    </>}
  </>;
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);

