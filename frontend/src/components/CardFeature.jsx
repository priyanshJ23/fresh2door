import { Link, useNavigate } from "react-router-dom"
import { addCartItem } from "../redux/productSlice"
import { useDispatch } from "react-redux"
import { useAuth } from '../components/Authcontext';
import toast from 'react-hot-toast';

function CardFeature({image, name, price, category, loading, id}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoggedIn } = useAuth();

  const handleAddCartProduct = () => {
    if (isLoggedIn) {
      dispatch(
        addCartItem({
          _id: id,
          name: name,
          price: price,
          category: category,
          image: image
        })
      );
    } else {
      toast("Login first to add to cart");      
    }
  };


  return (
    <div className='w-full min-w-[200px] max-w-[200px] bg-white hover:shadow-lg drop-shadow-lg py-5 px-4 cursor-pointer flex flex-col' style={{ transition: "box-shadow 0.3s" }}>
  {image ? 
    <>
      <Link to={`/menu/${id}`} onClick={() => window.scrollTo({top: "0", behavior: "smooth"})}>
        
        <div className="h-28 flex flex-col justify-center items-center">
            <img src={image} alt="vegetables" className='h-full'/>
        </div>
        <h3 className="font-semibold text-slate-600 capitalize text-lg mt-4 whitespace-nowrap overflow-hidden">{name}</h3>
        <p className="text-slate-500 font-medium">{category}</p>
      </Link>
      <div className="flex justify-between items-center mt-2">
      <p className="font-medium text-green-500">
         
            <span style={{ textDecoration: 'line-through', opacity: 0.5 }}>₹{price}</span>
            {' '}
            <span>
              ₹{(parseFloat(price) * 0.88).toFixed(2)}
              {/* Assuming a 12% discount */}
            </span>
          </p>
        <button 
          className='bg-white border border-green-500 py-1 rounded text-green-500 hover:bg-green-100 w-20' 
          onClick={handleAddCartProduct}
        >
        Add Cart
        </button>
      </div>
    </>
    : <div className="min-h-[150px] flex justify-center items-center">
        <p>{loading}</p>
      </div>
    }
</div>

  )
}

export default CardFeature