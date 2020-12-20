
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
    }

`;


const gui = {
    name: 'bubb',
    open: true,
    switch: true,
    fields:[
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
            thresh: 0.6,
            min: 0.3,
            max: 1.0,
            step: 0.01,
            onChange : (v)=>{prog.uniforms.v5 = v;}
        },
    ]
}


const prog = {
	 // res: { width: 800, height: 600},
	 fs: wavefrag,
	 uniforms: {
        v1: 0.7, 
        v2: 22.0, 
        v3: 0.21, 
        v4: 0.6,
        v5: 0.6
	 },
	 // rendercb : rendercb,
	  gui: gui,
	  on: false
	 // clearcolor: [0.2, 0.8, 0.0, 1],
};



export default prog;