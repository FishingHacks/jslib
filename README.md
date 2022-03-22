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
