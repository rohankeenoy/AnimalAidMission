import { Navbar } from "./Navbar"
import puppymill from '../../images/10411055_988376961195626_3410563990991464344_n.jpg'

export const InformationPage =() => {
    //the css isn't working how I would like, here's a link for later
    //https://www.w3schools.com/w3css/tryit.asp?filename=tryw3css_templates_gourmet_catering&stacked=h
  return(
    <>
        <Navbar />

        <header className="w3-display-container w3-content w3-wide" style={{maxWidth:"1600px", minWidth:"500px"}} id="home">
            <img className="w3-image" src={puppymill} alt="A Puppy Mill" width="1600" height="800"/>
            <div className="w3-display-bottomleft w3-padding-large w3-opacity">
            </div>
        </header>

        <div className="w3-content" style={{maxWidth: "1100px"}}>
            <div className="w3-row w3-padding-64">
                <div className="w3-col m6 w3-padding-large w3-hide-small">
                    <img src={puppymill} className = "w3-round w3-image w3-opacity-min" alt="A puppy mill" width="1000" height="750"></img>
                </div>
                <h2>Welcome to the Puppy Mill Information Page</h2>
                <p>This page is here to provide information for potential adopters on the cruelty of puppy mills and how prevelant they are in the state of missouri</p>
            </div>
        </div>
    </>
  )
}