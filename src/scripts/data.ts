const dataCache: Link[] = [];

export interface Link {
  Name: string;
  Link: string;
};

const initialiseCache = () => {
  chrome.storage.local.get("data", (result) => {
    if (!result.data)
      return;
  
    dataCache.push(...result.data);
  });
};

export const getLinkByName = (query: string) => {
  return dataCache.filter(item => 
    item.Name.toLowerCase().includes(query
  ));
}

export const getAllLinks = () => {
  return dataCache;
};  

export const addLink = async (link: Link) => {
  dataCache.push(link);
  await persistCache();
};

export const removeLink = (link: Link) => {

};

const persistCache = async () => {
  return new Promise((resolve, reject) => {
    chrome.storage.local.set({data: dataCache}, (value: void) => {
      resolve(value);
    });
  })
};

initialiseCache();