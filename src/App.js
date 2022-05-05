import React, { useState } from "react";
import './App.css';

function App() {
  const [boards, setBoards] = useState([
    {id:1, title:'To-Do', items:[{id:1, title:'go park', deadline:'21:00', experience:'100'},{id:2, title:'go home',deadline:'21:00', experience:'100'},{id:3, title:'go kino',deadline:'21:00', experience:'100'}]},
    {id:2, title:'Processing', items:[{id:4, title:'do homework',deadline:'21:00', experience:'100'},{id:5, title:'go after',deadline:'21:00', experience:'100'},{id:6, title:'go gggg',deadline:'21:00', experience:'100'}]},
    {id:3, title:'Done', items:[{id:7, title:'godgfgfdgdrk',deadline:'21:00', experience:'100'},{id:8, title:'gfdhdfgdbdfome',deadline:'21:00', experience:'100'},{id:9, title:'gbdbdfbdsdfo kino',deadline:'21:00', experience:'100'}]},
  ])

  const [currentBoard, setCurrentBoard] = useState(null);
  const [currentItem, setCurrentItem] = useState(null);

  function dragStartHandler(e, board,item) {
    setCurrentBoard(board)
    setCurrentItem(item)
  }
  function dragLeaveHandler(e) {
    e.target.style.boxShadow ='none'
  }
  function dragEndHandler(e) {
    e.target.style.boxShadow ='none'
  }
  function dragOverHandler(e) {
    e.preventDefault();
    if(e.target.className === 'item') {
      e.target.style.boxShadow ='0 4px 3px gray'
    }
  }
  function dropHandler(e,board,item) {
    e.preventDefault();
    const currentIndex = currentBoard.items.indexOf(currentItem)
    currentBoard.items.splice(currentIndex,1)

    const dropIndex = board.items.indexOf(item)
    board.items.splice(dropIndex+1,0,currentItem)
    setBoards(boards.map(b =>{
      if(b.id === board.id) {
        return board;
      }
      if(b.id === currentBoard.id) {
        return currentBoard;
      }
      return b;
    }))
  }

  return (
    <div className="trello">
      <h1>Trello-Lite</h1>
      {boards.map(board =>
      <div className='board'>
        <div className='board_title'>{board.title}</div>
        {board.items.map(item =>
          <div 
          onDragStart={(e) => dragStartHandler(e, board,item)}
          onDragLeave={e => dragLeaveHandler(e)}
          onDragEnd={(e) => dragEndHandler(e)}
          onDragOver={(e) => dragOverHandler(e)}
          onDrop={(e) => dropHandler(e,board,item)}
          draggable={true}
          className='item'>Do:{item.title}, <br/> Deadline:{item.deadline}<br/> Experience:{item.experience}</div>
          )}
      </div>
        )}
    </div>
  );
}

export default App;
