const shader = `#version 300 es

precision mediump float;
                           
uniform vec2 u_resolution;  
uniform vec2 u_mouse;             
out vec4 fragColor;



    void main(){

    	vec2 rg = (gl_FragCoord.xy-u_mouse*vec2(1, -1))/u_resolution;

        fragColor = vec4(rg.x, 1.0-rg.y, rg.y, 1);
    }

`;

export default shader;