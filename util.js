var KEY_REG = /[^.,\s\[\]\'\"]+/g

var utils = {
    setCookie: function (name, value, ms, domain) {
        if (!domain) domain = location.host;
        var expires = "";
        if (ms) {
            var date = new Date();
            date.setTime(date.getTime() + ms);
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + value + expires + "; path=/; domain=" + domain;
    },

    getCookie: function (name) {
        var arr,
            reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
        arr = document.cookie.match(reg);
        return arr && arr[2] || ""
    },

    throttle: function (action, delay) {
        var last = 0;
        return function () {
            var curr = +new Date();
            if (curr - last > delay) {
                action.apply(this, arguments);
                last = curr;
            }
        }

    },
    getParamsFromSearch: function (name, url) {
        if (!url) url = window.location.search
        var reg = new RegExp("[?|&]" + name + "=(.*?)(&|#|$)", "i");
        var r = url.match(reg);
        return r && r[1] || null;
    },
    getHash: function (name) {
        var params = location.hash.substring(1).split('&');
        for (var i = 0; i < params.length; i++) {
            var tmp = params[i].split("=");

            if (tmp.length > 1 && name == tmp[0]) {
                return tmp[1];
            }
        }
        return null;
    },
    getElementLeft: function (element) { // 获取元素距离左侧的距离
        var actualLeft = element.offsetLeft;
        var current = element.offsetParent;

        while (current !== null) {
            actualLeft += current.offsetLeft;
            current = current.offsetParent;
        }
        return actualLeft;
    },
    getElementTop: function (element) { //元素距离最顶部
        var actualTop = element.offsetTop;
        var current = element.offsetParent;

        while (current !== null) {
            actualTop += current.offsetTop;
            current = current.offsetParent;
        }
        return actualTop;
    },
    getElementVisibleLeft: function (element) { // 元素距离可视区左侧
        var actualLeft = element.offsetLeft;
        var current = element.offsetParent;

        while (current !== null) {
            actualLeft += current.offsetLeft;
            actualLeft -= current.scrollLeft;
            current = current.offsetParent;
        }

        if ($(current).hasClass('page')) {
            actualLeft -= current.scrollLeft;
        }
        return actualLeft;
    },
    getElementVisibleTop: function (element) { // 元素距离可视区顶部
        var actualTop = element.offsetTop;
        var current = element.offsetParent;

        while (current !== null) {
            actualTop += current.offsetTop;
            actualTop -= current.scrollTop;
            current = current.offsetParent;
        }

        if ($(current).hasClass('page')) {
            actualTop -= current.scrollTop;
        }
        return actualTop;
    },
    getQueryJson: function () { // 摘自祥鹏
        var r = {};
        location.search.substr(1).replace(/(\w+)=(.*?)(&|#|$)/g, function (str, key, value) {
            r[key] = decodeURIComponent(value);
        });

        return r;
    },
    clone: function (obj) {
        var newObj = null;

        if (!obj) {
            newObj = obj;
        } else if (typeof obj != 'object') {
            newObj = obj;
        } else {
            newObj = obj.constructor == Array ? [] : {};

            for (var i in obj) {
                newObj[i] = util.clone(obj[i]);
            }
        }
        return newObj;
    },
    sortJSon(obj) {
        var newObj = null;
        var _this = this;
        if (!obj) {
            newObj = obj;
        } else if (b.constructor().toLocaleString() == '[object Object]') {
            newObj = {}
            Object.keys(obj).sort((a, b) => {
                let astr = (a || '').toLocaleLowerCase().substr(0, 1);
                let bstr = (b || '').toLocaleLowerCase().substr(0, 1);
                return (astr || '').charCodeAt() - (bstr || '').charCodeAt()
            }).forEach(e => {
                console.log(e);
                if (obj[e] && (obj[e]).constructor().toLocaleString() == '[object Object]') {
                    newObj[e] = _this.sorrt(obj[e])
                } else {
                    newObj[e] = obj[e];
                }
            })
        } else {
            newObj = obj
        }
        return newObj
    },
    get(obj, path, deflt) {
        if (null == obj)
            return arguments.length === 3 ? deflt : obj;
        let keys = JSON
            .stringify(path)
            .match(KEY_REG);
        if (!keys)
            return arguments.length === 3 ? deflt : obj;
        let ret;
        for (let i = 0, j = keys.length; i < j; i++) {
            ret = obj[keys[i]];
            if (null == ret)
                return arguments.length === 3 ? deflt : ret;
            obj = ret;
        }
        return ret;
    },
    set(obj, path, value) {
        let keys = JSON
            .stringify(path)
            .match(KEY_REG);
        if (!keys)
            return obj;
        let _obj = obj;
        for (let i = 0, j = keys.length; i < j; i++) {
            let temp = _obj[keys[i]];
            if (null == temp) {
                if (i + 1 == j) {
                    _obj[keys[i]] = value;
                    break;
                }
                _obj[keys[i]] = /\d+/.test(keys[i]) ? [] : {};
            } else if (i + 1 == j) {
                _obj[keys[i]] = value;
            }
            _obj = _obj[keys[i]];
        }
        return obj;
    },
    isJSON(obj) {
        return typeof (obj) == "object" && Object.prototype.toString.call(obj).toLowerCase() == "[object object]" && !obj.length
    },
    isArray(o) {
        return Object.prototype.toString.call(o) == '[object Array]'
    }
}

module.exports = utils;