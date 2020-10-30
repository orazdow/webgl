import * as twgl from "./twgl-full.module.min.js";

/* import shaders here */
import def_vs from "../shaders/default.vs.js";
import def_fs from "../shaders/default.fs.js";


/*
const frag_prog_proto = {
    fs: fs || null (default.fs),
    vs: vs || null (default.vs),
    res: res || null (width: 600, height: 600)
    arrays: arrays || null,
    uniforms: uniforms || null,
    rendercb: rendercb || null,
    setupcb: setupcb || null,
    data: data || null,
    textures: {u_name : twgl-texoptions, ...} || null,
    drawtype: drawtype || null (gl_triangle_strip),
    clearcolor: clearcolor || null (0,0,0,0)
}
*/


const gl_fields = (gl, prog)=>{
    for(let v in prog){
        if(gl[[prog[v]]])
            prog[v] = gl[[prog[v]]];   
    }
    return prog;
}

class GlProg{

    constructor(prog){
        this.gl = prog.gl;
        this.prog = prog;
        this.drawtype = prog.drawtype;
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
            this.uniforms[key] = twgl.createTexture(this.gl, gl_fields(this.gl, this.prog.textures[key]));   
        this.programInfo = twgl.createProgramInfo(this.gl, [this.prog.vs, this.prog.fs]);
        this.bufferInfo = twgl.createBufferInfoFromArrays(this.gl, this.prog.arrays);
        this.gl.canvas.onmousemove = (e)=>{ this.uniforms.u_mouse[0] = e.offsetX; this.uniforms.u_mouse[1] = e.offsetY; }
        twgl.setBuffersAndAttributes(this.gl, this.programInfo, this.bufferInfo);
        this.prog.setupcb(this.pgm);
    }

    start(){
        this.gl.canvas.width = this.prog.res.width;
        this.gl.canvas.height = this.prog.res.height;
        twgl.resizeCanvasToDisplaySize(this.gl.canvas);
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
        this.gl.useProgram(this.programInfo.program);
        this.gl.clearColor(...this.prog.clearcolor);
        this.req = requestAnimationFrame(this.render);
    }

    stop(){
        cancelAnimationFrame(this.req);
    }

    render(time){
        this.uniforms.u_time = time * 0.001;
        this.uniforms.u_resolution = [this.gl.canvas.width, this.gl.canvas.height];
        this.prog.rendercb(this.pgm);
        twgl.setUniforms(this.programInfo, this.uniforms);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);
        twgl.drawBufferInfo(this.gl, this.bufferInfo, this.drawtype);
        this.req = requestAnimationFrame(this.render);
    }

}


class Glview{

    constructor(canvas, progs, _res, _bkgd) {
        this.fsprogs = (progs instanceof Array)? progs : [progs];
        this.programs = [];
        this.pgm_idx = 0;
        window.sceneRef = this;
        if(!canvas){ console.log('null canvas'); return; }
        canvas.style.backgroundColor = _bkgd || "";
        let gl = canvas.getContext("webgl2", { remultipliedAlpha: false });
        
        // defaults
        this.prog = {
            gl : gl,
            res : _res || {width: 600, height: 600},
            arrays : {
                position: { numComponents: 3, data: [-1, -1, 0,  -1, 1, 0,  1, -1, 0,  1, 1, 0] },
                texcoord: { numComponents: 2, data: [0, 1,  0, 0, 1, 1,  1, 0] }
            },
            vs : def_vs,
            fs : def_fs,
            uniforms : {
                u_time : 0,
                u_resolution: [600, 600],
                u_mouse: [0,0]
            },
            clearcolor: [0.0, 0.0, 0.0, 0.0],
            drawtype : gl.TRIANGLE_STRIP,
            data : null,
            textures : null,
            rendercb : ()=>{},
            setupcb : ()=>{}
        };

        gl.disable(gl.DEPTH_TEST);
        gl.enable(gl.BLEND);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

        for(const p of this.fsprogs)
            this.createProgram(p);
        
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
        this.programs[this.pgm_idx++].init();
    }

}

export {Glview};