import React, { useEffect, useState } from 'react'
import './Document.css'
import TextEditor from '../TextEditor/TextEditor'
import seo from '../../helpers/seo'
import Logo from '../../images/docs-icon.png'

export default function Document() {
    const [inputValue, setInputValue] = useState('New Document')
    const [docTitle, setDocTitle] = useState(inputValue)
    const [URL, getURL] = useState('')
    const [notification, setNotification] = useState(false)


    // assign web title to ducument title
    useEffect(() => {
        seo({
            title: docTitle,
        })
    })

    useEffect(() => {
        getURL(window.location.href)
    }, [])

    const handleInputChange = e => {
        setInputValue(e.target.value)
    }

    const handleTitleChange = () => {
        setDocTitle(inputValue)
    }

    const handleEnterKey = e => {
        if (e.keyCode === 13) {
            handleTitleChange()
            e.target.blur()
        }
    }

    const urlToClipboard = () => {
        navigator.clipboard.writeText(URL)
        setNotification(true)
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            setNotification(false)
        }, 2000)
        return () => clearTimeout(timer);
    }, [notification])


    return (
        <div className="document">
            <div className="document-header">
                <a href="/" className="logo-group">
                    <img src={Logo} className="logo" alt="logo" />
                </a>
                <input type="text" name="document-title" id="doc-title" value={inputValue} onChange={handleInputChange} onKeyUp={handleEnterKey} onBlur={handleTitleChange} />
                <button className="tag">
                    .docx
                </button>
                <button className="saved"><i class="fa fa-check-square-o" aria-hidden="true" /> saved</button>
                <button className="share-btn" onClick={urlToClipboard}>
                    <i class="fa fa-link" aria-hidden="true" />
                    Share
                </button>
                <div className="user-profile">
                    {/* to be dynamically generated */}
                    C
                </div>
            </div>

            <TextEditor />
            <div className="copy-notification"
                style={{ display: notification ? "block" : "none" }}
            >
                Link copied to clipboard
            </div>
        </div>
    )
}
