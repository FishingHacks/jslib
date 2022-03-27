# jslib

# WARNING
Read the WHOLE Readme, this package **can** have multiple security vulnerabilities, when used wrong! (the main one is XSS)

The index.html is used for examples to directly view in the browser

## Modals
To create a modal, use the following syntax:

```js
new HTMLModal('<title>', '<body (can include \n)>'[, buttons[, style]]);
```
The style attribute will be applied as the highest in the modal div
The buttons are as following:
```js
["name", onclickfunction, "bg-red/yellow/green/gray"]
```
together in a array

Functions:
HTMLModal.close - Removes the Modal

HTMLModal.open - Opens The Modal

## Notifications
Info: Notifications automatically disappear after 7 seconds.

It uses the same syntax as the modals, with the difference, that it doesn't use the last button-styling option, and the class you will use is HTMLNotification

example:
```js
new HTMLNotification('title', 'body', [["close", (n)=>n.close()]], "background: #ff0000");
```

Functions:
HTMLNotification.close - Removes the Notification

HTMLNotification.open - Opens The Notification

HTMLNotification.smoothClose - Fades the notification out and the calls HTMLNotification.close

to show any of these, use:
modal/notification.open();

closing works about the same:
modal/notification.close();

to modify the body, use modal/notification.body, the title .title. You need to reopen them using .close(); and .open();

## The TableMaker
The tablemaker uses the following format:

{
    char: [...elements]
}

To use it, use the function makeTable(table);

example:
```js
const table = {
    "user": ["name", "passwordHash", "profilePicture"],
    "product": ["name", "price", "picture", "amountLeft"],
}
document.querySelectorAll("tables")[0].append(makeTable(table));
```

## easyAnchors (a-tag)
We added the functionality, to give an a tag a class with the format event:function, for example: \<a class="click:(e)=>{console.log(e)}">click me</a>. This logs the PointerEvent in the console, everytime you click on that a-element. When window.DISABLEANCHORS (before the load event is triggered, so at best in the header, in the first script tag) is set to true, this feature will be disabled (Hopefully), why this could be useful: You prevent code execution on your site, because classes are normally safe, and won't be removed by the sanitizers


## drawGraph
Draws a graph

Arguments:

arr, parent, widthInBetween, heightInBetween, maxWidth, maxHeight

maxWidth and maxHeight are defaulted to -1, because then they will be ignored. Should the graph go out of borders, you can use the scrollbars

height and width in between change the space between unit and value

Example:
```js
function makeNumber(i) {
  return Math.floor(Math.random() * i);
}

function makeNumbers() {
  let arr = [];
  let i = 0;
  while (i < 200) {
    arr.push(makeNumber(150));
    i++;
  }
  return arr;
}

window.addEventListener("load", () =>
  drawGraph(makeNumbers(), document.body, 10, 5, 1400, 800)
);
```

## makeTable
Creates a console.table-like html-table.

Example:
```js
document.append(makeTable({a: [1,2,3], b: [1,2,3]}));
```