import { Glview } from "./modules/glview.js";
import * as dat from "./modules/dat.gui.module.min.js";

/* import scenes / shaders here */
import ball_fs from "./shaders/ball.fs.js";
import tex_prog from "./scenes/tex_test.js";
import arraytex_prog from "./scenes/array_tex.js";
import arraytex_bkgd from "./scenes/array_tex_bkd.js";
import frag_test from "./scenes/frag_test.js";
import brownian from "./scenes/brownian.js";
import uvtest from "./scenes/uvtest.js";
import wavefrag from "./shaders/wavefrag4.fs.js";
import wave from "./scenes/digiwave.js";
// import clone from "./clone.js";

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

const pgm = {fs : uvtest.fs, res: {width: 800, height: 700}};
// let a2 = JSON.parse(JSON.stringify(arraytex_prog));
// let a2 =clone(arraytex_prog);
// a2.gui.name = 'png2';
arraytex_bkgd.gui.open = true;
arraytex_bkgd.on = true;
arraytex_prog.on = false;
// arraytex_prog.gui.open = false
brownian.on = false;
// brownian.gui.open = false;
pgm.chain = [ arraytex_bkgd,wave,  arraytex_prog, brownian]

const glview = new Glview(document.querySelector('#disp'), pgm, null, null, 0);

const gui = new dat.GUI();
gui.__closeButton.style.visibility = "hidden";
glview.initGui(gui);
