// Write any using statements here

using System;

class Solution
{
    //hashtable of points
    //edge case test for =='s and search for adjacency
    public class Point
    {
        public Point(long X, long Y)
        {
            this.X = X; this.Y = Y;
        }
        public long X;
        public long Y;
    }

    public class HorizontalLine
    {
        public HorizontalLine(Point p1, Point p2)
        {
            if (p1.X > p2.X)
            {
                Right = p1; Left = p2;
            }
            else
            {
                Left = p1; Right = p2;
            }
        }

        public Point Left;
        public Point Right;
    }

    public class VerticalLine
    {
        public VerticalLine(Point p1, Point p2)
        {
            if (p1.Y > p2.Y)
            {
                Top = p1; Bottom = p2;
            }
            else
            {
                Top = p2; Bottom = p1;
            }
        }

        public Point Top;
        public Point Bottom;
    }

    public long getPlusSignCount(int N, int[] L, string D)
    {
        var horizontalLines = new HorizontalLine[N];
        var verticalLines = new VerticalLine[N];
        var directions = D.ToCharArray();
        var verticalLineCount = 0;
        var horizontalLineCount = 0;

        Point point = new Point(0, 0);
        for (int i = 0; i < N; i++)
        {
            var direction = directions[i];
            var length = L[i];
            var nextPoint = Draw(point, length, direction);
            if (direction == 'D' || direction == 'U')
                verticalLines[i] = new VerticalLine(point, nextPoint);

            if (direction == 'L' || direction == 'R')
                horizontalLines[i] = new HorizontalLine(point, nextPoint);
            point = nextPoint;
        }

        var count = 0L;
        //assert lines.length = N - 1;
        foreach (var horizontalLine in horizontalLines)
        {
            foreach (var verticalLine in verticalLines)
            {
                if (IsIntersection(horizontalLine, verticalLine))
                    count++;
            }
        }

        return count;
    }

    public bool IsIntersection(HorizontalLine horizontal, VerticalLine vertical)
    {
        if (horizontal.Left.X < vertical.Top.X && horizontal.Right.X > vertical.Top.X)
            if (vertical.Top.Y < horizontal.Left.Y && vertical.Bottom.Y < horizontal.Left.Y)
                return true;
        return false;
    }

    public Point Draw(Point start, int length, Char direction)
    {
        switch (direction)
        {
            case 'D': return new Point(start.X - length, start.Y);
            case 'U': return new Point(start.X + length, start.Y);
            case 'L': return new Point(start.X, start.Y - length);
            case 'R': return new Point(start.X, start.Y + length);
            default: return start;
        }
    }

}
