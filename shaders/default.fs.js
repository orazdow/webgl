const shader = `#version 300 es

precision mediump float;
                           
uniform vec2 resolution;  
uniform vec2 mouse;             
out vec4 fragColor;

    void main(){
        fragColor = vec4((gl_FragCoord.xy-mouse.xy)/resolution.xy, 1, 1);
    }

`;

export default shader;