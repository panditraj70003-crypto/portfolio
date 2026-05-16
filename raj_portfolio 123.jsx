import { useState, useEffect, useRef } from "react";

const skills = {
  Languages: ["C++", "Python", "C", "JavaScript"],
  Frontend: ["HTML", "CSS", "JavaScript"],
  Tools: ["GitHub", "VS Code"],
};

const contacts = [
  {
    label: "Email",
    value: "panditraj70003@gmail.com",
    href: "mailto:panditraj70003@gmail.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    value: "raj-pandit-0b8043371",
    href: "https://www.linkedin.com/in/raj-pandit-0b8043371/",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    label: "GitHub",
    value: "panditraj70003-crypto",
    href: "https://github.com/panditraj70003-crypto",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    ),
  },
];

function useTypingEffect(words, speed = 80, pause = 1500) {
  const [displayed, setDisplayed] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIndex];
    let timeout;
    if (!deleting && charIndex < current.length) {
      timeout = setTimeout(() => setCharIndex((c) => c + 1), speed);
    } else if (!deleting && charIndex === current.length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && charIndex > 0) {
      timeout = setTimeout(() => setCharIndex((c) => c - 1), speed / 2);
    } else {
      setDeleting(false);
      setWordIndex((w) => (w + 1) % words.length);
    }
    setDisplayed(current.slice(0, charIndex));
    return () => clearTimeout(timeout);
  }, [charIndex, deleting, wordIndex, words, speed, pause]);

  return displayed;
}

function FloatingOrb({ style }) {
  return (
    <div
      style={{
        position: "absolute",
        borderRadius: "50%",
        filter: "blur(80px)",
        pointerEvents: "none",
        ...style,
      }}
    />
  );
}

function NavBar({ active, setActive }) {
  const links = ["Home", "About", "Skills", "DSA", "Contact"];
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNav = (e, l) => {
    e.preventDefault();
    setActive(l);
    setMenuOpen(false);
    const el = document.getElementById(l.toLowerCase());
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <nav style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      zIndex: 100,
      background: "rgba(5, 14, 35, 0.85)",
      backdropFilter: "blur(18px)",
      borderBottom: "1px solid rgba(99,179,237,0.1)",
    }}>
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1.2rem 2rem",
        maxWidth: 1100,
        margin: "0 auto",
      }}>
        <span style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "1.5rem",
          fontWeight: 700,
          background: "linear-gradient(135deg, #63b3ed, #4fd1c5)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          letterSpacing: "0.04em",
        }}>RP</span>

        {/* Desktop links */}
        <ul style={{ display: "flex", gap: "2.5rem", listStyle: "none", margin: 0, padding: 0, "@media(max-width:600px)": { display: "none" } }}>
          {links.map((l) => (
            <li key={l}>
              <a
                href={`#${l.toLowerCase()}`}
                onClick={(e) => handleNav(e, l)}
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.95rem",
                  color: active === l ? "#63b3ed" : "#a0aec0",
                  textDecoration: "none",
                  fontWeight: active === l ? 600 : 400,
                  letterSpacing: "0.06em",
                  transition: "color 0.2s",
                  borderBottom: active === l ? "2px solid #63b3ed" : "2px solid transparent",
                  paddingBottom: "2px",
                  WebkitTapHighlightColor: "transparent",
                  cursor: "pointer",
                  touchAction: "manipulation",
                }}
              >{l}</a>
            </li>
          ))}
        </ul>

        {/* Hamburger for mobile */}
        <button
          onClick={() => setMenuOpen((o) => !o)}
          style={{
            display: "none",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "0.5rem",
            color: "#63b3ed",
            flexDirection: "column",
            gap: "5px",
            touchAction: "manipulation",
          }}
          className="hamburger"
          aria-label="Toggle menu"
        >
          {[0,1,2].map(i => (
            <span key={i} style={{
              display: "block",
              width: 24,
              height: 2,
              background: "#63b3ed",
              borderRadius: 2,
              transition: "transform 0.2s, opacity 0.2s",
              transform: menuOpen
                ? i === 0 ? "translateY(7px) rotate(45deg)"
                : i === 2 ? "translateY(-7px) rotate(-45deg)"
                : "scaleX(0)"
                : "none",
              opacity: menuOpen && i === 1 ? 0 : 1,
            }} />
          ))}
        </button>
      </div>

      {/* Mobile dropdown */}
      <div style={{
        display: menuOpen ? "flex" : "none",
        flexDirection: "column",
        padding: "0.5rem 2rem 1.5rem",
        gap: "0.2rem",
        background: "rgba(5,14,35,0.97)",
        borderTop: "1px solid rgba(99,179,237,0.1)",
      }} className="mobile-menu">
        {links.map((l) => (
          <a
            key={l}
            href={`#${l.toLowerCase()}`}
            onClick={(e) => handleNav(e, l)}
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "1.1rem",
              color: active === l ? "#63b3ed" : "#a0aec0",
              textDecoration: "none",
              fontWeight: active === l ? 700 : 400,
              padding: "0.85rem 0.5rem",
              borderBottom: "1px solid rgba(99,179,237,0.07)",
              WebkitTapHighlightColor: "transparent",
              touchAction: "manipulation",
              cursor: "pointer",
            }}
          >{l}</a>
        ))}
      </div>
    </nav>
  );
}

function HeroSection() {
  const typed = useTypingEffect(["C++ & DSA", "Web Development", "Problem Solving"]);

  return (
    <section id="home" style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
      overflow: "hidden",
      padding: "6rem 2rem 2rem",
    }}>
      <FloatingOrb style={{ width: 480, height: 480, background: "rgba(49,130,206,0.18)", top: "-10%", right: "-8%" }} />
      <FloatingOrb style={{ width: 320, height: 320, background: "rgba(79,209,197,0.13)", bottom: "10%", left: "-5%" }} />
      <FloatingOrb style={{ width: 200, height: 200, background: "rgba(99,179,237,0.1)", top: "40%", left: "30%" }} />

      <div style={{ textAlign: "center", maxWidth: 800, position: "relative", zIndex: 1 }}>
        <div style={{
          display: "inline-block",
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "0.85rem",
          letterSpacing: "0.2em",
          color: "#63b3ed",
          textTransform: "uppercase",
          marginBottom: "1.2rem",
          padding: "0.4rem 1.2rem",
          border: "1px solid rgba(99,179,237,0.3)",
          borderRadius: "2rem",
          background: "rgba(99,179,237,0.07)",
        }}>
          👋 Hello, World!
        </div>

        <h1 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(2.8rem, 7vw, 5.5rem)",
          fontWeight: 800,
          lineHeight: 1.1,
          margin: "0 0 0.5rem",
          background: "linear-gradient(135deg, #ebf8ff 30%, #63b3ed 70%, #4fd1c5)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}>
          Raj Pandit
        </h1>

        <p style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "1.1rem",
          color: "#718096",
          marginBottom: "1.5rem",
          letterSpacing: "0.04em",
        }}>
          B.Tech Electrical Engineering · Central University of Jharkhand
        </p>

        <div style={{
          fontFamily: "'DM Mono', monospace",
          fontSize: "clamp(1.1rem, 2.5vw, 1.6rem)",
          color: "#4fd1c5",
          minHeight: "2.2rem",
          marginBottom: "2.5rem",
          letterSpacing: "0.02em",
        }}>
          &gt; {typed}<span style={{ animation: "blink 1s step-end infinite", opacity: 1 }}>|</span>
        </div>

        <p style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "1.1rem",
          color: "#90cdf4",
          maxWidth: 500,
          margin: "0 auto 2.5rem",
          lineHeight: 1.7,
        }}>
          I enjoy solving problems and building things that work.
        </p>

        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
          <button
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            style={{
              fontFamily: "'DM Sans', sans-serif",
              padding: "0.85rem 2.2rem",
              borderRadius: "0.5rem",
              background: "linear-gradient(135deg, #2b6cb0, #2c7a7b)",
              color: "#ebf8ff",
              border: "none",
              fontWeight: 600,
              fontSize: "0.95rem",
              letterSpacing: "0.04em",
              cursor: "pointer",
              transition: "transform 0.2s, box-shadow 0.2s",
              boxShadow: "0 4px 24px rgba(49,130,206,0.3)",
              touchAction: "manipulation",
              WebkitTapHighlightColor: "transparent",
            }}
            onMouseEnter={e => { e.target.style.transform = "translateY(-2px)"; e.target.style.boxShadow = "0 8px 32px rgba(49,130,206,0.45)"; }}
            onMouseLeave={e => { e.target.style.transform = ""; e.target.style.boxShadow = "0 4px 24px rgba(49,130,206,0.3)"; }}
          >
            Get in Touch
          </button>
          <button
            onClick={() => document.getElementById("skills")?.scrollIntoView({ behavior: "smooth" })}
            style={{
              fontFamily: "'DM Sans', sans-serif",
              padding: "0.85rem 2.2rem",
              borderRadius: "0.5rem",
              border: "1px solid rgba(99,179,237,0.4)",
              background: "transparent",
              color: "#63b3ed",
              fontWeight: 600,
              fontSize: "0.95rem",
              letterSpacing: "0.04em",
              cursor: "pointer",
              transition: "background 0.2s, border-color 0.2s",
              touchAction: "manipulation",
              WebkitTapHighlightColor: "transparent",
            }}
            onMouseEnter={e => { e.target.style.background = "rgba(99,179,237,0.08)"; }}
            onMouseLeave={e => { e.target.style.background = "transparent"; }}
          >
            View Skills
          </button>
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section id="about" style={{
      minHeight: "60vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "6rem 2rem",
      position: "relative",
    }}>
      <div style={{
        maxWidth: 900,
        width: "100%",
        display: "grid",
        gridTemplateColumns: "1fr 2fr",
        gap: "4rem",
        alignItems: "center",
      }}>
        {/* Avatar */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div style={{
            width: 200,
            height: 200,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #1a365d, #2c7a7b)",
            border: "3px solid rgba(99,179,237,0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "5rem",
            boxShadow: "0 0 60px rgba(49,130,206,0.25)",
            position: "relative",
          }}>
            🎓
            <div style={{
              position: "absolute",
              inset: -8,
              borderRadius: "50%",
              border: "1px dashed rgba(99,179,237,0.25)",
              animation: "spin 20s linear infinite",
            }} />
          </div>
        </div>

        {/* Text */}
        <div>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "2.5rem",
            fontWeight: 700,
            color: "#ebf8ff",
            marginBottom: "0.5rem",
          }}>About Me</h2>
          <div style={{ width: 50, height: 3, background: "linear-gradient(90deg, #63b3ed, #4fd1c5)", borderRadius: 4, marginBottom: "1.5rem" }} />
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "1.05rem",
            color: "#a0aec0",
            lineHeight: 1.85,
            marginBottom: "1.2rem",
          }}>
            I'm a first-year B.Tech  Electrical branch student  at the Central University of Jharkhand, passionate about solving problems and web development. I am also doing competitive programming and i enjoy solving problems 
    
          </p>
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "1.05rem",
            color: "#a0aec0",
            lineHeight: 1.85,
          }}>
            I enjoy building projects and learning how real-world software works. 
          </p>

          <div style={{ display: "flex", gap: "1.5rem", marginTop: "2rem", flexWrap: "wrap" }}>
            {[["⚡", "EE Student"], ["💻", "Developer"], ["🧩", "Problem Solver"]].map(([icon, label]) => (
              <div key={label} style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.5rem 1rem",
                borderRadius: "0.5rem",
                background: "rgba(99,179,237,0.08)",
                border: "1px solid rgba(99,179,237,0.15)",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.9rem",
                color: "#90cdf4",
              }}>
                <span>{icon}</span> {label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function SkillCard({ category, items }) {
  const icons = {
    Languages: "⟨/⟩",
    Frontend: "◈",
    Tools: "⚙",
  };
  const colors = {
    Languages: ["#2b6cb0", "#3182ce"],
    Frontend: ["#2c7a7b", "#319795"],
    Tools: ["#44337a", "#6b46c1"],
  };
  const [c1, c2] = colors[category];

  return (
    <div style={{
      background: "rgba(10,25,60,0.6)",
      border: "1px solid rgba(99,179,237,0.15)",
      borderRadius: "1rem",
      padding: "2rem",
      backdropFilter: "blur(10px)",
      transition: "transform 0.3s, box-shadow 0.3s, border-color 0.3s",
      cursor: "default",
    }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = "translateY(-6px)";
        e.currentTarget.style.boxShadow = `0 16px 48px rgba(49,130,206,0.2)`;
        e.currentTarget.style.borderColor = "rgba(99,179,237,0.4)";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = "";
        e.currentTarget.style.boxShadow = "";
        e.currentTarget.style.borderColor = "rgba(99,179,237,0.15)";
      }}
    >
      <div style={{
        width: 48,
        height: 48,
        borderRadius: "0.75rem",
        background: `linear-gradient(135deg, ${c1}, ${c2})`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "1.4rem",
        fontFamily: "'DM Mono', monospace",
        color: "#ebf8ff",
        marginBottom: "1.2rem",
        boxShadow: `0 4px 16px rgba(49,130,206,0.3)`,
      }}>
        {icons[category]}
      </div>
      <h3 style={{
        fontFamily: "'DM Sans', sans-serif",
        fontWeight: 700,
        fontSize: "1.1rem",
        color: "#e2e8f0",
        marginBottom: "1rem",
        letterSpacing: "0.04em",
      }}>{category}</h3>
      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.65rem" }}>
        {items.map((item) => (
          <li key={item} style={{
            display: "flex",
            alignItems: "center",
            gap: "0.65rem",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.95rem",
            color: "#90cdf4",
          }}>
            <span style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: `linear-gradient(135deg, ${c1}, ${c2})`,
              flexShrink: 0,
              boxShadow: `0 0 8px ${c2}`,
            }} />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function SkillsSection() {
  return (
    <section id="skills" style={{
      minHeight: "60vh",
      padding: "6rem 2rem",
      position: "relative",
    }}>
      <FloatingOrb style={{ width: 350, height: 350, background: "rgba(49,130,206,0.1)", top: "0%", left: "-5%" }} />
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "2.5rem",
            fontWeight: 700,
            color: "#ebf8ff",
            marginBottom: "0.75rem",
          }}>Skills</h2>
          <div style={{ width: 50, height: 3, background: "linear-gradient(90deg, #63b3ed, #4fd1c5)", borderRadius: 4, margin: "0 auto 1rem" }} />
          <p style={{ fontFamily: "'DM Sans', sans-serif", color: "#718096", fontSize: "1rem" }}>
            Technologies and tools I work with
          </p>
        </div>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "1.5rem",
        }}>
          {Object.entries(skills).map(([cat, items]) => (
            <SkillCard key={cat} category={cat} items={items} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── DSA & Competitive Programming Section ───────────────────────────────────
function DSASection() {
  const platforms = [
    {
      name: "LeetCode",
      handle: "panditraj",
      stat: "200+",
      statLabel: "Problems Solved",
      tag: "Data Structures & Algorithms",
      href: "https://leetcode.com/u/panditraj/",
      gradient: ["#b7791f", "#d69e2e"],
      glow: "rgba(214,158,46,0.25)",
      badge: "🟡",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
          <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z"/>
        </svg>
      ),
    },
    {
      name: "Codeforces",
      handle: "panditraj",
      stat: "800",
      statLabel: "Rating Problems Solved",
      tag: "Competitive Programming",
      href: "https://codeforces.com/profile/panditraj",
      gradient: ["#1a365d", "#2b6cb0"],
      glow: "rgba(49,130,206,0.25)",
      badge: "🔵",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
          <path d="M4.5 7.5C5.328 7.5 6 8.172 6 9v10.5c0 .828-.672 1.5-1.5 1.5h-3C.672 21 0 20.328 0 19.5V9c0-.828.672-1.5 1.5-1.5h3zm9.5-5c.828 0 1.5.672 1.5 1.5v15c0 .828-.672 1.5-1.5 1.5h-3c-.828 0-1.5-.672-1.5-1.5V4c0-.828.672-1.5 1.5-1.5h3zm9.5 5c.828 0 1.5.672 1.5 1.5v10.5c0 .828-.672 1.5-1.5 1.5h-3c-.828 0-1.5-.672-1.5-1.5V9c0-.828.672-1.5 1.5-1.5h3z"/>
        </svg>
      ),
    },
  ];

  return (
    <section id="dsa" style={{
      padding: "6rem 2rem",
      position: "relative",
      overflow: "hidden",
    }}>
      <FloatingOrb style={{ width: 400, height: 400, background: "rgba(214,158,46,0.07)", top: "10%", right: "-10%" }} />
      <FloatingOrb style={{ width: 300, height: 300, background: "rgba(49,130,206,0.08)", bottom: "0%", left: "-5%" }} />

      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        {/* Heading */}
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "2.5rem",
            fontWeight: 700,
            color: "#ebf8ff",
            marginBottom: "0.75rem",
          }}>DSA & Competitive Programming</h2>
          <div style={{ width: 60, height: 3, background: "linear-gradient(90deg, #d69e2e, #63b3ed)", borderRadius: 4, margin: "0 auto 1rem" }} />
          <p style={{ fontFamily: "'DM Sans', sans-serif", color: "#718096", fontSize: "1rem" }}>
            Sharpening problem-solving skills one challenge at a time
          </p>
        </div>

        {/* Cards */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "1.5rem",
        }}>
          {platforms.map((p) => (
            <a
              key={p.name}
              href={p.href}
              target="_blank"
              rel="noreferrer"
              style={{
                display: "block",
                textDecoration: "none",
                background: "rgba(10,25,60,0.65)",
                border: "1px solid rgba(99,179,237,0.15)",
                borderRadius: "1.2rem",
                padding: "2rem",
                backdropFilter: "blur(12px)",
                transition: "transform 0.28s, box-shadow 0.28s, border-color 0.28s",
                touchAction: "manipulation",
                WebkitTapHighlightColor: "transparent",
                position: "relative",
                overflow: "hidden",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = "translateY(-8px)";
                e.currentTarget.style.boxShadow = `0 20px 50px ${p.glow}`;
                e.currentTarget.style.borderColor = `rgba(99,179,237,0.4)`;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = "";
                e.currentTarget.style.boxShadow = "";
                e.currentTarget.style.borderColor = "rgba(99,179,237,0.15)";
              }}
            >
              {/* Glow blob inside card */}
              <div style={{
                position: "absolute",
                top: -40, right: -40,
                width: 140, height: 140,
                borderRadius: "50%",
                background: p.glow,
                filter: "blur(40px)",
                pointerEvents: "none",
              }} />

              {/* Header row */}
              <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem", position: "relative" }}>
                <div style={{
                  width: 56, height: 56,
                  borderRadius: "0.85rem",
                  background: `linear-gradient(135deg, ${p.gradient[0]}, ${p.gradient[1]})`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "#fff",
                  boxShadow: `0 4px 20px ${p.glow}`,
                  flexShrink: 0,
                }}>
                  {p.icon}
                </div>
                <div>
                  <div style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: 700,
                    fontSize: "1.2rem",
                    color: "#e2e8f0",
                  }}>{p.name}</div>
                  <div style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: "0.82rem",
                    color: "#718096",
                  }}>@{p.handle}</div>
                </div>
                {/* Arrow */}
                <div style={{ marginLeft: "auto", color: "#4a5568", fontSize: "1.2rem" }}>↗</div>
              </div>

              {/* Stat */}
              <div style={{
                background: "rgba(99,179,237,0.06)",
                border: "1px solid rgba(99,179,237,0.12)",
                borderRadius: "0.75rem",
                padding: "1.2rem 1.5rem",
                marginBottom: "1.2rem",
                position: "relative",
              }}>
                <div style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "2.8rem",
                  fontWeight: 800,
                  background: `linear-gradient(135deg, ${p.gradient[0]}, ${p.gradient[1]})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  lineHeight: 1,
                  marginBottom: "0.3rem",
                }}>{p.stat}</div>
                <div style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.85rem",
                  color: "#718096",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                }}>{p.statLabel}</div>
              </div>

              {/* Tag + CTA */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.8rem",
                  color: "#4fd1c5",
                  background: "rgba(79,209,197,0.08)",
                  border: "1px solid rgba(79,209,197,0.2)",
                  borderRadius: "2rem",
                  padding: "0.3rem 0.85rem",
                }}>{p.tag}</span>
                <span style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.82rem",
                  color: "#63b3ed",
                  fontWeight: 600,
                }}>View Profile →</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Contact Section ──────────────────────────────────────────────────────────
function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  const inputStyle = {
    width: "100%",
    padding: "0.85rem 1.1rem",
    borderRadius: "0.6rem",
    background: "rgba(10,25,60,0.7)",
    border: "1px solid rgba(99,179,237,0.2)",
    color: "#e2e8f0",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "0.95rem",
    outline: "none",
    transition: "border-color 0.2s, box-shadow 0.2s",
    boxSizing: "border-box",
  };

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleFocus = (e) => {
    e.target.style.borderColor = "rgba(99,179,237,0.6)";
    e.target.style.boxShadow = "0 0 0 3px rgba(99,179,237,0.1)";
  };
  const handleBlur = (e) => {
    e.target.style.borderColor = "rgba(99,179,237,0.2)";
    e.target.style.boxShadow = "none";
  };

  const handleSubmit = () => {
    if (!form.name || !form.email || !form.message) {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
      return;
    }
    // Opens Gmail compose with pre-filled fields
    const subject = encodeURIComponent(`Portfolio Message from ${form.name}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`
    );
    const mailtoLink = `https://mail.google.com/mail/?view=cm&to=panditraj70003@gmail.com&su=${subject}&body=${body}`;
    window.open(mailtoLink, "_blank");
    setStatus("sent");
    setForm({ name: "", email: "", message: "" });
    setTimeout(() => setStatus("idle"), 4000);
  };

  return (
    <section id="contact" style={{
      padding: "6rem 2rem",
      position: "relative",
    }}>
      <FloatingOrb style={{ width: 300, height: 300, background: "rgba(79,209,197,0.1)", bottom: "5%", right: "-5%" }} />
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "2.5rem",
            fontWeight: 700,
            color: "#ebf8ff",
            marginBottom: "0.75rem",
          }}>Contact</h2>
          <div style={{ width: 50, height: 3, background: "linear-gradient(90deg, #63b3ed, #4fd1c5)", borderRadius: 4, margin: "0 auto 1rem" }} />
          <p style={{ fontFamily: "'DM Sans', sans-serif", color: "#718096" }}>
            Feel free to reach out — I'd love to connect!
          </p>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "2.5rem",
          alignItems: "start",
        }}
          className="contact-grid"
        >
          {/* Left: social links */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.9rem",
              color: "#718096",
              marginBottom: "0.5rem",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
            }}>Find me on</p>
            {contacts.map((c) => (
              <a key={c.label} href={c.href} target="_blank" rel="noreferrer" style={{
                display: "flex",
                alignItems: "center",
                gap: "1.2rem",
                padding: "1rem 1.25rem",
                borderRadius: "0.85rem",
                background: "rgba(10,25,60,0.6)",
                border: "1px solid rgba(99,179,237,0.15)",
                textDecoration: "none",
                transition: "transform 0.2s, border-color 0.2s, box-shadow 0.2s",
                backdropFilter: "blur(10px)",
                touchAction: "manipulation",
                WebkitTapHighlightColor: "transparent",
              }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = "translateX(6px)";
                  e.currentTarget.style.borderColor = "rgba(99,179,237,0.4)";
                  e.currentTarget.style.boxShadow = "0 4px 24px rgba(49,130,206,0.2)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = "";
                  e.currentTarget.style.borderColor = "rgba(99,179,237,0.15)";
                  e.currentTarget.style.boxShadow = "";
                }}
              >
                <div style={{
                  width: 40, height: 40,
                  borderRadius: "0.6rem",
                  background: "linear-gradient(135deg, #1a365d, #2c7a7b)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "#63b3ed", flexShrink: 0,
                }}>{c.icon}</div>
                <div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem", color: "#4fd1c5", letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 600, marginBottom: "0.15rem" }}>{c.label}</div>
                  <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.85rem", color: "#a0aec0" }}>{c.value}</div>
                </div>
              </a>
            ))}
          </div>

          {/* Right: message form */}
          <div style={{
            background: "rgba(10,25,60,0.6)",
            border: "1px solid rgba(99,179,237,0.15)",
            borderRadius: "1.2rem",
            padding: "2rem",
            backdropFilter: "blur(12px)",
          }}>
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.9rem",
              color: "#718096",
              marginBottom: "1.5rem",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
            }}>Send a Message</p>

            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <label style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.8rem", color: "#4fd1c5", display: "block", marginBottom: "0.4rem", letterSpacing: "0.06em" }}>Your Name</label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  placeholder="e.g. Priya Sharma"
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.8rem", color: "#4fd1c5", display: "block", marginBottom: "0.4rem", letterSpacing: "0.06em" }}>Your Email</label>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  placeholder="you@example.com"
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.8rem", color: "#4fd1c5", display: "block", marginBottom: "0.4rem", letterSpacing: "0.06em" }}>Message</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  rows={4}
                  placeholder="Write your message here..."
                  style={{ ...inputStyle, resize: "vertical", minHeight: 110 }}
                />
              </div>

              {status === "error" && (
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.85rem", color: "#fc8181", background: "rgba(252,129,129,0.1)", border: "1px solid rgba(252,129,129,0.3)", borderRadius: "0.5rem", padding: "0.6rem 1rem" }}>
                  ⚠️ Please fill in all fields before sending.
                </div>
              )}
              {status === "sent" && (
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.85rem", color: "#68d391", background: "rgba(104,211,145,0.1)", border: "1px solid rgba(104,211,145,0.3)", borderRadius: "0.5rem", padding: "0.6rem 1rem" }}>
                  ✅ Opening your email client with the message pre-filled!
                </div>
              )}

              <button
                onClick={handleSubmit}
                style={{
                  padding: "0.9rem",
                  borderRadius: "0.6rem",
                  background: status === "sent"
                    ? "linear-gradient(135deg, #276749, #2f855a)"
                    : "linear-gradient(135deg, #2b6cb0, #2c7a7b)",
                  color: "#ebf8ff",
                  border: "none",
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 700,
                  fontSize: "1rem",
                  cursor: "pointer",
                  letterSpacing: "0.04em",
                  transition: "transform 0.2s, box-shadow 0.2s, background 0.3s",
                  boxShadow: "0 4px 20px rgba(49,130,206,0.3)",
                  touchAction: "manipulation",
                  WebkitTapHighlightColor: "transparent",
                }}
                onMouseEnter={e => { e.target.style.transform = "translateY(-2px)"; e.target.style.boxShadow = "0 8px 28px rgba(49,130,206,0.45)"; }}
                onMouseLeave={e => { e.target.style.transform = ""; e.target.style.boxShadow = "0 4px 20px rgba(49,130,206,0.3)"; }}
              >
                {status === "sending" ? "Sending…" : status === "sent" ? "✓ Message Ready!" : "Send Message →"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Portfolio() {
  const [active, setActive] = useState("Home");

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap');
      * { box-sizing: border-box; margin: 0; padding: 0; }
      html { scroll-behavior: smooth; }
      body { background: #050e23; }
      @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
      @keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
      nav ul { display: flex !important; }
      nav .hamburger { display: none !important; }
      @media (max-width: 640px) {
        nav ul { display: none !important; }
        nav .hamburger { display: flex !important; flex-direction: column; }
        .contact-grid { grid-template-columns: 1fr !important; }
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(160deg, #020c1e 0%, #050e23 40%, #071628 70%, #030b1a 100%)",
      color: "#e2e8f0",
      overflowX: "hidden",
    }}>
      <NavBar active={active} setActive={setActive} />
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <DSASection />
      <ContactSection />

      <footer style={{
        textAlign: "center",
        padding: "2rem",
        borderTop: "1px solid rgba(99,179,237,0.1)",
        fontFamily: "'DM Sans', sans-serif",
        fontSize: "0.85rem",
        color: "#4a5568",
      }}>
        Designed & Built by <span style={{ color: "#63b3ed" }}>Raj Pandit</span> · {new Date().getFullYear()}
      </footer>
    </div>
  );
}
