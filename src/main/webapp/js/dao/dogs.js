function listDogs(done, fail, always) {
	done = typeof done !== 'undefined' ? done : function() {};
	fail = typeof fail !== 'undefined' ? fail : function() {};
	always = typeof always !== 'undefined' ? always : function() {};
	
	$.ajax({
		url: 'rest/dogs',
		type: 'GET'
	})
	.done(done)
	.fail(fail)
	.always(always);
}

function addDog(dog, done, fail, always) {
	done = typeof done !== 'undefined' ? done : function() {};
	fail = typeof fail !== 'undefined' ? fail : function() {};
	always = typeof always !== 'undefined' ? always : function() {};
	
	$.ajax({
		url: 'rest/dogs',
		type: 'POST',
		data: dog
	})
	.done(done)
	.fail(fail)
	.always(always);
}

function modifyDog(dog, done, fail, always) {
	done = typeof done !== 'undefined' ? done : function() {};
	fail = typeof fail !== 'undefined' ? fail : function() {};
	always = typeof always !== 'undefined' ? always : function() {};
	
	$.ajax({
		url: 'rest/dogs/' + dog.id,
		type: 'PUT',
		data: dog
	})
	.done(done)
	.fail(fail)
	.always(always);
}

function deleteDog(id, done, fail, always) {
	done = typeof done !== 'undefined' ? done : function() {};
	fail = typeof fail !== 'undefined' ? fail : function() {};
	always = typeof always !== 'undefined' ? always : function() {};
	
	$.ajax({
		url: 'rest/dogs/' + id,
		type: 'DELETE',
	})
	.done(done)
	.fail(fail)
	.always(always);
}