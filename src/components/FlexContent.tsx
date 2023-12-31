import React from 'react'
import { IHiglight } from '../data/data'
import { NavLink } from "react-router-dom";

const FlexContent: React.FC<IHiglight> = ({ ifExists, title, heading, img, url, text, btn }) => {
    return (
        <>
            <div className={`flex items-center justify-between lg:flex-col
        lg:justify-center the-container ${!ifExists ? 'flex-row' : 'flex-row-reverse'}`}>
                <div className='max-w-lg lg:max-w-none w-full md:text-center grid items-center
            lg:justify-items-center'>
                    <h1 className='text-4xl sm:text-3xl  font-bold text-gradient'>{heading}</h1>
                    <h1 className='text-5xl lg:text-4xl md:text-3xl
                sm:text-2xl font-bold text-slate-900 filter
                drop-shadow-lg'>{title}</h1>
                    <p className='xl:text-sm my-4 text-slate-900'>{text}</p>
                    <a className="flex items-center" target={"_blank"} role="button">
                        <NavLink to={url}>
                            <button type='button' className='button-theme bg-slate-900 shadow-slate-900
                    text-slate-100 py-1.5'>{btn}</button>
                        </NavLink>

                    </a>
                </div>
                <div className='sm:mt-4 flex items-center justify-center max-w-xl relative lg:max-w-none w-full'>
                    <img src={img} alt={`img/${heading}`}
                        className={`w-auto object-fill transitions-theme
                    ${ifExists ? 'h-80 lg:h-56 md-h-52 sm:h-48 xsm:h-36 rotate-[34deg] hover:rotate-12'
                                : 'h-72 lg:h-64 md:h-60 sm:h-48 rotate-[-9deg] hover:rotate-12'}`}
                    />
                </div>
            </div>
        </>
    )
}

export default FlexContent