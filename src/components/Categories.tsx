import React from 'react'
import { IPopularSales, ITopRatesSlaes } from '../data/data';
import CategoryItem from './utils/CategoryItem'
import Title from './utils/Title'

const Categories:React.FC< ITopRatesSlaes> = ({items,ifExists,title}) => {
  return (
    <>
      <div className='mb-4 sm:mb-40 the-container'>
        <Title title={title}/>
        <div className={`mt-16 grid items-center justify-items-center grid-cols-4 xl:grid-cols-3 
        md:grid-cols-2 sm:grid-cols-1 gap-7 lg:gap-5 mt-7
          ${ifExists ? 'grid-cols-4 xl:grid-cols-2 sm:grid-cols-2':'grid-cols-4 xl:grid-cols-3md:grid-cols-2 sm:grid-cols-1'}
        `}>
          {items?.map((item, i) => (
            <CategoryItem {...item} key={i} ifExists={ifExists}/>
          ))}
        </div>
      </div>
    </>
  )
}

export default Categories