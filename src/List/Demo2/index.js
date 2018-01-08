// 传入对象 | 2子对象 | 
const appState = {
  title: {
    text: 'React.js 小书',
    color: 'red',
  },
  content: {
    text: 'React.js 小书内容',
    color: 'blue'
  }
}
// 状态管理函数 | 接受 状态 | 参数(包含类型&替换值)
function stateChanger (state, action) {
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
// 仓库函数 接受 状态 | 状态管理函数
function createStore (state, stateChanger) {
  //创建一个数组
  const listeners = []
  //观察者模式函数 传入一函数参数，然后推入上面数组
  const subscribe = (listener) => listeners.push(listener)
  //返回的 获取状态 方法
  const getState = () => state
  //放回的派遣 方法 | 传入动作参数(类型匹配 | 要改的值)
  const dispatch = (action) => {
    //覆盖原对象
    state = stateChanger(state, action)
    //遍历数组,执行监听函数
    listeners.forEach((listener) => listener())
  }
  //返回
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

//设置变量
const store = createStore(appState, stateChanger)
//旧状态保留
let oldState = store.getState()
//传入函数
store.subscribe(() => {
  //新状态
  const newState = store.getState()
  //执行(对比新旧状态进行渲染)
  renderApp(newState, oldState)
  //完成后，新转为旧状态
  oldState = newState
})

renderApp(store.getState()) // 首次渲染页面
store.dispatch({ type: 'UPDATE_TITLE_TEXT', text: '《React.js 小书》' }) // 修改标题文本
store.dispatch({ type: 'UPDATE_TITLE_COLOR', color: 'blue' }) // 修改标题颜色
