import React, { useEffect, useState } from "react";
import * as POSTAPI from "../networks/postapi";
import { uploadPost } from "../networks/postapi";
import { Post } from "../models/post";
import Navbar from "../components/navbar";
import {GContext} from "../globalcontext"
import { useFetcher, useNavigate } from "react-router-dom";
import {ContextType} from "../globalcontext"

const Uploadpage = () => {
  const Navigate = useNavigate()
  const{user, setUser} = React.useContext(GContext) as ContextType
  
  useEffect(()=>{
    async function getUser(){
      try {
        
        const user = await POSTAPI.getAuthUser()
        setUser(user)
      } catch (error) {
        console.error(error)
      }finally{
        
      }
    }
    getUser()
  },[])
  useEffect(()=>{
    if(!user?.reg_seller){
      Navigate("/register")
    }

  },[])
  let x: uploadPost = {
    image: "",
    image_watermark: "",
    title: "",
    description: "",
    price:0,
    category: "",
  };
  const [formdata, setFormData] = useState<uploadPost>(x);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formdata, [name]: value });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    const filecopy = e.target.files && e.target.files[0];

    if (file) {
      try {
        const imgString = await convertFileToBase64(file);

        const watermarkedImage = await addWatermark(filecopy!);

        setFormData({
          ...formdata,
          image: imgString,
          image_watermark: watermarkedImage,
        });
      } catch (error) {
        console.error("Error adding watermark or reading the file:", error);
      }
    }
  };

  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (event) => {
        if (event.target && typeof event.target.result === "string") {
          resolve(event.target.result);
        } else {
          reject(new Error("Failed to read the file."));
        }
      };

      reader.onerror = (error) => {
        reject(error);
      };

      reader.readAsDataURL(file);
    });
  };

  const addWatermark = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
  
      if (!ctx) {
        reject("Canvas context is not supported");
        return;
      }
  
      const image = new Image();
      image.src = URL.createObjectURL(file);
  
      image.onload = () => {
        let width = image.width;
        let height = image.height;
  
        
        canvas.width = width;
        canvas.height = height;
        
        ctx.drawImage(image, 0, 0);
  
        const watermarkText = "PixelStore PixelStore PixelStore PixelStore";
  
        ctx.font = "30px Arial"; // Adjust the font size as needed
        ctx.fillStyle = "rgba(255, 255, 255)"; // Adjust the color and opacity
        ctx.rotate(-45 * (Math.PI / 180)); // Rotate the context to -45 degrees
  
        // Calculate the position to start the text
        const x = -canvas.height * 0.5;
        const y = canvas.width * 0.5;
  
        ctx.fillText(watermarkText, x, y);
  
        // Reset the context
        ctx.rotate(45 * (Math.PI / 180));
  
        const base64Image = canvas.toDataURL("image/jpeg");
  
        resolve(base64Image);
      };
  
      image.onerror = (error) => {
        reject(error);
      };
    });
  };
  

  async function submitData(post: uploadPost) {
    try {
      //console.log(post)
      const response = await POSTAPI.createPost(post);
      onSaved(response);
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }
  const onSaved = (post: Post) => {
    setFormData({
      image:"",
      image_watermark:"",
      description:"",
      title:"",
      price:0,
      category:"",
    })
    alert("added succesffully");
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    
    e.preventDefault();
    //console.log(formdata.image_watermark)
    if (
      !formdata.title.trim() ||
      !formdata.image.trim() ||
      !formdata.image_watermark.trim() ||
      !formdata.category.trim()
    ) {
      alert("Please complete the details");
      return;
    } else {
      submitData(formdata);
    }
  };

  return (
    <div className="upload_page">
      <Navbar/>
      <h1 className="heading-upload a1" style={{color:"#ddeae0"}}>Create a Post</h1>
      <div className="loginpage-container upload-form">
        <form onSubmit={handleSubmit} id="uploadform" className="bx form">
          <input
            placeholder="title"
            type="text"
            name="title"
            id="1"
            value={formdata.title}
            onChange={handleInputChange}
            className="inpx login-inp inp"
          />
          <input
            type="text"
            placeholder="description"
            name="description"
            id="2"
            value={formdata.description}
            onChange={handleInputChange}
             className="inpx login-inp inp"
          />
          <input
            type="number"
            placeholder="₹ Price"
            name="price"
            id="4"
            min={0}
            max={2000}
            value={formdata.price}
            onChange={handleInputChange}
             className="inpx login-inp inp"
          />

          <select
            id="form"
            name="category"
            className="inpx ax options"
            placeholder="category"
            value={formdata.category}
            onChange={handleInputChange}
          >
            <option value="">Select a category</option>
            <option value="wallpaper">wallpaper</option>
            <option value="nature">nature</option>
            <option value="wildlife">wildlife</option>
            <option value="citylife">citylife</option>
            <option value="Forest">Forest</option>
            <option value="Abstract">Abstract</option>
          </select>
          <input
            type="file"
            placeholder="upload the image"
            name="image"
            accept=".jpg, .jpeg, .png"
            id="5"
            onChange={handleFileChange}
             className="iup inpx login-inp inp"
          />
          <div className="preview_img">
            {formdata.image && (
              <img
                src={formdata.image}
                alt="Preview"
                style={{ width: "300px", height: "300px", margin: "1em" }}
              />
            )}
          </div>
          <button type="submit" form="uploadform" className="cun btn submitbtn">
            submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Uploadpage;
