function AnkiQaController() {
  this.ankiQue = '';
  this.ankiAns = '';
  this.inputQue = document.getElementById('aQue');
  this.inputAns = document.getElementById('aAns');
  this.qa = [];
  
  this.addQuestion = function() {
    if(this.ankiAns.length === 0 ) {
      this.inputAns.focus();
    }
    if (this.ankiQue.length > 0 && this.ankiAns.length > 0) {
       this.addAnswer();
    } 
  }

  this.addAnswer = function() { 
    if (this.ankiQue.length === 0 ) {
      this.inputQue.focus();
      return;
    }

    if(this.ankiAns.length === 0) {
      return;
    }
   

  if(this.qa.length > 0) {
    this.qa.unshift({
      question: this.ankiQue,
      answer: this.ankiAns
    });
  } else {
      this.qa.splice(0, 1, { 
        question: this.ankiQue,
        answer: this.ankiAns
      });
    }

    this.ankiQue = '';
    this.ankiAns = '';
    this.inputQue.focus();
  }

  this.updateField = function($index) {
    if(this.qa[$index].question.length === 0 || this.qa[$index].answer.length === 0) {
      return;
    }
    
    this.inputQue.focus();
  }

  this.removeQA = function($index) {
    var removeEl = document.getElementById('qa-' + $index);
    removeEl.remove();
    this.qa.splice($index, 1);
  }

  //move savefile to directive
  this.saveFile = function() {
    var qaContent = document.getElementsByClassName('anki-qa');
    var fileArr = new Array();
    for(i = 0; i < qaContent.length; i++) {
      if(i % 2 === 0) {
        fileArr.push(qaContent[i].innerHTML + ", ");
      } else {
        fileArr.push(qaContent[i].innerHTML + "\n"); 
      }
    }
    
    fileArr = fileArr.join('');
    var blob = new Blob([fileArr], {type: "text/plain;charset=utf-8"});
    saveAs(blob, "flashcard-import-file.txt");
  }

}

angular
  .module('ankiFile')
  .controller('AnkiQaController', AnkiQaController);