import React from 'react'
import './DropModal.css'

interface DropModalProps {
    options: string[],
    visible: boolean,
    onSelect: (arg: any) => any
}

export const DropModal: React.FC<DropModalProps> = ({ options, visible, onSelect }) => {

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

export default DropModal
