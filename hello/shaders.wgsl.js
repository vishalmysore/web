export default /* wgsl */ `

@vertex fn vs (@builtin(vertex_index) i : u32) -> @builtin(position) vec4f {
    return vec4(0);
}

@fragment fn fs() -> @location(0) vec4<f32> {
    return vec4(0);
}
@vertex fn vs (
    @builtin(i) vertexIndex : u32
) -> @builtin(position) vec4f {
    let pos = array(
        vec2f(0.0, 0.5),   // Top center vertex
        vec2f(-0.5, -0.5), // Bottom left vertex
        vec2f(0.5, -0.5),  // Bottom right vertex 
    );

    return vec4(pos[i], 0.0, 1.0);
}

@fragment fn fs() -> @location(0) vec4f {
    return vec4f(1.0, 0.98, 0.0, 1.0);
}
`