(function () {
	function $(id) {
		return document.getElementById(id)
	}
	let fileInput = null
	let btn = $('J_UploadPictureBtn')
	let progressEle = $('J_UploadProgress')
	let previewEle = $('J_PicturePreview')
	btn.addEventListener('click', function () {
		uploadAction({
			success: function (res) {
				console.log(res)
				if(res && res.success && res.data && res.data.pictureUrl) {
					previewEle.innerHTML = `<img src="${res.data.pictureUrl}" style="max-width:100%"/>`
				}
			},
			progress: function (data) {
				if(data && data * 1 > 0) {
					progressEle.innerText = data
				}
			}
		})
	})

	let UtilType = {
		isPrototype: function (data) {
			return Object.prototype.toString.call(data).toLowerCase()
		},
		isJSON: function (data) {
			return this.isPrototype(data) === '[object object]'
		},
		isFunction: function (data) {
			return this.isPrototype(data) === '[object function]'
		}
	}

	function requestEvent (options) {
		try {
			let xhr = new XMLHttpRequest()
			let formData = options.formData
			xhr.onreadystatechange = function () {
				if(xhr.readyState === 4 && xhr.status === 200) {
					options.success(JSON.parse(xhr.responseText))
				}
			}
			xhr.upload.onprogress = function (e) {
				e = e || window.event
				let loaded = e.loaded
				let total = e.total
				let per = Math.floor(100 * loaded / total)
				options.progress(per)
			}
			xhr.open('post', '/api/picture/upload.json')
			xhr.send(formData)
		} catch (err) {
			options.fail(err)
		}
	}

	function uploadEvent (options) {
		let formData = new FormData()
		if(!fileInput) {
			fileInput = document.createElement('input')
			fileInput.setAttribute('type', 'file')
			fileInput.setAttribute('name', 'files')
		}
		fileInput.click()
		fileInput.onchange = function () {
			file = fileInput.files[0]
			formData.append('files', file)
			requestEvent({
				formData,
				success: options.success,
				fail: options.fail,
				progress: options.progress
			})
		}
	}

	function uploadAction (options) {
		if(!UtilType.isJSON(options)) {
			console.log('upload options is null')
			return
		}
		let _options = {
			success: UtilType.isFunction(options.success) ? options.success : function () {},
			fail: UtilType.isFunction(options.fail) ? options.fail : function () {},
			progress: UtilType.isFunction(options.progress) ? options.progress : function () {}
		}
		uploadEvent(_options)
	}
})();