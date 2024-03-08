import React, { useEffect, useState } from "react";
import * as POSTAPI from "../networks/postapi";
import Navbar from "../components/navbar";
import { Post } from "../models/post";
import Card from "../components/postcard";
import { LinearProgress } from "@mui/material";

import {GContext} from "../globalcontext"
import {ContextType} from "../globalcontext"
import { useNavigate } from "react-router-dom";

interface filters {
  title?: string;
  category?: string;
}
interface props{
  name:string
}


const BroswerPage = ({name}:props) => {
  const Navigate = useNavigate()

  const{setPost} = React.useContext(GContext) as ContextType
  const detail = (post:string)=>{
    setPost(post)
    Navigate(`/detail/${post}`)
  }
  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [minPrice, setMinPrice] = useState<number>(10);
  const [maxPrice, setMaxPrice] = useState<number>(10000);
  const [loading, setLoading] = useState<boolean>(true);

  const [filter, setFilter] = useState<filters>({
    title: "",
    category: "",
  });

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (value <= maxPrice) {
      setMinPrice(value);
    }
  };
  const handlechangefilter = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFilter({ ...filter, [name]: value });
  };
  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (value >= minPrice) {
      setMaxPrice(value);
    }
  };
  useEffect(() => {
    async function fetchData() {
      
      try {
        const res = await POSTAPI.getPosts();
        setPosts(res);
        setFilteredPosts(res);
        setLoading(true);
      } catch (error) {
        alert(error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchData();
    
  }, []);
  const resetFilters = () => {
    const postcopy = [...posts]
    setFilteredPosts(postcopy);
    setMinPrice(10);
    setMaxPrice(10000);
    setFilter({
      title: "",
      category: "",
    });
    setMaxPrice(10000);
    setMinPrice(10);
  };
  const applyfilter = () => {
    const newFilteredPosts = posts.filter(
      (post) =>
        post.title.toLowerCase().includes(filter.title!.toLowerCase()) &&
        post.category.toLowerCase().includes(filter.category!.toLowerCase()) &&
        post.price >= minPrice &&
        post.price <= maxPrice
    );
    
    setFilteredPosts(newFilteredPosts);
  };
  const content = (
    <div className="browse-page">
      <h1 className="pixelstoreheading">Welcome to Pixel Store {name}</h1>
      <div className="filter-section">
        <div className="title-srch">
          <input
            type="text"
            name="title"
            className="inp"
            placeholder="search by title"
            value={filter.title}
            onChange={handlechangefilter}
          />
        </div>
        <div className="category-srch">
          <select
            id="form"
            name="category"
            className="filter-cat"
            placeholder="category"
            value={filter.category}
            onChange={handlechangefilter}
          >
            <option value="">category</option>
            <option value="wallpaper">wallpaper</option>
            <option value="nature">nature</option>
            <option value="wildlife">wildlife</option>
            <option value="citylife">citylife</option>
            <option value="Forest">Forest</option>
            <option value="Abstract">Abstract</option>
          </select>
        </div>
        <div className="price-srch">
          <div className="range-label">
            <span>Min: {minPrice}</span>
            <span>Max: {maxPrice}</span>
          </div>
          <input
            type="range"
            min={10}
            max={10000}
            step={10}
            value={minPrice}
            onChange={handleMinPriceChange}
            className="range-input"
          />
          <input
            type="range"
            min={10}
            max={10000}
            step={10}
            value={maxPrice}
            onChange={handleMaxPriceChange}
            className="range-input"
          />
        </div>
        <div className="reset-btn">
          <button className="btn filter-btn" onClick={applyfilter}>
            apply
          </button>
          <button className="btn filter-btn" onClick={resetFilters}>
            reset
          </button>
        </div>
      </div>
      <div className="post-container">
        {filteredPosts.map((m) => {
          return <Card post={m} key={m.title+m.category+Math.random()} onclick={()=>detail(m._id)} />;
        })}
      </div>
    </div>
  );
  return <><Navbar/>{loading ? <LinearProgress /> : content}</>;
};

export default BroswerPage;
