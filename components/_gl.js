import React, { Component } from 'react';
import * as twgl from "../node_modules/twgl.js/dist/4.x/twgl-full.module.js";

/* import shaders here */
import def_vs from "../shaders/default.vs";
import def_fs from "../shaders/default.fs";
import ball_fs from "../shaders/ball.fs";


const _arrays = {
    position: [-1, -1, 0, 1, -1, 0, -1, 1, 0, -1, 1, 0, 1, -1, 0, 1, 1, 0],
};

const _res = { width: 600, height: 600};

class GlProg{
    constructor(res, fs, uniforms_, vs_, arrays_,){
        this.res = res ? res : _res;
        this.fs = fs ? fs : def_fs; 
        this.uniforms = {
            time : 0,
            resolution: [this.res.width, this.res.height]
        };
        if(uniforms_) this.addUniforms(uniforms_);
        this.vs = vs_ ? vs_ : def_vs;
        this.arrays = arrays_ ? arrays_ : _arrays;
        this.gl = null;
        this.programInfo = null;
        this.bufferInfo = null;
        this.render = this.render.bind(this);
        this.mouse = [0,0];
        this.renderCb = ()=>{};
    }

    init(gl){
        this.gl = gl;
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
        // this.state = {selection : 'main'};
        // this.stateChange = this.stateChange.bind(this);
        this.canvasRef = React.createRef();
        this.prog = new GlProg();

    }

    componentDidMount(){
       this.gl = this.canvasRef.current.getContext("webgl");
       this.prog.init(this.gl);
       this.prog.start();
       // this.gl = document.getElementById("canv").getContext("webgl");
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