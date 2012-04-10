#pragma strict

@script RequireComponent(MeshFilter)
@script RequireComponent(MeshRenderer)

var xResolution : int = 10;
var yResolution : int = 10;

function Awake() {
    var vertices = new Vector3 [xResolution * yResolution];
    var uvs = new Vector2 [xResolution * yResolution];
    var triangles = new int [2 * 3 * (xResolution - 1) * (yResolution - 1)];

    var i = 0;
    for (var y = 0; y < yResolution; y++) {
        for (var x = 0; x < xResolution; x++) {
            var wx = 1.0 / (xResolution - 1) * x;
            var wz = 1.0 / (yResolution - 1) * y;
            vertices[i] = Vector3(wx, 0.0, wz);
            uvs[i] = Vector2(wx, wz);
            i++;
        }
    }

    i = 0;
    for (y = 0; y < yResolution - 1; y++) {
        for (x = 0; x < xResolution - 1; x++) {
            var first = x + y * xResolution;
            triangles[i++] = first;
            triangles[i++] = first + xResolution;
            triangles[i++] = first + 1;

            triangles[i++] = first + 1;
            triangles[i++] = first + xResolution;
            triangles[i++] = first + xResolution + 1;
        }
    }

    var mesh : Mesh = new Mesh ();

    mesh.vertices = vertices;
    mesh.uv = uvs;
    mesh.triangles = triangles;

    mesh.RecalculateNormals();
    mesh.RecalculateBounds();

    GetComponent(MeshFilter).mesh = mesh;
    
    Application.targetFrameRate = 60.0;
}

var waveParams = [6.1, 0.17, 0.1, 10.4, 0.6, 0.05];

function Update() {
    var mesh : Mesh = GetComponent(MeshFilter).mesh;
    var vertices = mesh.vertices;
    var i = 0;
    for (var y = 0; y < yResolution; y++) {
        var w1 = Mathf.Sin(Time.time * waveParams[0] - y * waveParams[1]) * waveParams[2];
        var w2 = Mathf.Sin(Time.time * waveParams[3] - y * waveParams[4]) * waveParams[5];
        var wy = (w1 + w2) * (1.0 / yResolution * y);
        for (var x = 0; x < xResolution; x++) {
            vertices[i++].y = wy;
        }
    }
    mesh.vertices = vertices;
    mesh.RecalculateNormals();
}
