module.exports = class CandorClient {
  buffer = [];

  constructor(config = {}) {
    if (!config.id) {
      throw new Error("Invalid ID provided");
    }

    this.config = config;

    console.info("Registering Candor load handlers");
    window.onload = e => this.onLoad(e);
    window.onbeforeunload = e => this.onUnload(e);

    console.info("Registering Candor user input handlers");
    ["mouseup", "mousedown", "mousemove", "keydown", "keyup"].forEach(key =>
      window.addEventListener(key, e => this.onUserInput(key, e))
    );
  }

  onUserInput(type, event) {
    const last = this.buffer.length && this.buffer[this.buffer.length - 1];
    if (type === "mousemove") {
      if (last && last.type === "mousemove") {
        // batch with any previous mouse move events.
        last.event.endX = event.clientX;
        last.event.endY = event.clientY;
      } else {
        this.buffer.push({
          type,
          event: {
            startX: event.clientX,
            startY: event.clientY,
            endX: event.clientX,
            endY: event.clientY
          }
        });
      }
    } else if (["keydown", "keyup"].includes(type)) {
      const { key, keyCode, ctrlKey, shiftKey, altKey, target } = event;
      const eventData = {
        key,
        keyCode,
        ctrlKey,
        shiftKey,
        altKey
      };

      if (target) {
        eventData.target = {
          selector: this.targetSelector(target),
          html: target.outerHTML
        };
      }
      this.buffer.push({ type, event: eventData });
    } else if (["mouseup", "mousedown"].includes(type)) {
      this.buffer.push({
        type,
        event: {
          x: event.clientX,
          y: event.clientY,
          target: event.target && {
            selector: this.targetSelector(event.target),
            html: event.target.outerHTML
          }
        }
      });
    } else {
      this.buffer.push({ type, event });
    }
  }

  onLoad(e) {
    console.info("Candor analytics loaded");
  }

  onUnload(e) {
    console.info("Candor analytics unloaded");

    const formData = new FormData();
    formData.append("siteID", this.config.id);
    formData.append("events", JSON.stringify(this.buffer));

    return fetch("http://localhost:3000/tracking", {
      method: "POST",
      body: formData
    });
  }

  targetSelector(elem) {
    if (elem.id) {
      return `#${elem.id}`;
    }

    let path;
    while (elem) {
      if (!elem.localName) {
        break;
      }

      let subSelector = elem.localName.toLowerCase();
      if (elem.parentElement && elem.parentElement.children.length > 1) {
        let nameCount = 0;
        const index =
          [...elem.parentElement.children].findIndex(child => {
            if (elem.localName === child.localName) {
              nameCount++;
            }
            return child === elem;
          }) + 1;
        if (index > 1 && nameCount > 1) {
          subSelector += ":nth-child(" + index + ")";
        }
      }

      path = subSelector + (path ? ">" + path : "");
      elem = parent;
    }

    return path;
  }
};
