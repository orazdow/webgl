const hashpat = /*glsl*/`#version 300 es

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

const boxes = /*glsl*/`#version 300 es

	precision mediump float;

	uniform float u_time;
	uniform vec2 u_resolution;
	out vec4 fragColor; 

	float box(vec2 coord, vec2 uv, float size, float w){
	   uv = 1.-uv;
	   coord.x = 1.-coord.x;
	   vec2 b = step(coord, uv) - step(coord,uv-size);
	   vec2 b2 = step(coord+w, uv) - step(coord,uv-(size-w));
	   return b.x * b.y - b2.x*b2.y;
	}

	void main(){

		vec2 uv = gl_FragCoord.xy/u_resolution.xy;
		float r = u_resolution.y/u_resolution.x;
		uv.y *= r;
		uv.x *= (uv.x/uv.y+abs(fract(u_time*0.3)-0.5)*2.);

		vec3 col = 0.5 + 0.5*cos(u_time+uv.xyx+vec3(0,2,4));

		float bx = 0.;
		float a = 0.18;
		float b = 0.4;
		float c = 7.;

	    for(float i = 0.; i < 20.; i++){
	    
	       for(float j = 0.; j < c; j++){
	    
	            bx += box(uv*vec2(.43,1.1),vec2(a*j+(i*0.018),0.6+(i*0.01)),0.05+i*0.019*abs(cos(b*j+u_time))*-1., -0.004*abs(cos(b*j+u_time)));
	        }
	    }
	    
    	fragColor = vec4(vec3(bx)*col, 1.0);
	}
`;

const stub = /*glsl*/`#version 300 es

	precision mediump float;

	uniform float u_time;
	uniform vec2 u_resolution;
	out vec4 fragColor; 

	void main(){
		fragColor = vec4(0.8,0.0,0.5,1.0);
	}
`;

const idx = 0;

function setupcb() {
	prog.glprog.programInfo = prog.glprog.fsprogs[idx];
	window.prog = prog;
}

const gui = {
	name: "multi",
	on: true,
	switch: true,
	open: true,
    fields:[
    	{
            idx: idx,
            min: 0,
            max: 1,
            step: 1,   		
    	},

    	]
};

gui.fields[0].onChange = (val)=>{
	prog.glprog.programInfo = prog.glprog.fsprogs[val];
	prog.glprog.gl.useProgram(prog.glprog.programInfo.program);
}


const prog = {
	fs: [boxes,hashpat],
	gui : gui,
	setupcb : setupcb,
	uniforms: {},

	clearcolor: [0,0,0,1]
};

export default prog;