export interface Item1 {
  ifExists: boolean;
  id: string;
  title: string;
  text: string;
  rating: string;
  btn: string;
  img: string;
  price: string;
  color: string;
  shadow: string;
  route:string;
}

export interface Item5 {
  id: string;
  title: string;
  text: string;
  img: string;
  price: string;
  color: string;
  shadow: string;
}

export interface IPopularSales {
  ifExists: boolean
  title: string;
  items: Item1[];
}

export interface IHiglight {
  ifExists: boolean;
  heading: string;
  title: string;
  text: string;
  btn: string;
  url: string;
  img: string;
}
export interface ISneaker {
  ifExists: boolean;
  heading: string;
  title: string;
  text: string;
  btn: string;
  url: string;
  img: string;
}

export interface Item2 {
  id: string;
  title: string;
  text: string;
  rating: string;
  btn: string;
  img: string;
  price: string;
  color: string;
  shadow: string;
  route:string;
}

export interface AppItems {
  ifExists: boolean
  title: string;
  items: AppItem[];
}

export interface AppItem {
  id: string;
}

export interface ITopRatesSlaes {
  ifExists: boolean
  title: string;
  items: Item2[];
}

export interface News {
  title: string;
  text: string;
  img: string;
  url: string;
  like: string;
  time: string;
  by: string;
  btn: string;
}

export interface IStory {
  title: string;
  news: News[];
}

export interface Titles {
  title: string;
}

export interface ICartItems {
  cartQuantity:number
  color:string
  id:string
  img:string
  price:string
  shadow:string
  text: string
  title: string
}


const featuredNFT = {
  ifExists: false,
  title: "NFT",
  items: [
    {
      id: "mintify.app",
      title: "Mintify",
      text: "MEN Running Shoes",
      rating: "4.9",
      btn: "Buy Now",
      img: "https://dgshe1iny46ip.cloudfront.net/mintify.app/images/logo.png",
      price: "200",
      color: "from-white-600 to-white-500",
      shadow: "shadow-lg shadow-gray-500",
      route:""
    },
    {
      id: "opensea.app",
      title: "OpenSea",
      text: "MEN Running Shoes",
      rating: "4.5",
      btn: "Buy Now",
      img: "https://dgshe1iny46ip.cloudfront.net/opensea.app/images/logo.png",
      price: "200",
      color: "from-red-500 to-rose-500",
      shadow: "shadow-lg shadow-rose-500",
      route:""
    },
    {
      id: "rariable.app",
      title: "Rariable",
      text: "MEN Running Shoes",
      rating: "5+",
      btn: "Buy Now",
      img: "https://dgshe1iny46ip.cloudfront.net/rarible.app/images/logo.png",
      price: "200",
      color: "from-violet-500 to-indigo-500",
      shadow: "shadow-lg shadow-violet-500",
      route:""
    },
    {
      id: "surfaceboard.app",
      title: "Surface Board",
      text: "MEN Running Shoes",
      rating: "5+",
      btn: "Buy Now",
      img: "https://dgshe1iny46ip.cloudfront.net/surfaceboard.app/images/logo.png",
      price: "200",
      color: "from-violet-500 to-indigo-500",
      shadow: "shadow-lg shadow-violet-500",
      route:""
    },
  ],
};

const featuredDeFi = {
  ifExists: false,
  title: "DEFI",
  items: [
    {
      id: "1inch.app",
      title: "1inch dApp",
      text: "MEN Running Shoes",
      rating: "4.9",
      btn: "Buy Now",
      img: "https://dgshe1iny46ip.cloudfront.net/1inch.app/images/logo.png",
      price: "200",
      color: "from-white-600 to-white-500",
      shadow: "shadow-lg shadow-gray-500",
      route:""
    },
    {
      id: "aave.app",
      title: "Aave",
      text: "MEN Running Shoes",
      rating: "4.5",
      btn: "Buy Now",
      img: "https://dgshe1iny46ip.cloudfront.net/aave.app/images/logo.png",
      price: "200",
      color: "from-red-500 to-rose-500",
      shadow: "shadow-lg shadow-rose-500",
      route:""
    },
    {
      id: "curve.app",
      title: "Curve",
      text: "MEN Running Shoes",
      rating: "5+",
      btn: "Buy Now",
      img: "https://dgshe1iny46ip.cloudfront.net/curve.app/images/logo.png",
      price: "200",
      color: "from-violet-500 to-indigo-500",
      shadow: "shadow-lg shadow-violet-500",
      route:""
    },
    {
      id: "uniswap.app",
      title: "Uniswap v1",
      text: "MEN Running Shoes",
      rating: "5+",
      btn: "Buy Now",
      img: "https://dgshe1iny46ip.cloudfront.net/uniswap.app/images/logo.png",
      price: "200",
      color: "from-violet-500 to-indigo-500",
      shadow: "shadow-lg shadow-violet-500",
      route:""
    },
  ],
};

const featuredSocial = {
  ifExists: false,
  title: "SOCIAL",
  items: [
    {
      id: "dmail.app",
      title: "DMail",
      text: "MEN Running Shoes",
      rating: "4.9",
      btn: "Buy Now",
      img: "https://dgshe1iny46ip.cloudfront.net/dmail.app/images/logo.png",
      price: "200",
      color: "from-white-600 to-white-500",
      shadow: "shadow-lg shadow-gray-500",
      route:""
    },
    {
      id: "decentraland.app",
      title: "Decentraland",
      text: "MEN Running Shoes",
      rating: "4.5",
      btn: "Buy Now",
      img: "https://dgshe1iny46ip.cloudfront.net/decentraland.app/images/logo.png",
      price: "200",
      color: "from-red-500 to-rose-500",
      shadow: "shadow-lg shadow-rose-500",
      route:""
    },
    {
      id: "lens.app",
      title: "Lens Protocol",
      text: "MEN Running Shoes",
      rating: "5+",
      btn: "Buy Now",
      img: "https://dgshe1iny46ip.cloudfront.net/lens.app/images/logo.png",
      price: "200",
      color: "from-violet-500 to-indigo-500",
      shadow: "shadow-lg shadow-violet-500",
      route:""
    },
    {
      id: "push-app.app",
      title: "Push Protocol",
      text: "MEN Running Shoes",
      rating: "5+",
      btn: "Buy Now",
      img: "https://dgshe1iny46ip.cloudfront.net/push.app/images/logo.png",
      price: "200",
      color: "from-violet-500 to-indigo-500",
      shadow: "shadow-lg shadow-violet-500",
      route:""
    },
  ],
};

const featuredGame = {
  ifExists: false,
  title: "GAMES",
  items: [
    {
      id: "milliononmars.app",
      title: "Million On Mars",
      text: "MEN Running Shoes",
      rating: "4.9",
      btn: "Buy Now",
      img: "https://dgshe1iny46ip.cloudfront.net/milliononmars.app/images/logo.png",
      price: "200",
      color: "from-white-600 to-white-500",
      shadow: "shadow-lg shadow-gray-500",
      route:""
    },
    {
      id: "sparkball.app",
      title: "Sparkball",
      text: "MEN Running Shoes",
      rating: "4.5",
      btn: "Buy Now",
      img: "https://dgshe1iny46ip.cloudfront.net/sparkball.app/images/logo.png",
      price: "200",
      color: "from-red-500 to-rose-500",
      shadow: "shadow-lg shadow-rose-500",
      route:""
    },
    {
      id: "wildcard.app",
      title: "Wildcard",
      text: "MEN Running Shoes",
      rating: "5+",
      btn: "Buy Now",
      img: "https://dgshe1iny46ip.cloudfront.net/wildcard.app/images/logo.jpeg",
      price: "200",
      color: "from-violet-500 to-indigo-500",
      shadow: "shadow-lg shadow-violet-500",
      route:""
    },
    {
      id: "wam.app",
      title: "Wam",
      text: "MEN Running Shoes",
      rating: "5+",
      btn: "Buy Now",
      img: "https://dgshe1iny46ip.cloudfront.net/wam.app/images/logo.png",
      price: "200",
      color: "from-violet-500 to-indigo-500",
      shadow: "shadow-lg shadow-violet-500",
      route:""
    },
  ],
};

const categories = {
  ifExists: true,
  title: "Browse by categories",
  items: [
    {
      id: "0p0x1",
      title: "NFTS",
      text: "Step into the NFT Revolution",
      rating: "4.9",
      btn: "Explore the land of NFTs",
      img: "https://cdn3d.iconscout.com/3d/premium/thumb/nft-security-shield-4965542-4137439.png",
      price: "200",
      color: "from-violet-500 to-indigo-500",
      shadow: "shadow-lg shadow-violet-500",
      route:"/category/nft"
    },
    {
      id: "0p0x2",
      title: "DeFi",
      text: "Redefining the Finance",
      rating: "4.5",
      btn: "DeFi at your fingertips",
      img: "https://static.vecteezy.com/system/resources/previews/009/596/516/original/3d-illustration-of-wallet-icon-png.png",
      price: "200",
      color: "from-violet-500 to-indigo-500",
      shadow: "shadow-lg shadow-violet-500",
      route:"/category/finance"
    },
    {
      id: "0p0x3",
      title: "Social",
      text: "Connect, Share, and Thrive",
      rating: "4.5",
      btn: "Buy Now",
      img: "https://cdn3d.iconscout.com/3d/premium/thumb/social-media-5806306-4863035.png",
      price: "200",
      color: "from-violet-500 to-indigo-500",
      shadow: "shadow-lg shadow-violet-500",
      route:"/category/social"
    },
    {
      id: "0p0x3",
      title: "Games",
      text: "Unleash Your Gaming Passion",
      rating: "5+",
      btn: "Buy Now",
      img: "https://cdn3d.iconscout.com/3d/premium/thumb/game-controller-5360073-4492259.png?f=webp",
      price: "200",
      color: "from-violet-500 to-indigo-500",
      shadow: "shadow-lg shadow-violet-500",
      route:"/category/game"
    },
  ],
};

const highlight = {
  ifExists: true,
  heading: "TOP PICKS",
  title: "dAPPS TAILORED TO YOUR INTERESTS",
  text: "Discover a curated selection of dApps chosen exclusively for you. Explore our Top Picks section and find the perfect dApps to enhance your decentralized experience",
  btn: "*Coming Soon",
  url: "/",
  img: "https://cdn3d.iconscout.com/3d/premium/thumb/man-experiencing-metaverse-6471503-5360914.png?f=webp",
};

const sneaker = {
  ifExists: false,
  heading: "FEATURED APPS",
  title: "DISCOVER THE ELITE",
  text: "Unlock a treasure trove of innovation and excellence with our Featured Apps section, where the best and most trendsetting apps take center stage.",
  btn: "Explore",
  url: "/featuredapps",
  img: "https://cdn3d.iconscout.com/3d/premium/thumb/boy-using-metaverse-tech-6462889-5360922.png?f=webp",
};

const nftCategory = {
  ifExists: false,
  heading: "NFT CATEGORY",
  title: "DISCOVER THE LAND OF NFTS",
  text: "Welcome to the NFT DApp Universe, a realm of digital wonders awaits you. Explore, collect, and create unique digital items, revolutionizing ownership and providing a whole new experience.",
  btn: "Explore",
  url: "https://sneakernews.com/2022/03/21/nike-lebron-2-retro-white-midnight-navy-varsity-crimson-dr0826-100/",
  img: "https://cdn3d.iconscout.com/3d/premium/thumb/boy-using-metaverse-tech-6462889-5360922.png?f=webp",
};

const defiCategory = {
  ifExists: false,
  heading: "FINANCE CATEGORY",
  title: "EXPLORE THE FUTURE OF FINANCE WITH DeFi",
  text: "Transforming Traditional Finance with Web3 Innovations, Pioneering Decentralized and Borderless Financial Solutions.",
  btn: "Explore",
  url: "https://sneakernews.com/2022/03/21/nike-lebron-2-retro-white-midnight-navy-varsity-crimson-dr0826-100/",
  img: "https://cdn3d.iconscout.com/3d/premium/thumb/boy-using-metaverse-tech-6462889-5360922.png?f=webp",
};

const socialCategory = {
  ifExists: false,
  heading: "SOCIAL CATEGORY",
  title: "RECOLUTIONIZE YOUR SOCIAL INTERACTIONS",
  text: "Unleashing the Next Era of Social Networking through Innovative Web3 Technologies, Enabling Decentralization and Enhanced User Empowerment.",
  btn: "Explore",
  url: "https://sneakernews.com/2022/03/21/nike-lebron-2-retro-white-midnight-navy-varsity-crimson-dr0826-100/",
  img: "https://cdn3d.iconscout.com/3d/premium/thumb/boy-using-metaverse-tech-6462889-5360922.png?f=webp",
};

const gameCategory = {
  ifExists: false,
  heading: "GAME CATEGORY",
  title: "ENTER THE FUTURE OF DIGITAL GAMING",
  text: "Gaming Enters a New Dimension as Web3 Integration Creates Immersive Experiences and Player-Centric Economies.",
  btn: "Explore",
  url: "https://sneakernews.com/2022/03/21/nike-lebron-2-retro-white-midnight-navy-varsity-crimson-dr0826-100/",
  img: "https://cdn3d.iconscout.com/3d/premium/thumb/boy-using-metaverse-tech-6462889-5360922.png?f=webp",
};


const story = {
  title: "Top Stories",
  news: [
    {
      title: "Jayson Tatum Debuts",
      text: "Jordan Brands signature model for the past few years, Jayson Tatum will be dawning the Air Jordan 37 this season before attaining potentially his first signature sneaker with Jumpman, which he rumored to be in the works recently via his Twitter.",
      img: "https://sneakernews.com/wp-content/uploads/2022/09/air-jordan-37-low.jpg?w=540&h=380&crop=1",
      url: "https://sneakernews.com/2022/09/14/air-jordan-37-low/",
      like: "3/5",
      time: "11 Mins",
      by: "Jared Ebanks",
      btn: "Read More"
    },
    {
      title: "Bro’s Nike Zoom Freak 4",
      text: "Arriving right time for the Fall, this upcoming take on the Zoom Freak 4 seemingly draws inspiration from Thanksgiving. Orange and brown, two staples of the holiday, are used throughout the upper, dressing the parts not bathed in shades of grey.",
      img: "https://sneakernews.com/wp-content/uploads/2022/09/nike-zoom-freak-4-ironstone-orange-trance-cobblestone-sail-dj6149-003-2.jpg?w=540&h=380&crop=1",
      time: "41 Mins",
      like: "5/5",
      url: "https://sneakernews.com/2022/09/14/nike-zoom-freak-4-ironstone-orange-trance-cobblestone-sail-dj6149-003/",
      by: "Michael Le",
      btn: "Read More"
    },
    {
      title: "Nike Air Max Plus",
      text: "The Nike Air Max Plus has enjoyed the reveal of several colorways these last few of months. And as we officially embark on the Fall season, an additional set have been added to the calendar, including this newly-revealed grey and orange colorway.",
      img: "https://sneakernews.com/wp-content/uploads/2022/09/Nike-Air-Max-Plus-FB3358-001-2.jpg?w=540&h=380&crop=1",
      time: "2 Hours",
      url: "https://sneakernews.com/2022/09/14/nike-air-max-plus-grey-orange-black-fb3358-001/",
      like: "5/5",
      by: "Michael Le",
      btn: "Read More"
    },
    {
      title: "Air Jordan Retro High OG",
      text: "Air Jordan Retro High OG popular series of AJ1s with the popular color-blocking with the original Yellow Toe flavor. The colorway was revealed back PE by musician Zach Myers, nearly four years later, Jordan fanatics will finally get their shot a GR release.",
      img: "https://sneakernews.com/wp-content/uploads/2022/03/yellow-toe-jordan-1-release-date-2.jpg",
      time: "7 Months",
      url: "https://sneakernews.com/2022/03/09/air-jordan-1-retro-high-og-yellow-toe-555088-711/",
      like: "5/5",
      by: "Sneaker News",
      btn: "Read More"
    },
    {
      title: "Nike Air Zoom GT Cut 2",
      text: "The Bred coloryway of Zoom GT Cut 2 will be first to release this Friday, For Nike Members Nation World Wide while Sabrina Ionescus colorway is set for an October 13th release date. In the meantime, enjoy official images of both colorways below.",
      img: "https://sneakernews.com/wp-content/uploads/2022/09/nike-zoom-gt-cut-2-release-date.jpg?w=540&h=380&crop=1",
      time: "1 Months",
      url: "https://sneakernews.com/2022/09/13/nike-zoom-gt-cut-2-officially-unveiled/",
      like: "3/5",
      by: "Jared Ebanks",
      btn: "Read More"
    },
    {
      title: "Puma Announces Breanna",
      text: "For the first time in over a decade, a signature basketball silhouette is being made for one of the WNBA’s best and brightest stars, Olympic Gold Medalist and Seattle Storm superstar Breanna Stewart. Puma Stewie 1 Quiet Fire will be available this Friday.",
      img: "https://sneakernews.com/wp-content/uploads/2022/09/puma-stewie-1-quiet-fire-breanna-stewart-release-date-lead.jpg?w=540&h=380&crop=1",
      time: "25 Days",
      url: "https://sneakernews.com/2022/09/13/nike-zoom-gt-cut-2-officially-unveiled/",
      like: "3/5",
      by: "Jared Ebanks",
      btn: "Read More"
    },
    {
      title: "Nike Air Force Orange Color",
      text: "From lace toggles to city-inspired makeovers, the Nike Air Force 1 has delivered a number of unique modifications. Here though, the brand is taking things down quite a few notches, opting for a simple colorway helmed primarily by black and Laser Orange.",
      img: "https://sneakernews.com/wp-content/uploads/2022/09/Nike-Air-Force-1-Black-Yellow-FB7162-081-8.jpg?w=540&h=380&crop=1",
      url: "https://sneakernews.com/2022/09/09/nike-air-force-1-black-laser-orange-fb7162-081/",
      time: "6 Days",
      like: "4/5",
      by: "Micael Le",
      btn: "Read More"
    },
    {
      title: "Hello Kitty and Adidas",
      text: "The world of Sanrio is vast and replete with many an iconic character. Few among the family, though, rival the immense influence of Hello Kitty, who’s played mascot for everything from Pringles merchandise to sneaker collaborations.",
      img: "https://sneakernews.com/wp-content/uploads/2022/09/hello-kitty-adidas-superstar-GW7168-2.jpg?w=540&h=380&crop=1",
      url: "https://sneakernews.com/2022/09/08/hello-kitty-adidas-originals-gw7166-gw7167-gw7168/",
      time: "5 Days",
      like: "4/5",
      by: "Micael Le",
      btn: "Read More"
    },
    {
      title: "Air Force 1 Low Expands",
      text: "The nighttime aesthetic seen here is applied to the tumbled black leather panels of the upper and perforated mesh construction of the tongue while Royal trim and forefoot Swooshes provide additional intrigue to the darkened palette.",
      img: "https://sneakernews.com/wp-content/uploads/2022/09/nike-air-force-1-low-worldwide-black-royal-fb1840-001-lead.jpg?w=540&h=380&crop=1",
      url: "https://sneakernews.com/2022/09/08/nike-air-force-1-low-worldwide-black-royal-fb1840-001/",
      time: "5 Days",
      like: "4/5",
      by: "Micael Le",
      btn: "Read More"
    },
  ],
};

const nft = {
  ifExists: false,
  title: "NFT",
  items: [
    {
      id :  "rarible.app"
    },
    {
      id :  "aureal.app"
    },
    {
      id :  "deadheads.app"
    },
    {
      id :  "oohlala.app"
    },
    {
      id :  "jump.app"
    },
    {
      id :  "socialswap.app"
    },
    {
      id :  "mintify.app"
    },
    {
      id :  "komet.app"
    },
    {
      id :  "sunflower-land.app"
    },
    {
      id :  "heymint.app"
    },
    {
      id :  "opensea.app"
    },
    {
      id :  "transfer.app"
    },
    {
      id :  "glimpsenft.app"
    },
    {
      id :  "qstn.app"
    },
    {
      id :  "surfaceboard.app"
    }
  ]
}

const defi = {
  ifExists: false,
  title: "DeFi",
  items: [
    {
      id :  "aave.app"
    },
    {
      id :  "coinpayment.app"
    },
    {
      id :  "utorg.app"
    },
    {
      id :  "swyypepay.app"
    },
    {
      id :  "swapsicle.app"
    },
    {
      id :  "1inch.app"
    },
    {
      id :  "reap.app"
    },
    {
      id :  "curve.app"
    },
    {
      id :  "uniswap.app"
    },
    {
      id :  "sushi.app"
    },
    {
      id :  "balancer.app"
    },
    {
      id :  "yearn.app"
    },
    {
      id :  "crypto.app"
    },
  ]
}

const social = {
  ifExists: false,
  title: "Social",
  items: [
    {
      id :  "sending.app"
    },
    {
      id :  "dmail.app"
    },
    {
      id :  "decentraland.app"
    },
    {
      id :  "main.app"
    },
    {
      id :  "lens.app"
    },
    {
      id :  "push-app.app"
    },
    {
      id :  "soclly.app"
    },
    {
      id :  "huddln.app"
    },
    {
      id :  "unjumble.app"
    },
    {
      id :  "phaver.app"
    },
  ]
}

const game = {
  ifExists: false,
  title: "DeFi",
  items: [
    {
      id :  "milliononmars.app"
    },
    {
      id :  "sparkball.app"
    },
    {
      id :  "wildcard.app"
    },
    {
      id :  "wam.app"
    },
    {
      id :  "frontyardbaseball.app"
    }
  ]
}

export { nft, defi, social, game, story, sneaker, highlight, categories, featuredNFT, featuredDeFi, featuredGame, featuredSocial, nftCategory, defiCategory, socialCategory, gameCategory };