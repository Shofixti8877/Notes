var savebtn = document.getElementById('save');
var noterow = document.getElementById('noterow');
var notesarray = [];

savebtn.addEventListener('click', addnote);

function init(){

  notesarray = JSON.parse(window.localStorage.getItem('notes'));
  if (notesarray) {
  for (var i = 0; i < notesarray.length; i++) {

    var note = document.createElement('div');
    note.className = 'notedivs';

    var notetxt = document.createElement('div');
    notetxt.className = 'notetxtdivs';
    notetxt.innerHTML = notesarray[i].txt;

    var notedate = document.createElement('div');
    notedate.className = 'notedatedivs';
    notedate.innerHTML = notesarray[i].date;

    var notetime = document.createElement('div');
    notetime.className = 'notetimedivs';
    notetime.innerHTML = notesarray[i].time;

    var remove = document.createElement('span');
    remove.className = 'glyphicon glyphicon-remove';


    note.appendChild(notetxt);
    note.appendChild(remove);
    note.appendChild(notedate);
    note.appendChild(notetime);
    noterow.appendChild(note);

    remove.addEventListener('click', removenote);
    }
}
else {
  notesarray=[];
}
}

init();

function addnote(){
  var usrdate = document.getElementById('usrdate').value;
  var usrtime = document.getElementById('usrtime').value;
  var usrtxt = document.getElementById('usrtxt').value;

  var datepatt = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/g;
  var timepatt = /^[0-2][0-3]:[0-5][0-9]$/g;
  var res1 = datepatt.test(usrdate);
  var res2 = timepatt.test(usrtime);
  if (res1 && res2) {

  var singleNoteForArray = {};
  singleNoteForArray.txt = usrtxt;
  singleNoteForArray.date = usrdate;
  singleNoteForArray.time = usrtime;
  notesarray.push(singleNoteForArray);
  localStorage.setItem( 'notes', JSON.stringify(notesarray) );

  var note = document.createElement('div');
  note.className = 'notedivs';

  var notetxt = document.createElement('div');
  notetxt.className = 'notetxtdivs';
  notetxt.innerHTML = usrtxt;

  var notedate = document.createElement('div');
  notedate.className = 'notedatedivs';
  notedate.innerHTML = usrdate;

  var notetime = document.createElement('div');
  notetime.className = 'notetimedivs';
  notetime.innerHTML = usrtime;

  var remove = document.createElement('span');
  remove.className = 'glyphicon glyphicon-remove';


  note.appendChild(notetxt);
  note.appendChild(remove);
  note.appendChild(notedate);
  note.appendChild(notetime);
  noterow.appendChild(note);

  remove.addEventListener('click', removenote);
  }
}


function removenote(){
  var currentNote = event.target.parentElement;
  var currentText = currentNote.firstElementChild.innerHTML;
  for (var i = 0; i < notesarray.length; i++) {
    if (notesarray[i].txt == currentText) {
      notesarray.splice(i,1);
      localStorage.setItem( 'notes', JSON.stringify(notesarray) );
    }
  }

  currentNote.style.animation = 'fadeout 1s' 
  setTimeout(function(){ currentNote.style.display = 'none'; }, 960);
}
