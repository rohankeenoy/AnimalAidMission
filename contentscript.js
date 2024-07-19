function findString(text) {
    document.querySelector("div").textContent = `String found? ${window.find(
      text,
    )}`;

    let test = 1;

    return test;
}
  
window.alert(findString("Female, "));
