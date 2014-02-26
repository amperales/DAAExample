var dogsFormId = 'dogs-form';
var dogsListId = 'dogs-list';
var dogsFormQuery = '#' + dogsFormId;
var dogsListQuery = '#' + dogsListId;

function insertDogsList(parent) {
	parent.append(
		'<table id="' + dogsListId + '">\
			<tr>\
				<th>Nombre</th>\
				<th>Raza</th>\
				<th></th>\
				<th></th>\
			</tr>\
		</table>'
	);
}

function insertDogsForm(parent) {
	parent.append(
		'<form id="' + dogsFormId + '">\
			<input name="id" type="hidden" value=""/>\
			<input name="name" type="text" value="" />\
			<input name="breed" type="text" value=""/>\
			<input id="btnSubmit" type="submit" value="Create"/>\
			<input id="btnClear" type="reset" value="Limpiar"/>\
		</form>'
	);
}

function createDogRow(dog) {
	return '<tr id="dog-'+ dog.id +'">\
		<td class="name">' + dog.name + '</td>\
		<td class="breed">' + dog.breed + '</td>\
		<td>\
			<a class="edit" href="#">Edit</a>\
		</td>\
		<td>\
			<a class="delete" href="#">Delete</a>\
		</td>\
	</tr>';
}

function formToDog() {
	var form = $(dogsFormQuery);
	return {
		'id': form.find('input[name="id"]').val(),
		'name': form.find('input[name="name"]').val(),
		'breed': form.find('input[name="breed"]').val()
	};
}

function dogToForm(dog) {
	var form = $(dogsFormQuery);
	form.find('input[name="id"]').val(dog.id);
	form.find('input[name="name"]').val(dog.name);
	form.find('input[name="breed"]').val(dog.breed);
}

function rowToDog(id) {
	var row = $('#dog-' + id);

	return {
		'id': id,
		'name': row.find('td.name').text(),
		'breed': row.find('td.breed').text()
	};
}

function isEditing() {
	return $(dogsFormQuery + ' input[name="id"]').val() != "";
}

function disableForm() {
	$(dogsFormQuery + ' input').prop('disabled', true);
}

function enableForm() {
	$(dogsFormQuery + ' input').prop('disabled', false);
}

function resetForm() {
	$(dogsFormQuery)[0].reset();
	$(dogsFormQuery + ' input[name="id"]').val('');
	$('#btnSubmit').val('Crear');
}

function showErrorMessage(jqxhr, textStatus, error) {
	alert(textStatus + ": " + error);
}

function addRowListeners(dog) {
	$('#dog-' + dog.id + ' a.edit').click(function() {
		dogToForm(rowToDog(dog.id));
		$('input#btnSubmit').val('Modificar');
	});
	
	$('#dog-' + dog.id + ' a.delete').click(function() {
		if (confirm('Está a punto de eliminar a un perro. ¿Está seguro de que desea continuar?')) {
			deleteDog(dog.id,
				function() {
					$('tr#dog-' + dog.id).remove();
				},
				showErrorMessage
			);
		}
	});
}

function appendToTable(dog) {
	$(dogsListQuery + ' > tbody:last')
		.append(createDogRow(dog));
	addRowListeners(dog);
}

function initDogs() {
	$.getScript('js/dao/dogs.js', function() {
		listDogs(function(dogs) {
			$.each(dogs, function(key, dog) {
				appendToTable(dog);
			});
		});
		
		$(dogsFormQuery).submit(function(event) {
			var dog = formToDog();
			
			if (isEditing()) {
				modifyDog(dog,
					function(dog) {
						$('#dog-' + dog.id + ' td.name').text(dog.name);
						$('#dog-' + dog.id + ' td.breed').text(dog.breed);
						resetForm();
					},
					showErrorMessage,
					enableForm
				);
			} else {
				addDog(dog,
					function(dog) {
						appendToTable(dog);
						resetForm();
					},
					showErrorMessage,
					enableForm
				);
			}
			
			return false;
		});
		
		$('#btnClear').click(resetForm);
	});
};
