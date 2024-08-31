import { AiFillAndroid } from "react-icons/ai"; 
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { CiDeliveryTruck, CiShop } from "react-icons/ci";
import { FiCheckCircle } from "react-icons/fi";
import { GiBattery75 } from "react-icons/gi";


const SmartwatchesSlug = () => {
    const { slug } = useParams();
    const slugParts = slug.split('-');
    const id = slugParts.pop();
    const navigate = useNavigate();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [favorites, setFavorites] = useState([]);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        axios.get(`https://commercebase.onrender.com/products/${id}`)
            .then((response) => {
                setProduct(response.data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, [id]);

    useEffect(() => {
        const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
        const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setFavorites(storedFavorites);
        setCart(storedCart);
    }, []);

    const handleFavoriteToggle = () => {
        if (product) {
            const isInFavorite = favorites.some(favouriteProduct => favouriteProduct.id === product.id);
            if (isInFavorite) {
                navigate('/favourite');
            } else {
                const updatedFavorites = [...favorites, product];
                setFavorites(updatedFavorites);
                localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
            }
        }
    };

    const handleCartToggle = () => {
        if (product) {
            const isInCart = cart.some(cartProduct => cartProduct.id === product.id);
            if (isInCart) {
                navigate('/cart');
            } else {
                const updatedCart = [...cart, product];
                setCart(updatedCart);
                localStorage.setItem('cart', JSON.stringify(updatedCart));
            }
        }
    };

    const isFavorite = product && favorites.some(favouriteProduct => favouriteProduct.id === product.id);
    const isInCart = product && cart.some(cartProduct => cartProduct.id === product.id);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="mx-4 sm:mx-8 md:mx-12 lg:mx-16 my-8">
            <div className="max-w-full sm:max-w-4xl md:max-w-5xl lg:max-w-7xl mx-auto p-4 sm:p-6 md:p-8 lg:p-10 flex flex-col lg:flex-row">
                <div className="w-full lg:w-1/2 flex justify-center items-center">
                    <img
                        src={product?.imageUrl}
                        alt="Product"
                        className="object-cover rounded-lg w-full h-auto max-w-sm md:max-w-md lg:max-w-lg"
                    />
                </div>
                <div className="w-full lg:w-1/2 mt-6 lg:mt-0 lg:ml-8 flex flex-col">
                    <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold">{product?.name}</h1>
                    <div className="flex items-center mt-4">
                        <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold">{product?.price}</span>
                        <span className="ml-2 text-gray-500 line-through text-sm sm:text-base">
                            {product?.price + ",99"}
                        </span>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-6 md:grid-cols-3 lg:grid-cols-3">
                        <div className="bg-[#F4F4F4] p-3 rounded-lg border flex items-center text-sm sm:text-base">
                            <AiFillAndroid className="h-5 w-5 mr-2" />
                            <div className="flex flex-col">
                                <div className="text-gray-700">Compatibility:</div>
                                <span>{product?.compatibility}</span>
                            </div>
                        </div>
                        <div className="bg-[#F4F4F4] p-3 rounded-lg border flex items-center text-sm sm:text-base">
                            <GiBattery75 className="h-5 w-5 mr-2" />
                            <div className="flex flex-col">
                                <div className="text-gray-700">Battery Life:</div>
                                <span>{product?.battery_life}</span>
                            </div>
                        </div>
                    </div>
                    <div className="mt-6">
                        <p className="text-base sm:text-lg md:text-xl">{product?.Description}</p>
                    </div>
                    <div className="mt-6 space-y-4 flex flex-row gap-4">
                        <button
                            className="w-full pb-[5px] h-[50px] translate-y-[15px] bg-black text-white hover:bg-gray-700 duration-300 rounded-lg text-center text-lg"
                            onClick={(e) => {
                                e.preventDefault();
                                handleCartToggle();
                            }}
                        >
                            {isInCart ? 'View Cart' : 'Buy Now'}
                        </button>
                        <button
                            className="w-full py-3 border hover:border-gray-700 hover:text-gray-700 duration-200 border-gray-300 rounded-lg text-center"
                            onClick={handleFavoriteToggle}
                        >
                            {isFavorite ? "View Favourite" : "Add to Favourite"}
                        </button>
                    </div>

                    <div className="mt-8 flex space-x-4 text-gray-600">
                        <div className="flex items-center space-x-1">
                            <CiDeliveryTruck className="text-[30px]" />
                            <div>
                                <span className="font-semibold">Free Delivery</span>
                                <p className="text-xs">1-2 days</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-1">
                            <CiShop className="text-[30px]" />
                            <div>
                                <span className="font-semibold">In Stock</span>
                                <p className="text-xs">Today</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-1">
                            <FiCheckCircle className="text-[20px]" />
                            <div>
                                <span className="font-semibold">Guaranteed</span>
                                <p className="text-xs">1 year</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SmartwatchesSlug;
