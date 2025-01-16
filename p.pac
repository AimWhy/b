function ipToInt(ip) {
    var parts = ip.split('.').map(function (part) { return parseInt(part, 10); });
    return (parts[0] << 24) | (parts[1] << 16) | (parts[2] << 8) | parts[3];
}

var CIDR_RANGES = [
    '0.0.0.0/8',
    '10.0.0.0/8',
    '100.64.0.0/10',
    '127.0.0.0/8',
    '169.254.0.0/16',
    '172.16.0.0/12',
    '192.0.0.0/24',
    '192.0.0.0/29',
    '192.0.0.8/32',
    '192.0.0.9/32',
    '192.0.0.10/32',
    '192.0.0.170/32',
    '192.0.0.171/32',
    '192.0.2.0/24',
    '192.31.196.0/24',
    '192.52.193.0/24',
    '192.88.99.0/24',
    '192.168.0.0/16',
    '192.175.48.0/24',
    '198.18.0.0/15',
    '198.51.100.0/24',
    '203.0.113.0/24',
    '240.0.0.0/4',
    '255.255.255.255/32'
].map(function (cidr) {
    var [ip, prefix] = cidr.split('/');
    var ipInt = ipToInt(ip);
    var prefixInt = parseInt(prefix, 10);
    var mask = 0xFFFFFFFF << (32 - prefixInt);
    var target = ipInt & mask;
    return { mask, target };
});

function ipv4_check(ip_addr) {
    var ip = ipToInt(ip_addr);
    for (var range of CIDR_RANGES) {
        if ((ip & range.mask) === range.target) {
            return true;
        }
    }
    return false;
}

function ipv6_check(ip_addr) {
    return /^::$/.test(ip_addr) ||
        /^::1$/.test(ip_addr) ||
        /^::f{4}:([0-9]{1,3})\.([0-9]{1,3})\.([0-9]{1,3})\.([0-9]{1,3})$/.test(ip_addr) ||
        /^::f{4}:0.([0-9]{1,3})\.([0-9]{1,3})\.([0-9]{1,3})\.([0-9]{1,3})$/.test(ip_addr) ||
        /^64:ff9b::([0-9]{1,3})\.([0-9]{1,3})\.([0-9]{1,3})\.([0-9]{1,3})$/.test(ip_addr) ||
        /^100::([0-9a-fA-F]{0,4}):?([0-9a-fA-F]{0,4}):?([0-9a-fA-F]{0,4}):?([0-9a-fA-F]{0,4})$/.test(ip_addr) ||
        /^2001::([0-9a-fA-F]{0,4}):?([0-9a-fA-F]{0,4}):?([0-9a-fA-F]{0,4}):?([0-9a-fA-F]{0,4}):?([0-9a-fA-F]{0,4}):?([0-9a-fA-F]{0,4})$/.test(ip_addr) ||
        /^2001:2[0-9a-fA-F]:([0-9a-fA-F]{0,4}):?([0-9a-fA-F]{0,4}):?([0-9a-fA-F]{0,4}):?([0-9a-fA-F]{0,4}):?([0-9a-fA-F]{0,4}):?([0-9a-fA-F]{0,4})$/.test(ip_addr) ||
        /^2001:db8:([0-9a-fA-F]{0,4}):?([0-9a-fA-F]{0,4}):?([0-9a-fA-F]{0,4}):?([0-9a-fA-F]{0,4}):?([0-9a-fA-F]{0,4}):?([0-9a-fA-F]{0,4})$/.test(ip_addr) ||
        /^2002:([0-9a-fA-F]{0,4}):?([0-9a-fA-F]{0,4}):?([0-9a-fA-F]{0,4}):?([0-9a-fA-F]{0,4}):?([0-9a-fA-F]{0,4}):?([0-9a-fA-F]{0,4}):?([0-9a-fA-F]{0,4})$/.test(ip_addr) ||
        /^f[c-d]([0-9a-fA-F]{2,2}):/i.test(ip_addr) ||
        /^fe[8-9a-bA-B][0-9a-fA-F]:/i.test(ip_addr) ||
        /^ff([0-9a-fA-F]{2,2}):/i.test(ip_addr);
}

var serverDomain = '1314134.xyz';

var directDomains = [serverDomain, "515551.xyz", "aimwhy.top", "gov.cn", "115.com", "123pan.com", "123957.com", "baidu.com", "baidupcs.com", "baidustatic.com", "bdimg.com", "bdstatic.com", "cdn.bcebos.com", "cdnnode.cn", "qq.com", "weixinbridge.com", "gtimg.com", "gtimg.cn", "qstatic.com", "cdn-go.cn", "qpic.cn", "qlogo.cn", "qqmail.com", "tencent.com", "bilibili.com", "hdslb.com", "bilivideo.cn", "biliapi.net", "iqiyi.com", "iqiyipic.com", "qy.net", "71edge.com", "youku.com", "ykimg.com", "tower.im", "weibo.com", "weibo.cn", "weibocdn.com", "sinaimg.cn", "sinajs.cn", "sina.cn", "taobao.com", "aliyun.com", "aliyuncs.com", "alicdn.com", "alibabausercontent.com", "alipay.com", "alipayobjects.com", "aliyundrive.com", "dingtalk.com", "mmstat.com", "tmall.com", "jd.com", "360buyimg.com", "300hu.com", "126.com", "163.com", "189.cn", "21cn.com", "139.com", "10086.cn", "pinduoduo.com", "pddpic.com", "zijieapi.com", "amemv.com", "ecombdapi.com", "baike.com", "byteimg.com", "douyin.com", "douyinpic.com", "douyinstatic.com", "douyinvod.com", "supercachenode.com", "bytedance.com", "bytedanceapi.com", "bytescm.com", "bytecdn.cn", "byteoc.com", "bytednsdoc.com", "bytetcc.com", "feishu.cn", "feishucdn.com", "toutiao.com", "toutiaoimg.com", "toutiaostatic.com", "yhgfb-cn-static.com", "cmbchina.com", "mi.com", "xiaomi.com", "amap.com", "autonavi.com", "meituan.com", "meituan.net", "sogou.com", "dianping.com", "quark.cn", "wps.cn", "wpscdn.cn", "xiaohongshu.com", "xhscdn.com", "push.apple.com", "setup.icloud.com", "appldnld.apple.com", "oscdn.apple.com", "osrecovery.apple.com", "swcdn.apple.com", "swdist.apple.com", "swdownload.apple.com", "swscan.apple.com", "updates-http.cdn-apple.com", "updates.cdn-apple.com", "audiocontentdownload.apple.com", "devimages-cdn.apple.com", "devstreaming-cdn.apple.com", "oscdn.apple.com", "certs.apple.com", "ocsp.apple.com", "ocsp2.apple.com", "valid.apple.com", "appleid.cdn-apple.com", "icloud.com.cn", "guzzoni.apple.com", "app-site-association.cdn-apple.com", "smp-device-content.apple.com", "idv.cdn-apple.com", "adcdownload.apple.com", "alpdownloadit.cdn-apple.com", "bricks.cdn-apple.com", "self.events.data.microsoft.com", "mobile.events.data.microsoft.com", "browser.events.data.microsoft.com", "ocsp.globalsign.com", "ocsp2.globalsign.com", "ocsp.digicert.cn", "ocsp.dcocsp.cn", "api.onedrive.com", "storage.live.com", "skyapi.live.net", "roaming.officeapps.live.com", "blob.core.windows.net", "default.exp-tas.com"];

var proxyDomains = ["google.com.hk", "ent.com", "youtube.com", "googlevideo.com", "ytimg.com", "github.com", "github.io", "githubusercontent.com", "githubassets.com", "bing.com", "bing.cn", "bing.net", "bingapis.com", "live.com", "stackoverflow.com", "wikipedia.org", "godaddy.com", "cloudflare.com", "twitter.com", "x.com", "twimg.com", "docker.com", "facebook.com", "facebook.net", "fbcdn.net", "segment.io", "unpkg.com", "jsdelivr.com", "tv.apple.com", "instagram.com", "cdninstagram.com", "reddit.com", "redd.it", "whatsapp.com", "whatsapp.net"];

var localTlds = [".test", ".localhost"];

function isIpV4(ip) {
    return /^\d{1,3}(\.\d{1,3}){3}$/.test(ip);
}
function isIpV6(ip) {
    return /^([0-9a-fA-F]{0,4}:){1,7}[0-9a-fA-F]{0,4}$/.test(ip);
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
    for (var i = 0; i < proxyDomains.length; i++) {
        var domain = proxyDomains[i];
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

function direct(host, ip) {
    return 'DIRECT';
}

var proxy = function (host, ip) {
    var tmp = host || ip;
    return `PROXY ${tmp.replaceAll('.', '__x__').replace(':', '__y__')}.${serverDomain}`;
};

function FindProxyForURL(url, host) {
    if (isInDirectDomain(host)) {
        return direct(host);
    } else if (isInProxyDomain(host)) {
        return proxy(host);
    } else if (isPlainHostName(host) || host === 'localhost' || isLocalTestDomain(host)) {
        return direct(host);
    }

    // 假设 host 是 IP 地址
    var ip = host;
    if (isIpV4(ip)) {
        return ipv4_check(ip) ? direct('', ip) : proxy('', ip);
    }

    if (isIpV6(ip)) {
        return ipv6_check(ip) ? direct('', ip) : proxy('', ip);
    }

    // host 不是 IP，解析出 IP 地址再处理
    ip = dnsResolve(host);
    if (isIpV4(ip)) {
        return ipv4_check(ip) ? direct(host, ip) : proxy(host, ip);
    }

    if (isIpV6(ip)) {
        return ipv6_check(ip) ? direct(host, ip) : proxy(host, ip);
    }

    return proxy(host, ip);
}
