import tex_fs from "../shaders/tex_gui.js";
import pnglist from "./resource_list.js";

const options = {
	target: 'TEXTURE_2D_ARRAY',
	src: pnglist.full,
    min: 'LINEAR',
    mag: 'LINEAR',
    width: 1024,
    height: 1024
    // wrap: 'CLAMP_TO_EDGE'

};

const gui = {
	name: 'bkd_png',
	open: false,
	switch: true,
	fields: [
	{
		idx : 0,
		min: 0,
		max: options.src.length-1,
		step: 1,
		onChange: (val)=>{
			prog.uniforms.idx = val;
		}
	},
	{
		mix : 0,
		min: -1,
		max: options.src.length-1,
		step: 1,
		onChange: (val)=>{
			prog.uniforms.mixidx = val;
		}
	},
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
		wobble : 0.0,
		min: 0.0,
		max: 1.0,
		step: 0.001,
		onChange: (val)=>{
			prog.uniforms.wob = val;
		}
	},
	{
		yoffs: 0.0,
		min: -0.75,
		max: 0.75,
		step: 0.01,
		onChange: (val)=>{
			prog.uniforms.yoffs = val;
		}
	},
	{
		zanim: 0.0,
		min: 0.0,
		max: 1.0,
		step: 0.01,
		onChange: (val)=>{
			prog.uniforms.avalz = val;
		}
	},
	{
		alpha : 1.0,
		min : 0.0,
		max : 1.0,
		step: 0.01,
		onChange: (val)=>{
			prog.uniforms.alpha = val;
		}
	},
	]

};

gui.fields[0].onChange = (val)=>{
	prog.uniforms.idx = val;
	gui.fields[1].ref.setValue(val);
}

const prog = {
	 // res: { width: 800, height: 600},
	 fs: tex_fs,
	 textures: {u_sampler : options},
	 uniforms: {
	 	idx : 0.0,
	 	mixidx : 0.0,
	 	scale : 1.0,
	 	yoffs : 0.0,
	 	avalz : 0.0,
	 	alpha : 1.0
	 },
	 // rendercb : rendercb,
	  gui: gui,
	  on: false
	 // clearcolor: [0.2, 0.8, 0.0, 1],
};


export default prog;