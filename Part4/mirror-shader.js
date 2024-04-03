// GLSL shader code
const vertCodeMirror = `
attribute vec4 aPosition;
attribute vec2 aTexCoord;

uniform mat4 uModelMatrix;
uniform mat4 uViewMatrix;
uniform mat4 uPerspectiveMatrix;

varying vec2 vTexCoord;

void main() {
    gl_Position = uPerspectiveMatrix * uViewMatrix * uModelMatrix * aPosition;
    vTexCoord = aTexCoord;
}
`;

const fragCodeMirror = `
precision mediump float;
varying vec2 vTexCoord;
uniform sampler2D uTexture;

void main() {
    gl_FragColor = texture2D(uTexture, vTexCoord);
}
`;