import { writeFile } from "node:fs/promises";

let ctors, rev, combine, save2file, filename;
let greet = "Hello, World!!!";
rev = val => {
    let lo = val & 0xff;
    let hi = (val >> 8) & 0xff;
    return String.fromCharCode(lo) + String.fromCharCode(hi);
};

combine = (a, b) => ((a & 0xff) << 8) | (b & 0xff);

ctors = {
    copy2ax: val => "\xb8" + rev(val),
    copy2bx: val => "\xbb" + rev(val),
    copy2cx: val => "\xb9" + rev(val),
    copy2sp: () => "\x89\xc4",
    biosinterrupt: () => "\xcd\x10",
    interruptoff: () => "\xfa",
    halt: () => "\x90\xf4",
    jmp: () => "\xeb\xfc",
    padding: amt => "\x90".repeat(amt),
    magic: () => rev(0xaa55),
};

let part1 = () =>
    ctors.copy2ax(0xfbff) +
    ctors.copy2sp() +
    ctors.copy2bx(0x0000) +
//  ctors.copy2ax(combine(0x0e, "x".charCodeAt(0))) +
    "\r\n".concat(greet)
    .split('')
    .map(a => 
	ctors.copy2ax(combine(0x0e, a.charCodeAt(0)))
	+ctors.biosinterrupt()
    ).join('')+
    ctors.biosinterrupt() +
    ctors.halt() +
    ctors.jmp();

let part2 = amt => ctors.padding(amt) + ctors.magic();

let mkos = () => {
    let p1 = part1();
    let p2 = part2(510 - p1.length);
    return p1 + p2;
};

save2file = async filename => {
    const buf = mkos();
    await writeFile(filename, buf, {encoding:"ascii"});
    return true;
};

filename = process.argv[2];
if (!filename) {
    console.error("Usage: " + process.argv[1] + " <filename>");
    process.exit(1);
}

let exitval = await save2file(filename);
console.log(exitval ? "ok" : "failed");

