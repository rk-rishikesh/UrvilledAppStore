const CartEmpty:React.FC<any> = ({onCartToggle}) => {
  return (
    <>
        <div className='-mt-44 flex items-center justify-center flex-col h-screen text-center gap-7'>
            <img src="https://cdn3d.iconscout.com/3d/premium/thumb/notification-2872691-2409395.png" alt="empty/bag" 
            className='w-full lg:w-36 sm:w-full h-auto object-fill transition-all duration-300
            hover:scale-110'/>
        </div>
    </>
  )
}

export default CartEmpty