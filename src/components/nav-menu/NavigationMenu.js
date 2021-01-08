import React from 'react';
import {
    NavLink,
    withRouter
} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons'

const NavMenu = (props) => {
    const [searchValue, setSearchValue] = React.useState("");

    React.useEffect(() => {
        let paramsString = props.location.search;
        if (paramsString !== "") {
            destructSearchParams(paramsString);
        }
        if (props.location.pathname !== "/search") {
            setSearchValue("");
        }
    }, [props.location]);

    const handleSearchInput = event => {
        setSearchValue(event.target.value);
    }

    const handleSubmitSearch = (event) => {
        event.preventDefault();
        if (searchValue !== "") {
            let searchQuery = `/search?q=${searchValue}&page=1`;
            props.history.push(searchQuery);
        }
    }

    const destructSearchParams = (paramsString) => {
        const params = new URLSearchParams(paramsString);
        const querySearch = params.get('q');
        setSearchValue(querySearch);
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <NavLink className="navbar-brand" to="/movies?page=1" activeClassName="active">Primal Movies</NavLink>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/movies?page=1" activeClassName="active">Home</NavLink>
                        </li>
                    </ul>
                    <form onSubmit={handleSubmitSearch} className="form-inline my-2 my-lg-0">
                        <input className="form-control mr-1" name="search" value={searchValue} onChange={handleSearchInput} type="text" placeholder="Search" />
                        <button className="btn btn-outline-primary my-2 my-sm-0"><FontAwesomeIcon color="white" icon={faSearch} /></button>
                    </form>
                </div>
            </div>
        </nav>
    );
}
export default withRouter(NavMenu);