// src/components/Product.jsx
import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Product = () => {
  const linkRef = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setScrolled(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleMouseMove = (e) => {
    const rect = linkRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setPos({ x: x * 0.35, y: y * 0.35 });
  };

  const handleMouseLeave = () => {
    setPos({ x: 0, y: 0 });
    setHovered(false);
  };

  return (
    <>
      <style>{`
        .hero-section {
          background: #000000;
        }

        .reveal-line {
          overflow: hidden;
        }

        .reveal-text {
          display: block;
          transform: translateY(120%);
          opacity: 0;
          transition: transform 1.1s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.6s ease;
        }

        .reveal-text.visible {
          transform: translateY(0);
          opacity: 1;
        }

        .line-1 .reveal-text { transition-delay: 0.05s; }
        .line-2 .reveal-text { transition-delay: 0.18s; }
        .line-3 .reveal-text { transition-delay: 0.32s; }

        .display-font {
          line-height: 0.88;
          letter-spacing: -0.03em;
        }

        .dim {
          color: #2e2e2e;
        }

        .mid {
          color: #5a5a5a;
        }

        .bright {
          color: #f5f0e8;
        }

        /* Magnetic CTA */
        .cta-wrap {
          display: inline-flex;
          align-items: center;
          gap: 18px;
          cursor: none;
          text-decoration: none;
          transition: transform 0.4s cubic-bezier(0.23, 1, 0.32, 1);
        }

        .cta-label {
          font-size: clamp(11px, 1.1vw, 13px);
          font-weight: 500;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #5a5a5a;
          transition: color 0.3s ease;
        }

        .cta-wrap:hover .cta-label {
          color: #f5f0e8;
        }

        .cta-circle {
          position: relative;
          width: clamp(52px, 6vw, 72px);
          height: clamp(52px, 6vw, 72px);
          border-radius: 50%;
          border: 1px solid #2a2a2a;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: border-color 0.3s ease, background 0.4s ease;
          overflow: hidden;
        }

        .cta-circle::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 50%;
          background: #0b6472;
          transform: scale(0);
          transition: transform 0.5s cubic-bezier(0.23, 1, 0.32, 1);
        }

        .cta-wrap:hover .cta-circle::before {
          transform: scale(1);
        }

        .cta-wrap:hover .cta-circle {
          border-color: #0b6472;
        }

        .arrow-svg {
          position: relative;
          z-index: 1;
          width: clamp(16px, 1.8vw, 22px);
          height: clamp(16px, 1.8vw, 22px);
          transition: transform 0.35s cubic-bezier(0.23, 1, 0.32, 1), stroke 0.3s ease;
          stroke: #5a5a5a;
        }

        .cta-wrap:hover .arrow-svg {
          stroke: #ffffff;
          transform: rotate(-45deg) scale(1.1);
        }

        /* Decorative line */
        .deco-line {
          width: 0;
          height: 1px;
          background: #2a2a2a;
          transition: width 1.4s cubic-bezier(0.16, 1, 0.3, 1) 0.5s;
        }

        .deco-line.visible {
          width: 100%;
        }

        /* Grain overlay */
        .grain {
          position: absolute;
          inset: 0;
          pointer-events: none;
          opacity: 0.035;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
          background-size: 200px 200px;
        }

        /* Issue number tag */
        .tag {
          font-size: 10px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #333;
          opacity: 0;
          transform: translateY(8px);
          transition: opacity 0.8s ease 0.8s, transform 0.8s ease 0.8s;
        }

        .tag.visible {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>

      <section className="hero-section" style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 'clamp(48px, 8vw, 96px) clamp(24px, 7vw, 96px)',
        overflow: 'hidden',
      }}>

        {/* Grain texture */}
        <div className="grain" />

        {/* Subtle radial glow */}
        <div style={{
          position: 'absolute',
          bottom: '-20%',
          right: '-10%',
          width: '60vw',
          height: '60vw',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(245,240,232,0.025) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div style={{ maxWidth: '1200px', width: '100%', margin: '0 auto' }}>

          

          

          {/* Headline */}
          <div style={{ marginBottom: '56px' }}>

            <div className={`reveal-line line-1`}>
              <span className={`reveal-text display-font dim ${scrolled ? 'visible' : ''}`}
                style={{ fontSize: 'clamp(52px, 10vw, 130px)' }}>
                Where Colour
              </span>
            </div>

            <div className={`reveal-line line-2`}>
              <span className={`reveal-text display-font mid ${scrolled ? 'visible' : ''}`}
                style={{ fontSize: 'clamp(52px, 10vw, 130px)', fontStyle: 'italic' }}>
                Finds Its
              </span>
            </div>

            <div className={`reveal-line line-3`}>
              <span className={`reveal-text display-font bright ${scrolled ? 'visible' : ''}`}
                style={{ fontSize: 'clamp(52px, 10vw, 130px)' }}>
                Soul
              </span>
            </div>

          </div>

          {/* Bottom row: CTA + subtext */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '32px',
          }}>

            {/* Magnetic CTA */}
            <Link
              to="/paintings"
              ref={linkRef}
              className="cta-wrap"
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={handleMouseLeave}
              style={{
                transform: hovered
                  ? `translate(${pos.x}px, ${pos.y}px)`
                  : 'translate(0,0)',
              }}
            >
              <span className="cta-label">View Gallery</span>
              <div className="cta-circle">
                <svg
                  className="arrow-svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="13 6 19 12 13 18" />
                </svg>
              </div>
            </Link>

            

          </div>

        </div>
      </section>
    </>
  );
};

export default Product;