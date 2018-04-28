<template>
	<div>
	    <label for="input">请输入</label>
		<input id="input" type="test" v-model="message"/>
		<div class="child">{{reverseMessage}}</div>
		<div class="wrap">
			<span v-for="(item,index) in spans" @click="showPannel(index)">
			   {{item}}
			</span>
			<ul>
				<li v-for="(item,index) in uls" :class="{ 'active': index === isActive}" @click="checked(index)">{{item}}</li>
			</ul>		
		</div>

	</div>
</template>
<script type="text/javascript">
export default{
    data() {
        return {
            message: '',
            spans: ['tab1', 'tab2', 'tab3'],
            uls: ['不限', 'tab1aaa', 'tab1bbb', 'tab1ccc'],
            defaultIndex: [0, 0, 0, 0],
            pannelIndex: 0
        }
    },
    computed: {
    	reverseMessage() {
    		return this.message === '' ? '' : this.message + 'luna'
    	},
    	isActive () {
    		console.log(this.defaultIndex[this.pannelIndex])
    		return this.defaultIndex[this.pannelIndex]
    	}
    },
    methods: {
        showPannel(index) {
            if (index === 0) {
          	   this.uls = ['不限', 'tab1aaa', 'tab1bbb', 'tab1ccc']
            } else if (index === 1) {
          	   this.uls = ['不限', 'tab2aaa', 'tab2bbb', 'tab2ccc']
            } else {
          	   this.uls = ['不限', 'tab3aaa', 'tab3bbb', 'tab3ccc']
            }
            this.pannelIndex = index;
        },
        checked(index) {
            this.defaultIndex.splice(this.pannelIndex, 1, index)
        }
    }
}
</script>
<style lang="scss">
	div {
		text-align: left;
		input {
			height: 100px;
			text-align: left;
			border: 1px solid red;
			font-size: 50px;
		}
		label {
			font-size: 50px;
		}
		.child {
            height: 100px;
            border: 1px solid red;
            margin-top: 10px;
            line-height: 100px;
            font-size: 50px;
		}
	}
	.wrap {
		width: 100%;
		span {
			display: inline-block;
			width: 33.333%;
			height: 150px;
			line-height: 150px;
			border: 1px solid blue;
			text-align: center;
			font-size: 50px;
		}
	}
	ul {
		list-style: none;
		display: block;
		li {
			list-style: none;
			display: inline-block;
			height: 100px;
			line-height: 100px;
			text-align: center;
			background-color: pink;
			padding: 0 20px;
			font-size: 40px;
			margin-right: 10px;
		}
		li.active {
			color: red;
		}
	}
</style>