import { Navbar } from "./Navbar"
// import { useEffect } from "react"
// import axios from "axios"


export const GenerateReport =() => {
    // const getData = async () => {
    //     //I have no idea if this will work. Do we need a state to save the data?
    //     axios({
    //         url: "https://localhost:5000/model/predict?address=611 Gravois Rd, Fenton, MO, 63026",
    //         method: "GET"
    //     })
    //     .then((res) => {console.log(res)})
        
    //     .catch((err) => {console.log(err)})
    // }
    
    // useEffect(() => {
    //     getData()
    // }, [])

    return(
      <>
      <Navbar />
        { 
          <p>Write</p>
        }
      </>
    )
  }