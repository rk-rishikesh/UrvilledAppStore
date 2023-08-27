import React from 'react'
import { AppItem } from '../../data/data'
import { useEffect, useState } from 'react';
import { NavLink } from "react-router-dom";

const AppList: React.FC<AppItem> = ({ id }) => {
    const ifExists = false;
    const [logo, setAppLogo] = useState("");
    const [name, setName] = useState();

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`https://api.meroku.store/api/v1/dapp/search/${id}`);
            const data = await response.json();
            console.log(data)
            setName(data.data[0].name)
            setAppLogo(data.data[0].images.logo)
        };

        fetchData();
    }, []);

    return (
        <>
            <NavLink to={`/app/${id}`}>
                <div className={` relative bg-gradient-to-b from-white-600 to-white-500 shadow-lg shadow-gray-500 grid items-center 
             rounded-xl py-4 px-4 transition-all duration-700 ease-in-out w-full 
            hover:scale-105 ${ifExists ? 'justify-items-start' : 'justify-items-center'}`}>
                    <div className={`grid items-center ${ifExists ? 'justify-items-start' : 'justify-items-center'}
                `}>
                        

                        <div className={'justify-center'}>
                            
                            <img src={logo} alt="Loading"
                                onError={({ currentTarget }) => {
                                    currentTarget.onerror = null; // prevents looping
                                    currentTarget.src = "https://user-images.githubusercontent.com/20684618/31289519-9ebdbe1a-aae6-11e7-8f82-bf794fdd9d1a.png";
                                }}
                                className={"mt-4 transitions-theme h-36 w-40 rounded-xl"}
                            />
                        </div>
                        
                        <h1 className='mt-2 text-black-500 text-sm lg:text-lg md:text-base font-medium
                    filter drop-shadow'>{name}</h1>
                    </div>
                </div>
            </NavLink>

        </>
    )
}

export default AppList



