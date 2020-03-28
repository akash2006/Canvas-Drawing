var database;
var currentPath = [];
var drawing = [];
var isDrawing = false;
function setup(){
    canvas = createCanvas(400,400);
    canvas.mousePressed(startPath);
    canvas.parent('canvascontainer');
    canvas.mouseReleased(endPath);
    var clearButton = select('#clearButton');
    clearButton.mousePressed(clearDrawing);

    
    database = firebase.database();

    var ref = database.ref('drawings');
    ref.on('value', gotData, errData);

}

function startPath(){
    isDrawing = true;
    currentPath = [];
    drawing.push(currentPath);
}

function endPath(){
  isDrawing = false;
}

function draw(){
    background(0);

    if(isDrawing){
        var point = {
            x:mouseX,
            y:mouseY
        }
        currentPath.push(point);
    }

   
    
    stroke(255);
    strokeWeight(4);
    noFill();

    for (var i = 0 ; i < drawing.length ; i++){
        var path = drawing[i];
        beginShape();
        for (var j = 0 ; j < path.length ; j++){
            vertex(path[j].x,path[j].y);
        }
        endShape();
    } 
    
}

// function saveDrawing(){
//     var ref = database.ref('drawings');
//     var data = {
//         name:"Akash",
//         drawing:drawing
//     }
//    var result = ref.push(data, dataSent);
//    console.log(result.key);
    
//     function dataSent(err, status){
//         console.log(status);
//     }
    
// }

function gotData(){
    var drawings = data.val();
    var keys = Object.keys(drawings);
    for(var i=0;i<keys.length;i++){
        var key = keys[i];
        // console.log(key);
        var li = createElement('li', '');
        var ahref = createA('#',key);
        ahref.mousePressed(showDrawing);
        ahref.parent(li);
        li.parent('drawinglist');
        
    }
}

function errData(err){
    console.log(err);
}

function showDrawing(){
    var key = this.html();
    var ref = database.ref('database/'+key);
    ref.on('value')
    console.log(this.html());
}

function clearDrawing(){
    
    drawing = [];
}