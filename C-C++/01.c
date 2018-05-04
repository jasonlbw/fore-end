#include <stdio.h>
int main() {
	// puts只能输出字符串 
	puts("C语言中文网");
	
	// printf可输出字符串，整数，小数，单个字符
	// 以十进制、八进制、十六进制的形式输出；要求输出的数字占n个字符的位置；控制小数的位数 
	int int_test = 123;
	printf("%d\n", int_test);
	
	// %d:以十进制输出一个整数；
	// %c:输出一个字符；
	// %s:输出一个字符串；
	// %f:输出一个小数 
	char char_test = '@';
	float money = 93.978;
	printf("int_test=%d, char_test=%c, money=$%f\n", int_test, char_test, money);
	
	// sizeof操作符
	short short_test = 10;
	int short_length = sizeof short_test;
	int int_length = sizeof(int_test);
	int long_length = sizeof(long);
	int char_length = sizeof(char);
	printf("short=%d, int=%d, long=%d, char=%d\n", short_length, int_length, long_length, char_length);
	
	// 指针的定义、赋值
	int x = 5, y = 5, *px = &x, *py = &y;
	y = *px + 5;
	printf("y=%d\n", y);
	y = ++*px;
	printf("y=%d\n", y);
	y = *px++;
	printf("y=%d\n", y);
	
	int a = 1, b = 2, c = 3;
	int *p = &c;
	int i;
	for(i = 0; i < 8; i++) {
		printf("%d,", p + i);
	}
	 
	
	
	return 0;
}
