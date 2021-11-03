const $addButton = document.getElementById("btnAdd");
const $name = document.getElementById("txtName");
const $link = document.getElementById("txtLink");

const $table = document.getElementById("tblData");

const dataCache = [];

chrome.storage.sync.get("data", (result) => {
  dataCache.push(...result.data);

  dataCache.forEach((link, index) => {
    addToTable(index, link.Name, link.Link);
  });
});

$addButton.addEventListener("click", () => {
  dataCache.push({ "Name": $name.value, "Link": $link.value });
  chrome.storage.sync.set({data: dataCache});
  addToTable(dataCache.length - 1, $name.value, $link.value);
});

const remove = (e) => {
  console.log("removing " + e.target.dataset.item);
  dataCache.splice(e.target.dataset.item, 1);
  chrome.storage.sync.set({data: dataCache});
  removeFromTable(e.target.dataset.item);
};

const addToTable = (index, name, link) => {
  const row = linkTemplate.content.firstElementChild.cloneNode(true);
  row.id = "row-" + index; 

  row.querySelector(".name").innerText = name;
  row.querySelector(".link").innerText = link;

  const btn = row.querySelector(".btnDelete");
  btn.dataset.item = index;
  btn.addEventListener("click", remove);

  tblData.appendChild(row);
};

const removeFromTable = (index) => {
  const target = document.getElementById("row-" + index);
  target.parentElement.removeChild(target);
}