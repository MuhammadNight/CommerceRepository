import { IoMdHeartEmpty, IoMdHeart } from "react-icons/io";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { createSlug } from "../utils/createSlug";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setModalType, setSelectProductId, toggleModalAlert } from "../store/slices/pageActions";
import { fetchProductData } from "../store/slices/products";
import CreateHeadphones from "../components/pageComp/CreateHeadphones";
import { CgMoreVertical } from 'react-icons/cg';
import { FaEdit, FaTrash } from 'react-icons/fa';
import EditDeleteHeadphones from "../components/pageComp/EditDeleteHeadphones";


const Headphones = () => {
  const { products } = useSelector((state) => state.product);
  const [favorites, setFavorites] = useState([]);
  const [cart, setCart] = useState([]);
  const [openMenuId, setOpenMenuId] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { ShowModal, modalType } = useSelector(state => state.pageActions);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setFavorites(storedFavorites);
    setCart(storedCart);
  }, []);

  useEffect(() => {
    if (!ShowModal) {
      dispatch(fetchProductData());
    }
  }, [ShowModal, dispatch]);

  const handleAddProduct = () => {
    dispatch(setModalType("create"));
    dispatch(toggleModalAlert());
  };

  const handleFavoriteToggle = (item) => {
    const updatedFavorites = favorites.some(fav => fav.id === item.id)
      ? favorites.filter(fav => fav.id !== item.id)
      : [...favorites, item];

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

  const handleEdit = (id) => {
    dispatch(setSelectProductId(id));
    dispatch(setModalType("update"));
    dispatch(toggleModalAlert());
    setOpenMenuId(null);
  };

  const handleDelete = (id) => {
    dispatch(setSelectProductId(id));
    dispatch(setModalType("delete"));
    dispatch(toggleModalAlert());
    setOpenMenuId(null);
  };

  const filteredProducts = products.filter((item) => item.CategoryId === 4);

  return (
    <div className="mx-8 my-8">
      <div className="flex justify-between items-center">
        <div className="sm:text-sm lg:text-lg ml-8 font-medium mb-[50px]">
          <NavLink className={"opacity-55"} to={"/"}>{"Home  >"}</NavLink>
          <NavLink className={"opacity-55"} to={"/catalog"}>{"  Catalog  >"}</NavLink>
          <NavLink to={"/headphones"}>Headphones</NavLink>
        </div>
        <div className="ml-8 sm:text-sm lg:text-lg font-medium mb-[50px]">
          <button onClick={handleAddProduct} className="p-[10px] text-nowrap bg-gray-500 text-white rounded-md shadow-md hover:bg-gray-60">
            Add new headphone
          </button>
        </div>
      </div>
      <h3 className="ml-8 text-lg font-medium">
        Selected results : <span className="font-bold">{filteredProducts.length}</span>
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6 mt-6">
        {filteredProducts.map((item) => {
          const slug = createSlug(item.name, item.id);
          const isFavorite = favorites.some(fav => fav.id === item.id);
          const isInCart = cart.some(cartItem => cartItem.id === item.id);

          return (
            <div className="flex justify-center" key={item.id}>
              <div className="bg-white w-[268px] h-[422px] shadow-xl rounded-lg group hover:border-[1px] border-[black] duration-500 overflow-hidden p-5 relative flex flex-col items-center">
                <div className="relative w-full flex justify-between">
                  <div className='relative'>
                    <button onClick={() => setOpenMenuId(openMenuId === item.id ? null : item.id)} className='p-2'>
                      <CgMoreVertical size={24} />
                    </button>
                    {openMenuId === item.id && (
                      <div className='absolute left-[20px] top-0 mt-0 ml-2 bg-white border rounded shadow-lg w-32 z-10'>
                        <button onClick={() => handleEdit(item.id)} className='w-full px-4 py-2 hover:bg-gray-100 flex items-center'>
                          <FaEdit className='mr-2' />
                          Edit
                        </button>
                        <button onClick={() => handleDelete(item.id)} className='w-full px-4 py-2 hover:bg-gray-100 flex items-center'>
                          <FaTrash className='mr-2' />
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                  <span
                    className={`text-2xl cursor-pointer ${isFavorite ? 'text-red-500' : 'text-gray-400'}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleFavoriteToggle(item);
                    }}
                  >
                    {isFavorite ? <IoMdHeart /> : <IoMdHeartEmpty />}
                  </span>
                </div>
                <Link to={`/headphones/${slug}`}>
                  <div className="mt-2">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="h-[200px] w-full object-contain group-hover:scale-110 duration-200"
                    />
                  </div>
                  <div className="text-center mt-4">
                    <h3 className="text-sm md:text-md lg:text-lg font-medium mb-2">{item.name}</h3>
                    <h3 className="text-lg lg:text-xl font-bold mb-4">{"$"}{item.price}</h3>
                  </div>
                </Link>
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
          )
        })}
      </div>
      {ShowModal && modalType === "create" && <CreateHeadphones />}
      {(ShowModal && (modalType === "update" || modalType === "delete")) && <EditDeleteHeadphones />}
    </div>
  );
};

export default Headphones;
