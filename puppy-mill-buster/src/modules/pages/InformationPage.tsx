import { Navbar } from "./Navbar"
import puppymill from '../../images/10411055_988376961195626_3410563990991464344_n.jpg';
import missouriMap from '../../images/Missouri_County_Map.png'
//import missouriMap from '../../images/county_map';

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
                <div className="w3-col m6 w3-padding-large">
                    <h1 className="w3-center">What Are Puppy Mills?</h1>
                    <br/>
                    <h5 className="w3-center">A look into the cruelty of puppy mills</h5>
                    <p className="w3-large">A puppy mill is any dog breeder the prioritized their profits over the health and well-being of the dogs and puppies produced. They vary in size and can have a few as ten dogs or as many as hundreds of breeding dogs. In the puppy mill the adult dogs are confined to small kennels and are bred to produce as many puppies as possible. They are not taken care of, groomed, or given proper exercise. Worst of all, they are denied proper veterinary care. Most live with painful health conditions due to neglect and experience abuse, loneliness, depression, sadness, disease, and misery. 
                    Many puppy mills operate online selling dogs directly to the consumer on websites like puppies.com or on social media. Most consumers are unaware of the cruelty they may be supporting, which is why it is so important to learn how to spot puppy mills.</p>
                    {/*<p className="w3-large w3-text-grey w3-hide-medium">Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum consectetur adipiscing elit, sed do eiusmod temporincididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>*/}
                </div>
            </div>

            <hr/>
            <div className="w3-row w3-padding-64" id="menu">
                <div className="w3-col l6 w3-padding-large">
                    <h1 className="w3-center">Are Puppy Mills Prevalent in Missouri?</h1>
                    <br/>
                    <p className="w3-large">Unfortunately, yes.
                        For the last 11 years Missouri has been the worst state in the country for commercial breeding enterprises. The Humane Society of the United States’ most recent “Horrible Hundred” report found that 31 of a selected 100 problematic breeders in the U.S. were located in Missouri. Why does Missouri has a puppy mill problem? Well due to its central location in the US it is easy for most dog breeders to ship their dogs around the country from Missouri. It also has some of the laxest laws regulating commercial dog breeders in the country. 
                        But the biggest cause is the rise of concentrated animal feeding operations (CAFOs). These large industrial factory farms raise thousands of animals per location in a confined space. This put the smaller farmers out of business so many Missouri farmers began to breed dogs commercially to make up for the loss of revenue.
                        Luckily you can help, by learning how to spot puppy mills and being informed you can help stop the demand for puppies from puppy mills.</p>
                    { /*<p className="w3-large w3-text-grey w3-hide-medium">Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum consectetur adipiscing elit, sed do eiusmod temporincididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p> */}
                </div>
                <div className="w3-col l6 w3-padding-large">
                    <img src={missouriMap} className="w3-round w3-image w3-opacity-min" title="Map of Missouri" style={{width:"100%"}} alt="A heatmap of Missouri based on puppy mill data"/>
                    <p className="w3-small w3-text-grey w3-hide-medium" style={{textAlign: "center"}}>This map shows the density of puppy mills in Missouri counties.</p>
                </div>
            </div>
            <hr />
            <div className="w3-row w3-padding-64">
                <div className="w3-col m6 w3-padding-large w3-hide-small">
                    <img src={puppymill} className = "w3-round w3-image w3-opacity-min" alt="A puppy mill" width="1000" height="750"></img>
                </div>
                <div className="w3-col m6 w3-padding-large">
                    <h1 className="w3-center">How to Spot a Puppy Mill.</h1>
                    <br/>
                    <h5 className="w3-center">What to look for when adopting</h5>
                    <p className="w3-large">There are a few red flags look for that mean a puppy is coming from a puppy mill. Please note that one of these alone does not mean that the breeder is running a puppy mill, but you should use caution and ask questions before you complete a purchase.</p>
                    <ul className="w3-large w3-text-grey w3-hide-medium">
                        <li>The breeder will not allow you to see the puppy’s kennel where the puppy was raised.</li>
                        <li>The breeder will not let you meet the parents of the puppy.</li>
                        <li>The breeder is using stock photography photos and not their own genuine photos. </li>
                        <li>The breeder has multiple purebred breeds or “designer” breed mixes available from their kennel. Especially "exotic" or in-demand breed mixes. Most breeders don't have the time to be responsible, knowledgeable breeders of multiple breeds simultaneously so most reputable breeders will focus on one breed. If someone is selling multiple breeds, they may be more interested in diversifying their products just like any business tries to offer more than one product so they can attract a variety of customers and their money.</li>
                        <li>Cheaper than usual pricing for that breed or extremely expensive pricing.</li>
                        <li>The breeder seems to always have puppies available. This indicates that they have multiple breeding dogs at one time. </li>
                        <li>The breeder does not ask a lot of questions about the potential buyer. Most reputable breeders want to make sure that the puppy is going to good home Asks about your family’s lifestyle, why you want a dog, and your care and training plans for the puppy. Puppy mills only care about selling their product and do not care what happens to the puppy after the sale.</li>
                        <li>There is no puppy contract or minimal paperwork required to purchase the puppy.</li>
                        <li>They do not make any guarantees to take the take back the pet at any time during the animal’s life, no matter the reason.</li>
                        <li>They offer puppies at ages younger than 8 weeks old.</li>
                        <li>There are no records or veterinary exams, and the vaccines are not given by a veterinarian. Puppy mills will vaccinate the puppies themselves.</li>
                        <li>The puppy is posted for sale online or on social media.</li>
                        <li>The breeder is happy to ship the puppy to you sight unseen.</li>
                    </ul>
                    {/*<p className="w3-large w3-text-grey w3-hide-medium">Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum consectetur adipiscing elit, sed do eiusmod temporincididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>*/}
                </div>
            </div>
        </div>
    </>
  )
}