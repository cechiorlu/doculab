import React from 'react';

interface ErrorBlockProps {

}

export const ErrorBlock: React.FC<ErrorBlockProps> = ({ children }) => {
    return (
        <p style={{
            color: "red",
            fontSize: '13.5px',
        }}>
            {children}
        </p>
    );
}

export default ErrorBlock