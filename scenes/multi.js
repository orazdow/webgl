const haspat = /*glsl*/`#version 300 es

	precision mediump float;

	uniform float u_time;
	uniform vec2 u_resolution;
	out vec4 fragColor; 

	// Dave Hoskins hash: www.shadertoy.com/view/4djSRW
	float hash11(float p){
	    p = fract(p * .1031);
	    p *= p + 33.33;
	    p *= p + p;
	    return fract(p);
	}

	void main(){

	    float n = 12.;
	    float t = u_time*0.0001;

	    vec2 uv = gl_FragCoord.xy/u_resolution.xy;
	    
	    // vec3 col = 0.5 + 0.5*cos(iTime+uv.xyx+vec3(0,2,4));
	    
	    float c = 0.;
	    
	    for(float i = 0.; i < 9.; i++){
	    
	        float cx = mix( hash11(3.*i+floor(uv.x*n)+t), hash11(3.*i+floor(1.+(uv.x*n))+t), fract(uv.x*n) );
	        float cy = mix( hash11(3.*i+floor(uv.y*n)+t), hash11(3.*i+floor(1.+(uv.y*n))+t), fract(uv.y*n) );

	        c += sin(4.*(u_time+cx+cy))*0.5+0.5;
	        c *= 0.33;
	    }

	    fragColor = vec4( vec3(c, cos(2.+c)*0.4+0.3, cos(2.+c)*0.3+0.3) ,1.0);
	    fragColor.xyz *= 4.*fragColor.xyz;

	}

`;

const gui = {
	name: "pat",
	on: true,
	switch: true,
	open: true,
	fields: []
};

const prog = {
	fs: haspat,
	gui : gui,
	clearcolor: [0,0,0,1]
};

export default prog;