const shader = `#version 300 es
                                                               
in vec4 position;
in vec2 texcoord;
out vec2 v_texcoord;

    void main() {
    	v_texcoord = texcoord;
        gl_Position = position;
    }

`;

export default shader;