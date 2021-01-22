import * as twgl from "../modules/twgl-full.module.min.js";


const vs = /*glsl*/`#version 300 es
precision mediump float;
                                                             
in vec4 position;
uniform float size;

    void main() {
        gl_PointSize = size;
        gl_Position = position;
    }

`;


const fs = /*glsl*/ `#version 300 es
    precision mediump float;
    uniform float u_time;
    uniform vec2 u_resolution;
    uniform vec2 u_mouse;
    uniform float weight;
    uniform float p;
    uniform float v1;
    uniform float m;
    #define ff(x) (x*0.5+0.5)
   
    out vec4 fragColor; 
    // const float p = 2.;

    void main(){
        vec2 uv = gl_PointCoord.xy;
        vec2 v = step(weight, uv);
        v *= step(weight, 1.-uv);
        float f = v.x*v.y;
        // float _p  =  p*(.8+(gl_FragCoord.y/u_resolution.y));
        // vec3 col = 0.5 + 0.5*cos(u_time+uv.xyx+vec3(0,2,4));
        vec3 col = vec3(ff(cos(6.2*v1)),ff(cos(6.2*v1+1.)),ff(cos(6.2*v1+2.)));
        float alpha = mix(1.-length(2.*p*uv-p -vec2(0.)), 1.-f, m);
        fragColor = vec4(col, alpha);
        // fragColor = vec4(col, 1.-length(2.*_p*uv-_p -vec2(0.)));
        // fragColor = vec4(col,1.-f);
        // fragColor = vec4(vec3(0.3),1.);
    }

`;

const _w = 600;
const _h = 600;
let s = 10;
let margin = 0;
let w = _w-margin;
let h = _h-margin;
let n = Math.floor((w/s)*(h/s));
let nx = Math.floor((w/s));
let ny = Math.floor((h/s));
n += (n%2);
nx += (nx%2);
nx += (nx%2);
let xofs = s/w;
let yofs = s/h;
let _yof = 0;
let freq = .19;
let _t = .4;
let bb = 1.6;
let xlev = 0;//1.4;
const ylev = .22;
let yamt = 0;//.5;
// const amp = 1;
// console.log('n', n);

let vertices = new Float32Array(n*2).fill(0);

function compsize(_s){
    n = Math.floor((w/_s)*(h/_s));
    nx = Math.round((w/_s));
    ny = Math.round((h/_s));
    n += (n%2);
    nx += (nx%2);
    nx += (nx%2);
    xofs = _s/w;
    yofs = _s/h;
    s = _s;
    vertices = new Float32Array(n*2);
    prog.arrays.position.data = vertices;
    prog.glprog.bufferInfo = twgl.createBufferInfoFromArrays(prog.gl, prog.arrays);
}

function cos(x, y, time, freq, amp){
    return Math.cos(6*time+Math.sqrt(x*x+y*y)*0.1*freq)*0.01*amp;
} 

function ll(x, y, x2, y2, time, freq, amp){
    return /*Math.log*/((Math.cos(time+Math.sqrt(x*x+y*y)*0.1*freq)+1)*(Math.cos(time+Math.sqrt(x2*x2+y2*y2)*0.1*freq)+1));//*0.01*amp;
}

function bounce(t){
    return Math.abs((t - Math.trunc(t))-0.5)*2;
}

function setupcb(pgm){ 
    for(let y = 0; y < ny; y++){

        for(let x = 0; x < nx; x++){
            let i = nx*y+x;
            vertices[i*2] = 2.*(x*s/w)-1 +xofs;
            vertices[i*2+1] = 2.*(y*s/h)-1 +yofs;
        }   
    }

    prog.gl.bufferSubData(prog.gl.ARRAY_BUFFER, 0, vertices);
 }

 function r0(pgm){
    for(let y = 0; y < ny; y++){
        for(let x = 0; x < nx; x++){
            let t = .4*pgm.uniforms.u_time;
            let bx = bounce(t*0.17)*nx; 
            let by = bounce(t*0.4)*ny; 
            let bx2 = bounce(9+t*0.38)*nx; 
            let by2 = bounce(5+t*0.27)*ny; 

            let ox = (x - .5*nx)*(y/ny)*(-.001*xlev*s*bb);
            let oy = (y - .5*ny)*(y/ny)*(-.001*ylev*s*bb);

            let a = ll(x-bx, y-by, x-bx2, y-by2, t*10, 2, 2)*(1./y);
            let b = Math.log(a);
            let i = nx*y+x;
            vertices[i*2] =  0.02*a + bb*(x*xofs)-(.5*bb) +xofs +ox;
            vertices[i*2+1] = 0.02*b + bb*(y*yofs)-(.5*bb) +yofs + oy;
        }   
    }

 }

 function r1(pgm){
    for(let y = 0; y < ny; y++){
        for(let x = 0; x < nx; x++){
            let t = _t*pgm.uniforms.u_time;
            let bx = bounce(t*0.17)*nx; 
            let by = bounce(t*0.4)*ny; 
            let bx2 = bounce(9+t*0.38)*nx; 
            let by2 = bounce(5+t*0.27)*ny; 

            let ox = (x - .5*nx)*(y/ny)*(-.001*xlev*s*bb);
            // let oy = (y - .5*ny)*(y/ny)*(-.001*ylev*s*bb);
            let oy = yamt*(1.-(y/ny)) -(.5*yamt);

            let a = ll(x-bx, y-by, x-bx2, y-by2, t*10, freq*s, 2)*(1./y);
            let b = Math.log(a);
            let i = nx*y+x;
            vertices[i*2] =  0.02*a + bb*(x*xofs)-(.5*bb) +xofs +ox;
            vertices[i*2+1] = 0.02*b + bb*(y*yofs)-(.5*bb) +yofs+_yof + oy;
        }   
    }
 }

 function _r1(pgm){
    for(let y = 0; y < ny; y++){
        for(let x = 0; x < nx; x++){
            let t = .4*pgm.uniforms.u_time;
            let bx = bounce(t*0.17)*nx; 
            let by = bounce(t*0.4)*ny; 
            let bx2 = bounce(9+t*0.38)*nx; 
            let by2 = bounce(5+t*0.27)*ny; 

            let a = ll(x-bx, y-by, x-bx2, y-by2, t*10, 2, 2);
            let b = Math.log(a);
            let i = nx*y+x;
            vertices[i*2] = 0.02*a + bb*(x*xofs)-(.5*bb) +xofs;
            vertices[i*2+1] = 0.02*b + bb*(y*yofs)-(.5*bb) +yofs;
        }   
    }
 }


function rendercb(pgm){
    r1(pgm);
    prog.gl.bufferSubData(prog.gl.ARRAY_BUFFER, 0, vertices);
}

const gui = {
    name: 'mesh',
    open: false,
    switch: true,
    fields:[
        {
            hue: 0.8,
            min: 0.0,
            max: 1.0,
            step: 0.01,
            onChange : (v)=>{prog.uniforms.v1 = v;}
        },
        {
            div: s,
            min: 4,
            max: 24,
            step: 1,
            onChange : (v)=>{
                v = v == 24 ? 25 : v;
                if(s != v) compsize(v);
                prog.uniforms.size = s;              
            }
        },
        {
            bunch: 1.-(bb*.5),
            min: 0.0,
            max: 1.0,
            step: 0.01,
            onChange : (v)=>{bb = (1.-v)*2;}
        },
        {
            xtilt: xlev,
            min: 0.0,
            max: 1.5,
            step: 0.01,
            onChange : (v)=>{xlev = v;}
        },
        {
            ytilt: yamt,
            min: 0,
            max: 1.5,
            step: 0.01,
            onChange : (v)=>{yamt = v;}
        },
        {
            yofs: 0,
            min: -1,
            max: 1,
            step: 0.01,
            onChange : (v)=>{_yof = -1*v;}
        },
        {
            freq : freq,
            min: 0.05,
            max: 0.5,
            step: .01,
            onChange : (v)=>{freq = v;}
        },{
            t: _t,
            min: 0.08,
            max: 0.8,
            step: 0.01,
            onChange: (v)=>{_t = v;}
        },{
            shape: 0,
            min: 0,
            max: 1,
            step: 0.01,
            onChange:(v)=>{prog.uniforms.m = v;}
        },
    {
            weight: 2/5,
            min: .2,
            max: 1.2,
            step: 0.01,
            onChange:(v)=>{
                prog.uniforms.weight = (v)*.3;
                prog.uniforms.p = 5./(v*5);
            }
        }
    ]
}

const prog = {
    res: {width: _w, height: _h},
    vs: vs,
    fs: fs,
    arrays : {position: { numComponents: 2, data: vertices}},
    uniforms: {
        size: s,
        weight: .1,
        p: 2,
        v1: 0.8,
        m: 0
    },
    drawtype : 'POINTS',
    rendercb : rendercb,
    setupcb : setupcb,
    gui: gui,
    on: false
    // clearcolor: [0.5, 0.5, 0.5, 1.0],
};

export default prog;