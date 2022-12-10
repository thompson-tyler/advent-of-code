#include <stdlib.h>
#include <stdio.h>

class BstNode
{
private:
    char letter;
    BstNode *left;
    BstNode *right;

public:
    BstNode(char c);
    ~BstNode();
    void insert(char c);
    bool search(char c);
};

BstNode::BstNode(char c)
{
    letter = c;
    left = NULL;
    right = NULL;
}

BstNode::~BstNode()
{
    if (left != NULL)
        delete left;
    if (right != NULL)
        delete right;
}

void BstNode::insert(char c)
{
    if (c < letter)
    {
        if (left == NULL)
            left = new BstNode(c);
        else
            left->insert(c);
    }
    else
    {
        if (right == NULL)
            right = new BstNode(c);
        else
            right->insert(c);
    }
}

bool BstNode::search(char c)
{
    if (c == letter)
        return true;
    else if (c < letter)
    {
        if (left == NULL)
            return false;
        else
            return left->search(c);
    }
    else
    {
        if (right == NULL)
            return false;
        else
            return right->search(c);
    }
}

unsigned valueof(char c)
{
    if (c >= 'a' && c <= 'z')
        return c - 'a' + 1;
    else if (c >= 'A' && c <= 'Z')
        return c - 'A' + 27;
    else
        return 0;
}

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
        printf("Could not open input file %s\n", argv[1]);
        return EXIT_FAILURE;
    }

    // Part 1

    unsigned sum = 0;
    char *line = (char *)malloc(BUFSIZ);
    size_t len = BUFSIZ;
    size_t read;
    while ((read = getline(&line, &len, input)) != EOF)
    {
        BstNode *bst = new BstNode(' ');
        // Insert first half of line into BST
        for (int i = 0; i < read / 2; i++)
            bst->insert(line[i]);

        // Search for second half of line in BST, and add to sum if found
        for (int i = read / 2; i < read; i++)
        {
            if (bst->search(line[i]))
            {
                sum += valueof(line[i]);
                break;
            }
        }

        delete bst;
    }
    printf("Part 1: %u\n", sum);

    // Part 2

    fseek(input, 0, SEEK_SET);

    sum = 0;
    while ((read = getline(&line, &len, input)) != EOF)
    {
        BstNode *sack1 = new BstNode(' ');
        BstNode *sack2 = new BstNode(' ');

        // Insert first line into sack1
        for (int i = 0; i < read; i++)
            sack1->insert(line[i]);

        // Insert second line into sack2 if it is in sack1
        read = getline(&line, &len, input);
        for (int i = 0; i < read; i++)
        {
            if (sack1->search(line[i]))
                sack2->insert(line[i]);
        }

        // Search for third line in sack2, and add to sum if found
        read = getline(&line, &len, input);
        for (int i = 0; i < read; i++)
        {
            if (sack2->search(line[i]))
            {
                sum += valueof(line[i]);
                break;
            }
        }

        delete sack1;
        delete sack2;
    }
    printf("Part 2: %u\n", sum);

    fclose(input);
    return EXIT_SUCCESS;
}
