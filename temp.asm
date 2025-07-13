bits 16
org 0xfc00

halt:
	nop
	hlt
	jmp halt

