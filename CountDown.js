window.CountDown= (function(w,d){
    function setTwo(num){ return num<10 ? ('0'+num) : (''+num); };
    function countdown(t){
        if(t instanceof Array){
            this.time =new Date().getTime()+ (new Date(t[1]).getTime() - new Date(t[0]).getTime()); 
        }else{
            this.time =/\//gi.test(t.toString()) ? (new Date(t).getTime()) : ( new Date().getTime()+parseInt(t)); 
        }
    };
    countdown.prototype={
        timeOut : function (fn,t) {
            var _now = new Date().getTime();
            var count = Math.round((this.time - _now)/1000);
            if(count <= 0) {
                json = {day :'00',hour :'00',min  :'00',sec :'00',ms :'00'}
                fn.call(this, json)
                this.endFn && this.endFn.call(this, json)
                return;
            };
            json = {
                day  : setTwo(Math.floor(count/86400)),  //天数
                hour : setTwo(Math.floor(count/ (60 * 60) % 24 )), //小时
                min  : setTwo(Math.floor(count/60 % 60)), //分钟
                sec  : setTwo(Math.floor(count%60)), //秒
                ms   : setTwo((this.time - _now)%1000).substr(0,2) //豪秒
            };
            var _end = new Date().getTime();
            var _diff = _now - _end; //误差
            fn.call(this, json);
            setTimeout(function(that){
                that.timeOut(fn,t)  
            }, t ? (t) : 1000 - _diff,this)
        },
        end : function(fn){
            this.endFn = fn;
        },
        run : function(fn,t){
            this.stopOff = false
            this.timeOut(fn,t);
            return this
        }
    };
    return countdown;
})(window,document);