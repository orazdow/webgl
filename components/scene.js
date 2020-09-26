import React, { Component } from 'react';
import {Glview} from './glview.js';
import * as dat from 'dat.gui';
const gui = new dat.GUI();


/* import scenes / shaders here */
import ball_fs from "../shaders/ball.fs";


const frag_prog_proto = {
    fs: ball_fs,
    uniforms: null,
    cb: null,
}

let programs = [];
programs.push(frag_prog_proto);

function Scene(props) {
	return (
		<div>
		<h2>blep</h2>
		<Glview res={{ width: 600, height: 600}} programs={programs} />
		</div>
		);
}

export {Scene};
