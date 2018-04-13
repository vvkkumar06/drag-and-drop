
var draggedOut = false;
var startPos = {x: 0,y: 0};
// target elements with the "draggable" class
 interact('.draggable')
        .draggable({
     // enable inertial throwing
     inertia: false,
     // keep the element within the area of it's parent
     restrict: {
         restriction: ".container",
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
         console.log(startPos.x,startPos.y);
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
        draggableElement.textContent = 'Droppable';
        removeCanNotDropClass(draggableElement);
    },
    ondragleave: function (event) {
        // remove the drop feedback style
        event.target.classList.remove('drop-target');
        event.relatedTarget.classList.remove('can-drop');
        event.relatedTarget.classList.add('can-not-drop');
        event.relatedTarget.textContent = 'Undroppable';
        draggedOut = true;
        console.log(draggedOut);
    },
    ondrop: function (event) {
        event.relatedTarget.textContent = 'Dropped';
        draggedOut = false;
        
    },
    ondropdeactivate: function (event) {
        // remove active dropzone feedback
        event.target.classList.remove('drop-active');
        event.target.classList.remove('drop-target');
        if(draggedOut) {
            setAtPos(event.relatedTarget,startPos.x, startPos.y);
            //TODO for demonstration 
             event.relatedTarget.textContent ="Dropped";
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