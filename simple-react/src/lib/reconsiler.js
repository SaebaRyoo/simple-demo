// 首先需要知道react最基本的就是vdom
// vdom就是jsx通过babel转义成为调用react的createElement函数
function createElement(type, props, ...children) {
  // children放在props中，可以通过this.props.children获取到子元素
  delete props.__self;
  delete props.__source;
  return {
    type,
    props: {
      ...props,
      children: children.map(child => typeof child === 'object' ? child : createTextNode(child) )
    }
  }
}

// 创建文本节点
function createTextNode(text) {
  return {
    type: 'TEXT',
    props: {
      nodeValue: text,
      children: []
    }
  }
}


function createDOM(vdom) {
  let dom = null;
  // 判断vdom是文本节点还是元素
  if (vdom.type === 'TEXT') {
    dom = document.createTextNode(vdom.props.nodeValue);
  } else {
    dom = document.createElement(vdom.type);
    
    // 将属性都挂载到dom上
    if (vdom.props) {
      Object.keys(vdom.props)
      .filter(name => name !== 'children')
      .forEach(name => {
        if (name.indexOf('on') > -1) {
          const eventName = name.slice(2).toLowerCase();
          dom.addEventListener(eventName, vdom.props[name], false);
        } else {
          dom[name] = vdom.props[name];
        }
      });
    }

  }

  return dom;
}

/**
 * 暂时未支持class组件和函数组件
 * @param {虚拟DOM} vdom 
 * @param {容器} container 
 * 
 * 可以传入下面的jsx代码测试
  function handleClick() {
    alert('当当')
  }

  const App = (
    <div>
      <h1>title</h1>
      <a href="http://www.baidu.com"></a>
      <button onClick={handleClick}>点我</button>
    </div>
  )
 */
function render(vdom, container) {
  // workInProgressRoot = {
  //   dom: vdom,
  // }
  let dom = createDOM(vdom);
  container.appendChild(dom);
}



let nextUnitOfWork = null;
let workInProgressRoot = null;

function workLoop(deadline) {
  while ( nextUnitOfWork && deadline.timeRemaining() > -1) {
    // 在有下一个任务且浏览器有空闲时间时调用
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
  }

  // 只要应用还在就一直执行workLoop
  requestIdleCallback(workLoop)
}
requestIdleCallback(workLoop);


// performUnitOfWork执行 当前的任务，返回下一个任务
// 也就是fiber
function performUnitOfWork(fiber) {
  if (!fiber.dom) {
    fiber.dom = 
  }
}



export default {
  createElement,
  render
}