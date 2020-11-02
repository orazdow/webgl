import { Glview } from "./modules/glview.js";
import * as dat from "./modules/dat.gui.module.min.js";

/* import scenes / shaders here */
import ball_fs from "./shaders/ball.fs.js";
import tex_prog from "./scenes/tex_test.js";
import arraytex_prog from "./scenes/array_tex.js";


/* 
    pgm_options: {
    fs: fs || null (default.fs),
    vs: vs || null (default.vs),
    res: res || null (width: 600, height: 600)
    arrays: arrays || null (screen quad),
    uniforms: uniforms || null +(mouse, time, res),
    rendercb: rendercb || null,
    setupcb: setupcb || null,
    data: data || null,
    textures: {u_name : texoptions, ...} || null,
    drawtype: drawtype || null (gl_triangle_strip),
    clearcolor: clearcolor || null (0,0,0,0)
}
*/

const frag_prog_proto = {
    fs: ball_fs,
    res: { width: 900, height: 700}
};

const pgms = [arraytex_prog, frag_prog_proto, tex_prog, {}];


const glview = new Glview(document.querySelector('#disp'), pgms);

const gui = new dat.GUI();
gui.__closeButton.style.visibility = "hidden";
glview.initGui(gui);

/*
	todo:
	async texture loading
*/