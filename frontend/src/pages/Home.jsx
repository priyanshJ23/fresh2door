import { useSelector } from "react-redux"
import HomeCard from "../components/HomeCard"
import CardFeature from "../components/CardFeature"
import { GrPrevious, GrNext } from "react-icons/gr";
import DiscountOffers from "../components/Discount";
import { useEffect, useRef, useState } from "react";
import FilterProduct from "../components/FilterProduct";
import img10 from '../assets/10.png'
import img11 from '../assets/11.png'
import img12 from '../assets/12.png'
import img13 from '../assets/13.png'
import AllProducts from "../components/AllProducts";
import Carousel from "./Slick";
import Testimonial from "../components/Testimonial";
import data from '../components/data.json';
import React from 'react';
import Banner from 'react-js-banner';

function Home() {
 

  const productData = useSelector((state) => state.product.productList)

  const homeProductCartList = productData.slice(1,5)
  const homeProductCartListVegetables = productData.filter(el => el.category === "vegetable", [])

  const loadingArray = new Array(4).fill(null);
  const loadingArrayFeature = new Array(10).fill(null);

  const slideProductRef = useRef()
  const nextProduct = () => {
    slideProductRef.current.scrollLeft += 300
  }

  const preveProduct = () => {
    slideProductRef.current.scrollLeft -= 300
  }

  return (
    <div className= "bg-white">
    <div className="font-gilroy-semibold">
      <Banner
        title="Fresh2door Order Anytime, Anywhere!" 
        css={{ color: 'white', fontSize: '20px', marginTop: '0px', backgroundColor: 'green',}}
      />
    <div className="p-3 md:p-6 mt-1 font-gilroy-semibold">
       <Carousel/>
      <div className="md:flex justify-center items-center flex-col gap-4 py-2">
        <div className="md:w-4/5 text-center flex flex-wrap gap-5 p-4 justify-center">
          {homeProductCartList[0] ? homeProductCartList.map(el => {
            return (
              <HomeCard
                key={el._id}
                image={el.image}
                name={el.name}
                price={el.price}
                category={el.category}
                id={el._id}
              />
            )
          })
          : loadingArray.map((el,index) => {
            return (
              <HomeCard 
                key={index + "loading"}
                loading={"Loading..."}
              />
            )
          })
        }
        </div>
      </div>
      <div class="w-3/4 mx-auto mt-8">
  <h1 class="text-3xl mb-8">Banks Offers</h1>
  <div class="flex justify-between">
    <img class="transition" src={img10} alt="img10" style={{ width: '23%' }} />
    <img class="transition" src={img11} alt="img11" style={{ width: '23%' }} />
    <img class="transition" src={img12} alt="img12" style={{ width: '23%' }} />
    <img class="transition" src={img13} alt="img13" style={{ width: '23%' }} />
  </div>
</div>

      <div className="">
        <div className="flex w-full items-center">  
            <h2 className="font-bold text-2xl text-slate-800 mb-4">Vegetables</h2>
          <div className="ml-auto flex gap-4">
            <button onClick={preveProduct} className="bg-slate-300 hover:bg-slate-400 text-lg p-1 rounded"><GrPrevious /></button>
            <button onClick={nextProduct} className="bg-slate-300 hover:bg-slate-400 text-lg p-1 rounded"><GrNext /></button>
          </div>
        </div>
        <div className="flex gap-5 overflow-scroll scrollbar-none scroll-smooth transition-all" ref={slideProductRef}>
          {homeProductCartListVegetables[0] ? homeProductCartListVegetables.map(el => {
            return (
              <CardFeature 
                key={el._id+"vegetables"}
                id={el._id}
                name={el.name}
                category={el.category}
                price={el.price}
                image={el.image}
              />
            )
          })
          : loadingArrayFeature.map((el, index) => <CardFeature loading="Loading..." key={index+"cartLoading"}/>)
          }
        </div>
      </div>
      <AllProducts heading="Menu"/>
      <Testimonial testimonialData={data}/>
    </div>
    </div>
    </div>
  )
}

export default Home