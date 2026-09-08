import React from 'react';
import { Link } from 'react-router-dom';

export default function BrandLogo({ size = 'default', light = false }) {
  const isSmall = size === 'sm';
  const isLarge = size === 'lg';

  const iconSize = isSmall ? 28 : isLarge ? 44 : 36;
  const fontSize = isSmall ? '1.05rem' : isLarge ? '1.5rem' : '1.28rem';

  return (
    <Link to="/" className="d-inline-flex align-items-center gap-2 text-decoration-none" aria-label="Muganiyaa-Mobiles Home">
      {/* Monogram Icon */}
      <div
        style={{
          width: `${iconSize}px`,
          height: `${iconSize}px`,
          backgroundColor: '#B72E35',
          borderRadius: isSmall ? '6px' : '9px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#FFFFFF',
          fontWeight: 800,
          fontSize: isSmall ? '15px' : isLarge ? '22px' : '18px',
          letterSpacing: '-0.5px',
          boxShadow: '0 2px 8px rgba(183, 46, 53, 0.3)',
          flexShrink: 0
        }}
      >
        M
      </div>

      {/* Wordmark */}
      <div className="d-flex flex-column justify-content-center">
        <div
          style={{
            fontFamily: 'var(--font-family)',
            fontWeight: 800,
            fontSize,
            lineHeight: 1.1,
            color: light ? '#FFFFFF' : '#29252A',
            letterSpacing: '-0.02em'
          }}
        >
          Muganiyaa<span style={{ color: '#B72E35', fontWeight: 800 }}>-Mobiles</span>
        </div>
        {!isSmall && (
          <span
            style={{
              fontSize: '0.68rem',
              fontWeight: 600,
              color: light ? 'rgba(255,255,255,0.75)' : '#756D71',
              letterSpacing: '0.04em',
              textTransform: 'uppercase'
            }}
          >
            Mobiles • Electronics • Repairs
          </span>
        )}
      </div>
    </Link>
  );
}
