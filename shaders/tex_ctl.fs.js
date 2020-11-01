const fs = `#version 300 es

	precision mediump float;

	in vec2 v_texcoord;
	uniform mediump sampler2D u_tex;
	uniform vec2 u_mouse;
	uniform vec2 u_resolution;  

	out vec4 fragColor;

	void main() {
		fragColor = texture(u_tex, v_texcoord*(3.0*u_mouse/u_resolution));
	}


`;

export default fs;