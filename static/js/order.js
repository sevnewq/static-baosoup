var ORDER = {
	updateForm: function () {
		var form = $('#HfoodOrderForm');
		var fieldsets = $('#order_form_fieldset');
		var cnts = $('.count-block > .value.count');
		try {
			$.each(cnts, function (i, v) {
				var cntTarget = $(v);
				var val = cntTarget.attr('data-cnt');
				var id = cntTarget.attr('data-dataid');
				var priceVal = parseInt('data-price');
				var intVal = parseInt(val);
				var fieldTarget = $('#HfoodCount' + id, fieldsets);
				if (fieldTarget.length === 0 && intVal > 0) {
					fieldTarget = $('<input>').attr({
						'name': 'data[Hfood][count_' + id + ']',
						'type': 'number',
						'class': 'hide',
						'value': intVal,
						'id': 'HfoodCount' + id
					}).val(intVal).appendTo(fieldsets);
				}
				else {
					if (intVal === 0) {
						fieldTarget.remove();
					}
					else {
						fieldTarget.attr('value', intVal).val(intVal);
					}
				}
			});
		} catch (ex) {
			console.log(ex);
		}
	},
	calc: function () {
		var tot = 0;
		var totP = 0;
		var cnts = $('.count-block > .value.count');
		try {
			$.each(cnts, function (i, v) {
				var cntTarget = $(v);
				var val = cntTarget.attr('data-cnt');
				var price = cntTarget.attr('data-price');
				var intVal = parseInt(val);
				var priceVal = parseInt(price);
				tot += intVal;
				totP += priceVal * intVal;
			});
		} catch (ex) {
			tot = 0;
			totP = 0;
			console.log(ex);
		}
		return {'count': tot, 'price': totP };
	},
	update: function (box, needed, price) {
		if (box === 0 && needed === 0) {
			box = 1;
			needed = 15;
		}
		
		// $('.action.next > button.action.next').prop('disabled', needed === 0 ? false : true);
		$('[id="order_form_fieldset"] input[type="submit"]').prop('disabled', needed === 0 ? false : true);
		
		$('[id="total_total"]').text(box);
		$('[id="total_needed"]').text(needed);

		$('.calc > .action > .needed').removeClass('full');
		$('.calc > .action > .action.next').removeClass('full');
		if (needed === 0) {
			$('.calc > .action > .needed').addClass('full');
			$('.calc > .action > .action.next').addClass('full');
		}
		$('#price_total').val('NT. ' + price);
	},
	charge: function (e) {
		var intVal = 0;
		var btn = $(e.target);
		var cntTarget = $('#' + btn.attr('data-target'));
		try {
			var oldVal = cntTarget.attr('data-cnt');
			intVal = parseInt(oldVal);
			var type = btn.attr('data-type');

			switch (type) {
				case 'minus':
					--intVal;
					break;
				case 'plus':
					++intVal;
					break;
				default:
				intVal = 0;
			}
			if (intVal < 0) {
				intVal = 0;
			}
		} catch (ex) {
			intVal = 0;
			console.log(ex);
		}
		
		
		cntTarget.attr('data-cnt', intVal).text(intVal);

		// calc
		var calc = ORDER.calc();
		var needed = (15 - (calc.count % 15)) % 15;
		var box = Math.ceil(calc.count / 15);

		// update
		ORDER.update(box, needed, calc.price);

		ORDER.updateForm();

	},
	nextClick: function (e) {
		var calc = ORDER.calc();
		var needed = (15 - (calc.count % 15)) % 15;
		if (needed !== 0 || calc.count === 0) {
			e.stopPropagation();
			// show warning animation
			$('.calc .info').addClass('flashing');
			ORDER.clearFlash();
			return;
		}
	},
	clearFlash: function () {
		if (ORDER.clearFlashTimer) {
			clearTimeout(ORDER.clearFlashTimer);
			ORDER.clearFlashTimer = null;
		}
		ORDER.clearFlashTimer = setTimeout(function () {
			$('.calc .info').removeClass('flashing');
		}, 2000);
	},
	clearFlashTimer: null,
	init: function () {
		$('.action-block > button.count').on('click', ORDER.charge);

		$('.action.next > button.action.next').on('click', ORDER.nextClick);
	}
};

$(document).ready(ORDER.init);
