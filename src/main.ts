import axios from 'axios'
import { renderCode } from './components/CodeViewer';
import { renderGroup } from './components/GroupViewer';
import { renderLabel } from './components/LabelViewer';
import { renderPlot } from './components/PlotViewer';
import './scss/styles.scss'
import { Controller, Filter } from './types'
import * as bootstrap from "bootstrap";

const fetched = await axios.get('http://localhost:3000')
const controller = new Controller(fetched.data);

renderCode(controller.data[0]);
renderPlot(controller);
renderLabel(controller)
renderGroup(controller);

console.log(controller.data)