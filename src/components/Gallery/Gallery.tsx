import React from 'react'
import './Gallery.css'

interface GalleryProps {
    layout: "grid" | "list",
    sort: "Last opened by me" | "Last modified by me" | "Last modified" | "Title"
}

export const Gallery : React.FC<GalleryProps> = ({layout, sort}) => {
    return (
        <div className="gallery">
            
        </div>
    )
}

export default Gallery