//using System;
//using System.Linq;

//// We don’t provide test cases in this language yet, but have outlined the signature for you. Please write your code below, and don’t forget to test edge cases!
//class BillionUsers
//{
//    static void Main(string[] args)
//    {
//        // Call GetBillionUsersDay() with test cases here
//    }

//    private static int GetBillionUsersDay(float[] growthRates)
//    {
//        // Write your code here
//        var users = 0;
//        var count = 1;
//        while (users < 1000000000)
//        {
//            users = growthRates.Select(g => Math.Pow(g, count)).Sum();
//        }
//    }
//}