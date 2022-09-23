import hljs from 'highlight.js/lib/core';
import python from 'highlight.js/lib/languages/python';
import 'highlight.js/styles/github.css';
import { fetchData } from '../states';
import * as d3 from 'd3';


hljs.registerLanguage('python', python);
hljs.highlightAll();

const codeViewer = d3.select("#codeViewer");
