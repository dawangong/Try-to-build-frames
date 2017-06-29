//独立出一个作用域 
(function(window, undefined) {
	function jqj(obj) {
		
		//用来存放被操作元素
		this.arr = [];
		var lsarr=[document];
		//id选择器的格式过滤函数
		this.getid = function(obj) {
			var lc = obj.length;
			var temp = obj.slice(1, lc);
			this.arr = [];
			this.arr.push(document.getElementById(temp));
			lsarr[0]=document.getElementById(temp);
		};

		//class选择器的格式过滤操作
		this.getclassname = function(obj) {   
			var lc = obj.length;
			var temp = obj.slice(1, lc);
			var zhuan = lsarr[0].getElementsByClassName(temp);
			for(var i = 0; i < zhuan.length; i++) {
				this.arr.push(zhuan[i]);
			}
			lsarr[0]=lsarr[0].getElementsByClassName(temp);
		};

		//标签名选择器的格式过滤操作
		this.getelements = function(obj) {
			var pattern = /[a-z]/ig;
			var tp = obj.charAt(0);
			var res = pattern.test(tp);
			var zhuan = document.getElementsByTagName(obj);
			for(var i = 0; i < zhuan.length; i++) {
				this.arr.push(zhuan[i]);
			}
			return this.arr;

		};

		//识别输入的字符串 调用对应的处理函数
		this.sel = function(obj) {

			if(obj.charAt(0) == '#') {
				this.getid(obj);
			} else if(obj.charAt(0) == '.') {
				this.getclassname(obj);
			} else if(obj) {
				this.getelements(obj);
			}

		};
		
		if((typeof obj!='string')&&(obj!=undefined)){
			this.arr[0]=obj;
		}//改变使用时this的指向（把操作权给this触发的并存入）

		//这里调用这个函数 连带实现操作元素的存储 以备使用
		else if(obj) {
			if(obj.indexOf(' ')==-1){
				this.sel(obj);
			}
			else{
				var sz=[];
				sz=obj.split(' ');
				for (var i=0;i<sz.length;i++) {
					this.sel(sz[i]);
				}
			}
		}
		
	}

	jqj.prototype.css = function(json) {

		//for循环结合for in反射迭代 实现样式的修改
		this.att = [];
		this.att = this.arr;
		if(this.att.length > 1) {
			for(var x in json) {
				for(var i = 0; i < this.att.length; i++) {
					this.att[i].style[x] = json[x];
				}

			}
		} else {
			for(var x in json) {
				this.att[0].style[x] = json[x];
			}
		}

		return this; //返回对象 用于链式操作；
	}

	//用于筛选控制第几个元素
	jqj.prototype.eq = function(num) {
		this.temp1 = this.arr[num];
		this.arr = [];
		this.arr[0] = this.temp1;
		return this; //返回对象 用于链式操作；
	}

	//获取和修改标签中间的东西
	jqj.prototype.html = function(html) {

		this.aee = [];
		this.aee = this.arr;
		if(html) {
			for(var i = 0; i < this.aee.length; i++) {
				this.aee[i].innerHTML = html;
				return this; //返回对象 用于链式操作；
			}
		} else {
			for(var i = 0; i < this.aee.length; i++) {

				return this.aee[i].innerHTML;
			}
		}

	}
	//获取和修改标签中间的纯文本
	jqj.prototype.text = function(txt) {
		if(txt) {
			for(var i = 0; i < this.arr.length; i++) {
				if(this.arr[i].innerText) {
					this.arr[i].innerText = txt;
				} else {
					this.arr[i].textContent = txt;
				}
			}
			return this;
		} else {
			for(var i = 0; i < this.arr.length; i++) {
				if(this.arr[i].innerText) {
					return this.arr[i].innerText;
				} else {
					return this.arr[i].textContent;
				}
			}
		}
	}
	//一个可以规定时间的回调函数
	jqj.prototype.callback = function(fn, time) {
		this.timer = setTimeout(fn, time);

		return this; //返回对象 用于链式操作；
	}
	
	//三种排序的封装(默认都是从小到大)
	//冒泡排序
	jqj.prototype.bubblesort=function(arr,reverse){
		var reverse=reverse||false;
		if(reverse==false){
			for (var i=0;i<arr.length-1;i++) {
			for(var j=0;j<arr.length-1;j++){
				if(arr[j]>arr[j+1]){
					var temp1=arr[j];
					arr[j]=arr[j+1];
					arr[j+1]=temp1;
				}
			}
		}
		}
		else{
			for (var i=0;i<arr.length-1;i++) {
			for(var j=0;j<arr.length-1;j++){
				if(arr[j]<arr[j+1]){
					var temp2=arr[j];
					arr[j]=arr[j+1];
					arr[j+1]=temp2;
				}
			}
		}
		}
		return arr;
	}
	
	//选择排序
	jqj.prototype.selectsort=function(arr,reverse){
		var reverse=reverse||false;
		if(reverse==false){
			for (var i=0;i<arr.length-1;i++) {
			var minz=arr[i];
			var minindex=i;
			for (var j=i+1;j<arr.length;j++) {
				if(minz>arr[j]){
					minz=arr[j];
					minindex=j;
				}
			}
			var temp1=arr[i];
			arr[i]=arr[minindex];
			arr[minindex]=temp1;
		}
		}
		else{
			for (var i=0;i<arr.length-1;i++) {
			var maxz=arr[i];
			var maxindex=i;
			for (var j=i+1;j<arr.length;j++) {
				if(maxz<arr[j]){
					maxz=arr[j];
					maxindex=j;
				}
			}
			var temp2=arr[i];
			arr[i]=arr[maxindex];
			arr[maxindex]=temp2;
		}
		}
		return arr;
	}
	
	//快速排序
	jqj.prototype.quicksort=function(arr,reverse){
		var reverse=reverse||false;
		if(reverse==false){
			if(arr.length<=1){
			return arr;
		}
			else{
			var midindex1=Math.floor(arr.length/2);
			var midz1=arr.splice(midindex1,1)[0];
			var left1=[];
			var right1=[];
			for (var i=0;i<arr.length;i++) {
				if(midz1>arr[i]){
					left1.push(arr[i]);
				}
				else{
					right1.push(arr[i]);
				}
			}
			return arguments.callee(left1).concat(midz1,arguments.callee(right1));
		}
		}
		//反排序有问题
//		else{
//			if(arr.length<=1){
//			return arr;
//		  }
//			else{
//			var midindex2=Math.floor(arr.length/2);
//			var midz2=arr.splice(midindex2,1)[0];
//			var left2=[];
//			var right2=[];
//			for (var i=0;i<arr.length;i++) {
//				if(midz2<arr[i]){
//					left2.push(arr[i]);
//				}
//				else{
//					right2.push(arr[i]);
//				}
//			}
//			return arguments.callee(left2).concat(midz2,arguments.callee(right2));
//		}
//		}
		
	}

	//外界元素样式的获取
	jqj.prototype.getstyle = function(abc) {
		this.acc = [];
		this.acc = this.arr

		for(var i = 0; i < this.acc.length; i++) {
			if(this.acc[i].currentStyle) {
				return this.acc[i].currentStyle[abc];
			} else {
				return getComputedStyle(this.acc[i], false)[abc];
			}
		}

	}

	//内部样式获取的便捷函数
	jqj.prototype.instyle = function(obj, styl) {
		if(obj.currentStyle) {
			return obj.currentStyle[styl];
		} else {
			return getComputedStyle(obj, false)[styl];
		}
	}

	//添加id
	jqj.prototype.addId = function(ht) {

		for(var i = 0; i < this.arr.length; i++) {
			this.arr[i].id = ht;
		}
		return this; //返回对象 用于链式操作；
	}

	//删除id
	jqj.prototype.removeId = function() {
		for(var i = 0; i < this.arr.length; i++) {
			this.arr[i].id = '';
		}
		return this; //返回对象 用于链式操作；
	}

	//添加class
	jqj.prototype.addClass = function(cla) {
		var pattern = new RegExp(cla);
		for(var i = 0; i < this.arr.length; i++) {
			var res = this.arr[i].className.match(pattern);
		}
		if(res == null) {
			for(var i = 0; i < this.arr.length; i++) {
				if(this.arr[i].className.length == 0) {
					this.arr[i].className = cla;
				} else {
					this.arr[i].className += ' ' + cla;
				}
			}
		}

		return this; //返回对象 用于链式操作；

	}

	//删除class
	jqj.prototype.removeClass = function(cs) {
		var pattern = new RegExp(cs);
		for(var i = 0; i < this.arr.length; i++) {
			this.arr[i].className = this.arr[i].className.replace(pattern, '');
		}
		return this;
	}

	//hover方法
	jqj.prototype.hover = function(enter, leave) {
		for(var i = 0; i < this.arr.length; i++) {
			this.arr[i].onmouseover = enter;
			this.arr[i].onmouseout = leave;
		}
		return this;
	}

	//显示
	jqj.prototype.show = function() {
		for(var i = 0; i < this.arr.length; i++) {
			this.arr[i].style.display = 'block';
		}
		return this;
	}

	//隐藏
	jqj.prototype.hide = function() {
		for(var i = 0; i < this.arr.length; i++) {
			this.arr[i].style.display = 'none';
		}
		return this;
	}

	//决定放置运动函数函数

	//获取浏览器窗口宽
	jqj.prototype.getclientw = function() {
		return document.documentElement.clientWidth || innerWidth;
	}

	//获取浏览器窗口高
	jqj.prototype.getclienth = function() {
		return document.documentElement.clientHeight || innerHeight;
	}

	//一个可选择是否始终居中的函数
	jqj.prototype.center = function(width, height, async) {
		var seletc = async || false;
		var initwidth = this.getclientw();
		var initheight = this.getclienth();
		var initx = Math.floor((initwidth - width) / 2);
		var inity = Math.floor((initheight - height) / 2);
		for(var i = 0; i < this.arr.length; i++) {
			this.arr[i].style.zIndex = 20;
			this.arr[i].style.left = initx + 'px';
			this.arr[i].style.top = inity + 'px';
		}
		if(seletc == false) {
			return this;
		}
		var that=this;
		var qarr = this.arr;
		this.addts(window,'resize',function(){
			var finwidth = that.getclientw();
			var finheight =that.getclienth();
			var finx = Math.floor((finwidth - width) / 2);
			var finy = Math.floor((finheight - height) / 2);
			for(var i = 0; i < qarr.length; i++) {
				qarr[i].style.left = finx + 'px';
				qarr[i].style.top = finy + 'px';
			}
		});
		return this;
	}

	//添加遮盖层
	jqj.prototype.lockfloor = function(num) {
		var clw235 = this.getclientw();
		var clh235 = this.getclienth();
		var obj = [];
		obj = this.arr;
		for(var i = 0; i < obj.length; i++) {
			obj[i].style.width = clw235 + 'px';
			obj[i].style.height = clh235 + 'px';
			obj[i].style.zIndex = num || 10;
			obj[i].style.display = 'block';
		}
		var qarr = this.arr;
		var that=this;
		this.addts(window,'resize',function(){
			var clw235 = that.getclientw();
			var clh235 = that.getclienth();
			for(var i = 0; i < qarr.length; i++) {
				if(qarr[i].style.display == 'block') {
					qarr[i].style.width = clw235 + 'px';
					qarr[i].style.height = clh235 + 'px';
					qarr[i].style.zIndex = num || 10;
				}
			}
		});
		return this;
	}

	//解除遮盖层
	jqj.prototype.unlockfloor = function(num) {
		var obj = [];
		obj = this.arr;
		for(var i = 0; i < obj.length; i++) {
			obj[i].style.zIndex = num || -5;
			obj[i].style.display = 'none';
		}
		return this;
	}
	
	//拖拽
	jqj.prototype.drag=function(){
		var that1=this;
		for (var i=0;i<this.arr.length;i++) {	
			this.arr[i].onmousedown=function(ev){
				that1.preventDefault();//兼容低版本火狐拖拽空div问题
				var that2=this;
				var e=ev||window.event;
				var cx=e.offsetX||e.layerX;
				var cy=e.offsetY||e.layery;
				document.onmousemove=function(ev){
					if(this.setCapture){
					this.setCapture();//兼容ie拖拽到边界出现白宽问题
				}
				var e=ev||window.event;	
				var zx=e.clientX-cx;
				var zy=e.clientY-cy;
				if(zx<0){
					zx=0;
				}
				if(zy<0){
					zy=0;
				}
				if(zx>that1.getclientw()-parseInt(that1.instyle(that2,'width'))){
					zx=that1.getclientw()-parseInt(that1.instyle(that2,'width'));
				}
				if(zy>that1.getclienth()-parseInt(that1.instyle(that2,'height'))){
					zy=that1.getclienth()-parseInt(that1.instyle(that2,'height'));
				}
				that2.style.left=zx+'px';
				that2.style.top=zy+'px';
				}
				document.onmouseup=function(){
					if(that2.releaseCapture){
						that2.releaseCapture();
					}
				document.onmousemove=null;
				document.onmouseup=null;
				}
			}
		}	
	}

	//点击事件(兼容大部分浏览器)
	jqj.prototype.click = function(ffn) {
		for(var i = 0; i < this.arr.length; i++) {
			if(this.arr[i].addEventListener) {
				this.arr[i].addEventListener('click', ffn, false);
			} else if(this.arr[i].attachEvent) {
				this.arr[i].attachEvent(on + 'click', ffn);
			} else {
				this.arr[i].onclick = ffn;
			}
		}
		return this;
	}

	//动态加载脚本文件
	jqj.prototype.moveloadjs = function(url) {
		var oldjs = document.getElementsByTagName('script')[0];
		var newjs = document.createElement('script');
		newjs.src = url;
		newjs.type = 'text/javascript';
		newjs.charset = "utf-8";
		oldjs.parentNode.insertBefore(newjs, oldjs);
	}

	//动态加载样式表文件
	jqj.prototype.moveloadcss = function(url) {
		var oldnode = document.getElementsByTagName('script')[0];
		var newcss = document.createElement('link');
		newcss.rel = "stylesheet";
		newcss.type = 'text/css';
		newcss.href = url;
		oldnode.parentNode.insertBefore(newcss, oldnode);
	}

	//跨浏览器事件处理
	//获取event对象
	jqj.prototype.getevent = function(ev) {
		return ev || window.event;
	}
	//获取事件类型
	jqj.prototype.gettype = function(ev) {
		var e = ev || window.event;
		return e.type;
	}
	//获取触发事件的元素
	jqj.prototype.gettarget = function(ev) {
		var e = ev || window.event;
		return ev.target || ev.srcElement;
	}
	//阻止默认事件
	jqj.prototype.preventDefault = function(ev) {
		var e = ev || window.event;
		if(e.preventDefault) {
			return e.preventDefault();
		} else {
			return e.returnValue = false;
		}
	}
	//阻止冒泡
	jqj.prototype.stoppropagation = function(ev) {
		var e = ev || window.event;
		if(e.stopPropagation) {
			return e.stopPropagation();
		} else {
			return e.cancelBubble = true;
		}
	}
	//添加事件
	jqj.prototype.addthings = function(type, fn, async) {
		for(var i = 0; i < this.arr.length; i++) {
			if(this.arr[i].addEventListener) {
				this.arr[i].addEventListener(type, fn, async || false);
			} else if(this.arr[i].attachEvent) {
				this.arr[i].attachEvent('on' + type, fn);
			} else {
				this.arr[i]['on' + type] = fn;
			}
		}
	}
	//移除事件
	jqj.prototype.removethings = function(type, fn, async) {
		for(var i = 0; i < this.arr.length; i++) {
			if(this.arr[i].removeEventListener) {
				this.arr[i].removeEventListener(type, fn, async || false);
			} else if(this.arr[i].detachEvent) {
				this.arr[i].detachEvent('on' + type, fn);
			} else {
				this.arr[i]['on' + type] = null;
			}
		}
	}
	
	//内部兼容多事件不互相覆盖事件的添加
	jqj.prototype.addts = function(obj,type, fn, async) {
			if(obj.addEventListener) {
				obj.addEventListener(type, fn, async || false);
			} else if(obj.attachEvent) {
				obj.attachEvent('on' + type, fn);
			} 	
	}

	//产生独立的实例对象
	function $(obj) {
		return new jqj(obj);
	}

	//将$挂载到window对象上;
	window.$ = $;
})(window)