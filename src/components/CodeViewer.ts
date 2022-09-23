import * as d3 from "d3";
import hljs from "highlight.js/lib/core";
import python from "highlight.js/lib/languages/python";
import "highlight.js/styles/github.css";
import { UserData } from "../types";

const codeViewer = d3
    .select("#codeViewer")
    .append("pre")
    .append("code")
    .style("background-color", "#F8F9FA")
    .style("border-radius", "15px");

const renderCode = (userData: UserData | undefined) => {

    console.log(userData)
    codeViewer.text(
        userData ? 
        decodeURIComponent(atob(userData.code.replace("b'", "").replace("'", ""))) :
        "# Select users to load sourcecode!"
    );
    hljs.registerLanguage("python", python);
    hljs.highlightAll();
};

export { renderCode };
