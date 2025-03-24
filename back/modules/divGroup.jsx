/**
 * Created by hubyo on 16/9/26.
 */
import './divGroup.less';
import React from 'react';

export default class DivGroup extends React.Component{
  constructor(props){
    super(props);
    this.state={
      selectedItems: []
    };
    this.handleChange = this.handleChange.bind(this);
  }
  //删除选择
  handleChange(e){
    var tar = e.target,
        itemName = tar && tar.dataset.itemName,
        checked = tar && 'false' == tar.dataset.checked;
    this.props.onClick(this.handleSelectedItem(itemName,checked)); //返回所有的tags

  }
  handleSelectedItem(itemName,checked){
    var selectedItems = this.props.selectedItems || [];
    var indexInArr = selectedItems.indexOf(itemName);
    var isInSelected = indexInArr > -1;  //判断选择的数组中是否存在
    checked ? (isInSelected ? false : selectedItems.push(itemName)) :
      (isInSelected ? selectedItems.splice(indexInArr, 1) : false);
    return selectedItems;
  }
  render() {
    var {divStyle, allItems, selectedItems,itemStyle} = this.props;
    return (
      <div className='divs-wrapper' style={divStyle}>
        {allItems.map((item,i)=>{
          var checked = Object.assign(selectedItems,this.state.selectedItems).indexOf(item) > -1;
          return (
            <div key={i}
              style={itemStyle}
              className={checked ? 'item error-item item-checked' : 'item error-item'}
              data-item-name={item}
              data-index={i}
              data-checked={checked}
              onClick={this.handleChange}>{item}</div>
          );
        })}
      </div>
    );
  }
}
