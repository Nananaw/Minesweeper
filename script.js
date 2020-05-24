const size = 10;
const bombs = 15;

function createBoard()
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
    let row = Math.floor(Math.random() * size);
    let col = Math.floor(Math.random() * size);
    while(board[row][col] == 9)
    {
      row = Math.floor(Math.random() * size);
      col = Math.floor(Math.random() * size);
    }
    board[row][col] = 9;
  }
  return board;
}

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

function generateTable(table, board)
{
  for (let i=0; i<size; i++)
  {
    let row = table.insertRow();
    for (let j=0; j<size; j++)
    {
      let cell = row.insertCell();
      let button = document.createElement("button");
      if(board[i][j] == 9)
      {
        button.onclick = function()
        {
          alert('You lost.');
          location.reload();
          return false;
        };
      }
      else
      {
        if(board[i][j] > 0)
        {
          button.onclick = function(event)
          {
            event.preventDefault();
            let text = document.createTextNode(board[i][j].toString());
            document.getElementById('board').rows[i].cells[j].removeChild(document.getElementById('board').rows[i].cells[j].lastElementChild);
            document.getElementById('board').rows[i].cells[j].appendChild(text);
          };
        }
        else
        {
          button.onclick = function(event)
          {
            event.preventDefault();
            let text = document.createTextNode(" ");
            document.getElementById('board').rows[i].cells[j].removeChild(document.getElementById('board').rows[i].cells[j].lastElementChild);
            document.getElementById('board').rows[i].cells[j].appendChild(text);
            for(let b=i-1; b<i+2; b++)
            {
              for(let c=j-1; c<j+2; c++)
              {
                if((b>=0 && c>=0) && (b<=size-1 && c<=size-1))
                {
                  document.getElementById('board').rows[b].cells[c].yourButton.click();
                }
              }
            }
          };
        }
      }
      cell.appendChild(button);
    }
  }
}

x = createBoard();
x = numberBoard(x);
console.log(x);
let table = document.getElementById("board");
generateTable(table, x);
