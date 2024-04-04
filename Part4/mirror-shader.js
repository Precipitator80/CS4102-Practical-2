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

// // GLSL shader code
// const vertCodeMirror = `
// attribute vec4 aPosition;
// attribute vec4 aNormal;
// attribute vec2 aTexCoord;

// uniform mat4 uModelMatrix;
// uniform mat4 uViewMatrix;
// uniform mat4 uPerspectiveMatrix;

// // Vectors to pass along to the fragment shader.
// varying vec2 vTexCoord;
// varying vec3 vModelPosition;
// varying vec3 vModelNormal;

// void main() {
//     gl_Position = uPerspectiveMatrix * uViewMatrix * uModelMatrix * aPosition;
//     vTexCoord = aTexCoord;

//    // Send the view position to the fragment shader.
//    vModelPosition = (uModelMatrix * aPosition).xyz;

//    // Orient the normals and pass them to the fragment shader.
//    vModelNormal = mat3(uModelMatrix) * vec3(aNormal);
// }
// `;

// const fragCodeMirror = `
// precision mediump float;
// varying vec2 vTexCoord;
// uniform sampler2D uTexture;

// // Passed in from the vertex shader.
// varying vec3 vModelPosition;
// varying vec3 vModelNormal;

// // The position of the camera.
// uniform vec3 uModelCameraPosition;

// void main() {
//     // Calculate the direction to the surface from the camera (eye).
//     vec3 eyeToSurfaceDir = normalize(vModelPosition - uModelCameraPosition);

//     // Calculate the reflection vector using the model normal.
//     vec3 modelNormal = normalize(vModelNormal);
//     vec3 reflectionDir = reflect(eyeToSurfaceDir, modelNormal);

//     // Transform reflection vector to texture space
//     vec2 textureCoord = vec2(reflectionDir.x, reflectionDir.z);

//     // Sample texture
//     vec4 reflectedColor = texture2D(uTexture, textureCoord);

//     gl_FragColor = reflectedColor;
// }
// `;