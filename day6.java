package day6;

import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.io.BufferedReader;

class Day6 {
    static String INPUT_FILE = "input.txt";

    static boolean allUnique(String s) {
        for (int i = 0; i < s.length(); i++) {
            for (int j = i + 1; j < s.length(); j++) {
                if (s.charAt(i) == s.charAt(j)) {
                    return false;
                }
            }
        }
        return true;
    }

    static int findFirstUniqueSubstr(BufferedReader br, int len) throws IOException {
        String buf = new String();
        int read;
        int c;
        for (read = 1; (c = br.read()) != -1; read++) {
            if (buf.length() == len)
                buf = buf.substring(1);
            buf += (char) c;
            if (buf.length() == len && allUnique(buf))
                break;
        }
        return read;
    }

    public static void main(String[] args) {
        File file = new File(INPUT_FILE);

        try {
            BufferedReader br = new BufferedReader(new FileReader(file));

            // Part 1
            int firstSOP = findFirstUniqueSubstr(br, 4);
            System.out.println("Part 1: " + firstSOP);

            // Reset the file reader
            br.close();
            br = new BufferedReader(new FileReader(file));

            // Part 2
            int firstSOM = findFirstUniqueSubstr(br, 14);
            System.out.println("Part 2: " + firstSOM);

            br.close();
        } catch (IOException e) {
            System.out.println("File not found: " + INPUT_FILE);
            return;
        }
    }
}
