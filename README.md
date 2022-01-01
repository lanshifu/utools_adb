拖入APK将直接调用adb install apk命令

按钮可查看设备已安装包名(adb shell pm list package)

当前顶层Activity(adb shell dumpsys window | findstr mCurrentFocus)

APK的Manifest清单(aapt dump xmltree apk AndroidManifest.xml)



#注意！需要自行配置好adb与aapt环境，否则无法使用本插件