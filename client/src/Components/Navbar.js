import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (

        <>

            <nav className="navbar navbar-expand-lg bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand text-white fw-bold fs-4 mx-3 text-uppercase" to="/main">The Scrapper</Link>
                    <button className="navbar-toggler nav-toggle-btn" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="nav-toggle-span navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse mx-md-5" id="navbarSupportedContent">
                        <div className="btn-group mx-lg-auto" role="search">
                            <Link to="/profiles" className="nav-btn text-decoration-none px-5 mx-2" type="submit">Get  Profiles Data</Link>
                            <Link to="/jobs" className="nav-btn text-decoration-none px-5 mx-2" type="submit">Get Jobs Data</Link>
                        </div>
                    </div>
                </div>
            </nav>

        </>

    )

}

export default Navbar;