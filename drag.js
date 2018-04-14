/**
 *  Since onMove: dragMoveListener we are using translate function which actually translate an element
 *  from  one position to anoother, which is not actually original location of an element in HTML body, If 
 *  an element starts from one position its value will be 0, and we are translating according to the data 
 *  it moved. We don't want to do this. 
 *  We have many panes we want to keep location of panes relative to HTML Body and we want to keep our 
 *  draggables(or widgets) relative to panes( or dropzone). 
 *  In this case what I am trying to do here is, I will save ID of pane in which widget is currently residing.
 *  and location of widgets relative to panes.
 */

var draggedOut = false;
var startPos = {x: 0,y: 0};

//starting positions of widgets and pane
var widget = [
            {
                id:'widget-1',
                parentId: 'pane-1',
                x: 9,
                y: 83
            },
            {
                id:'widget-2',
                parentId: 'pane-2',
                x: 13.25,
                y: 223.8125
            }
        ]
var pane = [{ 
                 id: 'pane-1',
                 x: 45.703125,
                 y: -72.125
            },
            {
                 id: 'pane-2',
                 x: 45.703125,
                 y: 339.875
            }]
// target elements with the "draggable" class
 interact('.draggable')
        .draggable({
     // enable inertial throwing
     inertia: false,
     // keep the element within the area of it's parent
     restrict: {
         restriction: '.container',
         endOnly: true,
         elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
     },
     // enable autoScroll
     autoScroll: true,

     onstart: function (event) {
         if(!draggedOut){
             startPos.x = event.target.getAttribute('data-x') || 0;
             startPos.y = event.target.getAttribute('data-y') || 0;
         }
     },

     // call this function on every dragmove event
     onmove: dragMoveListener,
     // call this function on every dragend event
     onend: function (event) {
     }
    });
    /* The dragging code for '.draggable' from the demo above
    * applies to this demo as well so it doesn't have to be repeated. */

    // enable draggables to be dropped into this
    interact('.dropzone').dropzone({
    // only accept elements matching this CSS selector
    accept: '.draggable',
    // Require a 75% element overlap for a drop to be possible
    overlap: 1,
    // listen for drop related events:

    ondropactivate: function (event) {
        // add active dropzone feedback
        event.target.classList.add('drop-active');
    },
    ondragenter: function (event) {
        var draggableElement = event.relatedTarget,
            dropzoneElement = event.target;
         
        // feedback the possibility of a drop
        dropzoneElement.classList.add('drop-target');
        draggableElement.classList.add('can-drop');
        draggableElement.textContent = 'Dragged in';
        removeCanNotDropClass(draggableElement);
    },
    ondragleave: function (event) {
        // remove the drop feedback style
        event.target.classList.remove('drop-target');
        event.relatedTarget.classList.remove('can-drop');
        event.relatedTarget.classList.add('can-not-drop');
        event.relatedTarget.textContent = 'Dragged out';
        draggedOut = true;
    },
    ondrop: function (event) {
        event.relatedTarget.textContent = 'Dropped';
        dropzoneID = event.target.getAttribute('id');
        draggedOut = false;
        //Use this to store updated location of widgets
        widget[0].x = event.relatedTarget.getBoundingClientRect().x - event.target.getBoundingClientRect().x;
        widget[0].y = event.relatedTarget.getBoundingClientRect().y - event.target.getBoundingClientRect().y;
          //TODO just for testing
        console.log(widget[0].x, widget[0].y); 
        console.log(dropzoneID);
    },
    ondropdeactivate: function (event) {
        // remove active dropzone feedback
        event.target.classList.remove('drop-active');
        event.target.classList.remove('drop-target');
        if(draggedOut) {
            setAtPos(event.relatedTarget,startPos.x, startPos.y);
        }
    }
    });

    function dragMoveListener (event) {
    var target = event.target,
        // keep the dragged position in the data-x/data-y attributes
        x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
        y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

    // translate the element
    target.style.webkitTransform =
        target.style.transform =
            'translate(' + x + 'px, ' + y + 'px)';

    // update the position attributes
    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
}
    function setAtPos(target,x,y){
         // translate the element
    target.style.webkitTransform =
    target.style.transform =
    'translate(' + x + 'px, ' + y + 'px)';
        	removeCanNotDropClass(target);
        // update the position attributes
        target.setAttribute('data-x', x);
        target.setAttribute('data-y', y);
    }

    function removeCanNotDropClass(target){
        target.classList.remove('can-not-drop');
    }