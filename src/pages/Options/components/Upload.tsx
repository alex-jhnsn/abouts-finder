import React, { ChangeEvent, useState } from "react";
import { parse, LocalFile } from "papaparse";
import { toast } from "react-hot-toast";

interface Link {
  Name: string,
  Url: string
}

interface LinkFile {
  Name: string,
  Link: string
}

export const Upload = () => {

  const [file, setFile] = useState<string>();
  const [fileSelected, setFileSelected] = useState(false);

  const handleRestoreClick = () => {
    if (fileSelected && file !== undefined) {
      const links: Link[] = parse<LinkFile>(file, 
        {
        header: true,
        skipEmptyLines: true
      }).data.map(d => {return { Name: d.Name, Url: d.Link }});

      saveLinks(links);
      toast.success("Restored links from backup.");
    }
      
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) {
      setFileSelected(false);
      return;
    }
    
    const file = await event.target.files[0].text();

    setFile(file);
    setFileSelected(true);
  };

  const saveLinks = (links: Link[]): Promise<void> => {
    return new Promise((resolve, reject) => {
      chrome.storage.local.set({data: links}, (value: void) => {
        resolve(value);
      });
    })
  };

  return (
    <div>
      <input type="file" accept=".csv" onChange={handleFileChange}/>
      <button onClick={handleRestoreClick}>Restore</button>
    </div>
  );
}