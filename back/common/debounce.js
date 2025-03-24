/**
 * 原方法地址： http://www.cnblogs.com/front-end-ralph/p/4886306.html
 * Debounce对象，主要实现了on和remove方法，目前支持对scroll、resize和mousemove三种事件的延迟触发
 * 注意：本对象各方法未处理DOM事件监听的兼容性问题
 * usage
 * var id = Debounce.on(window, Debounce.EVENTS.SCROLL, function (e) {
 *   console.log(e);
 * }, 200);
 * 
 * 取消绑定
 *  Debounce.remove(id);
 * @object
 */
export const Debounce = {
    // denounce id，用于记录事件和取消事件监听
    _id: 1,
    // 所支持的事件类型
    EVENTS: {
        SCROLL: 'scroll',
        RESIZE: 'resize',
        MOUSEMOVE: 'mousemove'
    },
    // 默认的setTimeout等待时间，可重置
    DELAY: 200,
    // 保存已有的监听事件
    listeners: {},

    /**
     * 用于监听事件的on方法
     *
     * @param node 被监听的DOM对象
     * @param event 事件类型，比如scroll
     * @param callback 回调函数
     * @param delay 等待的毫秒数
     * @return debounce id，用于取消事件监听
     */
    on: function (node, event, callback, delay) {
        var self = this;
        var id = self._id++;
        delay = !!delay ? delay : self.DELAY;
        self.listeners[id] = {
            node: node,
            event: event,
            timeout: -1,
            proxy: function (e) {
                var listener = self.listeners[id];
                clearTimeout(listener.timeout);
                listener.timeout = setTimeout(callback.bind(node, e), delay);
            }
        };
        node.addEventListener(event, self.listeners[id].proxy, false);
        return id;
    },

    /**
     * 用于取消事件监听的remove方法
     *
     * @param debounce id 由on方法返回的id
     */
    remove: function (id) {
        var self = this;
        var listener = self.listeners[id];
        if (!listener) {
            return;
        }
        clearTimeout(listener.timeout);
        listener.node.removeEventListener(listener.event, listener.proxy, false);
        self.listeners[id] = null;
    }
};
