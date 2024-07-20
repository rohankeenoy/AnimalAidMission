// Get the elements from the DOM.
const divHTMLEle = document.querySelectorAll("div");
const dogInfoMainArr = [];
let dogInfoArr = [];
let webpageURL = new URL("http://localhost:3000");

function getDogInfo() {
  const searchTextFemale = "Female, Born on ";
  const searchTextMale = "Male, Born on ";
  let textFoundArr = [];
  
  divHTMLEle.forEach((ele) => {
    if (ele.innerText.search(searchTextFemale) != -1 || ele.innerText.search(searchTextMale) != -1) {
      textFoundArr.push(ele.innerText);    
    }
  });

  return textFoundArr[textFoundArr.length - 1];
}

setInterval(main, 1000);

function main() {
  const allMarkupArr = []
  const allMarkup = document.body.innerHTML;
  allMarkupArr.push(allMarkup);
  
  if (allMarkupArr[allMarkupArr.length - 2] != allMarkup) {
    const dogInfo = getDogInfo();
    
    if (typeof(dogInfo) != "undefined") {
      dogInfoArr = dogInfo.split("\n");

      if (dogInfoArr != dogInfoMainArr[dogInfoMainArr[dogInfoMainArr.at(-1)]]) {
        dogInfoMainArr.push(dogInfoArr);
        console.log(dogInfoArr[4]); 
        return dogInfoArr[4];
      }
    }
  }
}

document.getElementById("main_button").addEventListener("click", (event) => {
  webpageURL.searchParams.append('address', "611 Gravois Rd, Fenton, MO 63026");
  window.open(webpageURL, "_blank")
});