#include <stdlib.h>
#include <stdio.h>

int main(int argc, char *argv[])
{
    if (argc != 2)
    {
        printf("Usage: %s <input>\n", argv[0]);
        return EXIT_FAILURE;
    }

    FILE *input = fopen(argv[1], "r");
    if (input == NULL)
    {
        perror("fopen");
        return EXIT_FAILURE;
    }

    // Part 1

    unsigned elf_sum = 0;
    unsigned max_sum = 0;
    char *buf = malloc(BUFSIZ);
    size_t buf_size = BUFSIZ;
    while (getline(&buf, &buf_size, input) != EOF)
    {
        if (buf[0] == '\n')
        {
            if (elf_sum > max_sum)
                max_sum = elf_sum;
            elf_sum = 0;
            continue;
        }
        elf_sum += atoi(buf);
    }
    printf("Part 1: %u\n", max_sum);

    // Part 2

    // Reset to beginning of file
    fseek(input, 0, SEEK_SET);

    const unsigned num_maxes = 3;
    unsigned maxes[num_maxes] = {0};
    elf_sum = 0;
    while (getline(&buf, &buf_size, input) != EOF)
    {
        if (buf[0] == '\n')
        {
            // Find the min of the maxes
            unsigned min = 0;
            for (int i = 1; i < num_maxes; i++)
            {
                if (maxes[i] < maxes[min])
                    min = i;
            }

            // ...and replace it if the current sum is greater
            if (elf_sum > maxes[min])
                maxes[min] = elf_sum;
            elf_sum = 0;
            continue;
        }
        elf_sum += atoi(buf);
    }
    unsigned total = 0;
    for (int i = 0; i < num_maxes; i++)
        total += maxes[i];
    printf("Part 2: %u\n", total);

    free(buf);
    fclose(input);
    return EXIT_SUCCESS;
}