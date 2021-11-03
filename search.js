const url = chrome.runtime.getURL('data/database.json');

let database;

fetch(url)
    .then((response) => response.json())
    .then((json) => { database = json });


const $search = document.getElementById("search");
const $template = document.getElementById("searchResult");

$search.addEventListener("keyup", e => {
  const searchValue = e.target.value.toLowerCase();

  const $results = document.getElementById("resultsBox");
  $results.innerText = "";
  const results = [];

  if (searchValue === "")
  return;

  database.forEach(category => {
    category.Items.filter(item => item.Name.toLowerCase().includes(searchValue)).forEach(filtered => {
      results.push(filtered);
    })
  });

  results.forEach(result => {
    const item = document.getElementById("searchResult").content.firstElementChild.cloneNode(true);
    item.querySelector(".name").innerText = result.Name;
    item.querySelector('.link').innerText = result.Link;
    item.dataset.link = result.Link;
    item.addEventListener("click", copyText);
    $results.appendChild(item);
  });
});

const copyText = (e) => {
  navigator.clipboard.writeText(e.target.closest("button").dataset.link).then(() => {
    const $popup = document.querySelector(".popup.success");
    $popup.classList.add("show");
    setTimeout(() => $popup.classList.remove("show"), 3000);
  }, () => {
    const $popup = document.querySelector(".popup.fail");
    $popup.classList.add("show");
    setTimeout(() => $popup.classList.remove("show"), 3000);
  });

  document.activeElement.blur()
}