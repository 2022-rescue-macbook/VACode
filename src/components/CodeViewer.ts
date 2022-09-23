import hljs from "highlight.js/lib/core";
import python from "highlight.js/lib/languages/python";
import "highlight.js/styles/github.css";
import * as d3 from "d3";
import { Controller, Filter, UserData } from "../types";


const codeViewer = d3.select("#codeViewer").append("pre").append("code");

const renderCode = (userData : UserData) => {
    codeViewer.text(userData.id + "\n" + userData.code);
    hljs.registerLanguage("python", python);
    hljs.highlightAll();
};

export { renderCode };
