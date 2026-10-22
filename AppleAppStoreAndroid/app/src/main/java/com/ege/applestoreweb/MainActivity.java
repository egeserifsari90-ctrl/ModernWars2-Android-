package com.ege.applestoreweb;
import android.app.Activity;
import android.os.Bundle;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.webkit.WebChromeClient;
import android.content.Intent;
import android.net.Uri;
public class MainActivity extends Activity {
 WebView web;
 @Override public void onCreate(Bundle b) {
  super.onCreate(b);
  web=new WebView(this);
  web.getSettings().setJavaScriptEnabled(true);
  web.getSettings().setDomStorageEnabled(true);
  web.setWebChromeClient(new WebChromeClient());
  web.setWebViewClient(new WebViewClient(){
   @Override public boolean shouldOverrideUrlLoading(WebView view, String url) {
    Uri uri=Uri.parse(url);
    String host=uri.getHost();
    if ("https".equals(uri.getScheme()) && host!=null && (host.equals("apple.com")||host.endsWith(".apple.com"))) return false;
    try { startActivity(new Intent(Intent.ACTION_VIEW,uri)); } catch(Exception ignored) {}
    return true;
   }
  });
  setContentView(web);
  web.loadUrl("https://www.apple.com/tr/shop");
 }
 @Override public void onBackPressed(){ if(web.canGoBack()) web.goBack(); else super.onBackPressed(); }
}