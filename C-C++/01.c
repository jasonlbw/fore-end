#include <stdio.h>
int main() {
	// putsֻ������ַ��� 
	puts("C����������");
	
	// printf������ַ�����������С���������ַ�
	// ��ʮ���ơ��˽��ơ�ʮ�����Ƶ���ʽ�����Ҫ�����������ռn���ַ���λ�ã�����С����λ�� 
	int int_test = 123;
	printf("%d\n", int_test);
	
	// %d:��ʮ�������һ��������
	// %c:���һ���ַ���
	// %s:���һ���ַ�����
	// %f:���һ��С�� 
	char char_test = '@';
	float money = 93.978;
	printf("int_test=%d, char_test=%c, money=$%f\n", int_test, char_test, money);
	
	// sizeof������
	short short_test = 10;
	int short_length = sizeof short_test;
	int int_length = sizeof(int_test);
	int long_length = sizeof(long);
	int char_length = sizeof(char);
	printf("short=%d, int=%d, long=%d, char=%d\n", short_length, int_length, long_length, char_length);
	
	// ָ��Ķ��塢��ֵ
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
