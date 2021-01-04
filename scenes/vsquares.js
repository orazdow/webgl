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
    
    out vec4 fragColor; 
    // const float p = 2.;

    void main(){
        vec2 uv = gl_PointCoord.xy;
        vec2 v = step(weight, uv);
        v *= step(weight, 1.-uv);
        float f = v.x*v.y;
        float _p  =  p*(.9+(gl_FragCoord.y/u_resolution.y));
        vec3 col = 0.5 + 0.5*cos(u_time+uv.xyx+vec3(0,2,4));
        fragColor = vec4(col, 1.-length(2.*_p*uv-_p -vec2(0.)));
        // fragColor = vec4(vec3(0.3),1.-f);
        // fragColor = vec4(vec3(0.3),1.);
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
const bb = 1.8;
const xlev = 1.4;
const ylev = .22;
// const amp = 1;
// console.log('n', n);

let vertices = new Float32Array(n*2).fill(0);

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

  function _r0(pgm){
    for(let y = 0; y < ny; y++){
        for(let x = 0; x < nx; x++){
            let t = .4*pgm.uniforms.u_time;
            let i = nx*y+x;
            let a = (x - .5*nx)*(y/ny)*-.06;
            vertices[i*2] = 2.*(x*s/w)-1 +xofs + a;
            vertices[i*2+1] = 2.*(y*s/h)-1 +yofs;
        }   
    }

 }

function r2(pgm){
    for(let y = 0; y < ny; y++){
        for(let x = 0; x < nx; x++){
            let t = pgm.uniforms.u_time*.6;
            let bx = bounce(t*0.3)*nx; 
            let by = bounce(t*0.22)*ny; 
            let bx2 = bounce(200+t*0.25)*nx; 
            let by2 = bounce(20+t*0.277)*ny; 
            let _a = (sin(x-bx, y-by, 4.*t, 4*s, amp)+0.0)*(sin(x-bx2, y-by2, 4.*t, 4*s, amp)+0.0);
            let a = 3.*Math.log((_a+.8)) +0;
            let i = nx*y+x;
            vertices[i*2] = a + 2.*(x*s/w)-1 +xofs;
            vertices[i*2+1] = a + 2.*(y*s/h)-1 +yofs;
        }   
    }    
}


function rendercb(pgm){
    r0(pgm);
    prog.gl.bufferSubData(prog.gl.ARRAY_BUFFER, 0, vertices);
}

const gui = {
    name: 'mesh',
    open: true,
    switch: true,
    fields:[
    ]
}

const prog = {
    res: {width: _w, height: _h},
    vs: vs,
    fs: fs,
    arrays : {position: { numComponents: 2, data: vertices}},
    uniforms: {
        size: s,
        weight: .12,
        p: 2
    },
    drawtype : 'POINTS',
    rendercb : rendercb,
    setupcb : setupcb,
    // gui: gui,
    // clearcolor: [0.5, 0.5, 0.5, 1.0],
};

export default prog;