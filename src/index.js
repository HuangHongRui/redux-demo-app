// 状态管理函数 | 接受 状态 | 参数(包含类型&替换值)
// 该取回真正的名字了
function reducer (state, action) {
// 传入对象 | 2子对象 | 
  // 如果没有传入，那么自己初始一个状态并返回
  if(!state){
    return {
      title: {
        text: 'React.js 小书',
        color: 'red',
      },
      content: {
        text: 'React.js 小书内容',
        color: 'blue'
      }
    }
  }
  //匹配类型
  switch (action.type) {
    case 'UPDATE_TITLE_TEXT':
      //返回一新对象-浅复制
      return {
        ...state,
        title: {
          ...state.title,
          //再把要改的覆盖上
          text : action.text
        }
      }
      break
    case 'UPDATE_TITLE_COLOR':
      return {
        ...state,
        color: {
          ...state.title,
          color: action.color
        }
      }
      break
    default:
      return state
  }
}
// 仓库函数 接受 => 状态管理函数 
function createStore (reducer) {
  //先初始化先
  let state = null
  //创建个空数组
  const listeners = []
  //观察者模式函数 传入一函数参数，推入上面数组
  const subscribe = (listener) => listeners.push(listener)
  //返回 获取状态 方法
  const getState = () => state
  //放回派遣 方法 | 传入动作参数(类型匹配 | 要改的值)
  const dispatch = (action) => {
    //覆盖原对象
    state = reducer(state, action)
    //遍历数组,执行监听函数
    listeners.forEach((listener) => listener())
  }
  //首次初始化状态并渲染
  dispatch({})
  return { getState, dispatch, subscribe }
}
function renderApp (newAppState, oldAppState = {}) {
  if(newAppState === oldAppState) return
  console.log('render app...')
  renderTitle(newAppState.title,oldAppState.title)
  renderContent(newAppState.content, oldAppState.content)
}
function renderTitle (newTitle, oldTitle = {}) {
  if(newTitle === oldTitle) return
  console.log('render title...')
  const titleDOM = document.getElementById('title')
  titleDOM.innerHTML = newTitle.text
  titleDOM.style.color = newTitle.color
}

function renderContent (newContent, oldContent = {}) {
  if(newContent === oldContent) return 
  console.log('render content...')
  const contentDOM = document.getElementById('content')
  contentDOM.innerHTML = newContent.text
  contentDOM.style.color = newContent.color
}

//导出-。-
const store = createStore(reducer)
//第一次初始状态null
let oldState = store.getState()
//传入观察者函数
store.subscribe(() => {
  //新状态 第一次也是初始化
  const newState = store.getState()
  //执行(对比新旧状态进行渲染)
  renderApp(newState, oldState)
  //完成后，新转为旧状态
  oldState = newState
})

renderApp(store.getState()) // 首次渲染页面
store.dispatch({ type: 'UPDATE_TITLE_TEXT', text: '《React.js 小书》' }) // 修改标题文本
store.dispatch({ type: 'UPDATE_TITLE_COLOR', color: 'blue' }) // 修改标题颜色
