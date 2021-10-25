import React, { useState } from 'react'
import './Landing.css'
import Logo from '../../images/docs-icon.png'
import CreateNewDocument from '../../images/newdoc.png'

export default function Landing() {
    const [filterModal, toggleFilterModal] = useState(false)
    const [grid, toggleView] = useState(true)
    const [sortModal, toggleSortModal] = useState(false)

    return (
        <div className="page-wrap">
            <div className="header">
                <a href="/" className="logo-group">
                    <img src={Logo} className="logo" />
                    <h1>Docs</h1>
                </a>
                <div class="search">
                    <input type="text" name="search" id="search-bar" placeholder="Search" />
                    <i className="fas fa-search" />
                </div>
                <div className="user-profile">
                    C
                </div>
            </div>

            <div className="documents">
                <div className="toolbar">
                    <p>Recent documents </p>
                    <button className="filter" onClick={() => {}}>

                        {"Owned by anyone", "Owned by me", "Not owned by me"}
                        <i className="fa fa-caret-down" aria-hidden="true"></i>

                    </button>
                    <div className="toolbar-group">
                        <button onClick={() => toggleView((prev) => !prev)} className="toggle-view">
                            {
                                grid ? <i className="fa fa-th" aria-hidden="true" /> : <i className="fa fa-th-list" aria-hidden="true" />
                            }
                        </button>
                        <button className="sort">
                            <i className="fa fa-sort-alpha-asc" aria-hidden="true" />
                        </button>
                        <button className="folder">
                            <i className="fa fa-folder" aria-hidden="true" />
                        </button>
                    </div>
                </div>

                <div className="gallery">
                    <div className="card">
                        <div className="doc-preview">

                        </div>
                        <div className="doc-info-wrap">
                            <p>{"doc title"}</p>
                            <div className="doc-info">
                                file type icon
                                last opened date
                            </div>
                        </div>
                    </div>
                </div>

                <div className="add-new-doc">
                    <div className="add-doc-btn" onClick={() => { }} style={{ backgroundImage: CreateNewDocument }}>
                        {/* <Redirect to={`/documents/${uuidv4()}`} /> */}

                    </div>
                </div>
            </div>

        </div>
    )
}
