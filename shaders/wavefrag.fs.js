
const f2 = `#version 300 es

precision mediump float;
                           
uniform vec2 u_resolution;  
uniform vec2 u_mouse;             
out vec4 fragColor;


    void main(){

    	vec2 rg = (gl_FragCoord.xy-u_mouse*vec2(1, -1))/u_resolution;

        fragColor = vec4(rg.x, 1.0-rg.y, rg.y, 1);
    }

`;

const f1 = `#version 300 es

precision mediump float;

uniform vec2 u_resolution;
uniform float u_time;
out vec4 fragColor; 

	void main(){

		vec2 p = 2.0*gl_FragCoord.xy/u_resolution;

		for(int n=1; n<7; n++){
			float i = float(n);
			p += vec2(
			0.2*(sin(i*p.y+u_time))+0.8,
			0.2*log(0.5*sin(sin(i*p.x+u_time)+5.5)+0.5)+1.6);
		}

		fragColor = vec4(0.5*sin(p.x)+0.5,0.5*sin(p.y)+0.5,sin(p.x+p.y),1.0);
	}

`;


const f0 = `#version 300 es

precision mediump float;

uniform vec2 u_resolution;
uniform float u_time;
out vec4 fragColor; 

	void main(){

		vec2 p = 2.0*gl_FragCoord.xy/u_resolution.xy;
		for(int n=1; n<6; n++){
			float i = float(n);
			p += vec2(
				0.2*log(((0.5*sin(0.3*i*p.y*p.y)+0.5)))+0.8,
				0.2*(sin((i*p.x)) + p.y*(0.5*sin(u_time*0.902)+0.5)  )+0.9   //-(sin(u_time*1.15)))+1.
				);
		}

		fragColor = vec4(0.5*sin(p.x)+0.5,0.5*sin(0.)+0.05,sin(p.y),1.0);
	}

`;

export default f1;
