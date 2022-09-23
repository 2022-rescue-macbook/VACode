import { renderCode } from "./components/CodeViewer";
import { renderGroup } from "./components/GroupViewer";
import { renderLabel } from "./components/LabelViewer";
import { renderPlot } from "./components/PlotViewer";
import "./scss/styles.scss";
import { Controller } from "./types";

import { response } from "./response";

// const fetched = await axios.get('http://localhost:3000')
const fetched = response;

const controller = new Controller(
    fetched.data,
    fetched.centroid,
    fetched.labels,
    fetched.group
);

renderCode(undefined);
renderPlot(controller);
renderLabel(controller);
renderGroup(controller);
