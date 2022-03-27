function executenotificationfunction(a, b) {
  sajdksaljfklsdjfklasjdklasjdlkasjkda.notifications[a]?.buttons[b]?.[1]?.(
    sajdksaljfklsdjfklasjdklasjdlkasjkda.notifications[a]
  );
}

class HTMLNotification {
  title = "";
  body = "";
  buttons = {};
  style = "";
  id = "";
  closed = true;
  toClose = Date.now();
  constructor(title, body, buttons = [], style = "") {
    this.title = title;
    this.body = body;
    buttons.forEach(
      (el) =>
        (this.buttons[sajdksaljfklsdjfklasjdklasjdlkasjkda.createID()] = el)
    );
    this.style = style;
    this.id = sajdksaljfklsdjfklasjdklasjdlkasjkda.createID();
    sajdksaljfklsdjfklasjdklasjdlkasjkda.notifications[this.id] = this;
  }
  open() {
    HTMLNotification.open(this.id);
  }
  close() {
    HTMLNotification.close(this.id);
  }
  smoothClose() {
    HTMLNotification.smoothClose(this.id);
  }
}

HTMLNotification.close = function (id) {
  let n = document.getElementById("notification-" + id);
  if (!n) return;
  n.parentElement.removeChild(n);
  sajdksaljfklsdjfklasjdklasjdlkasjkda.notifications[id].closed = true;
};

HTMLNotification.smoothClose = function (id) {
  sajdksaljfklsdjfklasjdklasjdlkasjkda.notifications[id].toClose =
    Date.now() + 1000;
};

HTMLNotification.open = function (id) {
  let ce = (...args) => document.createElement(...args);
  let n = sajdksaljfklsdjfklasjdklasjdlkasjkda.notifications[id];
  n.closed = false;
  n.toClose = Date.now() + 7000;
  let not = ce("div");
  not.classList.add("notification");
  not.id = "notification-" + id;
  not.setAttribute("style", n.style);
  let title = ce("h3");
  title.classList.add("notification-title");
  title.append(document.createTextNode(n.title));
  not.append(title);
  let b = ce("p");
  b.classList.add("notification-body");
  n.body.split("\n").forEach((el) => {
    b.append(ce("br"));
    b.append(document.createTextNode(el));
  });
  b.removeChild(b.children[0]);
  not.append(b);
  let buttons = ce("div");
  buttons.classList.add("buttons");
  not.append(buttons);
  let vals = Object.values(n.buttons);
  Object.keys(n.buttons).forEach((el, i) => {
    let id = el;
    let nid = n.id;
    let t = vals[i][0];
    let a = ce("a");
    a.textContent = t;
    a.setAttribute(
      "onclick",
      "executenotificationfunction('" + nid + "', '" + id + "');"
    );
    buttons.append(a);
  });
  document.querySelector("notification-body").append(not);
};

class HTMLModal {
  title = "";
  body = "";
  closed = true;
  buttons = {};
  style = "";
  id = "";
  constructor(title, body, buttons = [], style = "") {
    buttons.unshift(["close", (m) => m.close(), "bg-gray"]);
    this.title = title;
    this.body = body;
    buttons.forEach(
      (el) =>
        (this.buttons[sajdksaljfklsdjfklasjdklasjdlkasjkda.createID()] = el)
    );
    this.style = style;
    this.id = sajdksaljfklsdjfklasjdklasjdlkasjkda.createID();
    sajdksaljfklsdjfklasjdklasjdlkasjkda.modals[this.id] = this;
  }

  open() {
    let modal = document.createElement("div");
    modal.classList.add("modal");
    modal.id = "modal-" + this.id;
    let title = document.createElement("h1");
    title.textContent = this.title;
    let hbody = document.createElement("p");
    this.body.split("\n").forEach((el) => {
      hbody.appendChild(document.createElement("br"));
      hbody.appendChild(document.createTextNode(el));
    });
    hbody.removeChild(hbody.children[0]);

    let buttons = document.createElement("div");
    buttons.classList.add("buttons");

    let vals = Object.values(this.buttons);
    Object.keys(this.buttons).forEach((el, i) => {
      let id = el;
      let mid = this.id;
      let t = vals[i][0];
      let s = vals[i][2];
      let a = document.createElement("a");
      a.classList.add(s);
      a.setAttribute(
        "onclick",
        "executemodalcommand('" + mid + "', '" + id + "')"
      );
      a.textContent = t;
      buttons.append(a);
    });

    modal.append(title, hbody, buttons);
    document.body.append(modal);
  }
  close() {
    try {
      let n = document.getElementById("modal-" + this.id);
      n.parentElement.removeChild(n);
    } catch (e) {}
  }

  get closed() {
    return !bool(document.getElementById("modal-" + this.id));
  }
}

function executemodalcommand(mid, id) {
  console.log(
    sajdksaljfklsdjfklasjdklasjdlkasjkda.modals[mid].buttons[id][1],
    sajdksaljfklsdjfklasjdklasjdlkasjkda.modals[mid]
  );
  sajdksaljfklsdjfklasjdklasjdlkasjkda.modals[mid].buttons[id][1](
    sajdksaljfklsdjfklasjdklasjdlkasjkda.modals[mid]
  );
}

const sajdksaljfklsdjfklasjdklasjdlkasjkda = {
  loadEasyA: function () {
    let as = Object.values(document.querySelectorAll("a"));
    as.forEach((el) => {
      el.classList.forEach((clazz) => {
        if (clazz.split(":")[1]) {
          el.addEventListener(clazz.split(":")[0], (...args) => {
            console.log(args, clazz);
            eval(clazz.split(":")[1])(...args);
          });
        }
      });
    });
  },
  notifications: {},
  modals: {},
  createID() {
    return btoa(
      Math.random() * Date.now() +
        Math.random() * Date.now() +
        Math.random() * Date.now()
    );
  },
  update() {
    Object.keys(sajdksaljfklsdjfklasjdklasjdlkasjkda.notifications).forEach(
      (el) => {
        try {
          if (
            sajdksaljfklsdjfklasjdklasjdlkasjkda.notifications[el].toClose <=
            Date.now()
          ) {
            HTMLNotification.close(
              sajdksaljfklsdjfklasjdklasjdlkasjkda.notifications[el].id
            );
          }
          if (
            sajdksaljfklsdjfklasjdklasjdlkasjkda.notifications[el].toClose <=
            Date.now() + 1000
          ) {
            document
              .getElementById(
                "notification-" +
                  sajdksaljfklsdjfklasjdklasjdlkasjkda.notifications[el].id
              )
              .classList.add("disappear");
          }
        } catch (e) {}
      }
    );
    requestAnimationFrame(sajdksaljfklsdjfklasjdklasjdlkasjkda.update);
  },
};

function createHTMLModal(title, body, buttons=[], style="") {return new HTMLModal(title, body, buttons, style)}
function createHTMLNotification(title, body, buttons=[], style="") {return new HTMLNotification(title, body, buttons, style)}

/**
 * @param {{[name: string]: Array<T>}} obj
 */
function makeTable(obj) {
  let longestLength = Object.values(obj).reduce(
    (a, el) => (el.length > a ? el.length : a),
    Object.values(obj)[0] ? Object.values(obj)[0].length : 0
  );
  let indexes = [];
  let i = 0;
  while (i < longestLength) {
    indexes.push(i);
    i++;
  }
  let table = document.createElement("table");
  let tmp = document.createElement("tr");
  let tmp1 = document.createElement("th");
  tmp1.setAttribute(
    "style",
    "padding:3px;backdrop-filter: drop-shadow(2px 4px 6px black);background: #ffffff2b;"
  );
  tmp.append(tmp1);
  tmp1.textContent = "(index)";
  indexes.forEach((el) => {
    let _el = document.createElement("th");
    _el.textContent = el.toString();
    _el.setAttribute(
      "style",
      "padding:3px;backdrop-filter: drop-shadow(2px 4px 6px black);background: #ffffff2b;"
    );
    tmp.append(_el);
  });
  table.append(tmp);
  let ks = Object.keys(obj);
  Object.values(obj).forEach((el, i) => {
    tmp = document.createElement("tr");
    let name = ks[i];
    tmp1 = document.createElement("th");
    tmp1.setAttribute(
      "style",
      "padding:3px;backdrop-filter: drop-shadow(2px 4px 6px black);background: #ffffff2b;"
    );
    tmp1.textContent = name;
    tmp.append(tmp1);
    el.forEach((el) => {
      _el = document.createElement("td");
      _el.textContent = el != undefined && el != null ? el : "";
      _el.setAttribute(
        "style",
        "padding:3px;backdrop-filter: drop-shadow(2px 4px 6px black);background: #ffffff2b;"
      );
      tmp.append(_el);
    });
    table.append(tmp);
  });
  table.setAttribute(
    "style",
    "display: inline-block;border-radius: .5em;padding: 3px;background: linear-gradient(45deg, blueviolet, mediumvioletred);"
  );
  return table;
}

function makeNumbers(i) {
  let ret = [];
  let _i = 0;
  while (_i < i) {
    ret.push(Math.floor(Math.random() * 3299) / 10);
    _i++;
  }
  return ret;
}

function loadSystems() {
  console.log(
    "Rick Astley - Never Gonna Give You Up\n\n  01:43 ━━━━●───── 03:32\n   ⇆ㅤ ㅤ◁ㅤ ❚❚ ㅤ▷ ㅤㅤ↻"
  );
  console.log(
    "PCs are like Air Conditioning - They become useless, when you open Windows"
  );
  console.log("Loading notification system...");
  console.log("Loading Modal system...");
  if (!window.DISABLEANCHORS) {
    console.log("Loading easy Anchors...");
    sajdksaljfklsdjfklasjdklasjdlkasjkda.loadEasyA();
  } else console.log("easyAnchors are disabled");
  sajdksaljfklsdjfklasjdklasjdlkasjkda.update();
  let s = document.createElement("style");
  s.textContent = css;
  document.head.append(s);
}

window.addEventListener("load", loadSystems);

/** I-----------------------------------------------I
 *                      Styling
 *  I-----------------------------------------------I
 */

let css = `notification-body[position^="top"] {
  top: 0px;
}

notification-body[position^="bottom"] {
  bottom: 0px;
}

notification-body[position^="center"] {
  top: 50%;
  bottom: 50%;
}

notification-body[position$="left"] {
  left: 0px;
}

notification-body[position$="right"] {
  right: 0px;
}

notification-body[position$="center"] {
  left: 50%;
  right: 50%;
}

notification-body {
  margin: 10px;
  position: absolute;
}

notification-body > div.notification {
  background-color: var(--nbg);
  color: var(--ntc);
}

div.notification {
  border: var(--bw) var(--bcol) var(--bs);
  border-radius: var(--br);
  padding: 5px;
  max-width: 20vw;
  min-width: 10vw;
}

div.notification>* {
  margin: 0px;
}

div.notification>h1.notification-title {
  margin-bottom: 5px;
}

div.notification>div.buttons{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-content: center;
  align-items: center;
}

div.notification>div.buttons>a{
  color: var(--nbc);
  font-weight: bolder;
  cursor: var(--nbcur);
  margin-top: 5px;
  margin-right: 5px;
}

:root {
  --nbc: green;
  --nbcur: pointer;
  --nbg: blueviolet;
  --ntc: whitesmoke;
  --br: .5em;
  --bw: 2px;
  --bs: solid;
  --bcol: black;
  --font: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

div.notification.disappear {
  animation: disappear 1.01s ease-in-out;
}

@keyframes disappear {
  0% {
      opacity: 100%;
  }

  100% {
      opacity: 0%;
  }
}

.modal, div.notification {
  font-family: var(--font);
}

.modal {
  z-index: 100000;
  border-radius: .5em;
  border: black 2px solid;
  left: 30%;
  right: 30%;
  top: 25%;
  bottom: 75%;
  position: absolute;
  display: flex;
  flex-direction: column;
  width: fit-content;
  max-width: 50%;
  height: fit-content;
  max-height: 50%;
  padding: 10px;
  box-shadow: 5px 5px 5px black;
}

.modal>*:not(.buttons) {
  margin: 0px;
}

.bg-green {
  background-color: green;
}

.bg-red {
  background-color: red;
}

.bg-gray {
  background-color: gray;
}

.bg-yellow {
  background-color: yellow;
  color: black !important;
}

.modal > .buttons > a {
  padding: 6px;
  color: white;
  border-radius: .5em;
  padding-left: 12px;
  padding-right: 12px;
  cursor: pointer;
  margin-right: 5px;
  margin-bottom: 5px;
}

.bg-purple {
  background-color: purple;
  color: aliceblue;
}

.modal>.buttons {
  display: flex;
  flex-wrap: wrap;
}`;

function drawGraph(
  arr,
  el,
  widthInBetween = 5,
  heightInBetween = 2,
  maxWidth = -1,
  maxHeight = -1
) {
  arr = arr.map((el) => el * -1);
  let width = widthInBetween * (arr.length + 1) + 20;
  let lowest = arr.reduce((acc, el) => (el < acc ? el : acc), Infinity);
  let highest = arr.reduce((acc, el) => (el > acc ? el : acc), -Infinity);
  let height = (Math.abs(lowest) + Math.abs(highest) + 1) * heightInBetween;
  let normalize = 0 - lowest;
  let canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  let ctx = canvas.getContext("2d");
  let i = lowest;
  let _i = 0;
  while (i < highest) {
    ctx.fillText(i * -1, 5, _i * heightInBetween, 15);
    i += 20 / heightInBetween;
    _i += 20 / heightInBetween;
  }
  ctx.beginPath();
  moveTo(
    0 * widthInBetween + widthInBetween / 2 + 20,
    (arr[0] + normalize) * heightInBetween + heightInBetween / 2
  );
  let tmp = arr.shift();
  arr.forEach((el, i) => {
    ctx.lineTo(
      i * widthInBetween + widthInBetween / 2 + 20,
      (el + normalize) * heightInBetween + heightInBetween / 2
    );
  });
  arr.unshift(tmp);
  4;
  ctx.stroke();
  if (maxHeight == -1 || maxWidth == -1) el.append(canvas);
  else {
    let div = document.createElement("div");
    div.append(canvas);
    if (maxWidth != -1) div.style.maxWidth = maxWidth + "px";
    if (maxHeight != -1) div.style.maxHeight = maxHeight + "px";
    div.style.overflow = "scroll";
    el.append(div);
  }
}
