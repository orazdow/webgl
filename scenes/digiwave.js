const wavefrag = /*glsl*/ `#version 300 es

	precision mediump float;
	                           
	uniform vec2 u_resolution;  
	uniform vec2 u_mouse;  
	uniform float u_time;  
	uniform float v1;
	uniform float v2;
	uniform float v3;
	uniform float v4;
	uniform float v5;

	out vec4 fragColor;

    void main(){

    	vec2 uv = gl_FragCoord.xy/(u_resolution*v3);

    	vec2 p = vec2(0.9,0.5); //vec2(0.1,1.1);

    	for(float i = 1.; i < v2; i++){
            p += (v1*vec2(i*p.y*sin(v4*u_time+p.x*(uv.x)), i*p.x*p.y*sin(0.3*u_time+i+(uv.y))));
            // p *= (v1*vec2(i*p.y*sin(u_time+p.x*(uv.x)), i*p.x*p.y*sin(0.3*u_time+i+(uv.y))));
            p *= 0.75;
    	}

    	p *= 0.5; 
    	p += 0.5;
        p = clamp(p, 0.0, 1.0);
        // p = 1. - p;
        // fragColor = vec4(log(1.+p.x+p.y));
        // fragColor = vec4(p.x*p.y*2., p.y, p.x+p.y, 1.);
        fragColor = vec4(sin(p.x*100.)*0.5+0.5, (sin(p.x*100.)*0.5+0.5), sin(p.y*100.)*0.5+0.5, 1.);
        fragColor.w = smoothstep(0.49, v5, 1.-fragColor.z);
        // fragColor.w = step(0.54, 1.-fragColor.z)*v5;
    }

`;

const wavefrag2 = /*glsl*/ `#version 300 es

	precision mediump float;
	                           
	uniform vec2 u_resolution;  
	uniform float u_time;  
	uniform float v5;

	out vec4 fragColor;

	void main(){

	    vec2 uv = gl_FragCoord.xy/u_resolution.xy;

	    vec3 col = vec3(0.,0.,0.);
	    
	    vec2 p = vec2(1.4,0.5);
	    
	    for(float i = 1.; i <12.; i++){
	        p *= vec2(
	                p.y+i*sin(0.12*u_time+p.x+(p.y*uv.x*4.)),
	                p.x+i*sin(0.09*u_time+p.y+(p.x*uv.y*5.))
	                )*0.9;
	    }

	    fragColor = vec4( vec3(0.6*(sin(p.x*p.y)*0.5+0.5), 0.3*(sin(p.x*p.y)*0.5+0.5), sin(p.x+p.y)*0.5+0.5) ,1.0);
	    fragColor.w = v5+(1.-v5)*step(0.1, 0.33*(fragColor.x+fragColor.y+fragColor.z))*max(0.7,v5);

	}
`;

const _wavefrag2 = /*glsl*/ `#version 300 es

	precision mediump float;
	                           
	uniform vec2 u_resolution;  
	uniform float u_time;  
	uniform float v1;
	uniform float v2;
	uniform float v3;
	uniform float v4;
	uniform float v5;

	out vec4 fragColor;

	void main(){

	    vec2 uv = (4.*v3)*gl_FragCoord.xy/u_resolution.xy;

	    vec3 col = vec3(0.,0.,0.);
	    
	    vec2 p = vec2(1.4,0.5);
	    
	    for(float i = 1.; i <12.; i++){
	        p *= vec2(
	                p.y+i*sin(2.*v4*0.12*u_time+p.x+(p.y*uv.x*4.)),
	                p.x+i*sin(0.09*u_time+p.y+(p.x*uv.y*5.))
	                )*(0.6+0.5*v1); //.9
	    }

	    fragColor = vec4( vec3(0.6*(sin(p.x*p.y)*0.5+0.5), 0.3*(sin(p.x*p.y)*0.5+0.5), sin(p.x+p.y)*0.5+0.5) ,1.0);
	    fragColor.w = v5+(1.-v5)*step(0.1, 0.33*(fragColor.x+fragColor.y+fragColor.z))*max(0.7,v5);

	}
`;



const wavefrag3 = /*glsl*/`#version 300 es

precision mediump float;
                           
uniform vec2 u_resolution;  
uniform float u_time;  
uniform float v1;
uniform float v2;
uniform float v3;
uniform float v4;
uniform float v5;

out vec4 fragColor;

#define rgb(a) vec3(sin(a)*0.5+0.5, cos(a)*0.5+0.5, asin(a)*0.5+0.5) 

    void main(){

    	vec2 uv = gl_FragCoord.xy/(u_resolution*v3);

    	vec2 p = vec2(1.1,1.2);

    	for(float i = 1.; i < v2; i++){
    		p *= (v1*vec2(i*p.y*sin((v4*2.-1.)*u_time+p.x*uv.x-uv.y), i*p.x*p.y*sin(0.3*u_time+i+uv.y)));
    	}

    	p *= 0.5;
    	p += 0.5;
    	// p *= 2.;
    	p = clamp(p,0.,1.);
    	// p = 1.-p;
    	// float f = step(0.5, p.x);

        fragColor = vec4(p.x, p.x, p.x, v5*step(0.54,1.-p.x));//*vec4(rgb(v4*10.),1.0);
    }

`;


const wavefrag4 = /*glsl*/ `#version 300 es

precision mediump float;
                           
uniform vec2 u_resolution;  
uniform vec2 u_mouse;  
uniform float u_time;  
uniform float v1;
uniform float v2;
uniform float v3;
uniform float v4;
uniform float v5;

out vec4 fragColor;

    void main(){

    	vec2 uv = gl_FragCoord.xy/(u_resolution*v3);

    	vec2 p = vec2(v4*2.,1.4); //vec2(u_mouse.xy/u_resolution);

    	for(float i = 1.; i < 14.; i++){
             p -= (0.5*v1*vec2(i*p.y*sin(u_time+p.x*(uv.x-1.)), i*p.x*p.y*sin(0.3*u_time+i+(uv.y-1.))));

            p -= (0.5*v1*vec2(i*p.y*sin(u_time+p.x*(uv.x)), i*p.x*p.y*sin(0.3*u_time+i+(uv.y))));
            p -= (0.5*v1*vec2(i*p.y*sin(u_time+p.x*(uv.x-1.)), i*p.x*p.y*sin(0.3*u_time+i+(uv.y))));
            p -= (0.5*v1*vec2(i*p.y*sin(u_time+p.x*(uv.x+1.)), i*p.x*p.y*sin(0.3*u_time+i+(uv.y))));

            p -= (0.5*v1*vec2(i*p.y*sin(u_time+p.x*(uv.x)), i*p.x*p.y*sin(0.3*u_time+i+(uv.y-1.))));
            p -= (0.5*v1*vec2(i*p.y*sin(u_time+p.x*(uv.x-1.)), i*p.x*p.y*sin(0.3*u_time+i+(uv.y-1.))));
            p -= (0.5*v1*vec2(i*p.y*sin(u_time+p.x*(uv.x+1.)), i*p.x*p.y*sin(0.3*u_time+i+(uv.y-1.))));

            p -= (0.5*v1*vec2(i*p.y*sin(u_time+p.x*(uv.x)), i*p.x*p.y*sin(0.3*u_time+i+(uv.y+1.))));
            p -= (0.5*v1*vec2(i*p.y*sin(u_time+p.x*(uv.x-1.)), i*p.x*p.y*sin(0.3*u_time+i+(uv.y+1.))));
            p -= (0.5*v1*vec2(i*p.y*sin(u_time+p.x*(uv.x+1.)), i*p.x*p.y*sin(0.3*u_time+i+(uv.y+1.))));


            p *= 0.7;
    	}

    	p *= 0.5; 
    	p += 0.5;
        // p *= 1.5;
        p = clamp(p, 0.0, 1.0);
        // fragColor = vec4(log(1.+p.x+p.y));
        // fragColor = vec4(p.x*p.y*2., p.y, p.x+p.y, 1.);
        fragColor = vec4(sin(p.x*200.)*0.5+0.5, sin(p.y*200.)*0.5+0.5, sin(p.y*20.)*0.5+0.5, 1.);
        fragColor.w = step(0.54, fragColor.x)*v5;
        // fragColor = step(0.7, fragColor.xyzx);
        // fragColor = vec4(sin(p.x*100.)*0.5+0.5, sin(p.y*200.)*0.5+0.5, sin(p.y*20.)*0.5+0.5,  pow(sin(p.x+p.y*100.)*0.5+0.5,1.));
    }

`;

const wavefrag5 = /*glsl*/`#version 300 es

precision highp float;

uniform vec2 u_resolution;  
uniform vec2 u_mouse;  
uniform float u_time; 
uniform float v1;
uniform float v2;
uniform float v3;
uniform float v4;
uniform float v5; 

out vec4 fragColor;

	void main(){

		vec2 p = 2.*gl_FragCoord.xy/u_resolution/v3*0.5;
		for(int n=1; n<9; n++){
			float i = float(n);
			p += vec2(
				0.8*(sin(i*p.y+u_time*v4*1.2))+7.8,
				2.*v4*(sin(2.+i*p.x+u_time*v4+p.y))+1.6
			)*v1*0.8;
		}
		fragColor = vec4(0.5*sin(p.x)+0.5,0.1*sin(p.y)+0.2,sin(p.x+p.y),1.0);
		fragColor.w = min(1.,v5*2.)*step((1.-v5)*1.7, 1.5-dot(fragColor.xyz, vec3(0.9, 0.2, 0.2)));
		fragColor.w *=v5;
	}

`;

const idx = 0;

const gui = {
    name: 'bubb',
    open: false,
    switch: true,
    fields:[
    	{
            idx: idx,
            min: 0,
            max: 4,
            step: 1,   		
    	},
        {
            amp: 0.7,
            min: 0.1,
            max: 3.0,
            step: 0.01,
            onChange : (v)=>{prog.uniforms.v1 = v;}
        },
        {
            power: 22.0,
            min: 1.5,
            max: 25.0,
            step: 0.01,
            onChange : (v)=>{prog.uniforms.v2 = v;}
        },
        {
            scale: 0.21,
            min: 0.1,
            max: 0.5,
            step: 0.01,
            onChange : (v)=>{prog.uniforms.v3 = v;}
        },
        {
            motion: 0.6,
            min: 0.0,
            max: 1.0,
            step: 0.01,
            onChange : (v)=>{prog.uniforms.v4 = v;}
        },
        {
            thresh: idx ? 1. : 0.7,
            min: 0.0,
            max: 1.0,
            step: 0.01,
            onChange : (v)=>{prog.uniforms.v5 = v;}
        },
    ]
}

gui.fields[0].onChange = (val)=>{
	prog.glprog.programInfo = prog.glprog.fsprogs[val];
	let g = prog.glprog.gui;
	g.__controllers[2].__li.style.display = val? "none" : "";
}

function setupcb() {
	prog.glprog.programInfo = prog.glprog.fsprogs[idx];
}

const prog = {
	 // res: { width: 800, height: 600},
	 fs: [wavefrag, _wavefrag2, wavefrag3, wavefrag4, wavefrag5],
	 uniforms: {
	 	idx: idx,
        v1: 0.7, 
        v2: 24.0, 
        v3: 0.21, 
        v4: 0.6,
        v5: idx ? 1. : 0.7
	 },
	 // rendercb : rendercb,
	  setupcb : setupcb,
	  gui: gui,
	  on: false
	 // clearcolor: [0.2, 0.8, 0.0, 1],
};

export default prog;