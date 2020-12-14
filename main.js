import { Glview } from "./modules/glview.js";
import * as dat from "./modules/dat.gui.module.min.js";

/* import scenes / shaders here */
import ball_fs from "./shaders/ball.fs.js";
import tex_prog from "./scenes/tex_test.js";
import arraytex_prog from "./scenes/array_tex_2.js";
import frag_test from "./scenes/frag_test.js";
import brownian from "./scenes/brownian.js";
import uvtest from "./scenes/uvtest.js";

/* 
    fs: fs || null (default.fs),
    vs: vs || null (default.vs),
    res: res || null (width: 600, height: 600),
    arrays: arrays || null, 
    uniforms: uniforms || null,
    rendercb: rendercb || null,
    setupcb: setupcb || null,
    textures: {u_name : twgl-texoptions, ...} || null,
    drawtype: drawtype || null (gl_triangle_strip),
    clearcolor: clearcolor || null (0,0,0,0),
    gui: guioptions || null
}
*/


// const pgms = [brownian, uvtest, arraytex_prog, frag_prog_proto, tex_prog, {fs: ball_fs}];
uvtest.chain = [arraytex_prog, brownian];
uvtest.res = {width: 800, height: 700};
const pgms = [uvtest];


const glview = new Glview(document.querySelector('#disp'), pgms, null, null, 0);

const gui = new dat.GUI();
gui.__closeButton.style.visibility = "hidden";
glview.initGui(gui);
