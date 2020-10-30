const shader = `#version 300 es

precision mediump float;
                           
uniform vec2 u_resolution;  
uniform vec2 u_mouse;             
out vec4 fragColor;

    void main(){
        fragColor = vec4((gl_FragCoord.xy-u_mouse.xy)/u_resolution.xy, 1, 1);
    }

`;

export default shader;