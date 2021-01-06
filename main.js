import { Glview } from "./modules/glview.js";
import * as dat from "./modules/dat.gui.module.min.js";

/* import scenes / shaders here */
import ball_fs from "./shaders/ball.fs.js";
import tex_prog from "./scenes/array_tex.js";
import tex_progb from "./scenes/array_tex_b.js";
import tex_bkgd from "./scenes/array_tex_bkd.js";
import brownian from "./scenes/brownian.js";
import wavefrag from "./shaders/wavefrag4.fs.js";
import wave from "./scenes/digiwave.js";
import spacebkgd from "./scenes/spacebkgd.js";
import bkgd from "./scenes/bkgd.js";
import squares from "./scenes/vsquares.js";
import duffing from "./scenes/duffing.js";
import multi from "./scenes/multi.js";

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

const pgm = bkgd;
pgm.res = {width: 800, height: 700};

spacebkgd.on = true;
spacebkgd.uniforms.v1 = .2;
spacebkgd.uniforms.v2 = .5;
tex_bkgd.on = false;
tex_bkgd.gui.open = false;

multi.chain = [duffing]

// pgm.chain = [/*{},*/ spacebkgd, squares, tex_bkgd, wave, tex_prog, brownian];

const glview = new Glview(document.querySelector('#disp'), multi);

const gui = new dat.GUI();
gui.__closeButton.style.visibility = "hidden";
glview.initGui(gui);
