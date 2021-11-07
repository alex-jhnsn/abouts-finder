# abouts-finder
A tool to find and copy frequently used links to reference from a user defined list.

[![Available on the Chrome Web Store](https://storage.googleapis.com/web-dev-uploads/image/WlD8wC6g8khYWPJUsQceQkhXSlv1/tbyBjqi7Zu733AAKA5n4.png)](https://chrome.google.com/webstore/detail/all-abouts-finder/kmnoffbmeiphfoaiopaecbmncibcpncf)

## Using the extension
1. Download and install the extension from the [chrome web store](https://chrome.google.com/webstore/detail/all-abouts-finder/kmnoffbmeiphfoaiopaecbmncibcpncf).
2. Click the extension icon or open the extensions options page.
3. Add your links. There are two ways to do this
   1. Add links one by one, this is good if you are starting from scratch.
   2. Upload a `.csv` file containing all your links.
4. Close the options page and click the extension icon again and start searching.
5. Enjoy.

### CSV File Format
The extension requires that the CSV files used follow a certain format.

```
Name,Link
Example Link Name,https://www.example.com/example
Example Link Name 2,https://www.example.com/example-2
Example Link Name 3,https://www.example.com/example-3
Example Link Name 4,https://www.example.com/example-4
```

[This](https://www.solveyourtech.com/save-csv-google-sheets/) is a good guide as to how to create a .csv file using Google Sheets.

Your spreadsheet needs two columns with the first cell in each column containing `Name` and `Link`, make sure the column titles casing are as per the examples.

Then add your links to the rows one after the other, ensuring that you leave no blank spaces. When you export your *.csv* file it should look like the example above.

## Developers

### Prerequesites
To get this project running locally you will need:

- node and npm
- gulp cli

### Installation
1. Clone the repository.
2. Run `npm install` inside the root of the repository.
3. Run either of the following commands:
   1. `npm build` - which will work some magic and place the ready extension into the */build* directory.
   2. `npm dev` - which will do the same as above but importantly with *--watch* provided to gulp which will rebuild the project when a change is detected in the */src* folder.
4. Ensure developer mode is enabled in `chrome://extensions/` and click  `Load unpacked`.
5. Select the */build* folder from the repository root.
6. 🎉 You're ready to go!

If you are unsure about loading extensions or want to learn more about building your own see the [docs](https://developer.chrome.com/docs/extensions/mv3/getstarted/).

## Acknowledgements
The heavy lifting of CSVs is handled by [papaparse](https://www.papaparse.com/).

The icons in the project are from [fontawesome](https://fontawesome.com/), the license for which can be found [here](https://fontawesome.com/license).
