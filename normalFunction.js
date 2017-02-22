//1.获取链接里的参数问题
 GetQueryString: function(name) {           
 var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");            
        var r = window.location.search.substr(1).match(reg);          
         if (r != null) return (r[2]);            
        return null;        }
//2.对Date的拓展：
define(function() {
        //日期扩展
        $.extend(Date.prototype, {
                //格式化输出日期
                format: function(fmt) {
                                fmt = fmt || "yyyy-MM-dd";
                                var t = this.toArray(),
                                        o = {
                                                "M+": t[1] + 1,
                                                "d+": t[2],
                                                "h+": t[3],
                                                "m+": t[4],
                                                "s+": t[5],
                                                "q+": Math.floor((t[1] + 3) / 3),
                                                "S": t[6]
                                        };
                                if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (t[0] + "").substr(4 - RegExp.$1.length));
                                for (var k in o) {
                                        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
                                }
                                return fmt;
                        },
                isLeapYear: function() {
                                var y = this.getFullYear();
                                return (0 === y % 4 && ((y % 100 !== 0) || (y % 400 === 0)));
                        },
                daysInMonth: function() {
                                return [31, 0, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][this.getMonth()] || (this.isLeapYear() ? 29 : 28);
                        },
                dayOfYear: function() {
                                return Math.ceil((this.getTime() - new Date(this.getFullYear(), 0, 1).getTime()) / Date.MSINDAY);
                        },
                        //返回添加相应时间后的时间(默认不指定part=7则按毫秒为单位)
                        //part:1-年，2-月，3-日，4-时，5-分，6-秒，7-毫(默认)
                        
                add: function(v, part) {
                                if (part == 1 || part == 2) {
                                        var r = new Date(this);
                                        if (part == 1) r.setYear(r.getFullYear() + v);
                                        else r.setMonth(r.getMonth() + v);
                                        return r;
                                } else return new Date(this.getTime() + [1, 0, 0, Date.MSINDAY, Date.MSINHOUR, Date.MSINMINUTE, Date.MSINSECOND, 1][part || 7] * v);
                        },
                        //返回日期的部分，默认年月日，可以通过part参数指定精度
                        //part:1-年，2-月，3-日(默认)，4-时，5-分，6-秒，7-毫
                        
                date: function(part) {
                                var t = this.toArray();
                                for (var i = part || 3; i < 7; i++) t[i] = i == 2 ? 1 : 0;
                                return new Date(t[0], t[1], t[2], t[3], t[4], t[5], t[6]);
                        },
                        //将时间转换为数组
                        
                toArray: function() {
                                return [this.getFullYear(), this.getMonth(), this.getDate(), this.getHours(), this.getMinutes(), this.getSeconds(), this.getMilliseconds()];
                        },
                        //判断两个时间是否相等，可以通过part参数指定判断的精度
                        //part:1-年，2-月，3-日，4-时，5-分，6-秒，7-毫(默认)
                        
                equal: function(date, part) {
                                if (typeof this != typeof date) return false;
                                var t = this.toArray();
                                date = date.toArray();
                                for (var i = 0; i < (part || 7); i++)
                                        if (t[i] != date[i]) return false;
                                return true;
                        },
                        //计算两个日期的间隔，可以通过part参数指定哪部分
                        //part:1-年，2-月，3-日，4-时，5-分，6-秒，7-毫(默认)
                        
                diff: function(date, part) {
                        if (part == 1 || part == 2) {
                                var r = this.getFullYear() - date.getFullYear();
                                return part == 2 ? (r * 12 + this.getMonth() - date.getMonth()) : r;
                        }
                        part = [1, 0, 0, Date.MSINDAY, Date.MSINHOUR, Date.MSINMINUTE, Date.MSINSECOND, 1][part || 7];
                        return this.getTime() / part - date.getTime() / part;
                }
        });

        $.extend(Date, {
                //转换对象、字符串或数字为日起对象
                parseDate: function(v, d) {
                        switch (typeof v) {
                                case "object":
                                case "number":
                                        v = new Date(v);
                                        break;
                                case "string":
                                        v = new Date(isNaN(v) ? v.trim().replace(/\-/g, "/") : parseInt(v));
                                        break;
                        }
                        return v == "Invalid Date" ? d : v;
                },
                MSINSECOND: 1e3,
                MSINMINUTE: 6e4,
                MSINHOUR: 36e5,
                MSINDAY: 864e5
        });
})
3.判断是否为低端机
isLowDevice = (function(){
        var ua = navigator.userAgent.toLowerCase();
        //(screen.width < 720) || (screen.height < 720) ||
        //android低端机
        if( ua.indexOf('iemobile') !== -1  || ((ua.indexOf('android') !== -1) && 
                    ((/ucbrowser\/[2-9]\./.test(ua)) ||  (/android [1-2]\./.test(ua))))){
            return true;
        }

        return false;
    })();
4 .获取hash值
   getHash = function(name){
        var params = location.hash.substring(1).split('&');

        for(var i = 0; i < params.length; i ++) {
            var tmp = params[i].split("=");

            if(tmp.length > 1 && name == tmp[0]) {
                return tmp[1];
            }
        }

        return null;
    }
5设置hash值
setHash = function(opt){
        if(!opt || !opt.length) return;

        var hash = location.hash;
        var hash2 = hash;

        var _setHash = function(name, value){
            var start = hash.indexOf(name);
            var end = hash.charAt(start + name.length);

            if(!value) return;

            if(hash.length === 0) {
                //hash长度为0，直接添加
                hash = name + '=' + value;
                return;
            } else if(start > 0 && (end == '=' || end == '&' || end === '')) {
                //hash里包含该参数
                var oldValue = util.getHash(name);

                //旧值不存在替换整个键值对
                var tmp = hash.substring(start);
                var end = tmp.indexOf('&');
                tmp = tmp.substring(0, end > 0 ? end : tmp.length);

                hash = hash.replace(tmp, name + '=' + value);
                return;
            } else {
                //hash中不包含参数
                hash += hash.charAt(hash.length - 1) == '&' ? '' : '&' + name + '=' + value; 
                return;
            }
        }

        for(var i = 0; i < opt.length; i ++){
            var param = opt[i];

            _setHash(param.name, param.value);
        }

        if(hash.charAt(0) !== '#') {
            hash = '#' + hash;
        }
        if (hash2 != hash){
            History.replaceState(this.getActiveId(), document.title, location.pathname + location.search + hash);
        }
        
    }
//6.深度clone
clone = function(obj) {
        var newObj = null;

        if(!obj) {
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

