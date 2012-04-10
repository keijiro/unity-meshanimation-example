Shader "Custom/WavyAnimated" {
    Properties {
        _MainTex ("Base (RGB)", 2D) = "white" {}
        _ParamsA ("Wave Params A", Vector) = (6.0, 2.0, 0.12, 0.0)
        _ParamsB ("Wave Params B", Vector) = (12.0, 10.0, 0.03, 0.0)
    }
    SubShader {
        Tags { "RenderType"="Opaque" }
        LOD 200
        
        CGPROGRAM
        #pragma surface surf Lambert vertex:vert

        sampler2D _MainTex;
        half4 _ParamsA;
        half4 _ParamsB;

        void vert (inout appdata_full v) {
            half time = _Time.y;
            half u = v.texcoord.x;
            half w1 = sin(time * _ParamsA.x - u * _ParamsA.y) * _ParamsA.z;
            half w2 = sin(time * _ParamsB.x - u * _ParamsB.y) * _ParamsB.z;
            v.vertex.y = (w1 + w2) * u;
        }

        struct Input {
            float2 uv_MainTex;
        };

        void surf (Input IN, inout SurfaceOutput o) {
            o.Albedo = tex2D (_MainTex, IN.uv_MainTex).rgb;
        }
        ENDCG
    } 
    FallBack "Diffuse"
}
