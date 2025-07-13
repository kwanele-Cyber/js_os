let ctors;

let rev;

rev = val => {
	let a , b;
	let mask;
	let i;

	mask = 0xff;
	a = (val & mask);
	mask =0xff00;
	i = (val & mask);
	b = (i >> 8);

	return String.fromCharCode(a)
	    .concat(String.fromCharCode(b));
};

// b8 bb b9
ctors = {
	copy2ax: val=> "\xb8"+rev(val),
	copy2bx: val => void 0,
	copy2cx: val => void 0,
	copy2sp: ()=> void 0,
	biosinterrupt: () => void 0,
	interuptoff: () => void 0,
	halt: () => void 0,
	jmp: () => void 0,
	padding: amt => void 0,
	magic: () => void 0
};

let x, y;
x = 0xccdd;
y = ctors.copy2ax(x);

console.log(y);

console.log(y);
