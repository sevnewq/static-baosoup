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
				var price = cntTarget.attr('data-price');
				var priceVal = parseInt(price);
				var name = cntTarget.attr('data-name');
				var intVal = parseInt(val);
				var fieldTargetCount = $('#HsetCount' + id, fieldsets);
				var fieldTargetId = $('#HsetDataid' + id, fieldsets);
				if (fieldTargetCount.length === 0 && intVal > 0) {
					fieldTargetCount = $('<input>').attr({
						'name': 'data[Hset][' + id + '][count]',
						'type': 'number',
						'class': 'hide',
						'value': intVal,
						'id': 'HsetCount' + id
					}).val(intVal).appendTo(fieldsets);

					fieldTargetId = $('<input>').attr({
						'name': 'data[Hset][' + id + '][dataid]',
						'type': 'text',
						'class': 'hide',
						'value': id,
						'id': 'HsetDataid' + id
					}).val(id).appendTo(fieldsets);
				}
				else {
					if (intVal === 0) {
						fieldTargetCount.remove();
						fieldTargetId.remove();
					}
					else {
						fieldTargetCount.attr('value', intVal).val(intVal);
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
	update: function (count, price) {
		$('[id="order_form_fieldset"] input[type="submit"]').prop('disabled', count === 0 ? true : false);
		$('[id="total_total"]').text(count);
		$('.calc > .action > .action.next').removeClass('full');
		$('.calc > .action > .total-price').removeClass('full');
		if (count >= 1) {
			$('.calc > .action > .action.next').addClass('full');
			$('.calc > .action > .total-price').addClass('full');
		}
		$('#price_total').val('NT. ' + price);
		$('#total_price').text(price);
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

		// update
		ORDER.update(calc.count, calc.price);

		ORDER.updateForm();

	},
	nextClick: function (e) {
		var calc = ORDER.calc();
		if (calc.count === 0) {
			e.stopPropagation();
			// show warning animation
			$('.calc .notice, .area-right .notice').addClass('flashing');
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
			$('.calc .notice, .area-right .notice').removeClass('flashing');
		}, 2000);
	},
	clearFlashTimer: null,
	init: function () {
		$('.action-block > button.count').on('click', ORDER.charge);

		$('.action.next > button.action.next').on('click', ORDER.nextClick);
	}
};

$(document).ready(ORDER.init);
