using Godot;
using System.Collections.Generic;

public class SlimeTest : Node2D
{

	//中心点
	public Node2D center;


    public override void _Ready()
    {
		_Init();
		center = GetNode<Node2D>("Center");
    }

    public override void _Process(float delta)
    {
		center.GlobalPosition = GetGlobalMousePosition();
		_UpdateSoft(delta);
	}

	private void testFunc(float delta)
    {
		for (int i = 0; i < points; i++)
		{
			//blob[i] = setDistance(blob[i], Vector2.Zero, 40.0f);
			var len = (blob[i] - center.GlobalPosition).Length();
            if (len > 50.0f)
            {
                blob[i] = setDistance(blob[i], center.GlobalPosition, 50 + (len - 50) * 0.995f);
            }
            //if (Input.IsMouseButtonPressed((int)ButtonList.Left) && (blob[i] - GetGlobalMousePosition()).Length() < 40.0f)
            //{
            //    blob[i] = setDistance(blob[i], GetGlobalMousePosition(), 40.0f);
            //}
            if (blob[i].Length() > 1000.0f)
            {
                blob[i] = setDistance(blob[i], Vector2.Zero, 1000.0f);
            }
        }
    }

	private float getLen(float l)
    {
		int num = (int)l;
		float count = 0;
		for (int i = 1; i <= num; i++)
        {
			count += 1 / i;
		}
		return count;
    }

    //--------------------------------------------------

    //绘制点的数量
    [Export]
	public int points = 12;
	//绘制的大小
	[Export]
	public float radius = 50.0f;
	//柔软度
	[Export]
	public float circumfrenceMultiplier = 1.0f;

	//预先计算某些内部函数
	public float area;
	public float circumfrence;
	public float length;
	public int iterations = 10;

	//轮廓的点
	public List<Vector2> blob = new List<Vector2>();
	//之前的轮廓点
	public List<Vector2> blobOld = new List<Vector2>();
	//累计的位移
	public Dictionary<int, float> accumulatedDisplacements = new Dictionary<int, float>();
	//轮廓点的法线
	public List<List<Vector2>> normals = new List<List<Vector2>>();
	//重力方向
	[Export]
	public Vector2 gravity = new Vector2(0, 30);
	[Export]
	public float splineLength = 12.0f;
	[Export]
	public Curve2D curve;

	public Vector2 getVectorByLA(float length, float angle)
	{
		angle = Mathf.Deg2Rad(angle);
		var vector = new Vector2(Mathf.Cos(angle), Mathf.Sin(angle)) * length;
		return vector;
	}
	public override void _EnterTree()
	{
		area = radius * radius * Mathf.Pi;
		circumfrence = radius * 2.0f * Mathf.Pi * circumfrenceMultiplier;
		length = circumfrence * 1.15f / points;
	}

	public void verletIntegrate(int i, object delta)
	{
		var temp = new Vector2(blob[i]);
		blob[i] = (blob[i] + (blob[i] - blobOld[i]));
		blobOld[i] = temp;
	}

	public Vector2 setDistance(Vector2 currentPoint, Vector2 anchor, float distance)
	{
		var toAnchor = currentPoint - anchor;
		toAnchor = toAnchor.Normalized() * distance;
		return toAnchor + anchor;
	}

	public void _Init()
	{
		resetBlob();
	}

	public Vector2 findCentroid()
	{
		var x = 0.0f;
		var y = 0.0f;
		for (int i = 0; i < points; i++)
		{
			x += blob[i].x;
			y += blob[i].y;
		}
		var cent = new Vector2();
		cent.x = x / points;
		cent.y = y / points;
		return cent;
	}

	public Vector2 getPoint(int i)
	{
		var pointCount = curve.GetPointCount();
		i = Mathf.Clamp(i, 0, pointCount - 1);
		return curve.GetPointPosition(i);
	}

	public Vector2 getSpline(int i)
	{
		var lastPoint = getPoint(i - 1);
		var nextPoint = getPoint(i + 1);
		var spline = lastPoint.DirectionTo(nextPoint) * splineLength;
		return spline;
	}

	public void updateSprite()
	{
		var polBlob = new List<Vector2>(blob);
		polBlob.Add(blob[0]);
		curve.ClearPoints();
		for (int i = 0; i < points + 1; i++)
		{
			curve.AddPoint(polBlob[i]);
		}
		var point_count = curve.GetPointCount();
		for (int i = 0; i < point_count; i++)
		{
			var spline = getSpline(i);
			curve.SetPointIn(i, -spline);
			curve.SetPointOut(i, spline);
		}
	}

	public float getCurArea()
	{
		var area = 0.0f;
		var j = points - 1;
		for (int i = 0; i < points; i++)
		{
			area += (blob[j].x + blob[i].x) * (blob[j].y - blob[i].y);
			j = i;
		}
		return Mathf.Abs(area / 2.0f);
	}

	public override void _Draw()
	{
		//for	(int i = 0; i < points; i++)
		//{
		//	DrawLine(normals[i][0], normals[i][1], new Color(255, 0, 0), 3);
		//}
		
		var bakedPoints = curve.GetBakedPoints();
		var drawPoints = new Vector2[bakedPoints.Length];
		bakedPoints.CopyTo(drawPoints, 0);

		if (Geometry.TriangulatePolygon(drawPoints).Length == 0)
		{
			drawPoints = Geometry.ConvexHull2d(bakedPoints);
		}

        DrawPolygon(drawPoints, new Color[] { new Color(0, 1, 0, 1) });
        //DrawPolyline(drawPoints, Colors.Black, 2.0f, true);
        //for (int i = 0; i < points; i++)
        //{
        //    DrawLine(blob[i], blob[(i + 1) % points], Colors.Blue, 3);
        //}
    }

    public void _UpdateSoft(float delta)
	{
		for (int i = 0; i < points; i++)
		{
			verletIntegrate(i, delta);
			blob[i] += gravity * delta;
		}
		for (int iterate = 0; iterate < iterations; iterate++)
		{
			for (int i = 0; i < points; i++)
			{
				var segment = blob[i];
				var nextIndex = i + 1;
				if (i == points - 1)
				{
					nextIndex = 0;
				}
				var nextSegment = blob[nextIndex];
				var toNext = segment - nextSegment;
				if (toNext.Length() > length)
				{
					toNext = toNext.Normalized() * length;
					var offset = (segment - nextSegment) - toNext;
					accumulatedDisplacements[i * 3] -= offset.x / 2.0f;
					accumulatedDisplacements[(i * 3) + 1] -= offset.y / 2.0f;
					accumulatedDisplacements[(i * 3) + 2] += 1.0f;
					accumulatedDisplacements[(nextIndex * 3)] += offset.x / 2.0f;
					accumulatedDisplacements[(nextIndex * 3) + 1] += offset.y / 2.0f;
					accumulatedDisplacements[(nextIndex * 3) + 2] += 1.0f;
				}
			}

			var deltaArea = 0.0f;
			var curArea = getCurArea();
			if (curArea < area * 2.0)
			{
				deltaArea = area - curArea;
			}
			var dilationDistance = deltaArea / circumfrence;

			for (int i = 0; i < points; i++)
			{
				var prevIndex = i - 1;
				if (i == 0)
				{
					prevIndex = points - 1;
				}
				var nextIndex = i + 1;
				if (i == points - 1)
				{
					nextIndex = 0;
				}
				var normal = blob[nextIndex] - blob[prevIndex];
				normal = getVectorByLA(1, Mathf.Rad2Deg(normal.Angle()) - 90.0f);
				normals[i][0] = blob[i];
				normals[i][1] = blob[i] + (normal * 200.0f);
				accumulatedDisplacements[(i * 3)] += normal.x * dilationDistance;
				accumulatedDisplacements[(i * 3) + 1] += normal.y * dilationDistance;
				accumulatedDisplacements[(i * 3) + 2] += 1.0f;
			}

			for (int i = 0; i < points; i++)
			{
				if (accumulatedDisplacements[(i * 3) + 2] > 0)
				{
					blob[i] += new Vector2(accumulatedDisplacements[(i * 3)], accumulatedDisplacements[(i * 3) + 1]) / accumulatedDisplacements[(i * 3) + 2];
				}
			}

			for (int i = 0; i < points * 3; i++)
			{
				accumulatedDisplacements[i] = 0;
			}

			testFunc(delta);

		}
		//# print(curArea)
		updateSprite();
		Update();
	}

	/// <summary>
	/// 重置
	/// </summary>
	public void resetBlob()
	{
		blob.Clear();
		blobOld.Clear();
		normals.Clear();
		accumulatedDisplacements.Clear();
		for (int i = 0; i < points; i++)
		{
			var delta = getVectorByLA(radius, (360.0f / points) * i);
			blob.Add(Position + delta);
			blobOld.Add(Position + delta);
			normals.Add(new List<Vector2>());
			normals[i].Add(Position + delta);
			normals[i].Add(Position + delta * 1.5f);
		}
		for (int i = 0; i < points * 3; i++)
		{
			accumulatedDisplacements[i] = 0.0f;
		}
		updateSprite();
		Update();
	}

	//# Circumfrence Slider
	public void _on_HSlider_value_changed(float value)
	{
		circumfrenceMultiplier = value;
		circumfrence = radius * 2.0f * Mathf.Pi * circumfrenceMultiplier;
		length = circumfrence * 1.15f / points;
	}

	//# Gravity Slider
	public void _on_HSlider2_value_changed(float value)
	{
		gravity.y = value;
	}

	//# Area Slider
	public void _on_HSlider3_value_changed(float value)
	{
		radius = value;
		area = radius * radius * Mathf.Pi;
		circumfrence = radius * 2.0f * Mathf.Pi * circumfrenceMultiplier;
		length = circumfrence * 1.15f / points;
		//this.Log(area);
	}

	//# Points Slider
	public void _on_HSlider4_value_changed(float value)
	{
		points = (int)value;
		area = radius * radius * Mathf.Pi;
		circumfrence = radius * 2.0f * Mathf.Pi * circumfrenceMultiplier;
		length = circumfrence * 1.15f / points;
		//this.Log(points);
		resetBlob();
	}

}