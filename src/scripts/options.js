let dataCache = [];

chrome.storage.local.get("data", (result) => {
  if (!result.data)
    return;

  dataCache.push(...result.data);

  dataCache.forEach((link, index) => {
    addToTable(index, link.Name, link.Link);
  });
});

const add = () => {
  const name = txtName.value;
  const link = txtLink.value;

  dataCache.push({ "Name": name, "Link": link });
  chrome.storage.local.set({data: dataCache});
  addToTable(dataCache.length - 1, name, link);
}

const remove = (e) => {
  dataCache.splice(e.target.dataset.item, 1);
  chrome.storage.local.set({data: dataCache});
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

const reset = () => {
  tblData.innerText = "";
  dataCache = [];
  chrome.storage.local.set({data: []});
};

btnAdd.addEventListener("click", add);

btnRestore.addEventListener("click", () => {
  if(!fileData.files.length) {
    window.alert("You need to select a file");
    return;
  }

  if (!dataCache.length || window.confirm("This will overwrite all your existing links, are you sure you wish to restore from a backup?")) {
    Papa.parse(fileData.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: function(results) {
        if (results.errors.length) {
          window.alert("Your file is not valid, please check it for any errors and try again.");
          return;
        }
        
        reset();
        dataCache = results.data;
        chrome.storage.local.set({data: results.data});
        results.data.forEach((x, i) => {
          addToTable(i, x.Name, x.Link);
        });
      }
    });
  }
});

btnDownload.addEventListener("click", () => {
  const csv = Papa.unparse(dataCache);

  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(csv));
  element.setAttribute('download', "all-abouts.csv");

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
});