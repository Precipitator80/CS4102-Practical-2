
function initEnvironmentMap(shaderprogram) {
    // ENVIRONMENT MAP
    // Define each face of the cube map
    const faces = [
        'textures/lightcloud_rt.jpg',
        'textures/lightcloud_lf.jpg',
        'textures/lightcloud_up.jpg',
        'textures/lightcloud_dn.jpg',
        'textures/lightcloud_ft.jpg',
        'textures/lightcloud_bk.jpg'
    ];

    // Create and store data into environment texture buffer
    let environmentTexture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_CUBE_MAP, environmentTexture);
    faces.forEach((src, index) => {
        const image = new Image();
        image.addEventListener("load", function () {
            gl.bindTexture(gl.TEXTURE_CUBE_MAP, environmentTexture);
            gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_X + index, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
            if (index === 5) { // If it's the last face, generate mipmaps
                gl.generateMipmap(gl.TEXTURE_CUBE_MAP);
            }
        });
        image.src = src;
    });

    // Bind the cube map texture to texture unit 1
    const uReflectionsTextureLocation = gl.getUniformLocation(shaderprogram, "uReflectionsTexture");
    gl.activeTexture(gl.TEXTURE1);
    gl.uniform1i(uReflectionsTextureLocation, 1); // Set the texture unit for uReflectionsTexture
}