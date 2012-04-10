#pragma strict

@script RequireComponent(MeshFilter)
@script RequireComponent(MeshRenderer)

function Awake() {
    Application.targetFrameRate = 60.0;
}

var waveParams = [6.0, 2.0, 0.12, 12.0, 10.0, 0.03];

function Update() {
    var mesh : Mesh = GetComponent(MeshFilter).mesh;
    var vertices = mesh.vertices;
    var uvs = mesh.uv;
    
    for (var i = 0; i < vertices.length; i++) {
        var u = uvs[i].x;
        var w1 = Mathf.Sin(Time.time * waveParams[0] - u * waveParams[1]) * waveParams[2];
        var w2 = Mathf.Sin(Time.time * waveParams[3] - u * waveParams[4]) * waveParams[5];
        vertices[i].y = (w1 + w2) * u;
    }
    
    mesh.vertices = vertices;
    mesh.RecalculateNormals();
}
