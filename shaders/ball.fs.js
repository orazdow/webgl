const shader = `

precision mediump float;

#define f float
#define v4 vec4
#define v2 vec2
#define my mouse.x*10.
#define mm mouse

vec2 mouse = vec2(0.5);

// time in s
uniform float time;

uniform vec2 resolution;

vec2 b1, b2, b3, b4 = vec2(0.5);

vec2 ball(f t, v2 b, v4 c, v2 ofs){
    f x = sin(t*c.x)*cos(b.y*t*c.y);
    f y = cos(t*c.z)*sin(t*c.w);
    return 0.5*vec2(x, y)+ofs;
}


void main(){

    vec2 uv = gl_FragCoord.xy/resolution.xy;
    uv *= 3.;
    f d = 2.;
    f r = 10.;

    b1 = ball(time, b1, v4(1.2,0.83,1.33,0.92), mm);
    b2 = ball(time, b2, v4(0.91,1.2,0.77,-1.66), mm);
    b3 = ball(time, b3, v4(1.5,-0.75,1.2,0.88), mm);
    b4 = ball(time, b4, v4(-1.15,0.72,0.9,1.44), mm);

    f c = r/distance(uv, d*b1);
    c += r/distance(uv, d*b2);
    c += r/distance(uv, d*b3);
    c += r/distance(uv, d*b4);
    c *= 0.02;

    gl_FragColor = vec4( vec3(c,0,c*0.5), 1.0 );
}


`;

export default shader;