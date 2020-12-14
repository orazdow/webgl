import texshaders from "../shaders/texshaders.js";

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
	fields: [
	{
		scale : 1.0,
		min: 0.0,
		max: 2.0,
		step: 0.01,
		onChange: (val)=>{
			prog.uniforms.scale = val;
		}
	},
	{
		rot : 0.0,
		min: -1.0,
		max: 1.0,
		step: 0.005,
		onChange: (val)=>{
			prog.uniforms.time = 0.0;
			prog.uniforms.theta = val;
		}
	}
	]

};

const prog = {
	 // res: { width: 800, height: 600},
	 vs: texshaders.vs,
	 fs: texshaders.fs,
	 textures: {u_sampler : options},
	 uniforms: {
	 	scale : 1.0,
	 	theta : 0.0,
	 	// vtrans : mat
	 },
	 // rendercb : rendercb,
	  gui: gui
	 // clearcolor: [0.2, 0.8, 0.0, 1],
};



export default prog;