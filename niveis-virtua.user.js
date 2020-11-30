// ==UserScript==
// @name        Niveis Virtua
// @description Improves niveis.virtua.com.br UI
// @namespace   https://github.com/13k
// @match       http://niveis.virtua.com.br/
// @grant       none
// @version     0.1.0
// @author      13kb
// @license     Unlicense
// @run-at      document-end
// @homepageURL https://github.com/13k/userscript-niveis-virtua
// @downloadURL https://raw.githubusercontent.com/13k/userscript-niveis-virtua/master/niveis-virtua.user.js
// @noframes
// ==/UserScript==

(function () {
  "use strict";

  const FRAMES_SEL = {
    FORM: "frame[name='leftFrame']",
    RESULT: "frame[name='rightFrame']",
    FOOTER: "frame[src='in_inferior.php']",
  };

  const FORM_SEL = "#formulario > form";

  const INDICATOR = {
    tag: "span",
    id: "query-indicator",
    text: "Consultando ...",
    style: {
      display: "block",
      visibility: "hidden",
      position: "absolute",
      bottom: "0",
      width: "100%",
      lineHeight: "16px",
      padding: "3px",
      textAlign: "center",
      fontSize: "14px",
      fontWeight: "bold",
      color: "#fff",
      backgroundColor: "#43A3EA",
    },
  };

  function getFormFrame() {
    const elem = document.querySelector(FRAMES_SEL.FORM);
    // console.log("formFrame", elem);
    return elem;
  }

  function getFormFrameDocument() {
    const frame = getFormFrame();

    if (!frame) return null;

    const elem = frame.contentDocument;
    // console.log("formFrame.document", elem);
    return elem;
  }

  function getForm() {
    const doc = getFormFrameDocument();

    if (!doc) return null;

    const elem = doc.querySelector(FORM_SEL);
    // console.log("formFrame.document.form", elem);
    return elem;
  }

  function getResultFrame() {
    const elem = document.querySelector(FRAMES_SEL.RESULT);
    // console.log("resultFrame", elem);
    return elem;
  }

  function getFooterFrame() {
    const elem = document.querySelector(FRAMES_SEL.FOOTER);
    // console.log("footerFrame", elem);
    return elem;
  }

  function getFooterFrameDocument() {
    const frame = getFooterFrame();

    if (!frame) return null;

    const elem = frame.contentDocument;
    // console.log("footerFrame.document", elem);
    return elem;
  }

  function getIndicator() {
    const doc = getFooterFrameDocument();

    if (!doc) return null;

    const elem = doc.querySelector(`#${INDICATOR.id}`);
    // console.log("footerFrame.document.indicator", elem);
    return elem;
  }

  function createIndicator() {
    const elem = document.createElement(INDICATOR.tag);

    elem.id = INDICATOR.id;
    elem.innerText = INDICATOR.text;

    for (const prop in INDICATOR.style) {
      if (INDICATOR.style.hasOwnProperty(prop)) {
        elem.style[prop] = INDICATOR.style[prop];
      }
    }

    // console.log("create indicator", elem);
    return elem;
  }

  function onFormLoad(ev) {
    // console.log("formFrame!load", ev);
    const elem = getForm();

    if (!elem) {
      console.error("after formFrame!load : form not found");
      return;
    }

    elem.addEventListener("submit", onFormSubmit);
  }

  function onResultLoad(ev) {
    // console.log("resultFrame!load", ev);
    queryStop();
  }

  function onFooterLoad(ev) {
    // console.log("footerFrame!load", ev);
    const frame = getFooterFrameDocument();

    if (!frame) {
      console.error("after footerFrame!load : frame not found");
      return;
    }

    const elem = createIndicator();

    frame.body.append(elem);
  }

  function onFormSubmit(ev) {
    // console.log("formFrame.document.form!submit", ev);
    queryStart();
  }

  function queryStart() {
    // console.log("query!start");
    const elem = getIndicator();

    if (!elem) {
      console.error("indicator not found");
      return;
    }

    elem.style.visibility = "visible";
  }

  function queryStop() {
    // console.log("query!stop");
    const elem = getIndicator();

    if (!elem) {
      console.error("indicator not found");
      return;
    }

    elem.style.visibility = "hidden";
  }

  getFormFrame().addEventListener("load", onFormLoad);
  getResultFrame().addEventListener("load", onResultLoad);
  getFooterFrame().addEventListener("load", onFooterLoad);
})();
