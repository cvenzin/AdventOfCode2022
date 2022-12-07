export class Day07 {

    private root: Folder = {
        name: 'root',
        files: [],
        parentfolder: null,
        subfolders: []
    };

    part1(input: string): number {
        this.buildFolderStructure(input);
        const folderSizes: number[] = [];
        this.computeFolderSize(this.root, folderSizes);
        return folderSizes.filter(s => s <= 100000).reduce((a, b) => a + b);
    }

    part2(input: string): number {
        this.buildFolderStructure(input);
        const folderSizes: number[] = [];
        this.computeFolderSize(this.root, folderSizes);
        const usedSize = folderSizes.sort((a, b) => b - a)[0];
        return folderSizes.filter(s => 70000000 - usedSize + s >= 30000000).sort((a, b) => a - b)[0];
    }

    private buildFolderStructure(input: string) {
        let activeFolder = this.root;
        input.replaceAll('\r', '').split('\n').forEach(l => {
            if (l.startsWith('$ cd /')) {
                activeFolder = this.root;
            } else if (l.startsWith('dir')) {
                const folderName = l.split(' ')[1];
                if (!activeFolder.subfolders.some(f => f.name === folderName)) {
                    activeFolder.subfolders.push({
                        name: folderName,
                        files: [],
                        parentfolder: activeFolder,
                        subfolders: []
                    });
                }
            } else if (l.startsWith('$ cd ..')) {
                if (activeFolder.parentfolder) {
                    activeFolder = activeFolder.parentfolder;
                }
            } else if (l.startsWith('$ cd')) {
                const folderName = l.split(' ')[2];
                const subfolder = activeFolder.subfolders.find(f => f.name === folderName);
                if (subfolder) {
                    activeFolder = subfolder;
                }
            } else if (!l.startsWith('$ ls')) {
                const s = l.split(' ');
                if (!activeFolder.files.some(f => f.name === s[1])) {
                    activeFolder.files.push({
                        name: s[1],
                        size: Number(s[0])
                    });
                }
            }
        });
    }

    private computeFolderSize(folder: Folder, folderSizes: number[]): number {
        let size = folder.files.length > 0 ? folder.files.map(f => f.size).reduce((a, b) => a + b) : 0;
        folder.subfolders.forEach(f => {
            size += this.computeFolderSize(f, folderSizes);
        });
        folderSizes.push(size);
        return size;
    }
}

interface Folder {
    name: string;
    subfolders: Folder[];
    parentfolder: Folder | null;
    files: File[];
}

interface File {
    name: string;
    size: number;
}