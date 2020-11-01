
const tex_fs = `#version 300 es
precision mediump float;

in vec2 v_texcoord;
uniform mediump sampler2D u_tex;

out vec4 fragColor;

void main() {
	fragColor = texture(u_tex, v_texcoord);
}

`;

// https://twgljs.org/docs/module-twgl.html#.createTexture
// https://twgljs.org/docs/module-twgl.html#.TextureOptions
const texOptions = { 
    src: './resources/anchorkin.png',
    min: 'LINEAR',
    mag: 'NEAREST',
    // wrap: 'CLAMP_TO_EDGE'
};

const tex_prog = {
	 res: { width: 800, height: 600},
	 fs: tex_fs,
	 textures: {u_tex : texOptions},
	 // clearcolor: [0.2, 0.8, 0.0, 1],
	 // arrays: {texcoord: { numComponents: 2, data: [0, 2,  0, 0, 2, 2,  2, 0] }}

};

export default tex_prog;

