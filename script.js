const size = 10;
const bombs = 15;

//creates initial table where first move isn't lethal
function createGame(table)
{
  for(let i=0; i<size; i++)
  {
    let row = table.insertRow();
    for(let j=0; j<size; j++)
    {
      let cell = row.insertCell();
      let button = document.createElement("button");
      button.onclick = function()
      {
        startGame(table, i, j);
      };
      cell.appendChild(button);
    }
  }
}

//starts the game
function startGame(table, row, col)
{
  let x = createBoard(row, col);
  x = numberBoard(x);
  generateTable(table, x, row, col);
  console.log(x);
}

//creates board based on first move
function createBoard(row, col)
{
  board = new Array(size);
  for(let i=0; i<size; i++)
  {
    board[i] = new Array(size);
    for(let j=0; j<size; j++)
    {
      board[i][j] = 0;
    }
  }
  for(let i=0; i<bombs; i++)
  {
    let r = Math.floor(Math.random() * size);
    let c = Math.floor(Math.random() * size);
    while(board[r][c] == 9 || (r == row && c == col))
    {
      r = Math.floor(Math.random() * size);
      c = Math.floor(Math.random() * size);
    }
    board[r][c] = 9;
  }
  return board;
}

//adds numbers(of mines adjacent) to the board
function numberBoard(board)
{
  for(let i=0; i<size; i++)
  {
    for(let j=0; j<size; j++)
    {
      board[i][j] = number(board, i, j);
    }
  }
  return board;
}

//gives number for specified square on board
//9 is for a mine
function number(board, i, j)
{
  if(board[i][j] == 9)
  {
    return 9;
  }
  else
  {
    return checkBox(board, i ,j);
  }
}

//checks adjacent mines
function checkBox(board, i, j)
{
  let a = 0;
  for(let b=i-1; b<i+2; b++)
  {
    for(let c=j-1; c<j+2; c++)
    {
      if((b>=0 && c>=0) && (b<=size-1 && c<=size-1) && (board[b][c] == 9))
      {
        a++;
      }
    }
  }
  return a;
}

//removes everything from table
function resetBoard(table)
{
  for(let i=0; i<size; i++)
  {
    table.deleteRow(0);
  }
}

//sets up table based on first move and does first move
function generateTable(table, board, row, col)
{
  resetBoard(table);
  for (let i=0; i<size; i++)
  {
    let row = table.insertRow();
    for (let j=0; j<size; j++)
    {
      let cell = row.insertCell();
      /*if((i == row) && (j == col))
      {
        let text = document.createElement("TD");
        text.innerHTML = board[i][j].toString();
        cell.appendChild(text);
      }*/
      let button = document.createElement("button");
      button.addEventListener("contextmenu", function(ev)
      {
        ev.preventDefault();
        flag(board, i, j);
        return false;
      }, false);
      button.addEventListener("click", () => clickNormal(board, i, j));
      cell.appendChild(button);
    }
  }
  document.getElementById('board').rows[row].cells[col].lastElementChild.click();
}

function nothing()
{
  event.preventDefault();
  return false;
}

function clickNormal(board, i, j)
{
  if(board[i][j] == 9)
  {
    alert('You lost.');
    location.reload();
    return false;
  }
  else if (board[i][j] == 0)
  {
    event.preventDefault();
    let text = document.createElement("TD");
    text.innerHTML = board[i][j].toString();
    document.getElementById('board').rows[i].cells[j].removeChild(document.getElementById('board').rows[i].cells[j].lastElementChild);
    document.getElementById('board').rows[i].cells[j].appendChild(text);
    for(let u=i-1; u<i+2; u++)
    {
      for(let v=j-1; v<j+2; v++)
      {
        if((u>=0) && (u<size) && (v>=0) && (v<size))
        {
          let a = document.getElementById('board').rows[u].cells[v].lastElementChild;
          if(a.tagName == 'BUTTON')
          {
            a.click();
          }
        }
      }
    }
  }
  else
  {
    event.preventDefault();
    let text = document.createElement("TD");
    text.innerHTML = board[i][j].toString();
    document.getElementById('board').rows[i].cells[j].removeChild(document.getElementById('board').rows[i].cells[j].lastElementChild);
    document.getElementById('board').rows[i].cells[j].appendChild(text);
  }
}

function flag(board, row, col)
{
  event.preventDefault();
  document.getElementById('board').rows[row].cells[col].removeChild(document.getElementById('board').rows[row].cells[col].lastElementChild);
  let button = document.createElement("button");
  button.classList.add("flagged");
  button.addEventListener("click", nothing);
  button.addEventListener("contextmenu", () => unflag(board, row, col));
  document.getElementById('board').rows[row].cells[col].appendChild(button);
  console.log("flagged");
}

function unflag(board, row, col)
{
  event.preventDefault();
  document.getElementById('board').rows[row].cells[col].removeChild(document.getElementById('board').rows[row].cells[col].lastElementChild);
  let button = document.createElement("button");
  button.addEventListener("click", () => clickNormal(board, row, col));
  button.addEventListener("contextmenu", () => flag(board, row, col));
  document.getElementById('board').rows[row].cells[col].appendChild(button);
  console.log("unflagged");
}

let table = document.getElementById("board");
createGame(table);
