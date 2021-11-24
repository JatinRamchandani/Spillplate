import React from 'react'
import ioclient from 'socket.io-client'
import './style.css'



class Board extends React.Component{


    timeout;
    socket =ioclient('https://spillplate.herokuapp.com/', { transports : ['websocket'] });
    
    
    constructor(props){
        super(props);
        this.socket.on('canvas-data',function(data){
            var image = new Image();
            var canvas = document.querySelector('#board');
            var ctx =  canvas.getContext('2d');
            image.onload = function(){
                ctx.drawImage(image,0,0);
            }
            image.src = data;
        })
    }


    componentDidMount(){
        this.drawOnCanvas();
    }


    drawOnCanvas(){
        var flag = false, prevX = 0, currX = 0, prevY = 0, currY = 0, dot_flag = false;
        var canvas = document.querySelector('#board');
        var ctx = canvas.getContext('2d');
        canvas.setAttribute('width', canvas.parentNode.offsetWidth);
        canvas.setAttribute('height', canvas.parentNode.offsetHeight );

        var w = ctx.clientWidth;
        var h = ctx.clientHeight;


        canvas.addEventListener("mousemove", function (e) {
            findxy1('move', e)
        }, false);
        canvas.addEventListener("mousedown", function (e) {
            findxy1('down', e)
        }, false);
        canvas.addEventListener("mouseup", function (e) {
            findxy1('up', e)
        }, false);
        canvas.addEventListener("mouseout", function (e) {
            findxy1('out', e)
        }, false);
        

        canvas.addEventListener("touchmove", function (e) {
            findxy2('move', e)
        }, false);
        canvas.addEventListener("touchstart", function (e) {
            findxy2('down', e)
        }, false);
        canvas.addEventListener("touchend", function (e) {
            findxy2('up', e)
        }, false);
        canvas.addEventListener("touchcancel", function (e) {
            findxy2('out', e)
        }, false);

        var root =this

        function draw() {
	        ctx.beginPath();
	        ctx.moveTo(prevX, prevY);
	        ctx.lineTo(currX, currY);
	        ctx.strokeStyle = "blue";
	        ctx.lineWidth = 4;
	        ctx.stroke();
	        ctx.closePath();

            if(root.timeout != undefined) clearTimeout(root.timeout);
            root.timeout = setTimeout(function(){
                var base64ImageData = canvas.toDataURL("image/png");
                root.socket.emit('canvas-data', base64ImageData)
            }, 1000)
	    }


        function findxy1(res, e) {
	        if (res == 'down') {
	            prevX = currX;
	            prevY = currY;
                var cRect = canvas.getBoundingClientRect();
	            currX = e.clientX - cRect.offsetLeft;
	            currY = e.clientY - cRect.offsetTop;
	    
	            flag = true;
	            dot_flag = true;
	            if (dot_flag) {
	                ctx.beginPath();
	                ctx.fillStyle = "blue";
	                ctx.fillRect(currX, currY, 2, 2);
	                ctx.closePath();
	                dot_flag = false;
	            }
	        }
	        if (res == 'up' || res == "out") {
	            flag = false;
	        }
	        if (res == 'move') {
	            if (flag) {
	                prevX = currX;
	                prevY = currY;
	                currX = e.clientX - canvas.offsetLeft;
	                currY = e.clientY - canvas.offsetTop;
	                draw();
	            }
	        }
	    }


        function findxy2(res, e) {
	        if (res == 'down') {
	            prevX = currX;
	            prevY = currY;
                var cRect = canvas.getBoundingClientRect();
	            currX = e.touches[0].clientX - cRect.offsetLeft;
	            currY = e.touches[0].clientY - cRect.offsetTop;
	    
	            flag = true;
	            dot_flag = true;
	            if (dot_flag) {
	                ctx.beginPath();
	                ctx.fillStyle = "blue";
	                ctx.fillRect(currX, currY, 2, 2);
	                ctx.closePath();
	                dot_flag = false;
	            }
	        }
	        if (res == 'up' || res == "out") {
	            flag = false;
	        }
	        if (res == 'move') {
	            if (flag) {
	                prevX = currX;
	                prevY = currY;
	                currX = e.touches[0].clientX - canvas.offsetLeft;
	                currY = e.touches[0].clientY - canvas.offsetTop;
	                draw();
	            }
	        }
	    }

        
    }

    render(){
        return(
            <div class="sketch" id="sketch">
                <canvas className="board" id="board"></canvas>
            </div>
        )
    }
}


export default Board

