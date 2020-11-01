
const fs = `#version 300 es
precision mediump float;

in vec2 v_texcoord;

uniform mediump sampler2DArray u_sampler;
uniform int u_idx;
uniform float mixsig;

out vec4 fragColor;


	void main(){

		fragColor = texture(u_sampler, vec3(v_texcoord, u_idx));

	}


`;

// using module globals instead of data field

const i_fps = 1.0 / 60.0;

let sig = {
    freq : 0,
    phase : 0,
    out : 0,
};

let idx = {val: 0}

function inc_ramp_int(sig, dt, intp, max) {
	sig.phase += dt*i_fps;
	if(sig.phase >= 1){
		sig.phase -= 1;
		intp.val = (intp.val+1)%max;
	}
	sig.out = sig.phase;	
}

const rendercb = (pgm)=>{

	inc_ramp_int(sig, 0.5, idx, 4);
	pgm.uniforms.u_idx = idx.val;
	// pgm.uniforms.mixsig += 0.01;
	// if(pgm.uniforms.mixsig > 1) pgm.uniforms.mixsig = 0;
}

const options = {
	target: 'TEXTURE_2D_ARRAY',
	src: ['./resources/anchorkin.png',
		'./resources/anchorkin2.png',
		'./resources/articulator.png',
		'./resources/calcite.png',],
    min: 'LINEAR',
    mag: 'NEAREST',

};

const prog = {
	 res: { width: 800, height: 600},
	 fs: fs,
	 textures: {u_sampler : options},
	 uniforms: {
	 	u_idx : 0,
	 	mixsig: 1
	 },
	 rendercb : rendercb,
	 // clearcolor: [0.2, 0.8, 0.0, 1],
};



export default prog;