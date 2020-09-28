import { Glview } from "/modules/glview.js";

/* import scenes / shaders here */
import ball_fs from "../shaders/ball.fs.js";


const frag_prog_proto = {
    fs: ball_fs,
    res: { width: 700, height: 700}/*
    vs: null,
    uniforms: null,
    arrays: null,
    rendercb: null,
    setupcb: null,
    data: null,*/
}

// let programs = [frag_prog_proto];
const glview = new Glview(document.querySelector('#disp'), frag_prog_proto);
