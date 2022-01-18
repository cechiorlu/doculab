import React, { useEffect, useState } from 'react';
import './Document.css';
import TextEditor from '../TextEditor/TextEditor';
import seo from '../../utils/seo';
//@ts-ignore
import Logo from '../../images/docs-icon.png';


const Document: React.FC = () => {
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

    // Get page url
    useEffect(() => {
        getURL(window.location.href)
    }, [])

    // Page title input handlers
    const handleInputChange = (e: any) => {
        setInputValue(e.target.value)
    }

    const handleTitleChange = () => {
        setDocTitle(inputValue)
    }

    const handleEnterKey = (e: any) => {
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
                <button className="saved"><i className="fa fa-check-square-o" aria-hidden="true" /> saved</button>
                <button className="share-btn" onClick={urlToClipboard}>
                    <i className="fa fa-link" aria-hidden="true" />
                    Share
                </button>
                <div className="user-profile">
                    {/* to be dynamically generated */}
                    C
                </div>
            </div>

            <TextEditor title={docTitle} />
            <div className="copy-notification"
                style={{ display: notification ? "block" : "none" }}
            >
                Link copied to clipboard
            </div>
        </div>
    )
}

export default Document