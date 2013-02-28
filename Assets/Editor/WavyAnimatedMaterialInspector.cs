using System.Collections.Generic;
using System.Linq;
using UnityEngine;
using UnityEditor;

public class WavyAnimatedMaterialInspector : MaterialEditor {
	public override void OnInspectorGUI()
	{
		if (!isVisible) return;

		Material targetMaterial = target as Material;

		Vector3 param1 = targetMaterial.GetVector("_Param1");
		Vector3 param2 = targetMaterial.GetVector("_Param2");

		EditorGUI.BeginChangeCheck();
		TextureProperty("_MainTex", "Texture", ShaderUtil.GetTexDim(targetMaterial.shader, 0), false);

		EditorGUILayout.Space();
		EditorGUILayout.LabelField("Wave Parameter Set 1");

		param1.x = EditorGUILayout.Slider("Freq (time)", param1.x, 0.0f, 20.0f);
		param1.y = EditorGUILayout.Slider("Freq (U coord)", param1.y, 0.0f, 20.0f);
		param1.z = EditorGUILayout.Slider("Height", param1.z, 0.0f, 1.0f);

		EditorGUILayout.Space();
		EditorGUILayout.LabelField("Wave Parameter Set 2");

		param2.x = EditorGUILayout.Slider("Freq (time)", param2.x, 0.0f, 20.0f);
		param2.y = EditorGUILayout.Slider("Freq (U coord)", param2.y, 0.0f, 20.0f);
		param2.z = EditorGUILayout.Slider("Height", param2.z, 0.0f, 1.0f);

		if (EditorGUI.EndChangeCheck())
		{
			targetMaterial.SetVector("_Param1", param1);
			targetMaterial.SetVector("_Param2", param2);
			PropertiesChanged();
		}
	}
}
