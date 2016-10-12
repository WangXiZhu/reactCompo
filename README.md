#### 组件名称

* listHeaderFixer

列表下拉表头动态定位到顶部,用到了debounce函数控制scroll事件触发频率

* divGroup

对比ant design中的checkGroup,只是这里的选择对象变为了div
返回已经选中的对象名称，这里估计优化的话 参考checkgroup会同时传入name和id,这样来保证选择的唯一性