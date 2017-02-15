/*+***********************************************************************************
 * The contents of this file are subject to the vtiger CRM Public License Version 1.0
 * ("License"); You may not use this file except in compliance with the License
 * The Original Code is:  vtiger CRM Open Source
 * The Initial Developer of the Original Code is vtiger.
 * Portions created by vtiger are Copyright (C) vtiger.
 * All Rights Reserved.
 *************************************************************************************/

function getPDFBreaklineDiv(rootElm, id) {
	document.getElementById('vtbusy_info').style.display = 'inline';
	fetch('index.php?module=PDFMaker&action=PDFMakerAjax&file=breaklineSelect&return_id='+ id, {
		credentials: 'same-origin'
	}).then(function(response) {
		return response.text();
	}).then(function(data) {
		getObj('PDFBreaklineDiv').innerHTML = data;
		fnvshobj(rootElm, 'PDFBreaklineDiv');
		//var PDFBreakline = document.getElementById('PDFBreaklineDiv');
		jQuery("#PDFBreaklineDiv").draggable();
		//var PDFBreaklineHandle = document.getElementById('PDFBreaklineDivHandle');
		//jQuery("#PDFBreaklineDivHandle").draggable();
		document.getElementById('vtbusy_info').style.display = 'none';
	});
}

function getPDFImagesDiv(rootElm, id) {
	document.getElementById('vtbusy_info').style.display = 'inline';
	fetch('index.php?module=PDFMaker&action=PDFMakerAjax&file=imagesSelect&return_id='+ id, {
		credentials: 'same-origin'
	}).then(function(response) {
		return response.text();
	}).then(function(data) {
		getObj('PDFImagesDiv').innerHTML = data;
		fnvshobj(rootElm, 'PDFImagesDiv');
		//var PDFImages = document.getElementById('PDFImagesDiv');
		jQuery("#PDFImagesDiv").draggable();
		//var PDFImagesHandle = document.getElementById('PDFImagesDivHandle');
		//jQuery("#PDFImagesDivHandle").draggable();
		document.getElementById('vtbusy_info').style.display = 'none';
	});
}

function sendPDFmail(module, idstrings) {
	var smodule = document.DetailView.module.value;
	var record = document.DetailView.record.value;

	document.getElementById('vtbusy_info').style.display = 'inline';
	fetch('index.php?module=PDFMaker&return_module=' + module + '&action=PDFMakerAjax&file=mailSelect&idlist='+ idstrings, {
		credentials: 'same-origin'
	}).then(function(response) {
		return response.text();
	}).then(function(data) {
		if (data == "Mail Ids not permitted" || data == "No Mail Ids") {
			openPopUp('xComposeEmail',this,
				'index.php?module=Emails&action=EmailsAjax&file=EditView&pmodule=' + module + '&pid='
				+ idstrings + '&language=' + document.getElementById('template_language').value
				+ '&sendmail=true&attachment=' + smodule + '_' + record + '.pdf',
			'createemailWin', 820, 689,
			'menubar=no,toolbar=no,location=no,status=no,resizable=no');

			window.location.href = 'index.php?module=PDFMaker&action=PDFMakerAjax&file=SendPDFMail&language='
				+ document.getElementById('template_language').value + '&record=' + record;
		} else {
			getObj('sendpdfmail_cont').innerHTML = data;
			//var PDFMail = document.getElementById('sendpdfmail_cont');
			jQuery("#sendpdfmail_cont").draggable();
			//var PDFMailHandle = document.getElementById('sendpdfmail_cont_handle');
			//jQuery("#sendpdfmail_cont_handle").draggable();
		}
		document.getElementById('vtbusy_info').style.display = 'none';
	});
}

function validate_sendPDFmail(idlist, module) {
	var smodule = document.DetailView.module.value;
	var record = document.DetailView.record.value;
	var j = 0;
	var chk_emails = document.SendPDFMail.elements.length;
	var oFsendmail = document.SendPDFMail.elements
	email_type = new Array();
	for (var i = 0; i < chk_emails; i++) {
		if (oFsendmail[i].type != 'button') {
			if (oFsendmail[i].checked != false) {
				email_type[j++] = oFsendmail[i].value;
			}
		}
	}
	if (email_type != '') {
		var field_lists = email_type.join(':');

		openPopUp('xComposeEmail', this,
			'index.php?module=Emails&action=EmailsAjax&file=EditView&pmodule=' + module + '&language='
			+ document.getElementById('template_language').value + '&sendmail=true&idlist=' + idlist + '&field_lists='
			+ field_lists + '&attachment=' + smodule + '_' + record + '.pdf',
		'createemailWin', 820, 689, 'menubar=no,toolbar=no,location=no,status=no,resizable=no');

		window.location.href = 'index.php?module=PDFMaker&action=PDFMakerAjax&file=SendPDFMail&language='
				+ document.getElementById('template_language').value + '&record=' + record;

		fninvsh('roleLay2');
		return true;
	} else {
		alert(alert_arr.SELECT_MAILID);
	}
}

function savePDFBreakline() {
	var record = document.DetailView.record.value;
	document.getElementById('vtbusy_info').style.display = 'inline';
	var frm = document.PDFBreaklineForm;
	var url = 'module=PDFMaker&action=PDFMakerAjax&file=SavePDFBreakline&pid=' + record + '&breaklines=';
	var url_suf = '';
	var url_suf2 = '';
	if (frm != 'undefined') {
		for (i = 0; i < frm.elements.length; i++) {
			if (frm.elements[i].type == 'checkbox') {
				if (frm.elements[i].name == 'show_header' || frm.elements[i].name == 'show_subtotal') {
					if (frm.elements[i].checked)
						url_suf2 += '&' + frm.elements[i].name + '=true';
					else
						url_suf2 += '&' + frm.elements[i].name + '=false';
				} else {
					if (frm.elements[i].checked)
						url_suf += frm.elements[i].name + '|';
				}
			}
		}

		url += url_suf + url_suf2;
		fetch('index.php?'+ url, {
			credentials: 'same-origin'
		}).then(function(response) {
			return response.text();
		}).then(function(data) {
			fninvsh('PDFBreaklineDiv');
			document.getElementById('vtbusy_info').style.display = 'none';
		});
	}
}

function savePDFImages() {
	var record = document.DetailView.record.value;
	document.getElementById('vtbusy_info').style.display = 'inline';
	var frm = document.PDFImagesForm;
	var url = 'module=PDFMaker&action=PDFMakerAjax&file=SavePDFImages&pid=' + record;
	var url_suf = '';
	if (frm != 'undefined') {
		for (i = 0; i < frm.elements.length; i++) {
			if (frm.elements[i].type == 'radio') {
				if (frm.elements[i].checked) {
					url_suf += '&' + frm.elements[i].name + '=' + frm.elements[i].value;
				}
			} else if (frm.elements[i].type == 'text') {
				url_suf += '&' + frm.elements[i].name + '=' + frm.elements[i].value;
			}
		}

		url += url_suf;
		fetch('index.php?'+ url, {
			credentials: 'same-origin'
		}).then(function(response) {
			return response.text();
		}).then(function(data) {
			fninvsh('PDFImagesDiv');
			document.getElementById('vtbusy_info').style.display = 'none';
		});
	}
}

function checkIfAny() {
	var frm = document.PDFBreaklineForm;
	if (frm != 'undefined') {
		var j = 0;
		for (i = 0; i < frm.elements.length; i++) {
			if (frm.elements[i].type == 'checkbox' && frm.elements[i].name != 'show_header' && frm.elements[i].name != 'show_subtotal') {
				if (frm.elements[i].checked) {
					j++;
				}
			}
		}
		if (j == 0) {
			frm.show_header.checked = false;
			frm.show_subtotal.checked = false;
			frm.show_header.disabled = true;
			frm.show_subtotal.disabled = true;
		} else {
			frm.show_header.disabled = false;
			frm.show_subtotal.disabled = false;
		}
	}
}