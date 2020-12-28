import tex_fs from "../shaders/tex_gui.js";
import pnglist from "./resource_list.js";

const options = {
	target: 'TEXTURE_2D_ARRAY',
	src: pnglist.full,
    min: 'LINEAR',
    mag: 'NEAREST',
    width: 1024,
    height: 1024

};

const gui = {
	name: 'png',
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
		rot : 0.0,
		min: -1.0,
		max: 1.0,
		step: 0.005,
		onChange: (val)=>{
			prog.uniforms.time = 0.0;
			prog.uniforms.theta = val;
		}
	},
	{
		offset : 0.0,
		min: 0.0,
		max: 3.1416,
		step: 0.01,
		onChange: (val)=>{
			prog.uniforms.offs = val;
		}
	},
	{
		anim: 0.0,
		min: 0.0,
		max: 1.0,
		step: 0.01,
		onChange: (val)=>{
			prog.uniforms.aval = val;
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
	// {
	// 	reset : ()=>{ gui_reset(); }
	// }
	]

};

const gui_reset = ()=>{
	gui.fields[0].ref.setValue(0.0); //idx
	gui.fields[1].ref.setValue(0.0); //mix
	gui.fields[2].ref.setValue(1.0); //scale
	gui.fields[3].ref.setValue(0.0); //rot
	gui.fields[4].ref.setValue(0.0); //offset
	gui.fields[5].ref.setValue(0.0); //anim
	gui.fields[6].ref.setValue(0.0); //zanim
	gui.fields[7].ref.setValue(1.0); //alpha
}

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
	 	theta : 0.0,
	 	aval : 0.0,
	 	alpha : 1.0,
	 	offs: 0.0
	 },
	 // rendercb : rendercb,
	  gui: gui,
	  on: false
	 // clearcolor: [0.2, 0.8, 0.0, 1],
};



export default prog;