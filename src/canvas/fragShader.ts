const fragShader =
    `#version 300 es


precision mediump float;
out vec4 outColor;
uniform vec4 inColor;
void main() {
  outColor = vec4(1,0,0,1);
}`;

export default fragShader;