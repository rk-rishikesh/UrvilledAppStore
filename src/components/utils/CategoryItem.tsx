import React from 'react'
import { Item1, Item5 } from '../../data/data'

import { NavLink, useNavigate } from "react-router-dom";

const CategoryItem: React.FC<Item1> = ({ ifExists, id, title, text, rating, btn, img, price, color, shadow, route}) => {

    return (
        <>
            <div className={`relative bg-gradient-to-b ${color} ${shadow} grid items-center 
             rounded-xl py-4 px-5 transition-all duration-700 ease-in-out w-full 
            hover:scale-105 ${ifExists ? 'justify-items-start' : 'justify-items-center'}`}>
                <div className={`grid items-center ${ifExists ? 'justify-items-start' : 'justify-items-center'}
                `}>
                    <h1 className='text-slate-200 text-xl lg:text-lg md:text-base font-medium
                    filter drop-shadow'>{title}</h1>
                    <p className='text-slate-200 filter drop-shadow text-base md:text-sm
                    font-normal'>{text}</p>
                    <div className='flex items-center justify-between w-28 my-2'>
                        {/* <div className='flex items-center bg-white/80 px-1 rounded blur-effect-theme  '>
                            <h1 className='text-black text-sm font-medium'>{price}</h1></div> */}
                        {/* <div className='flex items-center gap-1'>
                            <StarIcon className='icon-style w-5 h-5 md:w-4 md:h-4' />
                            <h1 className='md:text-sm font-normal text-slate-100'>{rating}</h1></div> */}
                    </div>
                    <div className={'justify-center'}>
                    <NavLink to={route}>
                    <img src={img} alt={`img/item-img/${id}`}
                            className={"transitions-theme h-100 w-100"}
                        />
          </NavLink>
                        
                    </div>
                </div>

            </div>
        </>
    )
}

export default CategoryItem



