# jslib

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



## Notifications
Info: Notifications automatically disappear after 7 seconds.

It uses the same syntax as the modals, with the difference, that it doesn't use the last button-styling option, and the class you will use is HTMLNotification

example:
```js
new HTMLNotification('title', 'body', ["close", (n)=>n.close()], "background: #ff0000");
```

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
