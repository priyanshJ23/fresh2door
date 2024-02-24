import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import AllProducts from '../components/AllProducts';
import { addCartItem } from '../redux/productSlice';

function Menu() {
  const { filterby } = useParams();
  const dispatch = useDispatch();
  const productData = useSelector(state => state.product.productList);

  // Filter the product based on the filterby parameter
  const productDisplay = productData.find(el => el._id === filterby);

  const handleAddCartProduct = () => {
    if (productDisplay) {
      dispatch(addCartItem(productDisplay));
    }
  };

  return (
    <div className="p-2 md:p-4 bg-white">
      {productDisplay && ( // Conditional rendering to ensure productDisplay exists
        <div className="w-full max-w-4xl m-auto md:flex bg-white">
          <div className="overflow-hidden max-w-sm w-full p-5">
            {productDisplay.image && ( // Check if image property exists before rendering
              <img src={productDisplay.image} alt="foods" className="hover:scale-105" />
            )}
          </div>

          <div className="flex flex-col gap-1">
            <h3 className="font-semibold text-slate-600 capitalize text-2xl md:text-4xl">{productDisplay.name}</h3>
            <p className="text-slate-500 font-medium text-2xl">{productDisplay.category}</p>
            <p className="font-bold md:text-2x">
              <span className="text-blue-900">₱</span>
              <span>{productDisplay.price}</span>
            </p>
            <div className="flex gap-3">
              <button className="bg-slate-500 py-1 mt-2 rounded text-white hover:bg-slate-600 min-w-[100px]">Buy</button>
              <button className="bg-slate-500 py-1 mt-2 rounded text-white hover:bg-slate-600 min-w-[100px]" onClick={handleAddCartProduct}>Add Cart</button>
            </div>
            <div className="text-slate-600 font-medium">
              <p>Description: </p>
              <p>{productDisplay.description}</p>
            </div>
          </div>
        </div>
      )}

      <AllProducts heading="Related Products" />
    </div>
  );
}

export default Menu;
