const fs = /*glsl*/`#version 300 es

precision mediump float;

in vec2 v_texcoord;

uniform mediump sampler2DArray u_sampler;
uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;

uniform float scale;
uniform float theta;
uniform float aval;
uniform float avalz;
uniform float idx;
uniform float mixidx;
uniform float alpha;
// uniform float offs;
uniform float yoffs;
uniform float offsx;
uniform float offsy;
uniform float wob;

out vec4 fragColor;

// const float pngscale = 1.;
// const vec2 estimate = vec2(1024.);
#define rot(a) mat2(cos(a), -sin(a), sin(a), cos(a))

vec2 bnc(float t, vec2 v){
	float a = sin(v.x*t)*.5+.5;
	float b =sin(v.y*t)*.5+.5;
	return vec2(a, b);
}

float wobble(vec2 uv, float t, float mm){
    float d = cos(5.*t+length(uv-(bnc(t,vec2(1.1,1.64))))*mm);
    d *= cos(5.*t+length(uv-(bnc(t,vec2(1.92,.74))))*mm);
    d *= cos(2.*t+length(uv-(bnc(t,vec2(.88,1.87))))*mm);
    return d;
}

float zbnc(float t, float p, float a /*0. - 2.*/){
	float f = abs(fract(t)- 0.0)*4.-1.;
	f *= abs(fract(0.+t*p)- a)*.2;
	return f*.4;
}

float tri(float t){
	return (abs(fract(t)-0.5)*2.0);
}

vec2 animv(float t, vec2 v){
	float a = tri(t*v.x)-0.5;
	float b = tri(t*v.y)-0.5;
	return vec2(a, b);
}

vec2 animv2(float t, vec2 v){
	float a = v.x*sin(v.x*t)*0.1;
	float b = v.y*sin(v.y*t)*0.13;
	return vec2(a, b);
}

float sqr(float t, float a){
	return (clamp(sin(t)*a,-1.,1.)+1.)*0.5;
}

vec4 mixvec(sampler2DArray samp, vec2 coord, float idx){
	float a = idx < 0. ? 0. : 1.;
	float i = max(0., idx);
	return texture(samp, vec3(coord, i))*a;
}

	void main(){
		// vec2 dimensions = u_resolution / (estimate*pngscale);
		// vec2 mouse = (u_mouse/u_resolution);	

		//vec2 anim2 = animv2(offs, vec2(4.,3.));

		float s = mix(scale, fract(u_time*0.04)*2.,avalz);
		// s += zbnc(u_time*.5, 3.5, 1.5); //pop

		vec2 texcoord = (v_texcoord);
		texcoord -= animv(u_time*0.3, vec2(0.4,0.9))*aval;
		// texcoord += animv2(offs, vec2(4.,3.));
		texcoord -= vec2(offsx*.7,offsy*-.9);
		// texcoord *= mix(vec2(1.), (bnc(u_time, vec2(.77,1.3))+.36)*1.2, 0.5); //warp
		texcoord -= vec2(0.5, 0.5-yoffs);
		texcoord *= rot(u_time*theta);
		texcoord += 0.5*s;
		texcoord += wobble(v_texcoord, u_time*.4, 22.)*.035*wob;
		texcoord = clamp(texcoord/s, 0.0, 1.0);
		fragColor = mix(texture(u_sampler, vec3(texcoord, idx)), mixvec(u_sampler, texcoord, mixidx), sqr(u_time*0.6, 3.));
		fragColor.w *= alpha;
	}

`;


export default fs;