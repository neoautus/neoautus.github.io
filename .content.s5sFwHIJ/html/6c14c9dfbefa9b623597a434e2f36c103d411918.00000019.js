// JS Calendar
var calendar = null; // remember the calendar object so that we reuse
// it and avoid creating another

// This function gets called when an end-user clicks on some date
function selected(cal, date) {
	
	cal.sel.value = date; // just update the value of the input field
	if(cal.sel.alt == "1000"){
		validateField(cal.sel);
	}
}

// And this gets called when the end-user clicks on the _selected_ date,
// or clicks the "Close" (X) button.  It just hides the calendar without
// destroying it.
function closeHandler(cal) {
	cal.hide();			// hide the calendar

	// don't check mousedown on document anymore (used to be able to hide the
	// calendar when someone clicks outside it, see the showCalendar function).
	Calendar.removeEvent(document, "mousedown", checkCalendar);
}

// This gets called when the user presses a mouse button anywhere in the
// document, if the calendar is shown.  If the click was outside the open
// calendar this function closes it.
function checkCalendar(ev) {
	var el = Calendar.is_ie ? Calendar.getElement(ev) : Calendar.getTargetElement(ev);
	for (; el != null; el = el.parentNode)
	// FIXME: allow end-user to click some link without closing the
	// calendar.  Good to see real-time stylesheet change :)
	if (el == calendar.element || el.tagName == "A") break;
	if (el == null) {
		// calls closeHandler which should hide the calendar.
		calendar.callCloseHandler(); Calendar.stopEvent(ev);
	}
}

// This function shows the calendar under the element having the given id.
// It takes care of catching "mousedown" signals on document and hiding the
// calendar if the click was outside.
function showCalendar(id) {
	var el = document.getElementById(id);
	if (calendar != null) {
		// we already have one created, so just update it.
		calendar.hide();		// hide the existing calendar
		calendar.parseDate(el.value); // set it to a new date
	} else {
		// first-time call, create the calendar
		var cal = new Calendar(true, null, selected, closeHandler);
		calendar = cal;		// remember the calendar in the global
		cal.setRange(1900, 2070);	// min/max year allowed
		calendar.create();		// create a popup calendar
		calendar.parseDate(el.value); // set it to a new date
	}
	calendar.sel = el;		// inform it about the input field in use
	calendar.showAtElement(el);	// show the calendar next to the input field

	// catch mousedown on the document
	Calendar.addEvent(document, "mousedown", checkCalendar);
	return false;
}