
const f0 = `#version 300 es

precision mediump float;
                           
uniform vec2 u_resolution;  
uniform vec2 u_mouse;  
uniform float u_time;  
uniform float v1;
uniform float v2;
uniform float v3;
uniform float v4;
uniform float v5;

// float blur(vec2 v){
    
// }

#define sofs(x) vec2(sin(x*6.28)*0.5+0.5, cos(x*6.28)*0.5+0.5)

out vec4 fragColor;


    void main(){

    	vec2 uv = gl_FragCoord.xy/(u_resolution*v3);

    	vec2 p = vec2(0.9,0.5); //vec2(u_mouse.xy/u_resolution);

    	for(float i = 1.; i < v2; i++){
            // p += (v1*vec2(i*p.y*sin(u_time+p.x*(uv.x-1.)), i*p.x*p.y*sin(0.3*u_time+i+(uv.y-1.))));

            p += (v1*vec2(i*p.y*sin(v4*u_time+p.x*(uv.x)), i*p.x*p.y*sin(0.3*u_time+i+(uv.y))));
            // p *= (v1*vec2(i*p.y*sin(u_time+p.x*(uv.x)), i*p.x*p.y*sin(0.3*u_time+i+(uv.y))));


            p *= 0.75;//v4;
    	}

    	p *= 0.5; 
    	p += 0.5;
        p = clamp(p, 0.0, 1.0);

        // p = 1. - p;

        // fragColor = vec4(log(1.+p.x+p.y));
        // fragColor = vec4(p.x*p.y*2., p.y, p.x+p.y, 1.);
        fragColor = vec4(sin(p.x*100.)*0.5+0.5, (sin(p.x*100.)*0.5+0.5), sin(p.y*100.)*0.5+0.5, 1.);

        // fragColor.w = step(0.55, 1.-fragColor.z)*v5;
        fragColor.w = smoothstep(0.49, v5, 1.-fragColor.z);

        // fragColor = step(0.7, fragColor.xyzx);
        // fragColor = vec4(sin(p.x*100.)*0.5+0.5, sin(p.y*200.)*0.5+0.5, sin(p.y*20.)*0.5+0.5,  pow(sin(p.x+p.y*100.)*0.5+0.5,1.));
    }

`;


export default f0;
