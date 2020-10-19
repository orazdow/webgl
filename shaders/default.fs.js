const shader = `

precision mediump float;
                           
uniform vec2 resolution;  
uniform vec2 mouse;             

    void main(){
        gl_FragColor = vec4((gl_FragCoord.xy-mouse.xy)/resolution.xy, 1, 1);
    }

`;

export default shader;