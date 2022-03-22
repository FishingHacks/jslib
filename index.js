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

  get closed() {return !bool(document.getElementById("modal-" + this.id));}
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

function loadSystems() {
  console.log("Loading notification system...");
  console.log("Loading Modal system...");
  sajdksaljfklsdjfklasjdklasjdlkasjkda.update();
}

window.addEventListener("load", loadSystems);
