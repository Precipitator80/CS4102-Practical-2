// GLSL shader code
// Note that uPerspectiveMatrix, uModelMatrix and uViewMatrix now multiply aPosition
const vertCode = `
                  attribute vec4 aPosition;
                  attribute vec4 aColor;
                  attribute vec4 aNormal;
                  attribute vec2 aTexCoord;
      
                  uniform mat4 uModelMatrix;
                  uniform mat4 uViewMatrix;
                  uniform mat4 uPerspectiveMatrix;
                  uniform mat4 uNormalMatrix;
      
                  varying vec4 vColor;
                  varying vec3 vLighting;
                  varying vec2 vTexCoord;
                  void main() {
                     gl_Position = uPerspectiveMatrix * uViewMatrix * uModelMatrix * aPosition;

                     highp vec3 ambientLight = vec3(0.3,0.3,0.3);
                     highp vec3 directionalColor = vec3(0.275,0.420,0.471);
                     highp vec3 directionalVector = normalize(vec3(0.85, 0.8, 0.75));
                     highp vec4 transformedNormal = normalize(uNormalMatrix * aNormal);
      
                     highp float directional = max(dot(transformedNormal.xyz, directionalVector), 0.0);
                     
                     vLighting = ambientLight + (directionalColor * directional);
                     vColor = aColor;
                     vTexCoord = aTexCoord;
                  }
                  `;

const fragCode = `
                  precision mediump float;
                  varying vec4 vColor;
                  varying vec3 vLighting;
                  varying vec2 vTexCoord;
                  uniform sampler2D uTexture;
                  void main() {
                     lowp vec4 t = texture2D(uTexture, vTexCoord);
                      gl_FragColor = vec4(t.rgb * vLighting, 255);
                  }
                  `; 