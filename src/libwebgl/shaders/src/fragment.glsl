#version 300 es
precision mediump float;
out vec4 outColor;
uniform vec4 inColor;
void main() {
  outColor = inColor;
}