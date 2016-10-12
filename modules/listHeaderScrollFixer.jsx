/**
 * Created by Hubyo 2016/09/21
 * 表头滚动到一定位置 固定
 *
 * @usage
 * top 距离顶部的位置，默认0，如果有其他额外的元素
 * style自定义样式
 * extendHeight 额外的其他元素的高度
 */
import {Debounce} from './../common/denounce.js';
import React from 'react';

const style={
    position: 'relative',
    top: 0,
};
export default class listHeaderScrollFixer extends React.Component{
  static propTypes = {
    children: React.PropTypes.element.isRequired
  };
  constructor(props){
    super(props);
    this.state={
      headerOffsetWidth: 0,       //表头宽度
      headerOffsetHeight: 0,      //表头高度
      container: null,     //可滚动的容器
      _id: null,    //保留debouceid
    };
    this.handleHeaderScroll = this.handleHeaderScroll.bind(this);
  }
 
  componentDidMount(){
    var container = this.props.container,
      childName = this.props.children.props.className,        //获取子类的类名
      header = document.querySelector(`.${childName}`),
      headerWidth = listHeader.offsetWidth,     //由于使用固定定位，防止设置的滑倒表头过宽
      headerHeight = listHeader.offsetHeight;  //其他额外特殊的页面
    var _id = Debounce.on(container, Denounce.EVENTS.SCROLL, function (e){
      _self.handleHeaderScroll();
      _self.freeze(container); 
    }, 200);
    this.setState({
      headerOffsetWidth: headerWidth,
      headerOffsetHeight: headerHeight,
      container: container,
      _id: _id,
    });
  }
  //回收事件
  componentWillUnmount(){
    var _self = this;
    Debounce.remove(_self.state._id);
  }
  handleHeaderScroll(){
    var {extendsDom} = this.props;
    var extendHeight = this.excuteDomHeight(extendsDom);
    var _self = this,
      ticking = false,
      container = _self.state.container,
      scrollStarter = container.offsetTop + extendHeight, //开始滑动的点
      last_known_scroll_position = container.scrollTop;  //可滚动容器距离顶部的距离
    if (!ticking && last_known_scroll_position) {
      if(last_known_scroll_position > scrollStarter){
        _self.move();
      }else{
        _self.origin();
      }
      ticking = false;
    }
    ticking = true;
  }
  excuteDomHeight(dom,height=0){
    if(dom==null)
        height = 0;
    if('object' === typeof dom){
        if(Array.isArray(dom)){
            dom.map((d,i)=>{
                if(d instanceof HTMLElement){
                    height += d.offsetHeight;
                }
            });
        }else{
            if(dom instanceof HTMLElement){
                height += d.offsetHeight;
            }
        }
    }
    return height;
  }
    /**
   * 当容器超出范围时，定位到顶部
   * @return {[type]} [description]
   */
  move(){
    this.setState({
      style:{
        position: 'fixed',
        top: this.props.top,
        zIndex: 2,
        width: this.state.headerOffsetWidth,
        backgroundColor: '#fff',
        transform: `translateY(${this.state.headerOffsetHeight}px)`,
        borderTop: '1px solid #ECF0F5'
      }
    });
  }
    /**
   * 表头回到原位置
   * @return {[type]} [description]
   */
  origin(){
    this.setState({
      style: {
        position: 'relative',
        top: 0,
        zIndex: 0,
        width: '100%',
        transform: 'translateY(0)',
        borderTop: 'none'
      }
    });
  }
  render(){
    var animationStyle={
      transition: 'transform 500ms cubic-bezier(0,0,.21,1)',
      transform: 'translateY(0)',
      transformOrigin: '0 0'
    };
    return (
      <div className='m-scroll-fixer' 
        style={Object.assign(style, animationStyle,this.props.style)}>
            {this.props.children}
      </div>
    )
  }
}
