import React from 'react'
import { Item1, Item5 } from '../../data/data'
import { setAdditemToCart, setOpenCart } from '../../redux/CartSlice';
import { useAppDispatch } from '../../redux/store';
import { NavLink } from "react-router-dom";


const FeatureAppItem: React.FC<Item1> = ({ ifExists, id, title, text, rating, btn, img, price, color, shadow, }) => {
    const dispatch = useAppDispatch()

    const onAddToCart = () => {
        const item: Item5 = { id, title, text, img, price, color, shadow }

        dispatch(setAdditemToCart(item));
    }

    const onCartToggle = () => {
        dispatch(setOpenCart({
            cartState: true
        }))
    }

    return (
        <>
        <NavLink to={`/app/${id}`}>
            <div className={`relative bg-gradient-to-b from-white-100 shadow-lg shadow-gray-200 grid items-center 
             rounded-xl py-4 px-5 transition-all duration-700 ease-in-out w-full 
            hover:scale-105 ${ifExists ? 'justify-items-start' : 'justify-items-center'}`}>
                <div className={`grid items-center ${ifExists ? 'justify-items-start' : 'justify-items-center'}
                `}>
                    <h1 className='text-black-200 text-xl lg:text-lg md:text-base font-medium
                    filter drop-shadow'>{title}</h1>
                    <div className={'mt-8 justify-center'}>
                        <img src={img} alt={`img/item-img/${id}`}
                            className={"transitions-theme h-[175px] w-[200px] sm:h-[120px] rounded"}
                        />
                    </div>
                </div>

            </div>
            </NavLink>
        </>
    )
}

export default FeatureAppItem



