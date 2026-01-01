import React, { useState, useEffect } from 'react';
import './RunningPanda.css';

const RunningPanda = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isWaving, setIsWaving] = useState(false);

    useEffect(() => {
        const triggerAnimation = () => {
            setIsVisible(true);
            setTimeout(() => {
                setIsVisible(false);
                setTimeout(triggerAnimation, Math.random() * 8000 + 7000);
            }, 5000);
        };

        const initialTimeout = setTimeout(triggerAnimation, 2000);

        // Listen for custom events or check for avatar hover periodically
        const handleAvatarHover = () => {
            if (isVisible) {
                setIsWaving(true);
                setTimeout(() => setIsWaving(false), 2000);
            }
        };

        window.addEventListener('panda-wave', handleAvatarHover);
        return () => {
            clearTimeout(initialTimeout);
            window.removeEventListener('panda-wave', handleAvatarHover);
        };
    }, [isVisible]);

    return (
        <div className={`panda-container ${isVisible ? 'running' : ''} ${isWaving ? 'waving' : ''}`}>
            <svg
                width="60"
                height="60"
                viewBox="0 0 200 200"
                xmlns="http://www.w3.org/2000/svg"
                className="panda-svg"
            >
                <circle cx="65" cy="65" r="22" fill="#222" />
                <circle cx="135" cy="65" r="22" fill="#222" />
                <circle cx="100" cy="115" r="55" fill="#fff" stroke="#000" strokeWidth="1.5" />
                <ellipse cx="80" cy="110" rx="14" ry="18" fill="#222" transform="rotate(-10 80 110)" />
                <ellipse cx="120" cy="110" rx="14" ry="18" fill="#222" transform="rotate(10 120 110)" />
                <circle cx="82" cy="106" r="4" fill="#fff" />
                <circle cx="122" cy="106" r="4" fill="#fff" />
                <circle cx="78" cy="112" r="1.5" fill="#fff" opacity="0.5" />
                <circle cx="118" cy="112" r="1.5" fill="#fff" opacity="0.5" />
                <circle cx="60" cy="130" r="10" fill="#ffb7ce" opacity="0.4" />
                <circle cx="140" cy="130" r="10" fill="#ffb7ce" opacity="0.4" />
                <path d="M96,128 q4,4 8,0 t-4,6 t-4,-6" fill="#222" />
                <path d="M70,165 q30,-10 60,0 t-10,30 t-40,0 t-10,-30" fill="#222" />

                {/* Waving paw */}
                <g className="waving-paw">
                    <circle cx="150" cy="150" r="12" fill="#222" />
                </g>

                <circle cx="85" cy="175" r="10" fill="#222" />
                <circle cx="115" cy="175" r="10" fill="#222" />
            </svg>
        </div>
    );
};

export default RunningPanda;
