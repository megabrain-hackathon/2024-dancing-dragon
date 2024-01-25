import React, { Component } from 'react';
import './Test.css';

export default class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [
        {
          taskID: 1,
          task: 'Walk the walk'
        },
        {
          taskID: 2,
          task: 'Talk the talk'
        },
        {
          taskID: 3,
          task: 'Jump the jump'
        }
      ],
      completedTasks: [],
      draggedTask: {}
    }
  }
  
  render() {
    const { todos, completedTasks} = this.state;
    return (
      <div className="App">
        <div className="todos">
          {
            todos.map(todo =>
              <div
                key={todo.taskID}
                draggable
                onDrag={(e) => {
                  e.preventDefault();
                  this.setState({draggedTask: todo});
                }}
              >
                {todo.task}
              </div>
            )
          }
        </div>
        <div
          onDrop={(e) => {
            e.preventDefault();
            const { draggedTask, completedTasks, todos } = this.state;
            const newCompletedTasks = [...completedTasks, draggedTask];
            this.setState({
              completedTasks: newCompletedTasks,
              todos: todos.filter(todo => todo.taskID !== draggedTask.taskID),
              draggedTask: {},
            });
          }}
          onDragOver={
            (e) => {
              e.preventDefault();
            }
          }
          className="done"
        >
          {completedTasks.map((task, index) =>
            <div
              key={task.taskID}
            >
              {task.task}
            </div>
          )}
        </div>
      </div>
    );
  }
}
