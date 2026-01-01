import React, { useState, useEffect } from 'react';
import './ReadingProgressBar.css';

const ReadingProgressBar = () => {
    const [completion, setCompletion] = useState(0);

    useEffect(() => {
        const updateScrollCompletion = () => {
            const currentProgress = window.scrollY;
            const scrollHeight = document.body.scrollHeight - window.innerHeight;
            if (scrollHeight) {
                setCompletion(
                    Number((currentProgress / scrollHeight).toFixed(2)) * 100
                );
            }
        };

        window.addEventListener('scroll', updateScrollCompletion);

        return () => {
            window.removeEventListener('scroll', updateScrollCompletion);
        };
    }, []);

    return (
        <div className="reading-progress-container">
            <div
                className="reading-progress-bar"
                style={{ width: `${completion}%` }}
            />
        </div>
    );
};

export default ReadingProgressBar;
