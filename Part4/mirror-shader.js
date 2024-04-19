// GLSL shader code
const vertCodeMirror = `
attribute vec4 aPosition;

uniform mat4 uModelMatrix;
uniform mat4 uViewMatrix;
uniform mat4 uPerspectiveMatrix;

void main() {
    gl_Position = uPerspectiveMatrix * uViewMatrix * uModelMatrix * aPosition;
}
`;

const fragCodeMirror = `
precision mediump float;
uniform sampler2D uTexture;
uniform vec2 uResolution;

void main() {
    gl_FragColor = texture2D(uTexture, gl_FragCoord.xy/uResolution);
}
`;