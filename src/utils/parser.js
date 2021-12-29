import { htmlData } from "./htmldata";

const attributesRegex = /([-A-Za-z0-9_]+)(?:\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|([^>\s]+)))?/g;
const newLineRegex = /↵\n/;
const parsingStack = [];
const autoCloseTags = [
  "META",
  "IMG",
  "meta",
  "img",
  "BR",
  "br",
  "hr",
  "HR",
  "DOCTYPE",
  "!--",
];
const Parser = {
  parseTag: function (text = "") {
    const result =
      text.indexOf("</") !== -1
        ? this.parseEndTag(text)
        : this.parseStartTag(text);
    return result;
  },
  parseStartTag: function (text) {
    const result = text.match(attributesRegex) || [];
    const elementObject = {
      attribute: [],
      childrens: [],
      isTagClosed: false,
    };
    if (result.length > 0) {
      const [tagName, ...rest] = result;
      elementObject["tagName"] = tagName === "--" ? "comment" : tagName;
      let elm = {};
      for (let [name, value] of rest.map((el) => el.split("="))) {
               elm[name.trim()] =value?value.substr(1,value.length-2):value;//substr is required as its giving already string with quotes i.e ""
      }
      elementObject["attribute"].push(elm);
    }
    this.handleClosingElement(elementObject);
    return elementObject;
  },
  parseEndTag: function (text) {
    const result = text.match(attributesRegex) || [];
    const [tagName] = result;
    let lastElement = parsingStack[parsingStack.length - 1];
    while (
      lastElement &&
      tagName &&
      lastElement.tagName &&
      lastElement.tagName !== tagName
    ) {
      closeElement(lastElement, true);
      lastElement = parsingStack[parsingStack.length - 1];
      // console.log("calling", tagName, lastElement);
    }
    if (tagName && lastElement && lastElement.tagName === tagName) {
      closeElement(lastElement, true);
      //   console.log("calling");
    }
  },
  handleClosingElement: function (currentElement) {
    let lastElement = parsingStack[parsingStack.length - 1];
    if (lastElement) {
      if (
        autoCloseTags.includes(lastElement.tagName) ||
        lastElement.tagName === "comment"
      ) {
        closeElement(lastElement, true);
      } else {
        if (Constants.PTAG.includes(lastElement.tagName)) {
          closeElement(lastElement, true);
          lastElement = parsingStack[parsingStack.length - 1];
        }
        if (
          Constants.DTTAG.includes(currentElement.tagName) &&
          Constants.DTTAG.includes(lastElement.tagName)
        ) {
          // console.log(lastElement,currentElement);
          closeElement(lastElement, true);
          // console.log(lastElement,currentElement);
        }
      }
    }
  },
  feedData: function (data = "") {
    for (let i = 0; i < data.length; ) {
      switch (data[i]) {
        case Constants.ANGLE_BRACKETS_OPEN:
          const index1 = data
            .substring(i)
            .indexOf(Constants.ANGLE_BRACKETS_CLOSE);
          //   console.log(parsingStack);
          const result = this.parseTag(data.substring(i, i + index1 + 1));
          if (result) {
            parsingStack.push(result);
          }
          i = i + index1 + 1;
          break;
        default:
          const index = data
            .substring(i)
            .indexOf(Constants.ANGLE_BRACKETS_OPEN);
          const value =
            index !== -1 ? data.substring(i, i + index) : data.substring(i);
          const element = { tagName: "text", value };
          const lastElement = parsingStack[parsingStack.length - 1];
          if (lastElement) {
            lastElement.childrens.push(element);
          } else {
            parsingStack.push(element);
          }
          i = i + index;
          break;
      }
    }
    return parsingStack;
  },
};

const Constants = {
  ANGLE_BRACKETS_OPEN: "<",
  ANGLE_BRACKETS_CLOSE: ">",
  TAG_CLOSED: "</",
  EQUALS: "=",
  PTAG: ["P", "p"],
  DTTAG: ["DT", "dt"],
};

function closeElement(lastElement, tagClosed = false) {
  parsingStack.pop();
  // console.log("popped", el);
  const parentElement = parsingStack[parsingStack.length - 1];
  if (parentElement) {
    const { isTagClosed } = parentElement;
    if (!isTagClosed) {
      parentElement.childrens.push(lastElement);
      lastElement.isTagClosed = tagClosed;
    } else {
      parsingStack.push(lastElement);
      lastElement.isTagClosed = tagClosed;
    }
  } else {
    const { isTagClosed } = lastElement;
    if (!isTagClosed) {
      lastElement.isTagClosed = tagClosed;
      parsingStack.push(lastElement);
    }
  }
  // console.log(parentElement);
  // console.log(parsingStack);
}
// const parsedData = Parser.feedData(`<div></div><div><TITLE>Bookmarks</TITLE><H1>Bookmarks</H1></div>`);
const tagNameToRecurse = [
  "DT",
  "dt",
  "DL",
  "dl",
  "H3",
  "h3",
  "H1",
  "h1",
  "a",
  "A",
];
// console.log(parsedData);
const parsedData = Parser.feedData(htmlData);

// console.log(parsedData);
const isObjectEmpty = (value) => {
  return (
    value && // 👈 null and undefined check
    Object.keys(value).length === 0 &&
    value.constructor === Object
  );
};

const convertParsedDataTostructure = (data, parentFolder, currentWorking) => {
  let currentFolder = parentFolder || {},
    workingFolder = currentWorking || {};
  for (let val of data) {
    const { childrens, tagName } = val;
    if (childrens && tagNameToRecurse.includes(tagName)) {
      switch (tagName) {
        case "DL":
        case "DT": {
          data = convertParsedDataTostructure(
            childrens,
            currentFolder,
            workingFolder
          );
          currentFolder = data.currentFolder; //do not set working folder as it will change current stack working folder
          //  workingFolder = tagName === "DT"||tagName === "dt"?{}:data.workingFolder;
          break;
        }
        case "A":
        case "a": {
          const { attribute = [] } = val;
          for (let { tagName, value } of val.childrens) {
            const isValidText = newLineRegex.test(value);
            if (!isValidText && tagName === "text") {
              let linkDetails = {
                name: value,
                metadata: attribute,
                type: "link",
              };
              if (Array.isArray(workingFolder.links)) {
                //  console.log(workingFolder);
                workingFolder.links.push(linkDetails); // this will push it into last parent folder
              } else {
                // console.log(workingFolder);
                const  otherLinkFolder = currentFolder["Other Links"];
                if(otherLinkFolder=== undefined){
                  currentFolder["Other Links"]={ type: "folder", links: [] }
                }
                currentFolder["Other Links"].links.push(linkDetails); //this will help to save links which do not have parent folder
              }
            }
          }
          break;
        }
        case "H1":
        case "h1":
        case "H3":
        case "h3": {
          const { attribute = [] } = val;
          // console.log(data);

          for (let { tagName, value } of val.childrens) {
            if (value !== "\n" && tagName === "text") {
              let FolderDetails = {
                name: value,
                metadata: attribute,
                links: [],
                type: "folder",
              };
              if (!isObjectEmpty(workingFolder)) {
                const exisitingObject = workingFolder[value];
                if (exisitingObject) {
                  FolderDetails = exisitingObject; // if two folders have same then it will help to merge data in single folder
                } else {
                  workingFolder[value] = FolderDetails; //this will help in to have parent structure intact
                }
              } else {
                const exisitingObject = currentFolder[value];
                if (exisitingObject) {
                  FolderDetails = exisitingObject; // if two folders have same then it will help to merge data in single folder
                } else {
                  currentFolder[value] = FolderDetails;
                }
              }

              workingFolder = FolderDetails;
            }
          }
          break;
        }
      }
      //  console.log(currentFolder);
    }
  }
  return { currentFolder, workingFolder };
};
const structure = convertParsedDataTostructure(parsedData);
console.log(structure["currentFolder"]["Bookmarks"]);
export const data = structure["currentFolder"];

