import * as twgl from "../modules/twgl-full.module.min.js";

const POINTS_MAX = 500;

const vs = /*glsl*/`#version 300 es
precision mediump float;
                                                             
in vec4 position;
uniform float size;

    void main() {
        gl_PointSize = size;
        gl_Position = position;
    }

`;

const fshader = /*glsl*/`#version 300 es

	precision mediump float;

	uniform int num;
	uniform float a;
	uniform vec2 points[${POINTS_MAX}];
	uniform float radius;
	uniform float u_time;
	uniform vec2 u_resolution;
	out vec4 fragColor; 

	#define dist(v1, v2, l) (((v1-v2).x*(v1-v2).x+(v1-v2).y*(v1-v2).y))*l 

	void main(){

		float c = 0.0;

	    vec2 uv = (2.*gl_FragCoord.xy-u_resolution.xy)/u_resolution.y;

	    for(int i = 0; i < num; i++){
	    	c += radius/distance(uv, points[i]);
	    }

	    // c *=0.002;
	    c *= a/float(num);
    	fragColor = vec4( vec3(1.), c*smoothstep(0.22, 1., c) );
    	// fragColor = vec4( vec3(.7, c*smoothstep(0.22, 1., c), c*smoothstep(0.22, 1., c)), 1. );
	}

`;

const pshader = /*glsl*/ `#version 300 es
    precision mediump float;
    uniform float u_time;
    uniform vec2 u_resolution;
    uniform vec2 u_mouse;
    #define ff(x) (x*0.5+0.5)
    out vec4 fragColor; 

    void main(){
        vec2 uv = gl_PointCoord.xy;
        // vec3 col = 0.5 + 0.5*cos(u_time+uv.xyx+vec3(0,2,4));
        // vec3 col = vec3(ff(cos(6.2*v1)),ff(cos(6.2*v1+1.)),ff(cos(6.2*v1+2.)));
        fragColor = vec4(1.);
    }
`;

let dx, dy, dz;
const dt = 0.006;
let x = 0.1, y = 0.1, z = 0.1, t = 0;
// let a = 0.1, b = 0.35, c = 1.4;
let a = 0.15, b = 0.4, c = 1.4;
let px, py;
let section = 0.1;
const tau = Math.acos(0)*4;
const ctau = tau/c;
// const POINTS_MAX = 512;
const maxsteps = 200000; // try div by 10
let rate = 0.1;
const ifps = 1./60;
let pos = 0;
// let n = 200;

let num = 300; //POINTS_MAX-1;
let stride = 60;

const points = new Float32Array(POINTS_MAX*2).fill(2);

let mode = 0;
var defbuffer;

function switchMode(i){
	switch(i){
		case 0:
			mode = 0;
			prog.glprog.drawtype = prog.gl.TRIANGLE_STRIP
		    prog.glprog.bufferInfo = defbuffer; 
		    prog.glprog.programInfo = prog.glprog.fsprogs[0];
		break;
		case 1:
			prog.glprog.drawtype = prog.gl.POINTS;
			let arrays = {position: { numComponents: 2, data: points}};
		    prog.glprog.bufferInfo = twgl.createBufferInfoFromArrays(prog.gl, arrays);
			prog.glprog.programInfo = prog.glprog.fsprogs[1];
			mode = 1;
	}
}

function setupcb(pgm){
	defbuffer = prog.glprog.bufferInfo;
	if(mode) switchMode(mode);
}

function rendercb(pgm){
	// for(let i = 0; i < points.length; i++){
	// 	points[i] = i/32*(pgm.uniforms.u_time%3.);
	// }
	poincare(points, POINTS_MAX*2, stride, num, maxsteps);
	if(mode) prog.gl.bufferSubData(prog.gl.ARRAY_BUFFER, 0, points);
}

function poincare(/*float* */arr, /*int*/ /*pos,*/ /*int*/ arrlen, /*int*/ drawlen, /*int*/ limit, /*int*/ max){
    let n = 0;

    for(let i = 0; i < max; i++){

        dx = y;
        dy = x - x*x*x - a*y + b*Math.cos(c*t);

        x += dx*dt;
        y += dy*dt;
        z += dz*dt;
        t += dt;

        px = x*0.5;
        py = y*0.5;

        if(Math.abs((c*t)-section) < 0.004){
            if(pos >= limit || pos*2 >= arrlen-2) break;
            arr[pos*2] = px;
            arr[pos*2+1] = py;
            pos++;
            n++;
        }
        if(c*t >= tau) 
            t -= ctau;

        if(n >= drawlen) break;
    }

    pos = pos%num;

    section += rate*tau*ifps;
    if(section >= tau) section -= tau;
    else if(section <= 0) section += tau;
}

const gui = {
	name: "duffing",
	on: true,
	switch: true,
	open: true,
	fields: [
		{
			num : num,
			min : 100,
			max: POINTS_MAX-1,
			step: 1,
			onChange: (v)=>{num = v; prog.uniforms.num = v;}
		},
		{
			stride : stride,
			min : 10,
			max: POINTS_MAX-1,
			step: 1,
			onChange: (v)=>{stride = v;}
		},
		{
			thresh : .55,
			min : 0.1,
			max: 1,
			step: 0.01,
			onChange: (v)=>{
				if (mode)
					prog.uniforms.size = v*10;
				else prog.uniforms.a = v;
			}
		},
		{
			rot : rate,
			min : -0.6,
			max: 0.6,
			step: 0.01,
			onChange: (v)=>{rate = v;}
		},
		{
			damping : a,
			min : .07,
			max: .26,
			step: 0.01,
			onChange: (v)=>{a = v;}
		},
		{
			force : b,
			min : .23,
			max: 0.78,
			step: 0.01,
			onChange: (v)=>{b = v;}
		},
		{
			rendermode : mode,
			min : 0,
			max: 1,
			step: 1,
			onChange: (v)=>{
				if(mode !== v) switchMode(v);
			}
		},
	]
};

const prog = {
	vs: vs,
    fs: [fshader, pshader],
    uniforms: {
    	num: num,
    	points: points,
    	radius: .3,
    	a: .55
    },
    gui : gui,
    rendercb : rendercb,
    setupcb : setupcb,
    clearcolor: [0., 0., 0., 1.0],
};

export default prog;