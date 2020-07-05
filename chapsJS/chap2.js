function printTriangle(){
  let outerTriangle = window.prompt("How big is the triangle?");
  outerTriangle = parseInt(outerTriangle);
  let content = "";
  document.getElementById("triangle").innerHTML = content;

  
  if (Number.isInteger(outerTriangle) === false){
    outerTriangle = prompt("Please enter a number!")
  }
  
  else if (Number.isInteger(outerTriangle) === true){
    let innerTriangle = 1;
    
    while (innerTriangle <= outerTriangle){
      let i = 0;
      while (i < innerTriangle){
        content = content + "#";
        i++;
      }
      document.getElementById("triangle").innerHTML = document.getElementById("triangle").innerHTML
       + "<br>" + content;
      content = "";
      innerTriangle++;
    }
  }
  
}

function printFizzBuzz(){
  /*print all the numbers from 1 to 100, with two exceptions.
    For numbers divisible by 3, print "Fizz" and for numbers divisible by 5 (and not 3),
    print "Buzz" instead.

    print "FizzBuzz" for numbers that are divisible by both 3   and 5
    (and still print "Fizz" or "Buzz" for numbers divisible by only one of those).
  */
  let content = "";
  document.getElementById("fizzbuzz").innerHTML = content;
  
  let i = 1;
  
  while (i <= 100){
    if (i%15 === 0){
      content = i + ": fizzbuzz ";
    }
    else if (i%5 === 0){
      content = i + ": buzz ";
    }
    else if (i%3 === 0){
      content = i + ": fizz ";
    }
    document.getElementById("fizzbuzz").innerHTML = document.getElementById("fizzbuzz").innerHTML + content;
    content = "";
    i++;
  }
}

function printChessBoard(){
  let outerChess = window.prompt("How big do you want the board?", "8x8");
  outerChess = parseInt(outerChess);
  let content = "";
  document.getElementById("chessboard").innerHTML = content;
  
  let innerChess = 0, i = 0, string = "";
  
  while (innerChess < outerChess){
    if (innerChess%2 === 0){
      while (i < outerChess){
        if (i%2 === 0){
          string = string + "&nbsp";
        }
        else if (i%2 !== 0){
          string = string + "#";
        }
        i++;
      }
    } else if (innerChess !== 0){
      while (i < outerChess){
        if (i%2 === 0){
          string = string + "#";
        }
        else if (i%2 !== 0){
          string = string + "&nbsp";
        }
        i++;
      }
    }
    innerChess++;
    document.getElementById("chessboard").innerHTML = document.getElementById("chessboard").innerHTML + string + "<br>";
    string = ""; i = 0;
  }
}