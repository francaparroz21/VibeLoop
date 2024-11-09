import React from 'react';

export const ExampleCarouselImage = ({ text, imageUrl }) => {
    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#ddd', 
                color: '#333',
                fontSize: '24px',
                position: 'relative', 
                overflow: 'hidden', 
                aspectRatio: '16/9',
                width: '100%', 
            }}
        >
            <img
                src={imageUrl}
                alt={text}
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain', 
                }}
            />
            <div style={{
                position: 'relative', 
                zIndex: 1, 
                color: 'white',
                fontSize: '24px',
                textAlign: 'center',
            }}>
                {text}
            </div>
        </div>
    );
};
