# js_os

A simple operating system written in JavaScript (bootloader or kernel-style image).

## building the OS Image

```bash
npm start <your_os_image_name>
```
- you can also include the file extension to your file name
 e.g file_name.bin
- if file extension is not specified it will not have one
 e.g file_name 

## How to Run in Termux (Android)

1. **Install QEMU (headless version):**

```bash
pkg update && pkg upgrade
pkg install qemu-system-i386-headless
```
2. Run the OS image
```bash
qemu-system-i386 -drive format=raw,file=<your_os_image_name> -nographic -serial mon:stdio
```

## For Desktop Linux (Ubuntu/Debian):

```bash
sudo apt update && sudo apt install qemu-system-i386
qemu-system-i386 -drive format=raw,file=<your_os_image_name>
```

## On Windows:
1. Download QEMU for Windows: https://qemu.weilnetz.de/w64/

2. Extract QEMU to a folder, e.g. C:\qemu

3. Open PowerShell or Command Prompt, and run:
```powershell
cd C:\qemu
.\qemu-system-i386.exe -drive format=raw,file=path\to\<your_os_image_name>
```
- Replace path\to\<your_os_image_name> with the actual path to your image file.

- For a terminal-only bootloader (e.g., printing with BIOS interrupts), you add:

```powershell 
.\qemu-system-i386.exe -drive format=raw,file=path\to\image.img -nographic -serial mon:stdio
```
