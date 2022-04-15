import $ from 'jquery';

import BpmnModeler from 'bpmn-js/lib/Modeler';

import diagramXML from '../resources/newDiagram.bpmn';

var container = $('#js-drop-zone');

var modeler = new BpmnModeler({
  container: '#js-canvas'
});

var canvas = modeler.get('canvas');
var eventBus = modeler.get('eventBus');

var search = new URLSearchParams(window.location.search); 
var browserNavigationInProgress;

// update the URL and browser history when switching to another root element 
eventBus.on('root.set', function(event) {
  
  // location is already updated through the browser history API
  if(browserNavigationInProgress){
    return;
  }

  var rootElement = event.element;

  search.set('rootElement', rootElement.id);
  window.history.pushState({element: rootElement.id}, null, 'index.html?' + search.toString());
});

// listen to browser navigation and change the root element accordingly
window.addEventListener('popstate', (event) => {
  var rootElement = event.state && event.state.element;

  if(!rootElement){
    return;
  }

  browserNavigationInProgress = true;
  canvas.setRootElement(canvas.findRoot(rootElement));
  browserNavigationInProgress = false;
});

function createNewDiagram() {
  openDiagram(diagramXML);
}


async function openDiagram(xml) {

  try {

    // import the diagram and set the root element from the search params
    browserNavigationInProgress = !!search.get('rootElement');
    //await modeler.importXML(xml);
    modeler.importXML(xml).then(function() {
      var root = search.get('rootElement');
      if (root) {
        canvas.setRootElement(canvas.findRoot(root));
      }
    
      browserNavigationInProgress = false;
    });

    container
      .removeClass('with-error')
      .addClass('with-diagram');
  } catch (err) {

    container
      .removeClass('with-diagram')
      .addClass('with-error');

    container.find('.error pre').text(err.message);

    console.error(err);
  }
}

function registerFileDrop(container, callback) {

  function handleFileSelect(e) {
    e.stopPropagation();
    e.preventDefault();

    var files = e.dataTransfer.files;

    var file = files[0];

    var reader = new FileReader();

    reader.onload = function(e) {

      var xml = e.target.result;

      callback(xml);
    };

    reader.readAsText(file);
  }

  function handleDragOver(e) {
    e.stopPropagation();
    e.preventDefault();

    e.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
  }

  container.get(0).addEventListener('dragover', handleDragOver, false);
  container.get(0).addEventListener('drop', handleFileSelect, false);
}


// file drag / drop ///////////////////////

// check file api availability
if (!window.FileList || !window.FileReader) {
  window.alert(
    'Looks like you use an older browser that does not support drag and drop. ' +
    'Try using Chrome, Firefox or the Internet Explorer > 10.');
} else {
  registerFileDrop(container, openDiagram);
}

// bootstrap diagram functions

$(function() {

  $('#js-create-diagram').click(function(e) {
    e.stopPropagation();
    e.preventDefault();

    createNewDiagram();
  });

  var downloadLink = $('#js-download-diagram');
  var downloadSvgLink = $('#js-download-svg');

  $('.buttons a').click(function(e) {
    if (!$(this).is('.active')) {
      e.preventDefault();
      e.stopPropagation();
    }
  });

  function setEncoded(link, name, data) {
    var encodedData = encodeURIComponent(data);

    if (data) {
      link.addClass('active').attr({
        'href': 'data:application/bpmn20-xml;charset=UTF-8,' + encodedData,
        'download': name
      });
    } else {
      link.removeClass('active');
    }
  }

  var exportArtifacts = debounce(async function() {

    try {

      const { svg } = await modeler.saveSVG();

      setEncoded(downloadSvgLink, 'diagram.svg', svg);
    } catch (err) {

      console.error('Error happened saving svg: ', err);
      setEncoded(downloadSvgLink, 'diagram.svg', null);
    }

    try {

      const { xml } = await modeler.saveXML({ format: true });
      setEncoded(downloadLink, 'diagram.bpmn', xml);
    } catch (err) {

      console.error('Error happened saving XML: ', err);
      setEncoded(downloadLink, 'diagram.bpmn', null);
    }
  }, 500);

  modeler.on('commandStack.changed', exportArtifacts);
});



// helpers //////////////////////

function debounce(fn, timeout) {

  var timer;

  return function() {
    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(fn, timeout);
  };
}
