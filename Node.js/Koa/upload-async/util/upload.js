const path = require('path')
const os = require('os')
const fs = require('fs')
const Busboy = require('busboy')

function mkdirsSync (dirname) {
	if (fs.existsSync(dirname)) {
		return true
	} else {
		if(mkdirsSync(path.dirname(dirname))) {
			fs.mkdirSync(dirname)
			return true
		}
	}
}

function getSuffixName (filename) {
	let nameList = filename.split('.')
	return nameList[nameList.length - 1]
}

function uploadFile (ctx, options) {
	let req = ctx.req
	let res = req.res
	let busboy = new Busboy({ headers: req.headers })

	let fileType = options.fileType || 'common'
	let filePath = path.join(options.path, fileType)
	let mkdirResult = mkdirsSync(filePath)

	return new Promise(function (resolve, reject) {
		console.log('文件上传中')
		let result = {
			success: false,
			message: '',
			data: null
		}
		busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
			let fileName = `${Math.random().toString(16).substr(2)}.${getSuffixName(filename)}`
			let _uploadFilePath = path.join(filePath, fileName)
			let saveTo = path.join(_uploadFilePath)
			// 文件保存到指定路径
			file.pipe(fs.createWriteStream(saveTo))
			file.on('end', () => {
				result.success = true
				result.message = '文件上传成功'
				result.data = {
					pictureUrl: `//${ctx.host}/image/${fileType}/${fileName}`
				}
				console.log('文件上传成功')
				resolve(result)
			})
		})
		busboy.on('finish', () => {
			console.log('文件上传结束')
			resolve(result)
		})
		busboy.on('error', (err) => {
			console.log('文件上传出错')
			reject(result)
		})
		req.pipe(busboy)
	})

}
module.exports = {
	uploadFile
}