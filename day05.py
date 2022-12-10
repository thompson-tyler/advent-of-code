INPUT_FILE = "input.txt"

def build_stacks(f):
    stacks = []    
    # Build the crate stacks
    for line in f:
        if line[0] == " ":
            break
        for i in range(len(line) // 4):
            idx = 1 + (i * 4)
            if len(stacks) <= i:
                stacks.append([])
            if line[idx] != " ":
                stacks[i].append(line[idx])
    
    for stack in stacks:
        stack.reverse()
    
    f.readline() # Skip the empty line
    return stacks

def main():
    # Part 1

    f = open(INPUT_FILE, "r")
    stacks = build_stacks(f)

    # Read and exectute the commands
    for line in f:
        tokens = line.split()
        n = int(tokens[1])
        src = int(tokens[3]) - 1
        dst = int(tokens[5]) - 1
        for _ in range(n):
            stacks[dst].append(stacks[src].pop())
    
    # Print the top crates
    print("Part 1: ", end="")
    for stack in stacks:
        print(stack[-1], end="")
    print()

    f.close()

    # Part 2
    f = open(INPUT_FILE, "r")
    stacks = build_stacks(f)

    # Read and exectute the commands
    for line in f:
        tokens = line.split()
        n = int(tokens[1])
        src = int(tokens[3]) - 1
        dst = int(tokens[5]) - 1
        stacks[dst].extend(stacks[src][-n:])
        stacks[src] = stacks[src][:-n]
    
    # Print the top crates
    print("Part 2: ", end="")
    for stack in stacks:
        print(stack[-1], end="")
    print()

    f.close()


if __name__ == "__main__":
    main()