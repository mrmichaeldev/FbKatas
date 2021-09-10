//using System;
//using System.Diagnostics;

//// We don’t provide test cases in this language yet, but have outlined the signature for you. Please write your code below, and don’t forget to test edge cases!
//class ContiguousSubArrays
//{
//    static void Main(string[] args)
//    {
//        // Call countSubarrays() with test cases here
//        //countSubarrays(new int[] {});

//        var result = countSubarrays(new int[] { 3, 4, 1, 6, 2 });
//        Debugger.Break();

//    }

//    private static int[] countSubarrays(int[] arr)
//    {
//        var results = new int[arr.Length];
//        for (int index = 0; index < arr.Length; index++)
//        {
//            var result = getResult(index, arr);
//            results[index] = result;
//        }

//        return results;
//    }

//    private static int getResult(int index, int[] arr)
//    {
//        var originalIndex = index;
//        var count = 1;
//        var number = arr[index];

//        //count left
//        for (; index >= 0; index--)
//        {
//            if (arr[index] <= number)
//                count++;
//            else
//                break;
//        }
//        index = originalIndex;
//        //count right
//        for (; index < arr.Length; index++)
//        {
//            if (arr[index] <= number)
//                count++;
//            else
//                break;
//        }

//        return count;
//    }
//}
