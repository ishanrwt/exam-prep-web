import React from 'react';

export default function Header({ timeLeft }) {
  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;
  const pad = (n) => String(n).padStart(2, '0');

  const isLow = timeLeft <= 300;

  return (
    <header className="exam-header">
      <div className="header-brand">
        <h1>TCS NQT Mock</h1>
      </div>
      <div className="header-actions">
        <div className={`header-timer ${isLow ? 'timer-warning' : ''}`} aria-live="polite">
          <svg className="timer-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
          <span className="timer-value">
            {pad(hours)}:{pad(minutes)}:{pad(seconds)}
          </span>
        </div>
        <img
          className="profile-avatar"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCDoydAmU763ZE6xJCUxMxMwthraOlP3zdUSELShGfGq_UKH7k5u_FU4EXHq7HFkx6CyONMxtkvq392UMvDiALuVilb_Dcwx7DiS9Ho8GjZwUt14B5szY7iY4JlHgPE2oniFmkufw9bLP6_xliNyoQgQXBgNERywBcrhKrUZxuUrcvvsnLkVFgO7rKn1RePv19pho28dgAK7t-_0BicLnBoOY04Gq8I1HiSippwSTN78nV_cnn9TwOUfrFQ02qWjkmvJ7GjnwEpuHcV"
          alt="Candidate Avatar"
        />
      </div>
    </header>
  );
}
