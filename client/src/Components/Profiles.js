import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Profiles = () => {

    const [isProfileDataLoading, setIsProfileDataLoading] = useState(false);
    const [profileData, setProfileData] = useState([]);
    const [urlInput, setUrlInput] = useState('');

    const handleProfileSubmit = async (event) => {

        event.preventDefault();

        const url = event.target.elements.url.value;

        if (url) {

            setIsProfileDataLoading(true);
            setProfileData([]);
            setUrlInput(url);

            try {

                const response = await axios.get(`http://localhost:8000/profiles?url=${encodeURIComponent(url)}`);
                setProfileData(response.data);
                setIsProfileDataLoading(false);

            } catch (error) {
                console.log(error);
                setIsProfileDataLoading(false);
            };

        };

    };

    return (

        <div className='container mb-5'>

            <div className="text-center text-lg-start mx-5 my-5">
                <h1 className="display-3 fw-bold text-shadow text-white">Scrape Profile's Data</h1>
            </div>

            <div className='row'>

                <div className="col-12">

                    <form action="" onSubmit={handleProfileSubmit}>

                        <div className="input-group scrape-input">

                            <input
                                type="text"
                                className="form-control bg-white"
                                placeholder='Enter a URL'
                                aria-label="Text input with segmented dropdown button"
                                name='url'
                                value={urlInput}
                                onChange={(e) => setUrlInput(e.target.value)} />

                            <button type='submit' className='scrape-submit px-4'>

                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none" className="h-4 w-4 m-1 md:m-0" strokeWidth="2">
                                    <path
                                        d="M.5 1.163A1 1 0 0 1 1.97.28l12.868 6.837a1 1 0 0 1 0 1.766L1.969 15.72A1 1 0 0 1 .5 14.836V10.33a1 1 0 0 1 .816-.983L8.5 8 1.316 6.653A1 1 0 0 1 .5 5.67V1.163Z"
                                        fill="currentColor"></path>
                                </svg>

                            </button>

                            <button type="button" className="scrape-btn px-4">Categories</button>

                            <button type="button" className="scrape-btn dropdown-toggle dropdown-toggle-split px-3" data-bs-toggle="dropdown" aria-expanded="false">
                                <span className="visually-hidden">Toggle Dropdown</span>
                            </button>

                            <ul className="scrape-ul my-2 dropdown-menu dropdown-menu-end">

                                <li><button className="scrape-dropdown dropdown-item">Name</button></li>
                                <li><button className="scrape-dropdown dropdown-item">Company</button></li>
                                <li><button className="scrape-dropdown dropdown-item">Location</button></li>
                                <li><button className="scrape-dropdown dropdown-item">Entity List</button></li>
                                <li><button className="scrape-dropdown dropdown-item">Link</button></li>

                            </ul>

                        </div>

                        <div className="row gx-0">

                            {isProfileDataLoading ? (

                                <div className="text-center">
                                    <button className="profiles-card-loading mt-5 fw-bold px-5" type="button" disabled>
                                        <span className="spinner-border spinner-border-sm mx-1" role="status" aria-hidden="true"></span>
                                        Loading...
                                    </button>
                                </div>

                            ) : profileData.length === 0 ? (

                                <p className='text-center mt-5 fw-bold fs-3 text-white'>NO PROFILE DATA TO DISPLAY ...</p>

                            ) : (profileData.map((profilesData, index) => (

                                <div
                                    className="profiles-card card mt-5 mx-auto shadow-lg bg-secondary-subtle text-emphasis-secondary border-0"
                                    style={{ width: '23rem', height: 'auto' }}
                                    key={index}>

                                    {profilesData.image ? (
                                        <img src={profilesData.image} class="card-img-top" alt="" />
                                    ) : (
                                        ""
                                        // <div className="no-image-placeholder">
                                        //     <p className='mt-3 mx-4 fw-bold fs-5 text-info'>NO IMAGE TO DISPLAY ...</p>
                                        // </div>
                                    )}

                                    <div className="card-body">

                                        <h5
                                            className="profiles-card-head card-title mt-2 mb-3 p-3 fw-bold fs-5 shadow-sm bg-dark-subtle rounded border-1">
                                            RESULT
                                        </h5>

                                        <ul className="list-group list-group-flush">

                                            <li className="list-group-item bg-body-tertiary rounded border-1 shadow-sm pb-2 px-3 mb-2">
                                                <span>Name:</span>
                                                <span className='mx-2 fs-6 fw-bold text-black-50'>{profilesData.name}</span>
                                            </li>

                                            <li className="list-group-item bg-body-tertiary rounded border-1 shadow-sm pb-2 px-3 mb-2">
                                                <span>Position:</span>
                                                <span className='mx-2 fs-6 fw-bold text-black-50'>{profilesData.position}</span>
                                            </li>

                                            <li className="list-group-item bg-body-tertiary rounded border-1 shadow-sm pb-2 px-3 mb-2">
                                                <span>Location:</span>
                                                <span className='mx-2 fs-6 fw-bold text-black-50'>{profilesData.location}</span>
                                            </li>

                                            <li className="list-group-item bg-body-tertiary rounded border-1 shadow-sm pb-2 px-3 mb-2">
                                                <span>Works at:</span>
                                                <span className='mx-2 fs-6 fw-bold text-black-50'>{profilesData.work}</span>
                                            </li>

                                            <li className="list-group-item bg-body-tertiary rounded border-1 shadow-sm pb-2 px-3 mb-2">
                                                <span>Education:</span>
                                                <span className='mx-2 fs-6 fw-bold text-black-50'>{profilesData.education}</span>
                                            </li>

                                            <li className="list-group-item bg-body-tertiary rounded border-1 shadow-sm pb-2 px-3 mb-2">
                                                <Link to={profilesData.link} target='_blank' className='text-decoration-none text-black fw-normal'>
                                                    <span>Link:</span>
                                                    <span className='mx-2 fs-6 fw-bold text-black-50 text-decoration-underline'>{profilesData.link}</span>
                                                </Link>
                                            </li>

                                        </ul>

                                    </div>

                                </div>)))
                            }

                        </div>

                    </form>

                </div>

            </div>

        </div>

    )

}

export default Profiles;