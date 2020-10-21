import * as twgl from "./twgl-full.module.min.js";

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
    data: data || null,
    textures: {uniformname : texoptions, ..} || null
}
*/


class GlProg{

    constructor(prog){
        this.gl = prog.gl;
        this.prog = prog;
        this.drawType = prog.drawType;
        this.programInfo = null;
        this.bufferInfo = null;
        this.uniforms = prog.uniforms;
        this.render = this.render.bind(this);
        this.req = null;
        
        this.pgm = {
            uniforms : this.uniforms,
            arrays : this.prog.arrays,
            res : this.prog.res,
            data : this.prog.data          
        };
    }

    init(){
        for(let key in this.prog.textures) 
            this.uniforms[key] = twgl.createTexture(this.gl, this.prog.textures[key]);   
        this.programInfo = twgl.createProgramInfo(this.gl, [this.prog.vs, this.prog.fs]);
        this.bufferInfo = twgl.createBufferInfoFromArrays(this.gl, this.prog.arrays);
        this.gl.canvas.onmousemove = (e)=>{ this.uniforms.mouse[0] = e.offsetX; this.uniforms.mouse[1] = e.offsetY; }
        twgl.setBuffersAndAttributes(this.gl, this.programInfo, this.bufferInfo);
        this.prog.setupcb(this.pgm);
    }

    start(){
        this.gl.canvas.width = this.prog.res.width;
        this.gl.canvas.height = this.prog.res.height;
        twgl.resizeCanvasToDisplaySize(this.gl.canvas);
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
        this.gl.useProgram(this.programInfo.program);
        this.req = requestAnimationFrame(this.render);
    }

    stop(){
        cancelAnimationFrame(this.req);
    }

    render(time){
        this.uniforms.time = time * 0.001;
        this.uniforms.resolution = [this.gl.canvas.width, this.gl.canvas.height];
        this.prog.rendercb(this.pgm);
        twgl.setUniforms(this.programInfo, this.uniforms);
        twgl.drawBufferInfo(this.gl, this.bufferInfo, this.drawType);
        this.req = requestAnimationFrame(this.render);
    }

}


class Glview{

    constructor(canvas, progs, _res) {

        this.fsprogs = (progs instanceof Array)? progs : [progs];
        this.programs = [];
        this.pgm_idx = -1;
        window.sceneRef = this;

        this.prog = {
            gl : canvas.getContext("webgl2"),
            res : _res || {width: 600, height: 600},
            arrays : {
                position: { numComponents: 3, data: [-1, -1, 0,  -1, 1, 0,  1, -1, 0,  1, 1, 0] },
                texcoord: { numComponents: 2, data: [0, 1,  0, 0, 1, 1,  1, 0] }
            },
            vs : def_vs,
            fs : def_fs,
            uniforms : {
                time : 0,
                resolution: [600, 600],
                mouse: [0,0]
                },
            drawType : 5,
            data : null,
            textures : null,
            rendercb : ()=>{},
            setupcb : ()=>{}
        };

        if(!this.prog.gl){console.log('invalid canvas element'); return;}

        for(const p of this.fsprogs){
            this.createProgram(p);
        }
        this.switchPogram(0);
    
    }

    switchPogram(index){
        for(let p of this.programs){p.stop();}
        this.programs[index].start();
    }

    merge(dest, template){
        for(let prop in template){
            if(!dest[prop]) dest[prop] = template[prop];
            else if(typeof dest[prop] === 'object'){
                for(let p in template[prop]){
                    if(!dest[prop][p]) dest[prop][p] = template[prop][p];
                }
            }
        }
    }

    createProgram(fsprog){
        fsprog = fsprog || {};
        this.merge(fsprog, this.prog);
        this.programs.push(new GlProg(fsprog));
        this.pgm_idx++;
        this.programs[this.pgm_idx].init();
    }

}

export {Glview};