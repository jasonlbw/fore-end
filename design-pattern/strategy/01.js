// 验证规则使用策略模式
(function () {
	var validator = {
		types: {
			isNonEmpty: {
				validate: function (value) {
					return value !== '';
				},
				instructions: `the value cannot be empty`
			},
			isNumber: {
				validate: function (value) {
					return !isNaN(value);
				},
				instructions: `the value must be a valid number`
			},
			isAlphaNum: {
				validate: function (value) {
					return /[a-z0-9]/ig.test(value);
				},
				instructions: `the value can only contain characters and numbers`
			}
		},
		message: [],
		config: {},
		validate: function (data) {
			var field,
				 type,
				 i = 0,
				 length = 0,
				 result = '';
			this.message = [];// 重置日志信息
			for(field in data) {
				if(!data.hasOwnProperty(field)) {
					continue;
				}
				// 获取字段待验证type
				types = this.config[field];
				if(!types || types.length < 1) {
					continue;
				}
				length = types.length;
				for(; i < length; i++) {
					var type = types[i];
					var checker = this.types[type];
					if(!checker) {
						throw {
							name: 'ValidateError',
							message: `No handler to validate type ${type}`
						}
					}
					result = checker.validate(data[field]);
					if(!result) {
						this.message.push(`Invalid value for *${field}*：${checker.instructions}`)
					}
				}
			}
			return this.hasErrors();
		},
		hasErrors: function () {
			return this.message.length > 0;
		}
	}

	var data = {
		firstName: 'melon',
		lastName: 'liu',
		age: 'unknown',
		userName: 'o_O'
	};
	validator.config = {
		firstName: ['isNonEmpty'],
		age: ['isNonEmpty', 'isNumber'],
		userName: ['isAlphaNum']
	};
	validator.validate(data);
	if(validator.hasErrors()) {
		console.log(validator.message.join('\r\n'));
	}
})();