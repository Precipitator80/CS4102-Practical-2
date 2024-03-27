const vertCodeSkybox = `
// The position, colour and normal of the vertex.
attribute vec4 aPosition;
varying vec4 vPosition;
void main() {
   vPosition = aPosition;
   gl_Position = vec4(aPosition.xy, 1, 1);
}
`;

const fragCodeSkybox = `
precision mediump float;
uniform samplerCube uSkybox;
uniform mat4 uViewDirectionProjectionInverse;
varying vec4 vPosition;
void main() {
   vec4 t = uViewDirectionProjectionInverse * vPosition;
   gl_FragColor = textureCube(uSkybox, normalize(t.xyz / t.w));
}
`; 