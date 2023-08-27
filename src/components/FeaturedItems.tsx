import React from 'react'
import { IPopularSales, ITopRatesSlaes } from '../data/data';
import FeatureAppItem from './utils/FeatureAppItem'
import Title from './utils/Title'

const FeaturedItems: React.FC<ITopRatesSlaes> = ({ items, ifExists, title }) => {
  return (
    <>
      <div className={`flex items-center justify-between lg:flex-col
        lg:justify-center the-container ${!ifExists ? 'flex-row':'flex-row-reverse'}`}>
        <div className='-mt-16 max-w-lg lg:max-w-none md:text-center grid items-center
            lg:justify-items-center'>
             {title!="NFT" && <div className='mt-24'></div>}
          <h1 className='text-4xl sm:text-3xl font-bold text-gradient'>FEATURED</h1>
          <h1 className='text-5xl lg:text-4xl md:text-3xl
                sm:text-2xl font-bold text-slate-900 filter
                drop-shadow-lg'>{title}</h1>
        </div>
        <div className={`mt-20 sm:mt-4 ${!ifExists ? 'ml-8 sm:ml-0' :'mr-8'} grid items-center justify-items-center grid-cols-4 xl:grid-cols-3 
        md:grid-cols-2 sm:grid-cols-1 gap-7 lg:gap-5 mt-7
          ${ifExists ? 'grid-cols-4 xl:grid-cols-2 sm:grid-cols-2' : 'grid-cols-4 xl:grid-cols-3md:grid-cols-2 sm:grid-cols-2'}
        `}>

          {items?.map((item, i) => (
            <FeatureAppItem {...item} key={i} ifExists={ifExists} />
          ))}
        </div>
      </div>
    </>
  )
}

export default FeaturedItems