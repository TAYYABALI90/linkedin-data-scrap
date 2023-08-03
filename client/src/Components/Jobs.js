import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Jobs = () => {

    const [isJobDataLoading, setIsJobDataLoading] = useState(false);
    const [jobData, setJobData] = useState([]);
    const [urlInput, setUrlInput] = useState('');

    const handleJobSubmit = async (event) => {

        event.preventDefault();

        const url = event.target.elements.url.value;

        setIsJobDataLoading(true);
        setJobData([]);
        setUrlInput(url);

        if (url) {

            try {

                const response = await axios.get(`http://localhost:8000/jobs?url=${url}`);
                setJobData(response.data);
                setIsJobDataLoading(false);

            } catch (error) {
                console.log(error);
                setIsJobDataLoading(false);
            };

        };

    };

    return (

        <div className='container mb-5'>

            <div className="text-center text-lg-start mx-5 my-5">
                <h1 className="display-3 fw-bold text-shadow text-white">Scrape Job's Data</h1>
            </div>

            <div className='row'>

                <div className="col-12">

                    <form action="" onSubmit={handleJobSubmit}>

                        <div className="input-group scrape-input">

                            <input
                                type="text"
                                className="form-control bg-white"
                                placeholder='Enter a URL'
                                aria-label="Text input with segmented dropdown button"
                                name='url'
                                value={urlInput}
                                onChange={(e) => setUrlInput(e.target.value)}
                            />

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

                            <ul className="scrape-ul dropdown-menu dropdown-menu-end">

                                <li><button className="scrape-dropdown dropdown-item">Title</button></li>
                                <li><button className="scrape-dropdown dropdown-item">Company</button></li>
                                <li><button className="scrape-dropdown dropdown-item">Location</button></li>
                                <li><button className="scrape-dropdown dropdown-item">Time</button></li>
                                <li><button className="scrape-dropdown dropdown-item">Link</button></li>

                            </ul>

                        </div>

                        <div className="row gx-0">

                            {isJobDataLoading ? (

                                <div className="text-center">
                                    <button className="jobs-card-loading mt-5 fw-bold px-5" type="button" disabled>
                                        <span className="spinner-border spinner-border-sm mx-1" role="status" aria-hidden="true"></span>
                                        Loading...
                                    </button>
                                </div>

                            ) : jobData.length === 0 ? (

                                <p className='text-center mt-5 fw-bold fs-3 text-white'>NO JOB DATA TO DISPLAY ...</p>

                            ) : jobData.map((jobsData, index) => (

                                <div
                                    className="jobs-card card mt-5 mx-auto shadow-lg bg-secondary-subtle text-emphasis-secondary border-0"
                                    style={{ width: '23rem' }}
                                    key={index}>

                                    {jobsData.image ? (
                                        <img src={jobsData.image} class="card-img-top" alt="" />
                                    ) : (
                                        ""
                                        // <div className="no-image-placeholder">
                                        //     <p className='mt-3 mx-4 fw-bold fs-5 text-black-50'>NO IMAGE TO DISPLAY ...</p>
                                        // </div>
                                    )}

                                    <div className="card-body">

                                        <h5
                                            className="jobs-card-head card-title mt-2 mb-3 p-3 fw-bold fs-5 shadow-sm bg-dark-subtle rounded border-1">
                                            RESULT
                                        </h5>

                                        <ul className="list-group list-group-flush">

                                            <li className="list-group-item bg-body-tertiary rounded border-1 shadow-sm pb-2 px-3 mb-2">
                                                <span>Title:</span>
                                                <span className='mx-2 fs-6 fw-bold text-black-50'>{jobsData.title}</span>
                                            </li>

                                            <li className="list-group-item bg-body-tertiary rounded border-1 shadow-sm pb-2 px-3 mb-2">
                                                <span>Company:</span>
                                                <span className='mx-2 fs-6 fw-bold text-black-50'>{jobsData.company}</span>
                                            </li>

                                            <li className="list-group-item bg-body-tertiary rounded border-1 shadow-sm pb-2 px-3 mb-2">
                                                <span>Location:</span>
                                                <span className='mx-2 fs-6 fw-bold text-black-50'>{jobsData.location}</span>
                                            </li>

                                            <li className="list-group-item bg-body-tertiary rounded border-1 shadow-sm pb-2 px-3 mb-2">
                                                <span>Time:</span>
                                                <span className='mx-2 fs-6 fw-bold text-black-50'>{jobsData.time}</span>
                                            </li>

                                            <li className="list-group-item bg-body-tertiary rounded border-1 shadow-sm pb-2 px-3 mb-2">
                                                <Link to="_blank" className='text-decoration-none text-black fw-normal'>
                                                    <span>Link:</span>
                                                    <span className='mx-2 fs-6 fw-bold text-black-50 text-decoration-underline'>{jobsData.link}</span>
                                                </Link>
                                            </li>

                                        </ul>

                                    </div>

                                </div>))
                            }

                        </div>

                    </form>

                </div>

            </div>

        </div>

    )

}

export default Jobs;