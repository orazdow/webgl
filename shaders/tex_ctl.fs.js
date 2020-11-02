const fs = `#version 300 es

	precision mediump float;

	in vec2 v_texcoord;
	uniform mediump sampler2D u_tex;
	uniform float u_time;
	uniform vec2 u_mouse;
	uniform vec2 u_resolution;  

	out vec4 fragColor;

	float ramp(float t, float lim){
		return abs(mod(t, lim)-(lim*0.5));
	}

	float r2(float t){
		return (1.0+sin(ramp(.0+t*0.2, 30.0)))*30.0;
	}

	void main() {
		fragColor = texture(u_tex, clamp(0.01*u_mouse, 0.9, 10.0)*v_texcoord+0.1*sin(v_texcoord.y*r2(u_time)))*vec4( 0.5*(1.0+cos(v_texcoord.y*r2(3.0+u_time*0.7))) ,0.5,0.0,1.0);
	}


`;

export default fs;