import { IoMdHeart } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { createSlug } from "../utils/createSlug";
import { useState, useEffect } from "react";

const Favourite = () => {
  const [favorites, setFavorites] = useState([]);
  const [cart, setCart] = useState([]);
  const navigate = useNavigate()
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setFavorites(storedFavorites);
    setCart(storedCart);
  }, []);


  const handleRemoveFavorite = (id) => {
    const updatedFavorites = favorites.filter(item => item.id !== id);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };
  const handleCartToggle = (item) => {
    const isInCart = cart.some(cartItem => cartItem.id === item.id);

    if (isInCart) {

      navigate('/cart');
    } else {

      const updatedCart = [...cart, item];
      setCart(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    }
  };


  if (favorites.length === 0) {
    return <div className="h-[60vh] text-center mt-8 text-lg">No favorites yet.</div>;
  }

  return (
    <div className="mx-8 my-8">
      <h3 className="text-lg ml-8 font-medium mb-[50px]">Your Favorites</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
        {favorites.map((item) => {
          const slug = createSlug(item.name, item.id);
          const isInCart = cart.some(cartItem => cartItem.id === item.id);

          let linkPath;
          if (item.CategoryId === 1) {
            linkPath = `/phones/${slug}`;
          } else if (item.CategoryId === 5) {
            linkPath = `/computers/${slug}`;
          } else if (item.CategoryId === 2) {
            linkPath = `/smartwatches/${slug}`;
          } else if (item.CategoryId === 3) {
            linkPath = `/cameras/${slug}`;
          } else if (item.CategoryId === 4) {
            linkPath = `/headphones/${slug}`;
          } else if (item.CategoryId === 6) {
            linkPath = `/gaming/${slug}`;
          } else {
            linkPath = `/`;
          }

          return (
            <div key={item.id} className="flex justify-center">
              <div className="bg-white w-[268px] h-[422px] shadow-lg rounded-lg group hover:border-[1px] border-[black] duration-500 overflow-hidden p-5 relative flex flex-col items-center">
                <div className="relative w-full flex justify-end">
                  <span
                    className="text-red-500 text-2xl cursor-pointer"
                    onClick={() => handleRemoveFavorite(item.id)}
                  >
                    <IoMdHeart />
                  </span>
                </div>
                <Link to={linkPath} className="mt-2">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="h-[200px] w-full object-contain group-hover:scale-110 duration-200"
                  />
                </Link>
                <div className="text-center mt-4">
                  <h3 className="text-sm md:text-md lg:text-lg font-medium mb-2">{item.name}</h3>
                  <h3 className="text-lg lg:text-xl font-bold mb-4">{"$"}{item.price}</h3>
                </div>
                <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 w-full flex justify-center">
                  <button
                    className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition duration-150"
                    onClick={(e) => {
                      e.preventDefault();
                      handleCartToggle(item);
                    }}
                  >
                    {isInCart ? 'View Cart' : 'Buy Now'}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Favourite;
