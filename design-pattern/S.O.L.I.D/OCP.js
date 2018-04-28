/*
 * 主题：the open/close principle(开闭原则OCP)：对扩展开放，对修改关闭
 * 作者：melon
 * 日期：2017-12-20
 */
(function () {
	/*
	 * 问题创建类
	 * @args qs：问题描述
	 * @args typeCreator：问题类型创建类
	 */
	function questionCreator (qs, typeCreator) {
		var question = {};
		typeCreator = typeCreator || {};
		typeCreator.renderComponent = function () {
			throw 'not implemented';
		}
		question.render = function (tar) {
			var qsWrapper = document.createElement('div');
			qsWrapper.className = 'question';
			var qsLabel = document.createElement('div');
			qsLabel.className = 'question-label';
			var label = document.createTextNode(qs.label);
			qsLabel.appendChild(label);
			var answer = typeCreator.renderComponent();
			qsWrapper.appendChild(qsLabel);
			qsWrapper.appendChild(answer);
			return qsWrapper;
		}
		return question;
	}

	function choiceQuestionCreator (qs) {
		var type = {};
		type.renderComponent = function () {
			var input = document.createElement('select'),
				 i = 0,
				 length = qs.choices.length
			for(; i < length; i++) {
				var option = document.createElement('option');
				option.text = options.value  = chioces[i];
				input.appendChild(option);
			}
			return input;
		}
		return questionCreator(qs, type);
	}

	function inputQuestionCreator (qs) {
		var type = {};
		type.renderComponent = function () {
			var input = document.createElement('input');
			input.type = 'text';
			return input;
		}
		return questionCreator(qs, type);
	}

	var view = {
		render: function (tar, questions) {
			var i = 0,
				 length = questions.length;
			for(; i < length; i++) {
				target.appendChild(questions[i]);
			}
		}
	}

	var questions = [
		choiceQuestionCreator({
			label: 'XXXXXX',
			choices: ['Yes', 'No']
		}),
		inputQuestionCreator({
			label: 'XXXXXX'
		})
	];
	var questionEle = document.getElementById('questions');
	view.render(questionEle, questions);

})();