INPUT_FILE = "input.txt"
SMALL_DIR = 100000
SYSTEM_SIZE = 70000000
UNUSED_SPACE_NEEDED = 30000000

class Dir:
    name: str
    subdirs: list
    files: list
    
    def __init__(self, name):
        self.name = name
        self.subdirs = []
        self.files = []

def dir_size(dir):
    size = 0
    for file in dir.files:
        size += int(file[0])
    for subdir in dir.subdirs:
        size += dir_size(subdir)
    return size

def sum_small_dirs(dir):
    sum = 0
    size = dir_size(dir)
    if size <= SMALL_DIR:
        sum += size
    for subdir in dir.subdirs:
        sum += sum_small_dirs(subdir)
    return sum

def dir_to_delete(dir, space_needed) -> Dir | None:
    best_size = dir_size(dir)
    to_delete = None
    if best_size > space_needed:
        to_delete = dir
    for subdir in dir.subdirs:
        subdir_to_delete = dir_to_delete(subdir, space_needed)
        if subdir_to_delete is not None:
            subdir_best_size = dir_size(subdir_to_delete)
            if subdir_best_size < best_size:
                best_size = subdir_best_size
                to_delete = subdir_to_delete
    return to_delete

def main():
    f = open(INPUT_FILE, "r")

    # Part 1

    root = Dir("/")
    curr_dir = root
    parents = []

    for line in f:
        if line.startswith("$"):
            cmd = line[2:].strip()
            if cmd.startswith("cd"):
                to_dir = cmd[3:].strip()
                if to_dir == "..":
                    curr_dir = parents.pop()
                elif to_dir == "/":
                    curr_dir = root
                else:
                    parents.append(curr_dir)
                    for subdir in curr_dir.subdirs:
                        if subdir.name == to_dir:
                            curr_dir = subdir
                            break
            elif cmd.startswith("ls"):
                continue
        elif line.startswith("dir"):
            dir_name = line[4:].strip()
            new_dir = Dir(dir_name)
            curr_dir.subdirs.append(new_dir)
        else:
            file_info = [int(line.split()[0]), line.split()[1]]
            curr_dir.files.append(file_info)
    
        
    print("Part 1:", sum_small_dirs(root))

    # Part 2

    currently_unused = SYSTEM_SIZE - dir_size(root)
    space_needed = UNUSED_SPACE_NEEDED - currently_unused

    to_delete = dir_to_delete(root, space_needed)
    print("Part 2:", dir_size(to_delete))

if __name__ == "__main__":
    main()