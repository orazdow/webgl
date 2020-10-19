

const texOptions = {
	src: '../resources/anchorkin.png'
};

const tex_fs = `





`;


const textures = {
	/*  u_name : targetoptions  */
	u_tex : texOptions
}


const tex_prog = {

	 res: { width: 800, height: 600},
	 fs: tex_fs,
	 textures: textures



};

export default tex_prog;



/*
init:
	if prog has textures: {uname:options}

for each:
	twgl.createTexture(S)
	set uniform,
	twgl.etTextureParameters <-maybe not needed?...

*/