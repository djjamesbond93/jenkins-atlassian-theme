jQuery(function($){
	if (window.location.pathname == "/login" ) {
		var welcomeMessage 	= 'Welcome to Jenkins - CI Server';
		var mainPanel 		= $( '#main-panel' );
		var sidePanel 		= $( '#side-panel' );

		var usernameLabel 	= $('input[name="j_username"]').closest('td').prev('td').addClass('input-label');
		var passwordLabel 	= $('input[name="j_password"]').closest('td').prev('td').addClass('input-label');
		var signupContainer	= $('a[href=signup]').closest('div').addClass('signup-container');
		var loginButton		= $('#yui-gen1-button').addClass('login-button');
		var buttonSpan		= $('.submit-button');

		var loginContainer  = $( '#main-panel div:first' ).addClass( 'login-container' );

		var loginForm 		= $( 'form[name="login"]' ).length;

		if (loginForm) {

			usernameLabel.text( 'Username' );
			passwordLabel.text( 'Password' );

			loginContainer.removeAttr( 'style' );

			loginContainer.wrap ( createDiv( 'login-outer'    ) );
			loginContainer.wrap ( createDiv( 'login-wrapper'  ).prepend(' <h2> ' + welcomeMessage + ' </h2> '));
			buttonSpan.wrap 	( createDiv( 'button-wrapper' ) );

			$( '.login-container div:last' ).removeAttr( 'style' );
		}

		function createDiv ( name ) {
			return $('<div />', {
			"class": name
			});
		}
	}

});

jQuery(function($){
    var toggle = '<div class="toggle"></div><input id="cmn-toggle-7" class="cmn-toggle cmn-toggle-yes-no" type="checkbox"><label for="cmn-toggle-7" data-on="Hide" data-off="Show"></label>';
    $('#description-link').text('Edit');
    $('#description').before(toggle);

    if(readCookie('toggle') != 'checked') {
        $('#description').hide();
    } else {
        checkToggle($('.cmn-toggle'));
        $('#description').show();
    }

    $('.cmn-toggle').change(function() {
        $('#description').slideToggle('fast');
        if($('.cmn-toggle').is(':checked')) {
            writeCookie('toggle', 'checked', 30);
        } else {
            writeCookie('toggle', 'unchecked', 30);
        }
    });
});

function checkToggle(toggle) {
     toggle.prop('checked', true);
}

function writeCookie(name,value,days) {
    var date, expires;
        if (days) {
            date = new Date();
            date.setTime(date.getTime()+(days*24*60*60*1000));
            expires = "; expires=" + date.toGMTString();
        } else {
            expires = "";
        }
    document.cookie = name + "=" + value + expires + "; path=/";
}

function readCookie(name) {
    var i, c, ca, nameEQ = name + "=";
    ca = document.cookie.split(';');
    for(i=0;i < ca.length;i++) {
        c = ca[i];
        while (c.charAt(0)==' ') {
            c = c.substring(1,c.length);
        }
        if (c.indexOf(nameEQ) == 0) {
            return c.substring(nameEQ.length,c.length);
        }
    }
    return '';
}

jQuery(function($) {
    $('#header .logo').on('click', function() {
        window.location.href = $('#jenkins-home-link').attr('href');
    });
});

jQuery(function($){
    var afterColor  = '#dfd';
    var beforeColor = '#fff';

    jQuery('.setting-input, input[type="checkbox"]').one("click", function ( e ) {
        storeValue( e );
    });

    jQuery('.setting-input').on('input propertychange paste', function ( e ) {
        if (compareValues( e )) {
            jQuery(e.target).css("background-color", beforeColor);
        } else {
            jQuery(e.target).css("background-color", afterColor);
        }        
    });

    jQuery('input[type="checkbox"]').change( function ( e ) {
        if (compareValues( e )) {
            jQuery(e.target.parentNode).css("background-color", beforeColor);
        } else {
            jQuery(e.target.parentNode).css("background-color", afterColor);
        }
    });

    function storeValue( e ) {
        var elem        = jQuery( e.target );
        var name        = elem.attr("name");
        var value       = elem.attr("value");
        var isChecked   = elem.is(':checked'); 

        if (value === "on") {
            isChecked = false;
        }
        document.cookie = name + "=" + textToBin(value + isChecked);
    } 

    function compareValues ( e ) {
        var elem        = jQuery( e.target );
        var name        = elem.attr("name");
        var value       = elem.attr("value");
        var isChecked   = elem.is(':checked');

        if (readCookie(name) === textToBin(value + isChecked)) {
            return true;
        } else {
            return false;
        }
    }

    function readCookie( name ) {
        var i, c, ca, nameEQ = name + "=";
        ca = document.cookie.split(';');
        for(i=0;i < ca.length;i++) {
            c = ca[i];
            while (c.charAt(0)==' ') {
                c = c.substring(1,c.length);
            }
            if (c.indexOf(nameEQ) == 0) {
                return c.substring(nameEQ.length,c.length);
            }
        }
        return '';
    }

    function textToBin( text ) {
        var length = text.length, output = [];
        for (var i = 0;i < length; i++) {
            var bin = text[i].charCodeAt().toString(2);
            output.push(Array(8-bin.length+1).join("0") + bin);
        } 
        return output.join(" ");
    }
});
/**
	Collapse All step-like configuration containers.
*/
function collapseAll () {
	var els = document.querySelectorAll('.hetero-list-container>div');
	for (var i = 0; i < els.length; i++) {
		var rows = els[i].querySelectorAll('tr');
		var collapser = getCollapser(els[i]);
		collapser(rows, els[i]);
	}
}

jQuery(document).on('click', '.hetero-list-container .repeated-chunk .dd-handle', function () {
	var element = jQuery(this).closest('.repeated-chunk');

	var isHidden = element.hasClass('collapse');

	if (isHidden) {
		element.removeClass('collapse')
		element.find('tr:not(:first-child)').css('display', '');
		element.find('.collapsed-info').remove();
	} else {
		collapse(element[0])
		element.addClass('collapse');
	}
});

/**
 * 
 */
function collapse (element) {
	var rows = element.querySelectorAll('tr');
	var collapser = getCollapser(element);
	collapser(rows, element);
}

/**
	Get collapsing function for the container.
	
	@note Each collapser should take two parametrs: rows, container.
*/
function getCollapser (container) {
	var type = container.getAttribute('descriptorid');
	switch (type) {
		case 'hudson.scm.listtagsparameter.ListSubversionTagsParameterDefinition':
			return collapseToName;
			break;
		case 'hudson.plugins.copyartifact.BuildSelectorParameter':
		case 'com.cwctravel.hudson.plugins.extended_choice_parameter.ExtendedChoiceParameterDefinition':
			return function (rows, container) {
				collapseToNamedInput('_.name', rows, container);
			};
			break;
		case 'hudson.tasks.Shell':
			return collapseToShellAbstract;
			break;
	}
	if (typeof (type) === 'string' && type.search(/hudson\.model\.\w+ParameterDefinition/) === 0) {
		return collapseToName;
	}
	// extension point: for-each extraCollapsers call extraCollapser.isMine and if true return extraCollapser.collapser
	return fullyCollapse;
}
/**
	Collapser: Fully collapse rows without info.
*/
function fullyCollapse (rows) {
	for (var r = 1; r < rows.length; r++) {
		rows[r].style.display = 'none';
	}
}
/**
	Collapser: Get information from standard 'parameter.name' input.
*/
function collapseToName (rows, container) {
	collapseToNamedInput('parameter.name', rows, container);
}
/**
	Collapser-helper: Get information from given input.
*/
function collapseToNamedInput (name, rows, container) {
	fullyCollapse(rows);
	var names = container.querySelectorAll('input[name="' + name + '"]');
	if (names.length) {
		addCollapsedInfo(container, names[0].value);
	}
}
/**
	Collapser: Get information from textarea.
*/
function collapseToShellAbstract (rows, container) {
	fullyCollapse(rows);
	var names = container.querySelectorAll('textarea');
	if (names.length) {
		addCollapsedInfo(container, names[0].value
			.replace(/[\r\n]+(#|rem)\s+\n/g, '')	// comment without thext
			.replace(/[\r\n]+/g, '; ')	// implode new lines with ';'
		);
	}
}

/**
	Add abstracted information to containers handle.
	
	@note Assumes drag-and-drop handle will be left visible after collapsing.
*/
var maxInfoCharacters = 200;
function addCollapsedInfo (container, info) {
	var parent = container.querySelectorAll('.dd-handle');
	if (parent.length) {
		var infoEl = appendInfoElement(parent[0]);
		if (info.length > maxInfoCharacters) {
			info = info.substr(0, maxInfoCharacters);
			info += ' (...)';
		}
		infoEl.textContent = ' [' + info + ']';
	}
}
/**
	Append or return existing information element.
	@private
*/
function appendInfoElement (parent) {
	var infoEl = parent.querySelectorAll('.collapsed-info');
	if (infoEl.length) {
		infoEl = infoEl[0];
	} else {
		infoEl = document.createElement('span');
		infoEl.className = 'collapsed-info';
		parent.appendChild(infoEl);
	}
	return infoEl;
}
