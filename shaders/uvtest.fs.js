const shader = `#version 300 es

	precision mediump float;

	uniform float u_time;
	uniform vec2 u_resolution;
	uniform vec2 u_mouse;
	out vec4 fragColor; 

	void main(){
	    // vec2 uv = (2.*gl_FragCoord.xy/u_resolution.xy)*u_resolution.y/u_resolution.x - 1.0;
		vec2 uv = (2.*gl_FragCoord.xy - u_resolution.xy)/u_resolution.y;
	    uv *= vec2(1., -1.);
	    float c = 0.5/distance(uv, vec2(0.,1.));

    	fragColor = vec4(c, 0, c, c);

	}

`;

export default shader;