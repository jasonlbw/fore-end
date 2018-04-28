const Koa = require('koa')
const views = require('koa-views')
const path = require('path')
const convert = require('koa-convert')
const static = require('koa-static')
const { uploadFile } = require('./util/upload')

const app = new Koa()

app.use(views(path.join(__dirname, './view'), {
	extension: 'ejs'
}))

const staticPath = './static'
app.use(convert(static(
	path.join(__dirname, staticPath)
)))

app.use(async (ctx) => {	
	if(ctx.method === '/') {
		let title = 'upload pic async'
		await ctx.render('index', {
			title
		})
	} else if (ctx.url === '/melon') {
		await ctx.render('melon-index', {
			title: 'melon-upload img sync'
		})
	} else if (ctx.url === '/api/picture/upload.json' && ctx.method === 'POST') {
		let result = { success: false }
		let serverFilePath = path.join(__dirname, 'static/image')
		result = await uploadFile(ctx, {
			fileType: 'album',
			path: serverFilePath
		})
		ctx.body = result
	} else {
		ctx.body = '<h1>404 o(╯□╰)o</h1>'
	}
})

app.listen(3000, () => {
	console.log(`[demo] upload-pic-async is starting at port 3000`)
})