
const f0 = `#version 300 es

precision mediump float;
                           
uniform vec2 u_resolution;  
uniform float u_time;  
uniform float v1;
uniform float v2;
uniform float v3;
uniform float v4;

out vec4 fragColor;

#define rgb(a) vec3(sin(a)*0.5+0.5, cos(a)*0.5+0.5, asin(a)*0.5+0.5) 


    void main(){

    	vec2 uv = gl_FragCoord.xy/(u_resolution*v3);

    	vec2 p = vec2(1.1,1.2);

    	for(float i = 1.; i < v2; i++){
    		p *= (v1*vec2(i*p.y*sin(u_time+p.x*uv.x-uv.y), i*p.x*p.y*sin(0.3*u_time+i+uv.y)));
    	}

    	p *= 0.5;
    	p += 0.5;
    	// p *= 2.;
    	p = clamp(p,0.,1.);
    	// p = 1.-p;
    	// float f = step(0.5, p.x);

        fragColor = vec4(p.x, p.x, p.x, 1.);//*vec4(rgb(v4*10.),1.0);
    }

`;


export default f0;


const _f0 = `#version 300 es

precision mediump float;
                           
uniform vec2 u_resolution;  
uniform float u_time;  
uniform float v1;
uniform float v2;
uniform float v3;

out vec4 fragColor;


    void main(){

    	vec2 uv = gl_FragCoord.xy/(u_resolution*v3);

    	vec2 p = vec2(1.1,1.2);

    	for(float i = 1.; i < v2; i++){
    		p *= (v1*vec2(i*p.y*sin(u_time+p.x*uv.x-uv.y), i*p.x*p.y*sin(0.3*u_time+i+uv.y)));
    	}

    	p *= 0.5; 
    	p += 0.5;

        fragColor = vec4(p.x, p.y, p.x, 1);
    }

`;