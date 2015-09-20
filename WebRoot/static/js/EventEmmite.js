//一般的自定义事件系统
var EventDriver = function() {
	this.handlers = {};
};
EventDriver.prototype = {
	constructor: EventDriver,
	addHandle: function(type, handler) {
		if (typeof this.handlers[type] === "undefined") {
			this.handlers[type] = [];
		}
		this.handlers[type].push(handler);
	},
	fire: function(event) {
		if (!event.target) {
			event.target = this;
		}
		if (this.handlers[event.type] instanceof Array) {
			var handlers = this.handlers[event.type];
			for (var i = 0, len = handlers.length; i < len; i++) {
				handlers[i](event);
			}
		}
	},
	removeHandle: function(type, handle) {
		if (this.handles[event.type] instanceof Array) {
			var handlers = this.handlers[event.type];
			for (var i = 0, len = handlers.length; i < len; i++) {
				if (handle === handlers[i])
					break;
			}
			handlers.splice(i, 1);
		}
	}
};

//既是观察者，又是事件目标
var EventDriver = function() {
	this.handlers = {};
};
EventDriver.prototype = {
	constructor: EventDriver,
	//监听
	listen: function(target, type, handler) {
		target.addHandle(type, handler);
	},
	ignore: function(target, type, handler) {
		target.removeHandle(type, handler);
	},

	//作为事件目标
	addHandle: function(type, handler) {
		if (typeof this.handlers[type] === "undefined") {
			this.handlers[type] = [];
		}
		this.handlers[type].push(handler);
	},
	//fire的参数event是个描述事件信息的对象
	fire: function(event) {
		if (!event.target) {
			event.target = this.bind;
		}
		if (this.handlers[event.type] instanceof Array) {
			var handlers = this.handlers[event.type];
			for (var i = 0, len = handlers.length; i < len; i++) {
				handlers[i](event);
			}
		}
	},
	removeHandle: function(type, handle) {
		if (this.handles[event.type] instanceof Array) {
			var handlers = this.handlers[event.type];
			for (var i = 0, len = handlers.length; i < len; i++) {
				if (handle === handlers[i])
					break;
			}
			handlers.splice(i, 1);
		}
	}
};

//将某个对象拥有使用自定义事件的能力
var makeEventDriver = function(o) {
	var method,
		superEvent = EventDriver.prototype;
	for(method in super) {
		if(super.hasOwnProperty(method) && typeof method === 'function') {
			o[method] = method;
		}
	}
	o.handlers = {};
};