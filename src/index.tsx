import "./ts/ripple";
import "./ts/input_form";
import "./ts/toggle";

// @ts-ignore
import { Elm } from "./elm/Main.elm";
import Vue from "vue";
// @ts-ignore
import App from "./vue/App.vue";

import * as React from "react";
import ReactDOM from "react-dom";
import ReactApp from "./react/App";

Elm.Main.init({ node: document.getElementById("elm") });
new Vue({
  render: h => h(App)
}).$mount("#vue");
ReactDOM.render(<ReactApp />, document.getElementById("react"));
