/**
 * Create a cube we can play with
 * 
 * @returns    object consisting of three matrices: vertices and indices
 */
function cube() {
    return cuboid(-0.5, 0.5, -0.5, 0.5, -0.5, 0.5);
}

function cuboid(left, right, bottom, top, back, front) {
    // Define and store geometry
    // We use 4 vertices per face below. We duplicate vertices so each
    // face has its own 4 vertices. This means 24 vertices below
    // (6 faces * 4 vertices)

    let vertices = [     // 24 vertices defining the cube - Front and back modified to match camera.
        [left, bottom, back, 1], // First face - Left face
        [left, top, back, 1],
        [left, top, front, 1],
        [left, bottom, front, 1],
        [right, bottom, front, 1], // Second face - Right face
        [right, top, front, 1],
        [right, top, back, 1],
        [right, bottom, back, 1],
        [left, bottom, back, 1], // Third face - Bottom face
        [left, bottom, front, 1],
        [right, bottom, front, 1],
        [right, bottom, back, 1],
        [left, top, front, 1], // Fourth face - Top face
        [left, top, back, 1],
        [right, top, back, 1],
        [right, top, front, 1],
        [left, bottom, -back, 1], // Fifth face - Back face
        [left, top, -back, 1],
        [right, top, -back, 1],
        [right, bottom, -back, 1],
        [right, bottom, -front, 1], // Sixth face - Front face
        [right, top, -front, 1],
        [left, top, -front, 1],
        [left, bottom, -front, 1],
    ];

    // We still have 12 triangles, because we still have 6 faces (2 triangles per face)
    // The difference from previous example is that indices go to 23 (because we have
    // 24 vertices in total and faces do not share vertices anymore)
    // Note -- it is tricky to get this right by hand!  

    let indices = [
        [0, 1, 2],
        [0, 2, 3],
        [4, 5, 6],
        [4, 6, 7],
        [8, 9, 10],
        [8, 10, 11],
        [12, 13, 14],
        [12, 14, 15],
        [16, 17, 18],
        [16, 18, 19],
        [20, 21, 22],
        [20, 22, 23],
    ];

    // One set of texture coordinates per face
    let [xRange, yRange] = [2 * Math.abs(right - left) + 2 * Math.abs(front - back), Math.abs(top - bottom) + 2 * Math.abs(front - back)];

    let x1 = 0;
    let x2 = x1 + Math.abs(front - back) / xRange;
    let x3 = x2 + Math.abs(right - left) / xRange;
    let x4 = x3 + Math.abs(front - back) / xRange;
    let x5 = 1;

    let y1 = 0;
    let y2 = Math.abs(front - back) / yRange;
    let y3 = y2 + Math.abs(top - bottom) / yRange;
    let y4 = 1;

    //console.log("Coords: " + x1 + "," + x2 + "," + x3 + "," + x4 + "," + x5);

    // Expected order to match vertices for texture wrap.
    // Bottom Left, Top Left, Top Right, Bottom Right
    // let texcoords = [
    //     [x1, y2], [x1, y3], [x2, y3], [x2, y2], // Left
    //     [x3, y2], [x3, y3], [x4, y3], [x4, y2], // Right
    //     [x2, y1], [x2, y2], [x3, y2], [x3, y1], // Bottom
    //     [x2, y3], [x2, y4], [x3, y4], [x3, y3], // Top
    //     [x4, y2], [x4, y3], [x5, y3], [x5, y2], // Back
    //     [x2, y2], [x2, y3], [x3, y3], [x3, y2], // Front
    // ];

    // Working coordinates for full texture on each face.
    // Bottom Right, Top Right, Top Left, Bottom Left
    // let texcoords = [
    //    [1, 0], [1, 1], [0, 1], [0, 0], // Left
    //    [1, 0], [1, 1], [0, 1], [0, 0], // Right
    //    [1, 0], [1, 1], [0, 1], [0, 0], // Bottom
    //    [1, 0], [1, 1], [0, 1], [0, 0], // Top
    //    [1, 0], [1, 1], [0, 1], [0, 0], // Back
    //    [1, 0], [1, 1], [0, 1], [0, 0], // Front
    // ];

    // Working coordinates to match vertices for texture wrap.
    // Reverse order of vertices plus flips for top and bottom.
    // let texcoords = [
    //     [x2, y2], [x2, y3], [x1, y3], [x1, y2], // Left
    //     [x4, y2], [x4, y3], [x3, y3], [x3, y2], // Right
    //     [x2, y2], [x2, y1], [x3, y1], [x3, y2], // Bottom
    //     [x2, y4], [x2, y3], [x3, y3], [x3, y4], // Top
    //     [x5, y2], [x5, y3], [x4, y3], [x4, y2], // Back
    //     [x3, y2], [x3, y3], [x2, y3], [x2, y2], // Front
    // ];

    let texcoords = [
        [x1, y2], [x1, y3], [x2, y3], [x2, y2], // Left
        [x3, y2], [x3, y3], [x4, y3], [x4, y2], // Right
        [x2, y1], [x2, y2], [x3, y2], [x3, y1], // Bottom
        [x2, y3], [x2, y4], [x3, y4], [x3, y3], // Top
        [x2, y2], [x2, y3], [x3, y3], [x3, y2], // Front
        [x4, y2], [x4, y3], [x5, y3], [x5, y2], // Back
    ];

    let normals = [     // 24 vertices defining the cube
        [-1, 0, 0, 0], // First face - Left face
        [-1, 0, 0, 0],
        [-1, 0, 0, 0],
        [-1, 0, 0, 0],
        [1, 0, 0, 0], // Second face - Right face
        [1, 0, 0, 0],
        [1, 0, 0, 0],
        [1, 0, 0, 0],
        [0, -1, 0, 0], // Third face - Bottom face
        [0, -1, 0, 0],
        [0, -1, 0, 0],
        [0, -1, 0, 0],
        [0, 1, 0, 0], // Fourth face - Top face
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 0, 1, 0], // Fifth face - Back face
        [0, 0, 1, 0],
        [0, 0, 1, 0],
        [0, 0, 1, 0],
        [0, 0, -1, 0], // Sixth face - Front face
        [0, 0, -1, 0],
        [0, 0, -1, 0],
        [0, 0, -1, 0],
    ];

    return {
        vertices: vertices,
        indices: indices,
        normals: normals,
        texcoords: texcoords
    };
}


function line(op1, op2, height, depth) {
    let direction = vec3.create();
    vec3.subtract(direction, op2, op1);
    let distance = vec3.distance(op1, op2);
    console.log(direction);
    console.log(distance);

    //let right = vec3.fromValues(1, 0, 0);
    let up = vec3.fromValues(0, 1, 0);
    let forward = vec3.fromValues(0, 0, 1);

    let crossDepth = vec3.create();
    vec3.cross(crossDepth, direction, up);
    vec3.normalize(crossDepth, crossDepth);
    vec3.scale(crossDepth, crossDepth, depth);
    console.log(crossDepth);
    let crossDepthNegative = vec3.create();
    vec3.scale(crossDepthNegative, crossDepth, -1);

    let crossHeight = vec3.create();
    vec3.cross(crossHeight, direction, forward);
    vec3.normalize(crossHeight, crossHeight);
    vec3.scale(crossHeight, crossHeight, height);
    console.log(crossHeight);
    let crossHeightNegative = vec3.create();
    vec3.scale(crossHeightNegative, crossHeight, -1);

    let crossWidth = vec3.create();
    vec3.cross(crossWidth, crossHeight, crossDepth);
    vec3.normalize(crossWidth, crossWidth);

    // Define and store geometry
    // We use 4 vertices per face below. We duplicate vertices so each
    // face has its own 4 vertices. This means 24 vertices below
    // (6 faces * 4 vertices)

    let [leftCol, rightCol, bottomCol, topCol, backCol, frontCol] = [
        [1, 0, 0, 1],    // First face - Left face - red
        [1, 1, 0, 1],    // Second face - Right face - yellow 
        [0, 0, 1, 1],    // Third face - Bottom face - blue 
        [0, 1, 1, 1],    // Fourth face - Top face - cyan
        [1, 0, 1, 1],    // Fifth face - Back face - purple
        [1, 1, 1, 1],    // Sixth face - Front face - white            
    ];

    let p1 = vec3.create();
    vec3.add(p1, op1, crossDepthNegative);
    vec3.add(p1, p1, crossHeight);
    let p1Array = [p1[0], p1[1], p1[2], 1];

    let p2 = vec3.create();
    vec3.add(p2, op1, crossDepthNegative);
    vec3.add(p2, p2, crossHeightNegative);
    let p2Array = [p2[0], p2[1], p2[2], 1];

    let p3 = vec3.create();
    vec3.add(p3, op1, crossDepth);
    vec3.add(p3, p3, crossHeightNegative);
    let p3Array = [p3[0], p3[1], p3[2], 1];

    let p4 = vec3.create();
    vec3.add(p4, op1, crossDepth);
    vec3.add(p4, p4, crossHeight);
    let p4Array = [p4[0], p4[1], p4[2], 1];

    let p5 = vec3.create();
    vec3.add(p5, op2, crossDepth);
    vec3.add(p5, p5, crossHeight);
    let p5Array = [p5[0], p5[1], p5[2], 1];

    let p6 = vec3.create();
    vec3.add(p6, op2, crossDepth);
    vec3.add(p6, p6, crossHeightNegative);
    let p6Array = [p6[0], p6[1], p6[2], 1];

    let p7 = vec3.create();
    vec3.add(p7, op2, crossDepthNegative);
    vec3.add(p7, p7, crossHeightNegative);
    let p7Array = [p7[0], p7[1], p7[2], 1];

    let p8 = vec3.create();
    vec3.add(p8, op2, crossDepthNegative);
    vec3.add(p8, p8, crossHeight);
    let p8Array = [p8[0], p8[1], p8[2], 1];


    let vertices = [     // 24 vertices defining the cube - Front and back modified to match camera.
        p1Array, // P1 // First face - Left face
        p2Array, // P2
        p3Array, // P3
        p4Array, // P4
        p5Array, // P5 // Second face - Right face
        p6Array, // P6
        p7Array, // P7
        p8Array, // P8
        p1Array, // P1 // Third face - Bottom face
        p4Array, // P4
        p5Array, // P5
        p8Array, // P8
        p3Array, // P3 // Fourth face - Top face
        p2Array, // P2
        p7Array, // P7
        p6Array, // P6
        p4Array, // P4 // Fifth face - Back face
        p3Array, // P3
        p6Array, // P6
        p5Array, // P5
        p8Array, // P8 // Sixth face - Front face
        p7Array, // P7
        p2Array, // P2
        p1Array, // P1
    ];

    // We still have 12 triangles, because we still have 6 faces (2 triangles per face)
    // The difference from previous example is that indices go to 23 (because we have
    // 24 vertices in total and faces do not share vertices anymore)
    // Note -- it is tricky to get this right by hand!  

    let indices = [
        [0, 1, 2],
        [0, 2, 3],
        [4, 5, 6],
        [4, 6, 7],
        [8, 9, 10],
        [8, 10, 11],
        [12, 13, 14],
        [12, 14, 15],
        [16, 17, 18],
        [16, 18, 19],
        [20, 21, 22],
        [20, 22, 23],
    ];

    // One set of texture coordinates per face
    let [xRange, yRange] = [2 * Math.abs(distance) + 2 * Math.abs(depth), Math.abs(height) + 2 * Math.abs(depth)];

    let x1 = 0;
    let x2 = x1 + Math.abs(depth) / xRange;
    let x3 = x2 + Math.abs(distance) / xRange;
    let x4 = x3 + Math.abs(depth) / xRange;
    let x5 = 1;

    let y1 = 0;
    let y2 = Math.abs(depth) / yRange;
    let y3 = y2 + Math.abs(height) / yRange;
    let y4 = 1;

    //console.log("Coords: " + x1 + "," + x2 + "," + x3 + "," + x4 + "," + x5);

    // Expected order to match vertices for texture wrap.
    // Bottom Left, Top Left, Top Right, Bottom Right
    // let texcoords = [
    //    [x1, y2], [x1, y3], [x2, y3], [x2, y2], // Left
    //    [x3, y2], [x3, y3], [x4, y3], [x4, y2], // Right
    //    [x2, y1], [x2, y2], [x3, y2], [x3, y1], // Bottom
    //    [x2, y3], [x2, y4], [x3, y4], [x3, y3], // Top
    //    [x4, y2], [x4, y3], [x5, y3], [x5, y2], // Back
    //    [x2, y2], [x2, y3], [x3, y3], [x3, y2], // Front
    // ];

    // Working coordinates for full texture on each face.
    // Bottom Right, Top Right, Top Left, Bottom Left
    // let texcoords = [
    //    [1, 0], [1, 1], [0, 1], [0, 0], // Left
    //    [1, 0], [1, 1], [0, 1], [0, 0], // Right
    //    [1, 0], [1, 1], [0, 1], [0, 0], // Bottom
    //    [1, 0], [1, 1], [0, 1], [0, 0], // Top
    //    [1, 0], [1, 1], [0, 1], [0, 0], // Back
    //    [1, 0], [1, 1], [0, 1], [0, 0], // Front
    // ];

    // Working coordinates to match vertices for texture wrap.
    // Reverse order of vertices plus flips for top and bottom.
    let texcoords = [
        [x2, y2], [x2, y3], [x1, y3], [x1, y2], // Left
        [x4, y2], [x4, y3], [x3, y3], [x3, y2], // Right
        [x2, y2], [x2, y1], [x3, y1], [x3, y2], // Bottom
        [x2, y4], [x2, y3], [x3, y3], [x3, y4], // Top
        [x5, y2], [x5, y3], [x4, y3], [x4, y2], // Back
        [x3, y2], [x3, y3], [x2, y3], [x2, y2], // Front
    ];

    let normalDepth = vec3.create();
    vec3.normalize(normalDepth, crossDepth);
    let normalHeight = vec3.create();
    vec3.normalize(normalHeight, crossHeight);
    let normalWidth = crossWidth;

    //console.log("Normal Width: " + normalWidth);
    //console.log("Normal Height: " + normalHeight);
    //console.log("Normal Depth: " + normalDepth);

    let bottomNormal = [normalHeight[0], normalHeight[1], normalHeight[2], 0];
    let topNormal = [-normalHeight[0], -normalHeight[1], -normalHeight[2], 0];

    let backNormal = [normalDepth[0], normalDepth[1], normalDepth[2], 0];
    let frontNormal = [-normalDepth[0], -normalDepth[1], -normalDepth[2], 0];

    let rightNormal = [-normalWidth[0], -normalWidth[1], -normalWidth[2], 0];
    let leftNormal = [normalWidth[0], normalWidth[1], normalWidth[2], 0];

    let normals = [     // 24 vertices defining the cube
        leftNormal, // First face - Left face
        leftNormal,
        leftNormal,
        leftNormal,
        rightNormal, // Second face - Right face
        rightNormal,
        rightNormal,
        rightNormal,
        bottomNormal, // Third face - Bottom face
        bottomNormal,
        bottomNormal,
        bottomNormal,
        topNormal, // Fourth face - Top face
        topNormal,
        topNormal,
        topNormal,
        backNormal, // Fifth face - Back face
        backNormal,
        backNormal,
        backNormal,
        frontNormal, // Sixth face - Front face
        frontNormal,
        frontNormal,
        frontNormal,
    ];

    return {
        vertices: vertices,
        indices: indices,
        normals: normals,
        texcoords: texcoords
    };
}

function combineShapes(shapes) {
    let combinedVertices = [];
    let combinedIndices = [];
    let combinedNormals = [];
    let combinedTexcoords = [];

    let offset = 0;

    for (let shape of shapes) {
        combinedVertices.push(...shape.vertices);
        combinedNormals.push(...shape.normals);
        combinedTexcoords.push(...shape.texcoords);

        // Update indices with the current offset
        let shapeIndices = shape.indices.map(index => index.map(idx => idx + offset));
        combinedIndices.push(...shapeIndices);

        // Increment the offset
        offset += shape.vertices.length;
    }

    return {
        vertices: combinedVertices,
        indices: combinedIndices,
        normals: combinedNormals,
        texcoords: combinedTexcoords
    };
}

function bench() {
    let [xExtent, yExtent, zExtent] = [0.5, 0.125, 0.25];
    let top = cuboid(-xExtent, xExtent, -yExtent, yExtent, -zExtent, zExtent);
    let leftLeg = cuboid(-xExtent + xExtent / 6, -xExtent + xExtent / 2, -3 * yExtent, -yExtent, -0.8 * zExtent, 0.8 * zExtent);
    let rightLeg = cuboid(xExtent - xExtent / 2, xExtent - xExtent / 6, -3 * yExtent, -yExtent, -0.8 * zExtent, 0.8 * zExtent);

    return combineShapes([top, leftLeg, rightLeg]);
}

function flower() {
    let [xExtent, yExtent, zExtent] = [0.25, 0.5, 0.25];
    let stem = cuboid(-xExtent / 2, xExtent / 2, -yExtent, 3 * yExtent, -zExtent, zExtent);
    let leftLeaf = line(vec3.fromValues(0, -0.5, 0), vec3.fromValues(xExtent * 4, 1, 0), xExtent / 2, 0.99 * zExtent);
    let rightLeaf = line(vec3.fromValues(0, -0.5, 0), vec3.fromValues(-xExtent * 4, 1, 0), xExtent / 2, 0.99 * zExtent);
    let petalBase = cuboid(-2 * xExtent, 2 * xExtent, 2 * yExtent, 4 * yExtent, -1.01 * zExtent, 1.01 * zExtent);
    let petalExtra = line(vec3.fromValues(-1.7 * xExtent, 2.3 * yExtent, 0), vec3.fromValues(1.7 * xExtent, 3.7 * yExtent, 0), 2 * xExtent, 0.99 * zExtent);

    return combineShapes([stem, leftLeaf, rightLeaf, petalBase, petalExtra]);
}

function lamppost() {
    let [xExtent, yExtent, zExtent] = [0.25, 2, 0.25];
    let base = cuboid(-3 * xExtent, 3 * xExtent, -1.01 * yExtent, -0.75 * yExtent, -3 * zExtent, 3 * zExtent);
    let post = cuboid(-xExtent, xExtent, -yExtent, 2.5 * yExtent, -zExtent, zExtent);
    let lamp = cuboid(-0.999 * xExtent, 6 * xExtent, 2.25 * yExtent, 2.499 * yExtent, -0.999 * zExtent, 0.999 * zExtent);
    return combineShapes([base, post, lamp]);
}

function plane(left, right, y, back, front, M, V_Mirrored, P) {
    let vertices = [
        [left, y, front, 1],
        [left, y, back, 1],
        [right, y, back, 1],
        [right, y, front, 1],
    ];

    let indices = [
        [0, 1, 2],
        [0, 2, 3],
    ];

    let v1 = vec4.fromValues(left, y, front, 1);
    let v2 = vec4.fromValues(left, y, back, 1);
    let v3 = vec4.fromValues(right, y, back, 1);
    let v4 = vec4.fromValues(right, y, front, 1);

    console.log("Original vertices:\n" + v1 + "\n" + v2 + "\n" + v3 + "\n" + v4);

    vec4.transformMat4(v1, v1, M);
    vec4.transformMat4(v2, v2, M);
    vec4.transformMat4(v3, v3, M);
    vec4.transformMat4(v4, v4, M);

    console.log("M: " + M);
    console.log("Transformed vertices (After Model):\n" + v1 + "\n" + v2 + "\n" + v3 + "\n" + v4);

    vec4.transformMat4(v1, v1, V_Mirrored);
    vec4.transformMat4(v2, v2, V_Mirrored);
    vec4.transformMat4(v3, v3, V_Mirrored);
    vec4.transformMat4(v4, v4, V_Mirrored);

    console.log("V_Mirrored: " + V_Mirrored);
    console.log("Transformed vertices (After View):\n" + v1 + "\n" + v2 + "\n" + v3 + "\n" + v4);

    // Apply perspective.
    vec4.transformMat4(v1, v1, P);
    vec4.transformMat4(v2, v2, P);
    vec4.transformMat4(v3, v3, P);
    vec4.transformMat4(v4, v4, P);

    // Normalise perspective.
    vec4.divide(v1, v1, [v1[3], v1[3], v1[3], v1[3]]);
    vec4.divide(v2, v2, [v2[3], v2[3], v2[3], v2[3]]);
    vec4.divide(v3, v3, [v3[3], v3[3], v3[3], v3[3]]);
    vec4.divide(v4, v4, [v4[3], v4[3], v4[3], v4[3]]);

    console.log("P: " + P);
    console.log("Transformed vertices (After Perspective):\n" + v1 + "\n" + v2 + "\n" + v3 + "\n" + v4);

    // Map to texture coordinates.
    vec4.add(v1, v1, [1, 1, 0, 0]);
    vec4.add(v2, v2, [1, 1, 0, 0]);
    vec4.add(v3, v3, [1, 1, 0, 0]);
    vec4.add(v4, v4, [1, 1, 0, 0]);

    vec4.divide(v1, v1, [2, 2, 1, 1]);
    vec4.divide(v2, v2, [2, 2, 1, 1]);
    vec4.divide(v3, v3, [2, 2, 1, 1]);
    vec4.divide(v4, v4, [2, 2, 1, 1]);

    console.log("Transformed vertices (After TC):\n" + v1 + "\n" + v2 + "\n" + v3 + "\n" + v4);

    let tc1 = [v1[0], v1[1]];
    let tc2 = [v2[0], v2[1]];
    let tc3 = [v3[0], v3[1]];
    let tc4 = [v4[0], v4[1]];

    console.log("Point 1: " + tc1);
    console.log("Point 2: " + tc2);
    console.log("Point 3: " + tc3);
    console.log("Point 4: " + tc4);

    let minX = tc3[0] + 0.115;//0.3;
    let maxX = tc2[0] - 0.115;
    let minY = tc4[1] + 0.105;
    let maxY = tc3[1] + 0.065;

    let tc5 = [minX, maxY];
    let tc6 = [minX, minY];
    let tc7 = [maxX, minY];
    let tc8 = [maxX, maxY];

    let tc9 = [maxX, tc2[0]];
    let tc10 = [maxX, tc3[0]];
    let tc11 = [minX, tc3[0]];
    let tc12 = [minX, tc2[0]];

    let tc13 = [0, 0];
    let tc14 = [0, 1];
    let tc15 = [1, 1];
    let tc16 = [1, 0];

    let tc17 = [(tc1[0] + tc2[0]) / 2, tc2[0]];
    let tc18 = [(tc1[0] + tc2[0]) / 2, tc3[0]];
    let tc19 = [(tc3[0] + tc4[0]) / 2, tc3[0]];
    let tc20 = [(tc3[0] + tc4[0]) / 2, tc2[0]];

    let texcoords = [
        // tc1, tc2, tc3, tc4,
        // tc5, tc6, tc7, tc8,
        tc9, tc10, tc11, tc12,
        // tc13, tc14, tc15, tc16,
        // tc17, tc18, tc19, tc20,
    ];

    // console.log("Point 1 Alt: " + tc5);
    // console.log("Point 2 Alt: " + tc6);
    // console.log("Point 3 Alt: " + tc7);
    // console.log("Point 4 Alt: " + tc8);


    console.log("Point 1 Alt2: " + tc9);
    console.log("Point 2 Alt2: " + tc10);
    console.log("Point 3 Alt2: " + tc11);
    console.log("Point 4 Alt2: " + tc12);

    // console.log("Point 1 Alt3: " + tc17);
    // console.log("Point 2 Alt3: " + tc18);
    // console.log("Point 3 Alt3: " + tc19);
    // console.log("Point 4 Alt3: " + tc20);

    // let normals = [
    //     [0, 1, 0, 0],
    //     [0, 1, 0, 0],
    //     [0, 1, 0, 0],
    //     [0, 1, 0, 0],
    // ];

    return {
        vertices: vertices,
        indices: indices,
        // normals: normals,
        texcoords: texcoords
    };
}