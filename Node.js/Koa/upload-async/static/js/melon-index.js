(function () {
	function $(id) {
		return document.getElementById(id)
	}
	let btn = $('J_UploadImgBtn')
	let progressEle = $('J_UploadProgress')
	let resultEle = $('J_UploadResult')
	let fileEle = null

	btn.onclick = function () {
		uploadAction({
			success: function (res) {
				console.log(res)
				if(res && res.success && res.data && res.data.pictureUrl) {
					resultEle && (resultEle.innerHTML = `<img src="${res.data.pictureUrl}" style="max-width:100%" />`)
				}
			},
			progress: function (per) {
				if(per && per * 1 > 0) {
					progressEle && (progressEle.innerText = per)
				}				
			}
		})
	}

	// 自定义类库
	let Util = {
		type: function (data) {
			return Object.prototype.toString.call(data).toLowerCase()
		},
		isFunction: function (data) {
			return this.type(data) === '[object function]'
		},
		isJSON: function (data) {
			return this.type(data) === '[object object]'
		},
		XMLObject: function () {
			let xhr = null
			try {
				xhr = new XMLHttpRequest()
			} catch (err) {
				let versions = ['Msxml2.XMLHTTP.6.0', 'Msxml2.XMLHTTP.3.0', 'Msxml2.XMLHTTP', 'Microsoft.XMLHTTP']
				for(let i = 0, length = versions.length; i < length; i++) {
					try {
						xhr = new ActiveXObject(versions[i])
					} catch (e) {
						continue
					}
					break
				}
			} finally {
				return xhr
			}
		}
	}

	function uploadAction (options) {
		if(!Util.isJSON(options)) {
			console.log('upload options is not an object')
			return
		}
		let _options = {
			success: Util.isFunction(options.success) ? options.success : function () {},
			fail: Util.isFunction(options.fail) ? options.fail : function () {},
			progress: Util.isFunction(options.progress) ? options.progress : function () {}
		}
		uploadEvent(_options)
	}

	function uploadEvent (options) {
		if(!fileEle) {
			fileEle = document.createElement('input')
			fileEle.setAttribute('type', 'file')
			fileEle.setAttribute('name', 'files')
		}
		fileEle.click()
		fileEle.onchange = function (e) {
			let formData = new FormData();
			formData.append('files', fileEle.files[0])
			uploadRequest({
				formData,
				success: options.success,
				fail: options.fail,
				progress: options.progress
			})
		}
	}
	function uploadRequest (options) {
		try {
			let xhr = Util.XMLObject()
			xhr.onreadystatechange = function (e) {
				if (xhr.readyState !== 4) {
					return
				}
				if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
					let res = xhr.responseText
					options.success(res && JSON.parse(res))
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
			xhr.send(options.formData)
		} catch (err) {
			options.fail(err)
		}
	}
})()