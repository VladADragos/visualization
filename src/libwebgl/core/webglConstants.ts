
enum ClearingBuffers {
    DEPTH_BUFFER_BIT = 0x00000100,
    STENCIL_BUFFER_BIT = 0x00000400,
    COLOR_BUFFER_BIT = 0x00004000,
}

enum DataTypes {
    BYTE = 0x1400,
    UNSIGNED_BYTE = 0x1401,
    SHORT = 0x1402,
    UNSIGNED_SHORT = 0x1403,
    INT = 0x1404,
    UNSIGNED_INT = 0x1405,
    FLOAT = 0x1406
}
enum Shaders {
    FRAGMENT_SHADER = 0x8B30,
    VERTEX_SHADER = 0x8B31,
    COMPILE_STATUS = 0x8B81,
    DELETE_STATUS = 0x8B80,
    LINK_STATUS = 0x8B82,
    VALIDATE_STATUS = 0x8B83,
    ATTACHED_SHADERS = 0x8B85,
    ACTIVE_ATTRIBUTES = 0x8B89,
    ACTIVE_UNIFORMS = 0x8B86,
    MAX_VERTEX_ATTRIBS = 0x8869,
    MAX_VERTEX_UNIFORM_VECTORS = 0x8DFB,
    MAX_VARYING_VECTORS = 0x8DFC,
    MAX_COMBINED_TEXTURE_IMAGE_UNITS = 0x8B4D,
    MAX_VERTEX_TEXTURE_IMAGE_UNITS = 0x8B4C,
    MAX_TEXTURE_IMAGE_UNITS = 0x8872,
    MAX_FRAGMENT_UNIFORM_VECTORS = 0x8DFD,
    SHADER_TYPE = 0x8B4F,
    SHADING_LANGUAGE_VERSION = 0x8B8C,
    CURRENT_PROGRAM = 0x8B8D
}


export { ClearingBuffers, DataTypes, Shaders };