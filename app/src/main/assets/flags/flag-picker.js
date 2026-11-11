/* Modern Wars 2 flag picker helper.
 * Uses the PNG files from the supplied flags-master.zip.
 * Copy the archive's PNG files into app/src/main/assets/flags/images/.
 * Then include this file in the game's page and call:
 *   ModernWarsFlagPicker.mount("#flag-picker", { onSelect: (code, url) => { ... } });
 *
 * This helper is standalone; it is not yet connected to the game's country model.
 */
(function (global) {
  "use strict";
  const IMAGE_BASE = "file:///android_asset/flags/images/";
  const CODES = ["AD","AE","AF","AG","AI","AL","AM","AO","AQ","AR","AS","AT","AU","AW","AX","AZ","BA","BB","BD","BE","BF","BG","BH","BI","BJ","BL","BM","BN","BO","BQ","BR","BS","BT","BV","BW","BY","BZ","CA","CC","CD","CF","CG","CH","CI","CK","CL","CM","CN","CO","CR","CU","CV","CW","CX","CY","CZ","DE","DJ","DK","DM","DO","DZ","EC","EE","EG","EH","ER","ES","ET","FI","FJ","FK","FM","FO","FR","GA","GB","GD","GE","GF","GG","GH","GI","GL","GM","GN","GP","GQ","GR","GS","GT","GU","GW","GY","HK","HM","HN","HR","HT","HU","ID","IE","IL","IM","IN","IO","IQ","IR","IS","IT","JE","JM","JO","JP","KE","KG","KH","KI","KM","KN","KP","KR","KW","KY","KZ","LA","LB","LC","LI","LK","LR","LS","LT","LU","LV","LY","MA","MC","MD","ME","MF","MG","MH","MK","ML","MM","MN","MO","MP","MQ","MR","MS","MT","MU","MV","MW","MX","MY","MZ","NA","NC","NE","NF","NG","NI","NL","NO","NP","NR","NU","NZ","OM","PA","PE","PF","PG","PH","PK","PL","PM","PN","PR","PS","PT","PW","PY","QA","RE","RO","RS","RU","RW","SA","SB","SC","SD","SE","SG","SH","SI","SJ","SK","SL","SM","SN","SO","SR","SS","ST","SV","SX","SY","SZ","TC","TD","TF","TG","TH","TJ","TK","TL","TM","TN","TO","TR","TT","TV","TW","TZ","UA","UG","UM","US","UY","UZ","VA","VC","VE","VG","VI","VN","VU","WF","WS","YE","YT","ZA","ZM","ZW"];

  function imageUrl(code) {
    const normalized = String(code || "").toUpperCase();
    if (!CODES.includes(normalized)) return null;
    return IMAGE_BASE + normalized + ".png";
  }

  function mount(root, options) {
    options = options || {};
    if (typeof root === "string") root = document.querySelector(root);
    if (!root) throw new Error("Flag picker container not found");

    const select = document.createElement("select");
    select.setAttribute("aria-label", "Ülke bayrağı seç");
    CODES.forEach(function (code) {
      const option = document.createElement("option");
      option.value = code;
      option.textContent = code;
      select.appendChild(option);
    });

    const preview = document.createElement("img");
    preview.alt = "Seçilen bayrak";
    preview.style.cssText = "width:48px;height:auto;vertical-align:middle;margin-left:8px";

    function changed() {
      const url = imageUrl(select.value);
      preview.src = url || "";
      if (typeof options.onSelect === "function") options.onSelect(select.value, url);
    }

    if (options.initialCode && imageUrl(options.initialCode)) {
      select.value = String(options.initialCode).toUpperCase();
    }
    select.addEventListener("change", changed);
    root.replaceChildren(select, preview);
    changed();
    return { select: select, preview: preview, getValue: function () { return select.value; } };
  }

  global.ModernWarsFlagPicker = { codes: CODES.slice(), imageUrl: imageUrl, mount: mount };
})(window);
