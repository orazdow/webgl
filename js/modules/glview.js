import * as twgl from "./twgl-full.module.js";

/* import shaders here */
import def_vs from "../shaders/default.vs.js";
import def_fs from "../shaders/default.fs.js";


/*
const frag_prog_proto = {
    fs: fs || null,
    vs : vs || null,
    arrays: arrays || null,
    uniforms: uniforms || null,
    rendercb: rendercb || null,
    setupcb: setupcb || null,
    data: data || null
}
*/


class GlProg{

    constructor(prog){
        this.gl = prog.gl;
        this.programInfo = null;
        this.bufferInfo = null;
        this.mouse = [0,0];
        this.rendercb = prog.rendercb;
        this.setupcb = prog.setupcb;
        this.arrays = prog.arrays;
        this.res = prog.res;
        this.fs = prog.fs;
        this.vs = prog.vs;
        this.uniforms = {
            time : 0,
            resolution: [this.res.width, this.res.height],
            mouse: this.mouse
        };
        if(prog.uniforms) this.addUniforms(prog.uniforms);
        this.render = this.render.bind(this);
        this.req = null;
        this.pgm = {
            uniforms : this.uniforms,
            arrays : this.arrays,
            res : this.res,
            data : prog.data          
        };
    }

    init(){
        this.programInfo = twgl.createProgramInfo(this.gl, [this.vs, this.fs]);
        this.bufferInfo = twgl.createBufferInfoFromArrays(this.gl, this.arrays);
        this.gl.canvas.width = this.res.width;
        this.gl.canvas.height = this.res.height;        
        twgl.resizeCanvasToDisplaySize(this.gl.canvas);
        this.gl.canvas.onmousemove = (e)=>{ this.mouse[0] = e.clientX; this.mouse[1] = e.clientY; }
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
        twgl.setBuffersAndAttributes(this.gl, this.programInfo, this.bufferInfo);
        this.gl.useProgram(this.programInfo.program);
        this.setupcb(this.pgm);
    }

    addUniforms(u){
        for(let key in u){
            this.uniforms[key] = u[key];
        }
    }

    start(){
        this.req = requestAnimationFrame(this.render);
    }

    stop(){
        cancelAnimationFrame(this.req);
    }

    render(time){

        this.uniforms.time = time * 0.001;
        this.uniforms.resolution = [this.gl.canvas.width, this.gl.canvas.height];
        this.uniforms.mouse = this.mouse;
        this.rendercb(this.pgm);
        twgl.setUniforms(this.programInfo, this.uniforms);
        twgl.drawBufferInfo(this.gl, this.bufferInfo);

        this.req = requestAnimationFrame(this.render);
    }

}


class Glview{

    constructor(canvas, progs, res) {

        this.fsprogs = (progs instanceof Array)? progs : [progs];
        this.res = res ? res : { width: 600, height: 600};
        this.arrays = {position: [-1, -1, 0, 1, -1, 0, -1, 1, 0, -1, 1, 0, 1, -1, 0, 1, 1, 0]};
        this.vs = def_vs;
        this.fs = def_fs;
        this.gl = canvas.getContext("webgl");
        if(!this.gl){console.log('invalid canvas element'); return;}
        this.programs = [];
        this.pgm_idx = -1;
        window.sceneRef = this;

        for(const p of this.fsprogs){
            this.createProgram(p);
        }
        this.switchPogram(0);
    
    }

    switchPogram(index){
        for(let p of this.programs){p.stop();}
        this.programs[index].start();
    }

    /* fs, vs, res, uniforms, arrays, data, rendercb, setupcb, gl */
    createProgram(fsprog){
        if(!fsprog) fsprog = {};
        if(!fsprog.gl) fsprog.gl = this.gl;
        if(!fsprog.vs) fsprog.vs = this.vs;
        if(!fsprog.fs) fsprog.fs = this.fs;
        if(!fsprog.arrays) fsprog.arrays = this.arrays;
        if(!fsprog.res) fsprog.res = this.res;
        if(!fsprog.data) fsprog.data = undefined;
        if(!fsprog.rendercb) fsprog.rendercb = ()=>{};
        if(!fsprog.setupcb) fsprog.setupcb = ()=>{};
        // uniforms added in Glprog constructor
        this.programs.push(new GlProg(fsprog));
        this.pgm_idx++;
        this.programs[this.pgm_idx].init();
    }

}

export {Glview};