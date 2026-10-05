const Logo = ({ size = 'medium' }) => {
  const sizes = {
    small: {
      icon: 32,
      text: '18px',
    },
    medium: {
      icon: 40,
      text: '22px',
    },
    large: {
      icon: 48,
      text: '26px',
    },
  };

  const current = sizes[size] || sizes.medium;

  return (
    <div
      className="helpdesk-logo"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '10px',
      }}
    >
      <svg
        width={current.icon}
        height={current.icon}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <rect
          width="48"
          height="48"
          rx="14"
          fill="#7C5CFC"
        />

        <path
          d="M14 17.5C14 15.567 15.567 14 17.5 14H30.5C32.433 14 34 15.567 34 17.5V27.5C34 29.433 32.433 31 30.5 31H25.5L20 35V31H17.5C15.567 31 14 29.433 14 27.5V17.5Z"
          fill="white"
        />

        <circle cx="20" cy="22.5" r="1.5" fill="#7C5CFC" />
        <circle cx="24" cy="22.5" r="1.5" fill="#7C5CFC" />
        <circle cx="28" cy="22.5" r="1.5" fill="#7C5CFC" />
      </svg>

      <span
        style={{
          fontFamily: "'Outfit', sans-serif",
          fontSize: current.text,
          fontWeight: 700,
          letterSpacing: '-0.5px',
          color: '#2B1B4D',
          lineHeight: 1,
        }}
      >
        Helpdesk <span style={{ color: '#7C5CFC' }}>Pro</span>
      </span>
    </div>
  );
};

export default Logo;