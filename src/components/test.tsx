import React, { useEffect } from "react"

const TestPage = ()=>{
    useEffect(()=>{
        async function fetdchD(){
            try {
                const res  = await fetch('https://backend-news1.onrender.com/news',{
                    method:"GET",
                    
                })
                console.log(res.json())
            } catch (error) {
                console.error(error)
            }

        }
        fetdchD()
    },[])
    return(
        <></>
    )
}

export default TestPage