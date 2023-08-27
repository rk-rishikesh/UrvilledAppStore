import React from 'react'
import { AppItems } from '../data/data';
import AppList from './utils/AppList'


const Category:React.FC< AppItems> = ({items,ifExists}) => {
  console.log(items)
  return (
    <>
      <div className='mb-32 mt-16 the-container'>
        <div className={`grid items-center justify-items-center grid-cols-4 xl:grid-cols-3 
        md:grid-cols-2 sm:grid-cols-1 gap-7 lg:gap-5 mt-7
          ${ifExists ? 'grid-cols-3 xl:grid-cols-2 sm:grid-cols-2':'grid-cols-4 xl:grid-cols-3md:grid-cols-2 sm:grid-cols-2'}
        `}>
          {items?.map((item, i) => (
            

               <AppList {...item} key={i}/>


           
          ))}
        </div>
      </div>
    </>
  )
}

export default Category