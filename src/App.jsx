import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [
        {name: '吃饭', completed: true},
        {name: '睡觉', completed: false},
        {name: '打豆豆', completed: true}
      ],
      myIndex: -1, //在一开始的情况下是不可能有谁的index等于-1
      myHash:window.location.hash
    }
  }
  componentDidMount(){
    window.addEventListener('hashchange',()=>{
      this.setState({
        myHash:window.location.hash
      })
    })
  }
  componentWillUnMount(){
    window.removeEventListener('hashchange')
  }





  /*添加数据*/
  handleAdd = (e)=> {
    e.preventDefault();
    if(this.refs.addInput.value.length === 0){
        return false ;
    }
    let obj = {name:this.refs.addInput.value,completed:false};
    let myArr = Array.from(this.state.todos);
    myArr.push(obj);
    this.setState({
      todos:myArr
    })
    this.refs.addInput.value = ''
  }
  /*每一条数据开关*/
  handleToggle = (index)=>{
    let myArr = Array.from(this.state.todos);
    myArr[index].completed = !myArr[index].completed;
    this.setState({
      todos:myArr
    })
  }
  /*开关所有的项目*/
  toggleAll = (e)=>{
    let bool = e.target.checked;
    let myArr = Array.from(this.state.todos);
    myArr = myArr.map((item,index)=>{
      item.completed = bool;
      return item;
    })
    this.setState({
      todos : myArr
    })
  }
  /*删除掉某条数据*/
  handleDelete = (index)=>{
    let myArr = Array.from(this.state.todos);
    myArr.splice(index,1);
    this.setState({
      todos : myArr
    })
  }
  /*编辑每一条数据 */
  edit = (index) =>{
    this.setState({
      myIndex:index
    })
  }
  /*保存更改的每一项*/
  saveEdit = (index,e)=>{
    e.preventDefault();
    let myArr = Array.from(this.state.todos);
    myArr[index].name = e.target.querySelector('input').value;
    this.setState({
      myIndex:-1,
      todos:myArr
    })
  }
  /*清除所有的已完成*/
  clearAll = ()=>{
    let myArr = Array.from(this.state.todos);
    myArr = myArr.filter((item,index)=>item.completed === false);
    this.setState({
      todos:myArr
    })
  }

  render() {
    let myArr = [];
    {/*根据锚点的不同 变更显示的数据 */}
    switch (this.state.myHash){
      case '#/completed':
        myArr = this.state.todos.filter((item,index)=>item.completed === true);
        break;
      case '#/active':
        myArr = this.state.todos.filter(((item,index)=>item.completed ===false));
        break;
      default :
        myArr = this.state.todos;
        break;
    }
    return (
     <section className="todoapp">
       <header className="header">
         <h1>todos</h1>
         {/* 输入框 提交事件  */}
         <form onSubmit={this.handleAdd}>
           <input ref="addInput"  className="new-todo"
              placeholder="What needs to be done?" autoFocus />
         </form>
       </header>
       <section className="main">
         {/* 切换所有的数据开关  */}
         <input id="toggle-all" className="toggle-all" type="checkbox"
                onChange = {this.toggleAll}/>
         <label htmlFor="toggle-all">Mark all as complete</label>
         <ul className="todo-list">
           {
            myArr.map((item,index)=>{
              return (
               <li
                  className={(item.completed === true ? 'completed' : '') + ' ' +
                    (index === this.state.myIndex?'editing':'') }
                    key = {index} >
                 <div className="view">
                   <input className="toggle" type="checkbox"
                          checked = {item.completed}
                          onChange={this.handleToggle.bind(this,index)}  />
                   <label
                      onDoubleClick = {this.edit.bind(this,index)}>{item.name}</label>
                   <button className="destroy"
                            onClick = {this.handleDelete.bind(this,index)}></button>
                 </div>
                 <form onSubmit={this.saveEdit.bind(this,index)}>
                    <input className="edit" defaultValue={item.name}/>
                 </form>
               </li>
              )
            })
           }
         </ul>
       </section>
       <footer className="footer">
        {/* 使用数组迭代方法 筛选没完成的 数量 */}
         <span className="todo-count"><strong>{this.state.todos.filter((item,index)=>item.completed === false).length}</strong> item left</span>
         <ul className="filters">
           <li>
             <a className={this.state.myHash === '#/'?'selected':''} href="#/">All</a>
           </li>
           <li>
             <a className={this.state.myHash === '#/active'?'selected':''} href="#/active">Active</a>
           </li>
           <li>
             <a  className={this.state.myHash === '#/completed'?'selected':''}  href="#/completed">Completed</a>
           </li>
         </ul>
         <button className="clear-completed"
                  onClick = {this.clearAll}>Clear completed</button>
       </footer>
     </section>
    );
  }
}

export default App;
