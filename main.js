import { Glview } from "./modules/glview.js";
import * as dat from "./modules/dat.gui.module.min.js";

/* import scenes/shaders here */
import ball_fs from "./shaders/ball.fs.js";
import tex_prog from "./scenes/tex_test.js";


const frag_prog_proto = {
    fs: ball_fs,
    res: { width: 900, height: 700}/*
    vs: null,
    uniforms: null,
    arrays: null,
    rendercb: null,
    setupcb: null,
    data: null,*/
};

const def_prog = {};


const glview = new Glview(document.querySelector('#disp'), [frag_prog_proto, tex_prog, def_prog]);
const gui = new dat.GUI();
window.gui = gui;
gui.__closeButton.style.visibility = "hidden";
glview.initGui(gui);