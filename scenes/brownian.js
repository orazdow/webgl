const fshader = `#version 300 es

	precision mediump float;

	uniform vec2 points[8];
	uniform float radius;
	uniform float u_time;
	uniform vec2 u_resolution;
	out vec4 fragColor; 

	void main(){

		float c = 0.0;

	    vec2 uv = gl_FragCoord.xy/u_resolution.xy;

	    for(int i = 0; i < 8; i++){
	    	c += radius/distance(uv, points[i]);
	    }

	    c *= 0.002;

    	fragColor = vec4( c );

	}

`;

/* 
    fs: fs || null (default.fs),
    vs: vs || null (default.vs),
    res: res || null (width: 600, height: 600),
    arrays: arrays || null, 
    uniforms: uniforms || null,
    rendercb: rendercb || null,
    setupcb: setupcb || null,
    textures: {u_name : twgl-texoptions, ...} || null,
    drawtype: drawtype || null (gl_triangle_strip),
    clearcolor: clearcolor || null (0,0,0,0),
    gui: guioptions || null
}
*/

let xypoints = [];
xypoints.length = 16;
xypoints.fill(0);

let amount = 0.003;
let rad = 10.0;

function setupcb (pgm){
	for(let i = 0; i < pgm.uniforms.points.length; i++){
		pgm.uniforms.points[i] = Math.random();// *1*2 - 1;
	}
}

function rendercb (pgm){
	preturbXY(pgm.uniforms.points, amount);
	pgm.uniforms.radius = rad;
}


function preturbXY (floats, amp){

	for(let i = 0; i < floats.length; i++){	
		floats[i] += Math.random()*amp*2 - amp;
		floats[++i] += Math.random()*amp*2 - amp;
	}

}

function reset(points){
	for(let i = 0; i < points.length; i++){
		points[i] = Math.random()*0.8 + 0.125;
	}
}

const gui = {
	name: 'brownian',
	open : true,
	fields: [
		{
			amt: amount,
			min: 0.0001,
			max: 0.02,
			step: 0.0001,
			onChange: (val)=>{amount = val;}
		},
		{
			radius: rad,
			onChange: (val)=>{rad = val;}
		},
		// {
		// 	reset : ()=>{ reset(prog.uniforms.points); }
		// }
	]

};

const prog = {

	fs : fshader,
	setupcb : setupcb,
	rendercb : rendercb,
	uniforms : {
		points : xypoints,
		radius: rad
	},
	gui : gui,
	// clearcolor: [0.2, 0.8, 0.0, 1],

};

export default prog;