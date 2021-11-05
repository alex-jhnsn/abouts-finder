const url = chrome.runtime.getURL('data/database.json');

let database;

chrome.storage.local.get("data", (result) => {
  if (!result.data)
    chrome.runtime.openOptionsPage();

  database = result.data;
});

const searchHandler = (e) => {
  const searchValue = e.target.value.toLowerCase();

  const $results = document.getElementById("resultsBox");
  $results.innerText = "";
  const results = [];

  if (searchValue === "")
  return;

  database
    .filter(item => 
      item.Name.toLowerCase().includes(searchValue
    ))
    .forEach(filtered => {
      results.push(filtered);
    });

  if (results.length) {
    results.forEach(result => {
      const item = document.getElementById("searchResult").content.firstElementChild.cloneNode(true);
      item.querySelector(".name").innerText = result.Name;
      item.querySelector('.link').innerText = result.Link;
      item.dataset.link = result.Link;
      item.addEventListener("click", copyText);
      $results.appendChild(item);
    });
  } else {
    const empty = document.createElement(p);
    empty.innerText = "No results found."
    $results.appendChild(item);
  }
};

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
};

//To account for the clear button
search.addEventListener("search", searchHandler);
search.addEventListener("keyup", searchHandler);