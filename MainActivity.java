package ec.espe.relics;

import android.app.Activity;
import android.content.Intent;
import android.content.res.Configuration;
import android.graphics.Color;
import android.net.Uri;
import android.os.Bundle;
import android.view.View;
import android.view.ViewGroup;
import android.webkit.WebChromeClient;
import android.webkit.WebResourceRequest;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.FrameLayout;

/** Offline application shell; NASA photographs load from NASA HTTPS at runtime. */
public class MainActivity extends Activity {
    private WebView browser;
    private FrameLayout root;
    private View fullScreenView;
    private WebChromeClient.CustomViewCallback fullScreenCallback;
    private WebChromeClient chromeClient;
    private static final String HOME = "file:///android_asset/web/index.html";

    @Override public void onCreate(Bundle state) {
        super.onCreate(state);
        getWindow().setStatusBarColor(Color.rgb(6, 18, 34));
        getWindow().setNavigationBarColor(Color.rgb(6, 18, 34));
        root = new FrameLayout(this);
        browser = new WebView(this);
        root.addView(browser, new FrameLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT));
        setContentView(root);
        WebSettings settings = browser.getSettings();
        settings.setJavaScriptEnabled(true);
        settings.setDomStorageEnabled(true);
        settings.setAllowFileAccess(true);
        settings.setAllowContentAccess(false);
        settings.setAllowFileAccessFromFileURLs(false);
        settings.setAllowUniversalAccessFromFileURLs(false);
        settings.setMediaPlaybackRequiresUserGesture(true);
        settings.setSupportZoom(false);
        settings.setLoadWithOverviewMode(true);
        settings.setUseWideViewPort(true);
        browser.setBackgroundColor(Color.rgb(3,9,19));
        browser.setWebViewClient(new WebViewClient() {
            @Override public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) {
                Uri target = request.getUrl();
                if ("file".equalsIgnoreCase(target.getScheme())) return false;
                if ("https".equalsIgnoreCase(target.getScheme()) || "http".equalsIgnoreCase(target.getScheme())) {
                    try { startActivity(new Intent(Intent.ACTION_VIEW,target)); } catch (Exception ignored) {}
                    return true;
                }
                return true;
            }
        });
        chromeClient = new WebChromeClient(){
            @Override public void onShowCustomView(View view, CustomViewCallback cb){
                if(fullScreenView != null){cb.onCustomViewHidden();return;}
                fullScreenView=view;fullScreenCallback=cb;
                browser.setVisibility(View.GONE);
                root.addView(view,new FrameLayout.LayoutParams(-1,-1));
                getWindow().getDecorView().setSystemUiVisibility(View.SYSTEM_UI_FLAG_FULLSCREEN|View.SYSTEM_UI_FLAG_HIDE_NAVIGATION|View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY);
            }
            @Override public void onHideCustomView(){
                if(fullScreenView==null)return;
                root.removeView(fullScreenView);fullScreenView=null;
                browser.setVisibility(View.VISIBLE);
                getWindow().getDecorView().setSystemUiVisibility(0);
                if(fullScreenCallback!=null){fullScreenCallback.onCustomViewHidden();fullScreenCallback=null;}
            }
        };
        browser.setWebChromeClient(chromeClient);
        browser.loadUrl(HOME);
    }
    @Override public void onBackPressed() {
        if(fullScreenView!=null){chromeClient.onHideCustomView();return;}
        if(browser!=null){ browser.evaluateJavascript("document.dispatchEvent(new KeyboardEvent('keydown',{key:'Escape',bubbles:true}))",null); }
        else super.onBackPressed();
    }
    @Override public void onConfigurationChanged(Configuration config){super.onConfigurationChanged(config);}
    @Override public void onDestroy(){if(browser!=null){root.removeView(browser);browser.destroy();browser=null;}super.onDestroy();}
}
