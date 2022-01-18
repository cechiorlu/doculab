import React, { useState } from 'react'
import './Landing.css'
//@ts-ignore
import Logo from '../../images/docs-icon.png'
//@ts-ignore
import NewDocIcon from '../../images/newdoc.png'
import DropModal from '../DropModal/DropModal'
import { useHistory } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid'
import Gallery from '../Gallery/Gallery'
import { filterOptions, sortOptions } from "../../utils/types";


export const Landing : React.FC = () => {
    const [filterModal, toggleFilterModal] = useState(false)
    const [filter, setFilter] = useState<filterOptions>('Owned by anyone')
    const [grid, toggleView] = useState(true)
    const [sortModal, toggleSortModal] = useState(false)
    const [sort , setSortCriteria] = useState<sortOptions>('Last opened by me')

    const history = useHistory();

    const handleRoute = () => {
        history.push(`/document/${uuidv4()}`);
    }

    const handleFilterChange = (value: filterOptions) => {
        setFilter(value)
    }

    const handleSortChange = (value: sortOptions) => {
        setSortCriteria(value)
    }

    return (
        <div className="landing">
            <div className="landing-header">
                <a href="/" className="logo-group">
                    <img src={Logo} className="logo" alt="logo" />
                    <h1>Docs</h1>
                </a>
                <div className="search">
                    <input type="text" name="search" id="search-bar" placeholder="Search" />
                    <i className="fas fa-search" />
                </div>
                <div className="user-profile">
                    {/* to be dynamically generated */}
                    C
                </div>
            </div>

            <div className="documents">
                <div className="toolbar">
                    <p className="toolbar-h">Recent documents </p>

                    {/* filter dropdown */}
                    <button className="filter" onClick={() => toggleFilterModal((curr) => !curr)} onBlur={() => toggleFilterModal(false)}>
                        <span>
                            {filter}
                        </span>
                        <i className="fa fa-caret-down" aria-hidden="true" />
                        <DropModal
                            options={["Owned by anyone", "Owned by me", "Not owned by me"]}
                            visible={filterModal}
                            onSelect={handleFilterChange}
                        />
                    </button>

                    <div className="toolbar-group">
                        {/* View config - grid | list view */}
                        <button onClick={() => toggleView((prev) => !prev)} className="toggle-view">
                            {grid ? <i className="fa fa-th" aria-hidden="true" /> : <i className="fa fa-th-list" aria-hidden="true" />}
                        </button>

                        {/* sort config */}
                        <button className="sort" onClick={() => toggleSortModal((curr) => !curr)} onBlur={() => toggleSortModal(false)}>
                            <i className="fa fa-sort-alpha-asc" aria-hidden="true" />
                            <DropModal
                                options={["Last opened by me", "Last modified by me", "Last modified", "Title"]}
                                visible={sortModal}
                                onSelect={handleSortChange}
                            />
                        </button>

                        {/* file explorer */}
                        <button className="folder">
                            <i className="fa fa-folder" aria-hidden="true" />
                        </button>
                    </div>
                </div>

                <Gallery layout={grid ? "grid" : "list"} sort={sort as sortOptions} />

                <div className="add-new-doc" onClick={handleRoute}>
                    <div className="add-doc-btn" style={{ backgroundImage: `url(${NewDocIcon})` }}></div>
                </div>
            </div>

        </div>
    )
}



export default Landing