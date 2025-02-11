// Event listener for message from background.js:
chrome.runtime.onMessage.addListener((request) => {
    // Get the tab info from the background message:
    const tabInfo = request.tabInfo;

    // Debug info about tab:
    // console.log(tabInfo);

    const mainUrl = "https://puppies.com/";
    const findAPuppyUrl = "https://puppies.com/find-a-puppy";
    const listingsUrl = "https://puppies.com/listings/";

    // If the URL is the main URL, show an alert::
    if (tabInfo.url === mainUrl) {  
        window.alert("Welcome to Puppy Mill Buster\n\nThis extension pops up on puppy adoption sites with suspicious material.\n\nWe hope this will help adopters make informed decisions on dog adoption sites.\n\nThis site is known to display posts of dogs from puppy mills, please use caution while browsing.");
    }

    // If the URL is the "find a puppy" URL show an alert only on the first open:
    if (tabInfo.url === findAPuppyUrl) {
        // Check session storage to see if this alert was displayed during this session:
        if (sessionStorage.getItem("showedFindAPuppyAlert") !== "true") {
            window.alert("Welcome to Puppy Mill Buster\n\nThis extension pops up on puppy adoption sites with suspicious material.\n\nWe hope this will help adopters make informed decisions on dog adoption sites.\n\nThis site is known to display posts of dogs from puppy mills, please use caution while browsing.");
            sessionStorage.setItem("showedFindAPuppyAlert", "true");
        }
    }

    // If the URL starts with the listings URL, the user is viewing a listing:
    if (tabInfo.url.startsWith(listingsUrl)) {
        // Once the page is in readyState == complete, the DOM should be loaded (the DOM event listener did not work here):
        if (document.readyState === "complete") {
            // The page content we need does not load immediately, so the following waits 3s for the content to be accessible:
            setTimeout(() => {
                // Get the dog info and convert it into a JSON object:
                const data = getDogInfo();

                if (data !== "")
                    console.log(convertDataIntoJSON(data));
                else
                    console.log("ERROR: The extension was not able to parse the HTML.");
            }, 3000);
        }
    }

    return Promise.resolve({ response: "Message Received" });
});

// The following function parses the HTML and finds the info we need on the page:
const getDogInfo = () => {
    const searchTextFemale = "Female, Born on ";
    const searchTextMale = "Male, Born on ";
    let textFoundArr = [];
    
    document.querySelectorAll("div").forEach((ele) => {
        if (ele.innerText.search(searchTextFemale) != -1 || ele.innerText.search(searchTextMale) != -1) {
            textFoundArr.push(ele.innerText);   
        }
    });

    let data;
    if (typeof textFoundArr !== undefined && typeof textFoundArr !== null)
        data = textFoundArr[0].split("\n");
    else
        data = "";

    return data;
}

// The following function converts the data into JSON:
const convertDataIntoJSON = (data) => {
    // First three elements are not needed:
    data[0] = null;
    data[1] = null;
    data[2] = null;

    // This portion appears to be the format "+[Int]" to indicate the amount of photos on the page.
    // This can be removed for our purposes.
    if (data[3][0] === "+") {
        data.splice(3, 1);
    }

    // Basic dog info:
    const dogName = data[3];
    const allAboutMeIndex = data.indexOf("All About Me!");

    // If mutiple breeds are listed, a "/" separates them:
    let dogBreed;
    if (data[5][0] === "/") {
        dogBreed = data[4] + " / " + data[6];
    } else {
        dogBreed = data[4];
    }

    const dogSex = data[allAboutMeIndex - 2].split(",")[0];
    const birthday = data[allAboutMeIndex - 2].split("Born on ")[1].split(" -")[0];
    const location = {"city": data[allAboutMeIndex - 1].split(",")[0], "state": data[allAboutMeIndex - 1].split(", ")[1]};

    // Listing details:
    const startIndex = allAboutMeIndex + 1;
    const result = data.slice(startIndex).findIndex((ele) => ele.includes("$") && data[data.indexOf(ele) + 1] === "Available for:");
    
    // The following finds all of the listing details and adds them into a single string:
    let listingDetails = "";
    let endIndex = -1;
    if (result !== -1) {
        endIndex = result + startIndex;
        listingDetails = data.slice(startIndex, endIndex);
    }

    // The following finds the price:
    let price = null;
    if (endIndex) {
        price = data[endIndex];
    }

    // Get the "available for" details:
    const availableForIndex = data.indexOf("Available for:");
    const availableForStartIndex = availableForIndex + 1;
    const availableForResult = data.slice(availableForStartIndex).findIndex((ele) => ele.includes("Offered By"));
    
    let availableForDetails = "";
    let availableForEndIndex = -1;
    if (availableForResult !== -1) {
        availableForEndIndex = availableForResult + availableForStartIndex;
        availableForDetails = data.slice(availableForStartIndex, availableForEndIndex);
    }

    // Get the "Why I stand out" info:
    const whyIStandOutStartIndex = data.indexOf("Why I stand out");
    const whyIStandOutStartResult = data.slice(whyIStandOutStartIndex).findIndex((ele) => ele.includes("Offered By"));
    
    let whyIStandOutDetails = "";
    let whyIStandOutEndIndex = -1;
    if (whyIStandOutStartResult !== -1) {
        whyIStandOutEndIndex = whyIStandOutStartResult + whyIStandOutStartIndex;
        whyIStandOutDetails = data.slice(whyIStandOutStartIndex, whyIStandOutEndIndex);
    }

    // Get seller info:
    const sellerInfoStartIndex = whyIStandOutEndIndex + 1;
    const sellerName = data[sellerInfoStartIndex];
    const sellerInfoResult = data.slice(sellerInfoStartIndex + 1).findIndex((ele) => ele.includes("CONTACT ME"));
    
    let sellerInfoDetails = "";
    let sellerInfoEndIndex = -1;
    if (sellerInfoResult !== -1) {
        sellerInfoEndIndex = sellerInfoResult + sellerInfoStartIndex;
        sellerInfoDetails = data.slice(sellerInfoStartIndex + 1, sellerInfoEndIndex);
    }

    // Create the JSON object:
    const json = { 
        "dogName": dogName,
        "dogBreed": dogBreed,
        "dogSex": dogSex,
        "birthday": birthday,
        "location": location,
        "listingDetails": listingDetails,
        "price": price,
        "availableForDetails": availableForDetails,
        "sellerName": sellerName,
        "sellerInfo": sellerInfoDetails,
        "whyIStandOutDetails": whyIStandOutDetails
    };

    return JSON.stringify(json);
}
