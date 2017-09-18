var utils = {
	setCookie: function ( name, value, ms,domain) {
		if ( !domain ) domain = location.host;
		var expires = "";
        if (ms) {
            var date = new Date();
            date.setTime(date.getTime() + ms);
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + value + expires + "; path=/; domain=" + domain;
	},

	getCookie: function ( name ) {
		var arr,
            reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
            arr = document.cookie.match(reg);
        return arr && arr[2] || ""
	}

	throttle: function ( action, delay) {
		var last = 0;
        return function () {
            var curr = +new Date();
            if (curr - last > delay) {
                action.apply(this, arguments);
                last = curr;
            }
        }
    
	},

	getParamsFromSearch: function ( name,url ) {
		if ( !url ) url = window.location.search 
		var reg = new RegExp("[?|&]" + name + "=(.*?)(&|#|$)", "i"); 
		var r = url.match(reg);
		return r && r[1] || null;
	},

	getHash: function ( name ) {
		var params = location.hash.substring(1).split('&');

        for (var i = 0; i < params.length; i++) {
            var tmp = params[i].split("=");

            if (tmp.length > 1 && name == tmp[0]) {
                return tmp[1];
            }
        }
        return null;
	},

	getElementLeft: function ( element ) { // 获取元素距离左侧的距离
		var actualLeft = element.offsetLeft;
        var current = element.offsetParent;

        while (current !== null) {
            actualLeft += current.offsetLeft;
            current = current.offsetParent;
        }
        return actualLeft;
	},
	getElementTop: function ( element ) {//元素距离最顶部
		var actualTop = element.offsetTop;
        var current = element.offsetParent;

        while (current !== null) {
            actualTop += current.offsetTop;
            current = current.offsetParent;
        }
        return actualTop;
	},
	getElementVisibleLeft: function ( element ) {// 元素距离可视区左侧
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
	getElementVisibleTop: function ( element ) {// 元素距离可视区顶部
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
	clone: function ( obj ) {
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
	}


}

module.exports = utils;