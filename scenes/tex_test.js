
const tex_fs = `#version 300 es
precision mediump float;

in vec2 v_texcoord;
uniform mediump sampler2D u_tex;
out vec4 fragColor;

void main() {
	fragColor = texture(u_tex, v_texcoord);
}

`;

const texOptions = {
	src: '../resources/anchorkin.png'
};

const tex_prog = {

	 res: { width: 800, height: 600},
	 fs: tex_fs,
	 textures: {u_tex : texOptions}

};

export default tex_prog;

