import React from 'react';

export default function DebugFloatingShapes() {
  return (
    <div className="fixed inset-0 z-50 overflow-visible pointer-events-none">
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className="floating-shape shape-blue"
          style={{
            width: '40px',
            height: '40px',
            top: '50px',
            left: `${50 + i * 50}px`,
            borderRadius: '50%',
            opacity: 1,
            animation: 'none',
            backgroundColor: 'rgba(255, 0, 0, 0.7)',
            border: '2px solid red',
            boxShadow: 'none',
          }}
        ></div>
      ))}
    </div>
  );
}//goddspeed
