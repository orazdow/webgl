const fs = /*glsl*/`#version 300 es   

precision mediump float;
out vec4 FragColor; 

uniform int num;
uniform vec2 points[512]; 
uniform vec2 res;

float r = 1.; //2.2;
float a = 0.1; 
float col= 0.1;  
float _pow  = 2.; //0.8                                                                                
void main(){                                                                        

	for(int i = 0; i < num; i++){
		col = col+ a*(r/(pow(distance(gl_FragCoord.xy/res, (points[i]+ 0.9)*0.6 ), _pow)))/float(num);
	}
    col = 1.0 - col;
    float r = (sin(col*3.14159)+1.)*0.5;
    float g = (cos(col*3.14159)+1.)*0.5;
    float b = (asin(col*3.14159)+1.)*0.5;
	// FragColor = vec4(1.0-r, r*0, g, 1);
	FragColor = vec4(1.0-r, g*0.3, b, 1.);
  	// FragColor = vec4(col, col, col, 1);
                                            
}`;

const fshader = /*glsl*/`#version 300 es

	precision mediump float;

	uniform int num;
	uniform vec2 points[512];
	uniform float radius;
	uniform float u_time;
	uniform vec2 u_resolution;
	out vec4 fragColor; 

	void main(){

		float c = 0.0;

	    vec2 uv = (2.*gl_FragCoord.xy-u_resolution.xy)/u_resolution.y;

	    for(int i = 0; i < num; i++){
	    	c += radius/distance(uv, points[i]);
	    }

	    c *=0.002;
	    // c /= float(num);
    	fragColor = vec4( vec3(1.), c*smoothstep(0.2,0.9,c) );

	}

`;

let dx, dy, dz;
const dt = 0.006;
let x = 0.1, y = 0.1, z = 0.1, t = 0;
let a = 0.1, b = 0.35, c = 1.4;
let px, py;
let section = 0.1;
const tau = Math.acos(0)*4;
const ctau = tau/c;
const POINTS_MAX = 512;
const maxsteps = 200000; // try div by 10
const rate = 0.22;
const ifps = 1./60;
let pos = 0;
// let n = 200;

let num = 380;
let stride = 80;

const points = new Float32Array(POINTS_MAX*2).fill(0);
const pnum = 16;

function setupcb(pgm){
	// pgm.uniforms.points = points;
}

function rendercb(pgm){
	// for(let i = 0; i < points.length; i++){
	// 	points[i] = i/32*(pgm.uniforms.u_time%3.);
	// }
	poincare(points, POINTS_MAX*2, stride, num, maxsteps);
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
    if(section > tau) section -= tau;
}

const prog = {
    fs: fshader,
    uniforms: {
    	num: num,
    	points: points,
    	radius: .3
    },
    rendercb : rendercb,
    setupcb : setupcb,
    clearcolor: [0., 0., 0., 1.0],
};

export default prog;