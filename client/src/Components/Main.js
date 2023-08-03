import React from 'react';
import Navbar from './Navbar';
import Profiles from './Profiles';
import Jobs from './Jobs';
import { Route, Routes } from 'react-router-dom';

const Main = () => {

    return (

        <>

            <Navbar />

            <div className='Main'>

                <div className="container my-4">
                    <h1 className='text-white'>WELCOME TO THE SCRAPPER</h1>
                    <p className='text-white mx-2'>Scrape all the profile's and job's data just by entering a URL .</p>
                </div>

                <Routes>

                    <Route path='/profiles' element={<Profiles />}></Route>

                    <Route path='/jobs' element={<Jobs />}></Route>

                </Routes>

            </div>

        </>

    )

}

export default Main;