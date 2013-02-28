Shader "Custom/WavyAnimated" {
    Properties {
        _MainTex ("Base (RGB)", 2D) = "white" {}
        _Param1 ("Wave Params 1", Vector) = (6.0, 2.0, 0.12, 0.0)
        _Param2 ("Wave Params 2", Vector) = (12.0, 10.0, 0.03, 0.0)
    }
    SubShader {
        Tags { "RenderType"="Opaque" }
        LOD 200
        
        CGPROGRAM
        #pragma surface surf Lambert vertex:vert

        sampler2D _MainTex;
        half4 _Param1;
        half4 _Param2;

        void vert (inout appdata_full v) {
            half time = _Time.y;
            half u = v.texcoord.x;
            half w1 = sin(time * _Param1.x - u * _Param1.y) * _Param1.z;
            half w2 = sin(time * _Param2.x - u * _Param2.y) * _Param2.z;
            v.vertex.xyz += v.normal * (w1 + w2) * u;
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
    CustomEditor "WavyAnimatedMaterialInspector"
}
