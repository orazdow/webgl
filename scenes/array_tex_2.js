// import {m4} from "../modules/twgl-full.module.min.js";

const tex_vs = `#version 300 es
                                                               
in vec4 position;
in vec2 texcoord;
uniform mediump float u_time;
// uniform mat4 vtrans;
out vec2 v_texcoord;

#define rot(a) mat2(cos(a), -sin(a), sin(a), cos(a))
#define translate3(v) mat3(vec3(1.0,0.0,0.0), vec3(0.0,1.0,0.0), v)

    void main() {
    	vec2 translate = vec2(cos(u_time),sin(u_time));
    	// v_texcoord = texcoord*rot(u_time*0.04);
    	// v_texcoord = (vec4(texcoord, 1.0, 1.0)*vtrans).xy;
    	v_texcoord = texcoord;//+(translate*0.5);
    	// v_texcoord += 0.9;
    	// v_texcoord *= rot(u_time*0.3);
    	// v_texcoord -= 0.9;
        gl_Position = vec4(position.xy*rot(u_time*0.5), position.zw);
    }

`;

const mix_fs = `#version 300 es
precision mediump float;

in vec2 v_texcoord;

uniform mediump sampler2DArray u_sampler;
uniform float u_time;
uniform vec2 u_resolution;
out vec4 fragColor;

const float pngscale = 0.88;
const vec2 estimate = vec2(900, 800);

#define rot(a) mat2(cos(a), -sin(a), sin(a), cos(a))

	void main(){
		
		vec2 dimensions = u_resolution / (estimate*pngscale);
		vec2 texcoord = (v_texcoord*dimensions);
		float time = u_time*0.7;
		float idx = floor(mod(time, 4.0));
		float idx2 = floor(mod(time+1.0, 4.0));
		// float _mix = pow(fract(time), 2.8);
		float _mix = smoothstep(0.3, 0.9, fract(time));

		fragColor = mix(texture(u_sampler, vec3(texcoord, idx)), texture(u_sampler, vec3(texcoord, idx2)), _mix);

	}

`;


const rot_fs = `#version 300 es
precision mediump float;

in vec2 v_texcoord;

uniform mediump sampler2DArray u_sampler;
uniform float u_time;
uniform vec2 u_resolution;
uniform float theta;
uniform vec2 u_mouse;

out vec4 fragColor;

const float pngscale = 0.88;
const vec2 estimate = vec2(900, 800);

#define rot(a) mat2(cos(a), -sin(a), sin(a), cos(a))
#define _rot(v,a) vec2(mat2(cos(a.x), -sin(a.y), sin(a.z), cos(a.x))*v)


	void main(){

		vec2 mouse = u_mouse/u_resolution;
		
		vec2 dimensions =vec2(1.0);// u_resolution / (estimate*pngscale);
		vec2 texcoord = ((v_texcoord)*dimensions);

		// vec2 translate = vec2(cos(u_time),sin(u_time));
		vec2 translate = vec2(0.5);

		// vec2 coord = (texcoord+(2.0*mouse))*rot(theta);
		// vec2 coord = ((texcoord)+translate)*rot(u_time*0.3)-mouse;

		fragColor = texture(u_sampler, vec3(texcoord, 1) );

	}

`;

// const mat = m4.identity();
// const trans = m4.translation([0.5, 0.5, 0.0]);
// m4.multiply(mat, trans, mat); 
// m4.multiply(mat, m4.rotationX(1.0), mat); 
// m4.multiply(mat, m4.translation([-0.5, -0.5, 0.0]), mat); 

//const mat = m4.rotationX(0);
//m4.translation([10.0, 0.0, 0.0], mat); 

let rot = 0.0;
// const mat = m4.translation([1, 2, 3]); 

const options = {
	target: 'TEXTURE_2D_ARRAY',
	src: ['./resources/anchorkin.png',
		'./resources/anchorkin2.png',
		'./resources/articulator.png',
		'./resources/calcite.png',],
    min: 'LINEAR',
    mag: 'NEAREST',

};

const gui = {
	name: 'pngs',
	open: true,
	fields: [{
	rot : rot,
	min: 0.0,
	max: 1.0,
	step: 0.01,
	onChange: (val)=>{prog.uniforms.theta = val;}
	}]

};

const prog = {
	 res: { width: 800, height: 600},
	 vs: tex_vs,
	 fs: rot_fs,
	 textures: {u_sampler : options},
	 uniforms: {
	 	theta : rot,
	 	// vtrans : mat
	 },
	 // rendercb : rendercb,
	  // gui: gui
	 // clearcolor: [0.2, 0.8, 0.0, 1],
};



export default prog;