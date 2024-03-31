// GLSL shader code
// Note that uPerspectiveMatrix, uModelMatrix and uViewMatrix now multiply aPosition
// An attempt was made using these resources:
// WebGL SkyBox - WebGL Fundamentals - https://webglfundamentals.org/webgl/lessons/webgl-skybox.html - Accessed 25.03.2024
// Environment Mapping - Cem Yuksel - https://youtu.be/PeAvKApuAuA - Accessed 26.03.2024
// Reflections - Cem Yuksel - https://youtu.be/h2RTBs1xl6w - Accessed 26.03.2024
const vertCode = `
// The position, colour and normal of the vertex.
attribute vec4 aPosition;
attribute vec4 aColor;
attribute vec4 aNormal;
attribute vec2 aTexCoord;

// The model, view, perspective and normal matrices to apply transformations.
uniform mat4 uModelMatrix;
uniform mat4 uViewMatrix;
uniform mat4 uPerspectiveMatrix;
uniform mat4 uNormalMatrix;

// The colour, lighting and texture coordinate of the vertex.
varying vec4 vColor;
varying vec3 vLighting;
varying vec2 vTexCoord;

// Vectors to pass along to the fragment shader.
varying vec3 vModelPosition;
varying vec3 vModelNormal;
void main() {
   gl_Position = uPerspectiveMatrix * uViewMatrix * uModelMatrix * aPosition;

   highp vec3 ambientLight = vec3(0.7,0.7,0.7);
   highp vec3 directionalColor = vec3(0.655,0.745,0.910);
   highp vec3 directionalVector = normalize(vec3(0.85, 0.8, 0.75));
   highp vec4 transformedNormal = normalize(uNormalMatrix * aNormal);

   highp float directional = max(dot(transformedNormal.xyz, directionalVector), 0.0);
   
   vLighting = ambientLight + (directionalColor * directional);
   vColor = aColor;
   vTexCoord = aTexCoord;

   // Send the view position to the fragment shader.
   vModelPosition = (uModelMatrix * aPosition).xyz;

   // Orient the normals and pass them to the fragment shader.
   vModelNormal = mat3(uModelMatrix) * vec3(aNormal);
}
`;

const fragCode = `
precision mediump float;
varying vec4 vColor;
varying vec3 vLighting;
varying vec2 vTexCoord;

// Passed in from the vertex shader.
varying vec3 vModelPosition;
varying vec3 vModelNormal;

// The textures.
uniform sampler2D uTexture; // Base texture.
uniform samplerCube uSkyboxTexture; // Reflections texture.

// The position of the camera.
uniform vec3 uModelCameraPosition;

void main() {
   // Calculate the direction to the surface from the camera (eye).
   vec3 eyeToSurfaceDir = normalize(vModelPosition - uModelCameraPosition);

   // Calculate the reflection vector using the model normal.
   vec3 modelNormal = normalize(vModelNormal);
   vec3 reflectionDir = reflect(eyeToSurfaceDir, modelNormal);
   
   // Sample and combine the base texture with the reflections texture.
   lowp vec4 reflectionsColor = textureCube(uSkyboxTexture, reflectionDir);
   lowp vec4 baseColor = texture2D(uTexture, vTexCoord);
   vec4 finalColor = mix(baseColor, reflectionsColor, 0.5); // Last argument is the blend factor.

   // Use the blended colour value to set the fragment colour.
   gl_FragColor = vec4(finalColor.rgb * vLighting, finalColor.a);
}
`;