var direct = 'DIRECT';

var workerDomain = '.aimwhy.us.kg';

var directDomains = ["515551.xyz", "aimwhy.top", "gov.cn", "115.com", "123pan.com", "123957.com", "baidu.com", "baidupcs.com", "baidustatic.com", "bdimg.com", "bdstatic.com", "cdn.bcebos.com", "cdnnode.cn", "qq.com", "weixinbridge.com", "gtimg.com", "gtimg.cn", "qstatic.com", "cdn-go.cn", "qpic.cn", "qlogo.cn", "qqmail.com", "tencent.com", "bilibili.com", "hdslb.com", "bilivideo.cn", "biliapi.net", "iqiyi.com", "iqiyipic.com", "qy.net", "71edge.com", "youku.com", "ykimg.com", "tower.im", "weibo.com", "weibo.cn", "weibocdn.com", "sinaimg.cn", "sinajs.cn", "sina.cn", "taobao.com", "aliyun.com", "aliyuncs.com", "alicdn.com", "alibabausercontent.com", "alipay.com", "alipayobjects.com", "aliyundrive.com", "dingtalk.com", "mmstat.com", "tmall.com", "jd.com", "360buyimg.com", "300hu.com", "126.com", "163.com", "189.cn", "21cn.com", "139.com", "10086.cn", "pinduoduo.com", "pddpic.com", "zijieapi.com", "amemv.com", "ecombdapi.com", "baike.com", "byteimg.com", "douyin.com", "douyinpic.com", "douyinstatic.com", "douyinvod.com", "supercachenode.com", "bytedance.com", "bytedanceapi.com", "bytescm.com", "bytecdn.cn", "byteoc.com", "bytednsdoc.com", "bytetcc.com", "feishu.cn", "feishucdn.com", "toutiao.com", "toutiaoimg.com", "toutiaostatic.com", "yhgfb-cn-static.com", "cmbchina.com", "mi.com", "xiaomi.com", "amap.com", "autonavi.com", "meituan.com", "meituan.net", "sogou.com", "dianping.com", "quark.cn", "wps.cn", "wpscdn.cn", "xiaohongshu.com", "xhscdn.com", "push.apple.com", "setup.icloud.com", "appldnld.apple.com", "oscdn.apple.com", "osrecovery.apple.com", "swcdn.apple.com", "swdist.apple.com", "swdownload.apple.com", "swscan.apple.com", "updates-http.cdn-apple.com", "updates.cdn-apple.com", "audiocontentdownload.apple.com", "devimages-cdn.apple.com", "devstreaming-cdn.apple.com", "oscdn.apple.com", "certs.apple.com", "ocsp.apple.com", "ocsp2.apple.com", "valid.apple.com", "appleid.cdn-apple.com", "icloud.com.cn", "guzzoni.apple.com", "app-site-association.cdn-apple.com", "smp-device-content.apple.com", "idv.cdn-apple.com", "adcdownload.apple.com", "alpdownloadit.cdn-apple.com", "bricks.cdn-apple.com", "self.events.data.microsoft.com", "mobile.events.data.microsoft.com", "browser.events.data.microsoft.com", "ocsp.globalsign.com", "ocsp2.globalsign.com", "ocsp.digicert.cn", "ocsp.dcocsp.cn", "api.onedrive.com", "storage.live.com", "skyapi.live.net", "roaming.officeapps.live.com", "blob.core.windows.net", "default.exp-tas.com"];

var domainsUsingProxy = ["google.com.hk", "ent.com", "youtube.com", "googlevideo.com", "ytimg.com", "github.com", "github.io", "githubusercontent.com", "githubassets.com", "bing.com", "bing.cn", "bing.net", "bingapis.com", "live.com", "stackoverflow.com", "wikipedia.org", "godaddy.com", "cloudflare.com", "twitter.com", "x.com", "twimg.com", "docker.com", "facebook.com", "facebook.net", "fbcdn.net", "segment.io", "unpkg.com", "jsdelivr.com", "tv.apple.com", "instagram.com", "cdninstagram.com", "reddit.com", "redd.it", "whatsapp.com", "whatsapp.net"];

var localTlds = [".test", ".localhost"];

function isIpAddress(ip) {
    return /^\d{1,3}(\.\d{1,3}){3}$/.test(ip) || /^([0-9a-fA-F]{0,4}:){1,7}[0-9a-fA-F]{0,4}$/.test(ip);
}

function isInDirectDomain(host) {
    for (var i = 0; i < directDomains.length; i++) {
        var domain = directDomains[i];
        if (host === domain || host.endsWith('.' + domain)) {
            return true;
        }
    }
    return false;
}

function isInProxyDomain(host) {
    for (var i = 0; i < domainsUsingProxy.length; i++) {
        var domain = domainsUsingProxy[i];
        if (host === domain || host.endsWith('.' + domain)) {
            return true;
        }
    }
    return false;
}

function isLocalTestDomain(domain) {
    // Chrome uses .test as testing gTLD.
    var tld = domain.substring(domain.lastIndexOf('.'));
    if (tld === domain) {
        return false;
    }
    return localTlds.some(function (localTld) {
        return tld === localTld;
    });
}

/* https://github.com/frenchbread/private-ip */
function isPrivateIp(ip) {
    return /^(::f{4}:)?10\.([0-9]{1,3})\.([0-9]{1,3})\.([0-9]{1,3})$/i.test(ip) ||
        /^(::f{4}:)?192\.168\.([0-9]{1,3})\.([0-9]{1,3})$/i.test(ip) ||
        /^(::f{4}:)?172\.(1[6-9]|2\d|30|31)\.([0-9]{1,3})\.([0-9]{1,3})$/i.test(ip) ||
        /^(::f{4}:)?127\.([0-9]{1,3})\.([0-9]{1,3})\.([0-9]{1,3})$/i.test(ip) ||
        /^(::f{4}:)?169\.254\.([0-9]{1,3})\.([0-9]{1,3})$/i.test(ip) ||
        /^f[cd][0-9a-f]{2}:/i.test(ip) ||
        /^fe80:/i.test(ip) ||
        /^::1$/.test(ip) ||
        /^::$/.test(ip);
}

function FindProxyForURL(url, host) {
    var proxy = host.endsWith(workerDomain) ? `PROXY ${host.replaceAll('.', '__x__')}${workerDomain}` : direct;

    if (isInDirectDomain(host)) {
        debug('命中直连域名', host, 'N/A');
        return direct;
    } else if (isInProxyDomain(host)) {
        debug('命中代理域名', host, 'N/A');
        return proxy;
    } else if (isPlainHostName(host) || host === 'localhost' || isLocalTestDomain(host)) {
        debug('命中本地主机名或本地tld', host, 'N/A');
        return direct;
    } else if (isPrivateIp(host)) {
        debug('命中私有 IP 地址', host, 'N/A');
        return direct;
    }

    var ip = isIpAddress(host) ? host : dnsResolve(host);

    if (!ip) {
        debug('无法解析 IP 地址', host, 'N/A');
        return proxy;
    } else if (isPrivateIp(ip)) {
        debug('域名解析后命中私有 IP 地址', host, ip);
        return direct;
    }

    debug('未命中任何规则', host, ip);
    return proxy;
}

var allowAlert = false;
function debug(msg, host = '', ip = '') {
    if (allowAlert) {
        try {
            alert('[' + host + ' -> ' + ip + '] ' + msg);
        } catch (e) {
            allowAlert = false;
        }
    }
}
