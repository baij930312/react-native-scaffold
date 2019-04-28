package com.scaffold;

import android.app.Activity;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.media.MediaMetadataRetriever;
import android.os.Environment;
import android.view.Gravity;
import android.view.WindowManager.LayoutParams;
import android.widget.Toast;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;

import java.io.File;
import java.io.FilenameFilter;
import java.util.HashMap;
import java.util.Map;

public class UtilsModule extends ReactContextBaseJavaModule {
    @Override
    public String getName() {
        return "RNToolsModule";
    }

    public UtilsModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @javax.annotation.Nullable
    @Override
    public Map<String, Object> getConstants() {
        ReactApplicationContext context = getReactApplicationContext();
        String versionCode = "", versionName = "";
        try {
            PackageInfo packageInfo = context.getPackageManager().getPackageInfo(context.getPackageName(), 0);
            versionCode = String.valueOf(packageInfo.versionCode);
            versionName = packageInfo.versionName;
        } catch (PackageManager.NameNotFoundException e) {
            e.printStackTrace();
        }
        Map<String, Object> map = new HashMap<>();
        map.put("VERSION_CODE", versionCode);
        map.put("VERSION_NAME", versionName);
        map.put("TOAST_SHORT", Toast.LENGTH_SHORT);
        map.put("TOAST_LONG", Toast.LENGTH_LONG);
        return map;
    }

    @ReactMethod
    public void sleepScreenDisabled(final boolean disable) {
        final Activity currentActivity = getCurrentActivity();
        if (currentActivity == null) return;
        currentActivity.runOnUiThread(new Runnable() {
            @Override
            public void run() {
                if (disable) {
                    currentActivity.getWindow().addFlags(LayoutParams.FLAG_KEEP_SCREEN_ON);
                } else {
                    currentActivity.getWindow().clearFlags(LayoutParams.FLAG_KEEP_SCREEN_ON);
                }
            }
        });
    }

    @ReactMethod
    public void showToast(String content, int duration) {
        Toast showToast = Toast.makeText(getCurrentActivity(), content, duration);
        showToast.setGravity(Gravity.CENTER, 0, 0);
        showToast.show();
    }

    @ReactMethod
    public void getLocalFiles(String prefix, final String fileType, Promise promise) {
        String state = Environment.getExternalStorageState();
        if (!Environment.MEDIA_MOUNTED.equals(state) && !Environment.MEDIA_MOUNTED_READ_ONLY.equals(state)) {
            resolvePromise(promise, -6000, "外部存储无法访问！");
            return;
        }
        File folder = new File(Environment.getExternalStorageDirectory(), "/hbb/" + prefix);
        if (!folder.exists() || !folder.isDirectory()) {
            resolvePromise(promise, Arguments.createArray());
            return;
        }
        File[] files = folder.listFiles(new FilenameFilter() {
            @Override
            public boolean accept(File dir, String name) {
                return (fileType == null || fileType.isEmpty()) || name.endsWith("." + fileType);
            }
        });
        if (files == null) {
            resolvePromise(promise, Arguments.createArray());
            return;
        }
        MediaMetadataRetriever retriever = new MediaMetadataRetriever();
        WritableArray data = Arguments.createArray();
        for (File file : files) {
            String filename = file.getAbsolutePath();
            retriever.setDataSource(filename);
            String duration = retriever.extractMetadata(MediaMetadataRetriever.METADATA_KEY_DURATION);

            WritableMap map = Arguments.createMap();
            map.putString("path", filename);
            map.putString("name", file.getName());
            map.putInt("duration", Integer.valueOf(duration) / 1000);
            data.pushMap(map);
        }
        retriever.release();

        resolvePromise(promise, data);
    }

    public void resolvePromise(Promise promise, int code, String message) {
        resolvePromise(promise, code, message, (WritableMap) null);
    }

    public void resolvePromise(Promise promise, WritableArray data) {
        resolvePromise(promise, 0, "success", data);
    }

    public void resolvePromise(Promise promise, int code, String message, WritableMap data) {
        WritableMap map = Arguments.createMap();
        map.putInt("code", code);
        map.putString("message", message);
        map.putMap("data", data);
        promise.resolve(map);
    }

    public void resolvePromise(Promise promise, int code, String message, WritableArray data) {
        WritableMap map = Arguments.createMap();
        map.putInt("code", code);
        map.putString("message", message);
        map.putArray("data", data);
        promise.resolve(map);
    }
}
