import React from 'react';
import {    
    NavLink,
    withRouter
} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons'

class NavMenu extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            searchValue: "",
            formSubmitted: false
        };
    }

    handleSearchInput = event => {
        this.setState({searchValue: event.target.value });
    };

    handleSubmitSearch = (event) => {
        let { searchValue } = this.state;
        if(searchValue != ""){
            let searchQuery = `/search?q=${this.state.searchValue}`;            
            this.props.history.push(searchQuery);
        }
        event.preventDefault();
    };

    destructSearchParams = (paramsString) => {
        const params = new URLSearchParams(paramsString); 
        const querySearch = params.get('q');
        this.setState({searchValue: querySearch});
    }

    componentWillMount(){
        let paramsString = this.props.location.search;
        if(paramsString !== ""){
            this.destructSearchParams(paramsString);
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.location.pathname != "/search"){
            this.setState({searchValue: ""});
        }
    }

    render(){
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container">
                    <NavLink exact={true} className="navbar-brand" to="/" activeClassName="active">Primal Movies</NavLink>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/" activeClassName="active">Home</NavLink>
                            </li>
                        </ul>
                        <form onSubmit={this.handleSubmitSearch} className="form-inline my-2 my-lg-0">
                            <input className="form-control mr-1" name="search" value={this.state.searchValue} onChange={this.handleSearchInput} type="text" placeholder="Search" />
                            <button className="btn btn-outline-primary my-2 my-sm-0"><FontAwesomeIcon color="white" icon={faSearch}/></button>
                        </form>
                    </div>
                </div>
            </nav>
        );
    }
}
export default withRouter(NavMenu);