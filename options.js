const $addButton = document.getElementById("btnAdd");
const $name = document.getElementById("txtName");
const $link = document.getElementById("txtLink");

const $table = document.getElementById("tblData");

let dataCache = [];

chrome.storage.sync.get("data", (result) => {

  if (!result.data)
    return;

  dataCache.push(...result.data);

  dataCache.forEach((link, index) => {
    addToTable(index, link.Name, link.Link);
  });
});

const add = () => {
  dataCache.push({ "Name": $name.value, "Link": $link.value });
  chrome.storage.sync.set({data: dataCache});
  addToTable(dataCache.length - 1, $name.value, $link.value);
}

const remove = (e) => {
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
};

$addButton.addEventListener("click", add);

fileData.addEventListener("change", (e) => {
  console.log("Change");

  Papa.parse(e.target.files[0], {
    header: true,
    skipEmptyLines: true,
    complete: function(results) {
      if (results.errors)
        console.log("oops");

      console.log(results);
      
      dataCache = results.data;
      chrome.storage.sync.set({data: dataCache});
      results.data.forEach((x, i) => {
        addToTable(i, x.Name, x.Link);
      });
    }
  });
});