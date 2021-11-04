# abouts-finder
A tool to find and copy frequently used links to reference from a user defined list.

## Development

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
