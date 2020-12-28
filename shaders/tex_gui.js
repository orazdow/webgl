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
uniform float offs;
uniform float yoffs;

out vec4 fragColor;

// const float pngscale = 1.;
// const vec2 estimate = vec2(1024.);
#define rot(a) mat2(cos(a), -sin(a), sin(a), cos(a))

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

		vec2 anim = animv(u_time*0.3, vec2(0.4,0.9));
		vec2 anim2 = animv2(offs, vec2(4.,3.));

		float s = mix(scale, fract(u_time*0.04)*2.,avalz);

		vec2 texcoord = (v_texcoord);
		texcoord -= anim*aval;
		texcoord += anim2;
		texcoord -= vec2(0.5, 0.5-yoffs);
		texcoord *= rot(u_time*theta);
		texcoord += 0.5*s;
		texcoord = clamp(texcoord/s, 0.0, 1.0);
		fragColor = mix(texture(u_sampler, vec3(texcoord, idx)), mixvec(u_sampler, texcoord, mixidx), sqr(u_time*0.6, 3.));
		fragColor.w *= alpha;
	}

`;


export default fs;