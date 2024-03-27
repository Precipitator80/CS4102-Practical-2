// GLSL shader code
const vertCode = `
attribute vec4 aPosition;
attribute vec2 aTexCoord;

uniform mat4 uModelMatrix;
uniform mat4 uPerspectiveMatrix;

varying vec2 vTexCoord;
void main() {
   gl_Position = uPerspectiveMatrix * uModelMatrix * aPosition;
   vTexCoord = aTexCoord;
}
`;

const fragCode = `
precision mediump float;
varying vec2 vTexCoord;
uniform sampler2D uTexture;
void main() {
    gl_FragColor = texture2D(uTexture, vTexCoord);
}
`; 