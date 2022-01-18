import { useState, useEffect } from 'react';

const getWidth = () => window.innerWidth
    || document.documentElement.clientWidth
    || document.body.clientWidth;

function IsMobile() {
    let [width, setWidth] = useState(getWidth());


    useEffect(() => {
        
        const resizeListener = () => {
            clearTimeout();
            setTimeout(() => setWidth(getWidth()), 150);
        };
        // set resize listener
        window.addEventListener('resize', resizeListener);

        // clean up function
        return () => {
            // remove resize listener
            window.removeEventListener('resize', resizeListener);
        }
    }, [])

    return width < 576
}

export default IsMobile