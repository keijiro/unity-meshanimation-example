#pragma strict

function Awake() {
#if UNITY_IPHONE && !UNITY_EDITOR
    Application.targetFrameRate = 60.0;
#endif
}
