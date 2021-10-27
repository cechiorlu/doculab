import React from 'react'
import './DropModal.css'

export default function DropModal({ options, visible, onSelect }) {

    return (
        <div className="drop-wrap"
            style={{
                display: visible ? 'flex' : 'none'
            }}
        >
            {options.map((option, key) => <p className="select-option" key={key} onClick={() => onSelect(option)}>{option}</p>)}
        </div>
    )
}
