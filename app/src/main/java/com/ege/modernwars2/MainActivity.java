package com.ege.modernwars2;
import android.app.Activity;
import android.os.Bundle;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.webkit.WebChromeClient;
public class MainActivity extends Activity {
 private WebView web;
 @Override public void onCreate(Bundle state) {
  super.onCreate(state);
  web = new WebView(this);
  web.setWebViewClient(new WebViewClient());
  web.setWebChromeClient(new WebChromeClient());
  web.getSettings().setJavaScriptEnabled(true);
  web.getSettings().setDomStorageEnabled(true);
  web.getSettings().setMediaPlaybackRequiresUserGesture(false);
  setContentView(web);
  web.loadUrl("https://websim.com/@Korlan220/modern-wars-satellite-demo-3");
 }
 @Override public void onBackPressed() {
  if (web.canGoBack()) web.goBack(); else super.onBackPressed();
 }
}