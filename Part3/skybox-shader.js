const vertCodeSkybox = `
// The position, colour and normal of the vertex.
attribute vec4 aPosition;
varying vec4 vPosition;
void main() {
   // Set the gl position as 1 in the z axis to place the skybox behind all objects.
   vPosition = aPosition;
   gl_Position = vec4(aPosition.xy, 1, 1);
}
`;

const fragCodeSkybox = `
precision mediump float;
uniform samplerCube uSkyboxTexture;
uniform mat4 uViewDirectionProjectionInverse;
varying vec4 vPosition;
void main() {
   // Get the texture coordinate to sample from by using the view direction projection inverse.
   vec4 t = uViewDirectionProjectionInverse * vPosition;
   gl_FragColor = textureCube(uSkyboxTexture, normalize(t.xyz / t.w));
}
`; 