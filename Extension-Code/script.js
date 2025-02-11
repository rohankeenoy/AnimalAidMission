// Set event listeners for the extensions buttons:
document.getElementById("add_report").addEventListener("click", (event) => {
    new URL("http://localhost:5000/model/predict").searchParams.append('address', "611 Gravois Rd, Fenton, MO 63026");
    //removed the window.open so the page doesn't come up. 
    //window.open(webpageURL, "_blank")
});

document.getElementById("report_button").addEventListener("click",(event) => {
    window.open("http://localhost:3000/report");
    console.log("changing")
});

document.getElementById("main_button").addEventListener("click",(event) => {
    window.open("http://localhost:3000/");
});
