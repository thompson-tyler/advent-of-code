X = 0
Y = 1

def fix_head_tail(head, tail):
    dx = head[X] - tail[X]
    dy = head[Y] - tail[Y]
    moved = False
    if dx > 1:
        tail[X] = head[X] - 1
        moved = True
    if dx < -1:
        tail[X] = head[X] + 1
        moved = True
    if dy > 1:
        tail[Y] = head[Y] - 1
        moved = True
    if dy < -1:
        tail[Y] = head[Y] + 1
        moved = True
    if moved:
        if abs(dx) < abs(dy):
            tail[X] = head[X]
        elif abs(dx) > abs(dy):
            tail[Y] = head[Y]

def solve_problem(moves, knots):
    visited = set()

    for move in moves:
        [direction, distance] = move.split()
        distance = int(distance)
        for _ in range(distance):
            match direction:
                case "R":
                    knots[0][X] += 1
                case "L":
                    knots[0][X] -= 1
                case "U":
                    knots[0][Y] += 1
                case "D":
                    knots[0][Y] -= 1
            for i in range(len(knots) - 1):
                fix_head_tail(knots[i], knots[i + 1])
            visited.add((knots[-1][X], knots[-1][Y]))
    
    return len(visited)

def main():
    with open("input.txt", "r") as f:
        moves = f.readlines()

    # Part 1

    knots = [[0, 0], [0, 0]]
    visited = solve_problem(moves, knots)
    
    print(f"Part 1: {visited}")

    # Part 2

    knots = [[0, 0] for _ in range(10)]
    visited = solve_problem(moves, knots)
    
    print(f"Part 2: {visited}")


if __name__ == "__main__":
    main()
