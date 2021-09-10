//using System;
//using System.Diagnostics;

//// We don’t provide test cases in this language yet, but have outlined the signature for you. Please write your code below, and don’t forget to test edge cases!
//public class RotationalCipher
//{
//    static void Main(String[] args)
//    {
//        var result = rotationalCipher("123.abc", 27);
//        Debugger.Break();
//    }

//    private static string rotationalCipher(String input, int rotationFactor)
//    {
//        var index = 0;
//        var charArray = input.ToCharArray();
//        foreach (var c in charArray)
//        {
//            if (isNumber(c))
//            {
//                charArray[index] = shiftNumber(c, rotationFactor);
//                index++;
//            }
//            else if (isLetter(c))
//            {
//                charArray[index] = shiftLetter(c, rotationFactor);
//                index++;
//            }
//            else
//            {
//                index++;
//            }
//        }


//        return new string(charArray);
//    }

//    private static bool isLetter(char c)
//    {
//        return c >= 'A' && c <= 'z';
//    }

//    private static char shiftLetter(char letter, int rotationFactor)
//    {
//        var offset = 'a';
//        if (letter < 'a')
//            offset = 'A';

//        var baseLetter = letter - offset;
//        var shiftedLetter = (baseLetter + rotationFactor) % 26;
//        return (char)(shiftedLetter + offset);
//    }

//    private static char shiftNumber(char number, int rotationFactor)
//    {
//        var baseNumber = number - '0';
//        var shiftedNumber = (baseNumber + rotationFactor) % 10;
//        return (char)(shiftedNumber + '0');
//    }

//    private static bool isNumber(char c)
//    {
//        return c >= '0' && c <= '9';
//    }
//}