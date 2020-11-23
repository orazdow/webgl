const fshader = `#version 300 es

	precision mediump float;

	uniform vec2 points[8];
	uniform float radius;
	uniform float u_time;
	uniform vec2 u_resolution;
	out vec4 fragColor; 

	void main(){

		float c = 0.0;

	    vec2 uv = (2.*gl_FragCoord.xy-u_resolution.xy)/u_resolution.y;

	    for(int i = 0; i < 8; i++){
	    	c += radius/distance(uv, points[i]);
	    }

	    c *= 0.002;

    	fragColor = vec4( c );

	}

`;

let xypoints = [];
xypoints.length = 16;
xypoints.fill(0);

let amount = 0.003;
let rad = 15.0;
let _sink = 0;

function setupcb (pgm){
	for(let i = 0; i < pgm.uniforms.points.length; i++){
		pgm.uniforms.points[i] = Math.random()*2-1.0;
	}
}

function rendercb (pgm){
	preturb_sinkXY(pgm.uniforms.points, amount, _sink);
	pgm.uniforms.radius = rad;
}


function preturb_sinkXY(floats, amp, sink){
	for(let i = 0; i < floats.length; i++){
		let o = Math.atan2(floats[i]+0, floats[i+1]+0);
		floats[i] += Math.sin(o)*sink;
		floats[i+1] += Math.cos(o)*sink;
		floats[i] += Math.random()*amp*2 - amp;
		floats[++i] += Math.random()*amp*2 - amp;
	}
}

function preturbXY (floats, amp){
	for(let i = 0; i < floats.length; i++){	
		floats[i] += Math.random()*amp*2 - amp;
		floats[++i] += Math.random()*amp*2 - amp;
	}
}

function sinkXY (floats, amp){
	for(let i = 0; i < floats.length; i++){	
		let o = Math.atan2(floats[i]+0, floats[i+1]+0);
		floats[i] -= Math.sin(o)*amp;
		floats[++i] -= Math.cos(o)*amp;
	}
}

function reset(points){
	for(let i = 0; i < points.length; i++){
		points[i] = Math.random()*1.8 - 0.9;
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
		{
			sink: _sink,
			min: -1,
			max: 1,
			step: 0.0001,
			onChange: (val)=>{_sink = val*0.01;}			
		},
		{
			reset : ()=>{ reset(prog.uniforms.points); }
		}
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