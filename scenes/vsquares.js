const vs = /*glsl*/`#version 300 es
precision mediump float;
                                                             
in vec4 position;
uniform float size;
// in vec2 texcoord;
out vec2 v_texcoord;

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
    
    out vec4 fragColor; 

    void main(){
        vec2 uv = gl_PointCoord.xy;
        vec2 v = step(weight, uv);
        v *= step(weight, 1.-uv);
        float f = v.x*v.y;
        fragColor = vec4(vec3(0.), 1.-f);
    }

`;

const _w = 600;
const _h = 600;
const s = 20;
const margin = 0;
const w = _w-margin;
const h = _h-margin;
const n = Math.floor((w/s)*(h/s));
const nx = Math.floor((w/s));
const ny = Math.floor((h/s));
const xofs = s/w;
const yofs = s/h;
// console.log('n', n);

let vertices = new Float32Array(n*2).fill(0);

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

function rendercb(pgm){
    for(let y = 0; y < ny; y++){
        for(let x = 0; x < nx; x++){
            let a = Math.cos(.1*pgm.uniforms.u_time+(x*x+y*y)*0.008)*0.05;
            let i = nx*y+x;
            vertices[i*2] = a + 2.*(x*s/w)-1 +xofs;
            vertices[i*2+1] = a + 2.*(y*s/h)-1 +yofs;
        }   
    }

    prog.gl.bufferSubData(prog.gl.ARRAY_BUFFER, 0, vertices);
}

/*
function setupcb(pgm){
    for(let i = 0; i < vertices.length; i++){
        vertices[i] = Math.random()*1.8 - 0.9;
    }

    prog.gl.bufferSubData(prog.gl.ARRAY_BUFFER, 0, vertices);
 }

function rendercb(pgm){

    for(let i = 0; i < vertices.length; i++){
        vertices[i] += Math.random()*0.01 - 0.005;
    }
    
    prog.gl.bufferSubData(prog.gl.ARRAY_BUFFER, 0, vertices);
}
*/
const prog = {
    res: {width: _w, height: _h},
    vs: vs,
    fs: fs,
    arrays : {position: { numComponents: 2, data: vertices}},
    uniforms: {
        size: s,
        weight: .05,
    },
    drawtype : 'POINTS',
    rendercb : rendercb,
    setupcb : setupcb,
    // gui: gui,
    clearcolor: [0.5, 0.5, 0.5, 1.0],
};

export default prog;