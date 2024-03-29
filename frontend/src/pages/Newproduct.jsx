import {BsCloudUpload} from "react-icons/bs"
import { ImagetoBase64 } from "../utility/ImagetoBase64"
import { useState } from "react"
import { toast } from "react-hot-toast"

function Newproduct() {

  const [data, setData] = useState({
    name : "",
    category : "",
    image : "",
    price : "",
    description : ""
  })

  const handleOnChange = (e) => {
    const {name, value} = e.target

    setData((prevState) => {
      return {
        ...prevState,
        [name] : value
      }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(data)

    const {name, image, category, price} = data

    if(name && image && category && price) {
      const fetchData = await fetch('https://fresh2door-2.onrender.com/uploadProduct', {
        method: "POST",
        headers : {
          "content-type" : "application/json"
        },
        body: JSON.stringify(data)
      })
  
      const fetchRes = await fetchData.json()
  
      console.log(fetchRes)
      toast(fetchRes.message)

      setData(() => {
        return {
          name : "",
          category : "",
          image : "",
          price : "",
          description : ""
        }
      })
    }else {
      toast("Required Fields")
    }
  }

  const uploadImage = async (e) => {
    const data = await ImagetoBase64(e.target.files[0])
    // console.log(data)

    setData((prevState) => {
      return {
        ...prevState,
        image: data
      }
    })
  }

  return (
    <div className="p-4">
      <form className='m-auto w-full max-w-md shadow flex flex-col p-3 bg-white' onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input type="text" name="name" id="name" className="bg-slate-200 p-1 my-1" onChange={handleOnChange} value={data.name}/>

        <label htmlFor="category">Category</label>
        <select className="bg-slate-200 p-1 my-1" id="category" onChange={handleOnChange} name="category" value={data.category}>
        <option value={"other"}>select category</option>
          <option value={"fruits"}>Fruits</option>
          <option value={"vegetable"}>Vegetable</option>
          <option value={"icream"}>Ice creams & desserts</option>
          <option value={"Snacks"}>Snacks</option>
          <option value={"household"}>Cleaning & Household</option>
          <option value={"Groceries"}>Groceries</option>
          <option value={"Bakery"}>Bakery&Dairy</option>
          <option value={"Babycare"}>Babycare</option>
          <option value={"panner"}>Panner</option>
          <option value={"sandwich"}>Sandwich</option>
          <option value={"Beverages"}>Beverages</option>
        </select>
        
        <label htmlFor="image">Image
          <div className="h-40 w-full bg-slate-200 rounded flex items-center justify-center cursor-pointer">
          {data.image ? (
         <img src={data.image} alt="Food" className="h-full" />
        ) : (
          <span className="text-5xl"><BsCloudUpload /></span>
        )}

            <input accept="image/*" type="file" id="image" onChange={uploadImage} className="hidden"/>
          </div>
        </label>

        <label htmlFor="price" className="my-1">Price</label>
        <input type="text" id="price" className="bg-slate-200 p-1 my-1" onChange={handleOnChange} name="price" value={data.price}/>

        <label htmlFor="description">Description</label>
        <textarea rows="2" className="bg-slate-200 p-1 my-1 resize-none" onChange={handleOnChange} name="description" value={data.description}></textarea>

        <button type="submit" className="bg-slate-500 hover:bg-slate-600 text-white my-2 font-medium drop-shadow">Save</button>
      </form>
    </div>
  )
}

export default Newproduct