const shader = `#version 300 es
                                                               
in vec4 position;
in vec2 texcoord;
out vec2 u_texcoord;

    void main() {
    	u_texcoord = texcoord;
        gl_Position = position;
    }

`;

export default shader;