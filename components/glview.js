import React, { Component } from 'react';
import * as twgl from "../node_modules/twgl.js/dist/4.x/twgl-full.module.js";

/* import shaders here */
import def_vs from "../shaders/default.vs";
import def_fs from "../shaders/default.fs";

// const data = {
//     fs: null,
//     uniforms: null,
//     vs: null,
//     cb: null,
//     arrays: null,
//     res: null,
//     gl: null
// }

// const frag_prog_proto = {
//     fs: null,
//     uniforms: null,
//     cb: null,
// }

class GlProg{
    constructor(prog){
        this.gl = prog.gl;
        this.res = prog.res;
        this.vs = prog.vs;
        this.arrays = prog.arrays;
        this.fs = prog.fs; 
            this.uniforms = {
            time : 0,
            resolution: [this.res.width, this.res.height]
        };
        if(prog.uniforms) this.addUniforms(prog.uniforms);
        this.renderCb = prog.cb;
        this.programInfo = null;
        this.bufferInfo = null;
        this.render = this.render.bind(this);
        this.mouse = [0,0];
    }

    init(){
        this.programInfo = twgl.createProgramInfo(this.gl, [this.vs, this.fs]);
        this.bufferInfo = twgl.createBufferInfoFromArrays(this.gl, this.arrays);
        this.gl.canvas.width = this.res.width;
        this.gl.canvas.height = this.res.width;        
        twgl.resizeCanvasToDisplaySize(this.gl.canvas);
        this.gl.canvas.onmousemove = (e)=>{ this.mouse[0] = e.clientX; this.mouse[1] = e.clientY; }
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
        twgl.setBuffersAndAttributes(this.gl, this.programInfo, this.bufferInfo);
        this.gl.useProgram(this.programInfo.program);
    }

    addUniforms(u){
        for(let key in u){
            this.uniforms[key] = u[key];
        }
    }

    setRenderCb(cb){
        this.renderCb = cb;
    }

    start(){
        requestAnimationFrame(this.render);
    }

    stop(){

    }

    render(time){

        this.uniforms.time = time * 0.001;
        this.uniforms.resolution = [this.gl.canvas.width, this.gl.canvas.height];
        this.uniforms.mouse = this.mouse;
        this.renderCb(this.uniforms);
        twgl.setUniforms(this.programInfo, this.uniforms);
        twgl.drawBufferInfo(this.gl, this.bufferInfo);

        requestAnimationFrame(this.render);
    }
}

class Glview extends Component {

    constructor(props) {
        super(props);
        this.res = props.res ? props.res : { width: 600, height: 600};
        this.arrays = {position: [-1, -1, 0, 1, -1, 0, -1, 1, 0, -1, 1, 0, 1, -1, 0, 1, 1, 0]};
        this.vs = def_vs;
        this.fs = def_fs;
        this.canvasRef = React.createRef();
        this.programs = [];
        this.fsprogs = props.programs;
        this.pgm_idx = -1;
    }

    switchPogram(index){
        for(let p of this.programs){p.stop();}
        this.programs[index].start();
    }

    createProgram(fsprog){
        if(!fsprog) fsprog = {};
        if(!fsprog.res) fsprog.res = this.res;
        if(!fsprog.gl) fsprog.gl = this.gl;
        if(!fsprog.arrays) fsprog.arrays = this.arrays;
        if(!fsprog.vs) fsprog.vs = this.vs;
        if(!fsprog.fs) fsprog.fs = this.fs;
        if(!fsprog.cb) fsprog.cb = ()=>{};
        // uniforms added in GLprog constructor
        this.programs.push(new GlProg(fsprog));
        this.pgm_idx++;
        this.programs[this.pgm_idx].init();
    }

    componentDidMount(){
       // this.gl = document.getElementById("canv").getContext("webgl");
        this.gl = this.canvasRef.current.getContext("webgl");
        for(const p of this.fsprogs){
            this.createProgram(p);
        }
        this.switchPogram(0);
    }

    render() {
        return (
            <div>
            <h2>blep</h2>
            <canvas id="canv" ref={this.canvasRef} />
            </div>
        );
    }
}

export {Glview};