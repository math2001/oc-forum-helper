function setCaretPosition(el, caretPos) {
    el.value = el.value;
    // ^ this is used to not only get "focus", but
    // to make sure we don't have it everything -selected-
    // (it causes an issue in chrome, and having it doesn't hurt any other browser)

    if (el !== null) {
        if (el.createTextRange) {
            var range = el.createTextRange();
            range.move('character', caretPos);
            range.select();
            return true;
        }

        else {
            // (el.selectionStart === 0 added for Firefox bug)
            if (el.selectionStart || el.selectionStart === 0) {
                el.focus();
                el.setSelectionRange(caretPos, caretPos);
                return true;
            }

            else  { // fail city, fortunately this never happens (as far as I've tested) :)
                el.focus();
                return false;
            }
        }
    }
}

function insertAtCaret(el, text) {
	var caretPos = el.selectionStart;
	var textAreaTxt = el.value;
	el.value = textAreaTxt.substring(0, caretPos) + text + textAreaTxt.substring(caretPos);
	setCaretPosition(el, caretPos + text.length)
};


// document.getElementsByTagName('textarea')[0].addEventListener("keydown", function(e) {
  //  if (e.keyCode == 9) {
   //     insertAtCaret(this, '\t', true)
  //      e.preventDefault()
  //  }
//})
document.body.addEventListener('keydown', function (e) {
	if (e.target.nodeName == 'TEXTAREA') {
		if (e.keyCode == 9) {
			insertAtCaret(e.target, '    ')
			e.preventDefault()
		}
	}
})