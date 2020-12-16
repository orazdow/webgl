import texshaders from "../shaders/texshaders.js";

const options = {
	target: 'TEXTURE_2D_ARRAY',
	src: ['./resources/anchorkin2.png',
		'./resources/anchorkin.png',
		'./resources/articulator.png',
		'./resources/calcite.png',],
    min: 'LINEAR',
    mag: 'NEAREST',

};

const gui = {
	name: 'pngs',
	open: true,
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
	{
		'' : true,
		onChange: (val)=>{
			prog.on = val;
		}
	}
	]

};

gui.fields[0].onChange = (val)=>{
	prog.uniforms.idx = val;
	gui.fields[1].ref.setValue(val);
}

const prog = {
	 // res: { width: 800, height: 600},
	 vs: texshaders.vs,
	 fs: texshaders.fs,
	 textures: {u_sampler : options},
	 uniforms: {
	 	idx : 0.0,
	 	mixidx : 0.0,
	 	scale : 1.0,
	 	theta : 0.0,
	 	aval : 0.0,
	 	alpha : 1.0
	 	// vtrans : mat
	 },
	 // rendercb : rendercb,
	  gui: gui,
	  // on: false
	 // clearcolor: [0.2, 0.8, 0.0, 1],
};



export default prog;