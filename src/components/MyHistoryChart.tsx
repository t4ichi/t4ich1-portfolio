import React, { useState } from 'react'
import { Card } from 'react-bootstrap'
import { MyEvent } from '../domain/entities'

interface MyHistoryChartProps {
  myEvents: MyEvent[]
  onChange?: (events: MyEvent[]) => void
  readonly?: boolean
  width?: number | string
}

type Point = {
  x: number
  y: number
}

type DragState = {
  index: number
  x: number
  y: number
  age: number
  score: number
}

type XCalcFunc = (x: number) => number

const coerceRange = (value: number, minValue: number, maxValue: number) => {
  if (value < minValue) return minValue
  if (value > maxValue) return maxValue
  return value
}

const XAxis: React.FC<{
  x: number
  y: number
  width: number
  maxAge: number
  calcFunc: XCalcFunc
}> = ({ x, y, width, maxAge, calcFunc }) => {
  const ageTitles: JSX.Element[] = []

  for (let age = 5, preX = 0; age <= maxAge; age += 5) {
    const x = calcFunc(age)
    if (x > preX + 32) {
      ageTitles.push(
        <g key={`age:${age}`}>
          <line x1={x} y1={y - 3} x2={x} y2={y + 3} stroke='#ffffff' />
          <text
            x={x}
            y={y + 22}
            fontSize='16'
            fill='#E7C97D'
            textAnchor='middle'
            dominantBaseline='central'
          >
            {age}歳
          </text>
        </g>,
      )
      preX = x
    }
  }

  return (
    <>
      {/* X軸主線 */}
      <line
        x1={x}
        y1={y}
        x2={x + width + 4}
        y2={y}
        stroke='#F7F3C3'
        strokeWidth={10}
        strokeLinecap='round'
      />
      {/* X軸右端の矢印 */}
      <path d={`M ${x + width + 4},${y} v 10 l 20,-10 l -20,-10 Z`} fill='#F7F3C3' />
      <text x={x + width + 30} y={y} fontSize='20' fill='#E7C97D' dominantBaseline='central'>
        現在
      </text>
      {ageTitles}
    </>
  )
}

const YAxis: React.FC<{ x: number; y: number; height: number }> = ({ x, y, height }) => {
  return (
    <>
      <line
        x1={x}
        y1={y - height / 2}
        x2={x}
        y2={y + height / 2}
        stroke='#EACD7E'
        strokeWidth={10}
        strokeLinecap='round'
      />
      <text
        x={x - 24}
        y={y}
        fontSize='22'
        fill='#D8BD58'
        dominantBaseline='central'
        textAnchor='middle'
        writingMode='tb'
        textLength='240'
      >
        人生の充実度・満足度
      </text>

      <text
        x={x}
        y={y - height / 2 - 40}
        fontSize='24'
        fill='#D8BD58'
        dominantBaseline='central'
        textAnchor='middle'
      >
        高
      </text>

      <text
        x={x}
        y={y + height / 2 + 40}
        fontSize='24'
        fill='#D8BD58'
        dominantBaseline='central'
        textAnchor='middle'
      >
        低
      </text>

      {/* 上矢印 */}
      <path d={`M ${x},${y - height / 2} h 10 l -10,-20 l -10,20 Z`} fill='#EACD7E' />

      {/* 下矢印 */}
      <path d={`M ${x},${y + height / 2} h 10 l -10,20 l -10,-20 Z`} fill='#EACD7E' />
    </>
  )
}

// 人生曲線
const ChartLine: React.FC<{ points: Point[] }> = ({ points }) => {
  // x が [a, b] の間の値かどうかを返す
  const between = (x: number, a: number, b: number) => Math.min(a, b) <= x && x <= Math.max(a, b)

  // 左端の点の一つ左の点と、右端の点の一つ右の点を仮想的に計算する
  const p: { [name: number]: Point } = {}
  for (let i = 0; i <= 6; i++) p[i] = points[i]
  p[-1] = {
    x: p[0].x - (p[1].x - p[0].x),
    y: p[0].y - (p[1].y - p[0].y),
  }
  p[7] = {
    x: p[6].x + (p[6].x - p[5].x),
    y: p[6].y + (p[6].y - p[5].y),
  }

  // 配列 [0..6] を生成する
  const range0to6 = Array.from(Array(7).keys())

  // 各点の法線の傾きを計算
  const rads = range0to6.map((i) =>
    between(p[i].y, p[i + 1].y, p[i - 1].y)
      ? Math.atan2(p[i + 1].y - p[i - 1].y, p[i + 1].x - p[i - 1].x)
      : 0,
  )

  // 各点の左のベジュ制御点を計算
  const p1 = range0to6.map((i) => {
    const dx1 = (p[i - 1].x - p[i].x) * 0.333
    const dy1 = Math.tan(rads[i]) * dx1
    return { x: p[i].x + dx1, y: p[i].y + dy1 }
  })

  // 各点の右のベジュ制御点を計算
  const p2 = range0to6.map((i) => {
    const dx2 = (p[i + 1].x - p[i].x) * 0.333
    const dy2 = Math.tan(rads[i]) * dx2
    return { x: p[i].x + dx2, y: p[i].y + dy2 }
  })

  // 各点とそれぞれの制御点からベジュ曲線を生成する
  let curvePath = ''
  curvePath += `M ${p[0].x} ${p[0].y}`
  for (let i = 1; i <= 6; i++) {
    curvePath += `\n C ${p2[i - 1].x} ${p2[i - 1].y}, ${p1[i].x} ${p1[i].y}, ${p[i].x} ${p[i].y}`
  }

  // ベジュ曲線の制御点を可視化 (開発用)
  let sCurvePath = ''
  sCurvePath += `M ${p[0].x} ${p[0].y} L ${p2[0].x} ${p2[0].y}`
  for (let i = 1; i <= 6; i++) {
    sCurvePath += `\n M ${p1[i].x} ${p1[i].y} L ${p[i].x} ${p[i].y} L ${p2[i].x} ${p2[i].y}`
  }

  return (
    <>
      <path
        d={curvePath}
        stroke='#1066cc'
        strokeWidth={10}
        fill='none'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </>
  )
}

const MyHistoryChart: React.FC<MyHistoryChartProps> = ({ myEvents, onChange, readonly, width }) => {
  const [dragState, setDragState] = useState<DragState>({
    x: 0,
    y: 0,
    age: 0,
    score: 0,
    index: -1,
  })

  const changeEvents = (events: MyEvent[]) => {
    if (onChange !== undefined) {
      onChange(events)
    }
  }

  const maxEvents = 6 /* グラフに表示できるイベントの数 */
  const xAxisX = 70 /* X軸の原点X座標 */
  const xAxisWidth = 860 /* X軸の幅 */
  const xAxisY = 350 /* Y軸の原点Y座標 */
  const yChartHeight = 360 /* チャートの高さ (-100 ～ +100) */
  const yAxisHeight = 260 /* Y軸の高さ */

  const zeroAgeX = xAxisX + 10 /* 0歳のX座標 */
  const maxAgeWidth = 850 /* 現在時のX座標 */

  const maxAge = Math.max(...myEvents.map((v) => v.age))

  /* 年齢 ⇒ X座標 の変換関数 */
  const calcPointX: XCalcFunc = (age: number): number =>
    zeroAgeX + (age * age * maxAgeWidth) / (maxAge * maxAge)

  /* X座標 ⇒ 年齢 の変換関数 */
  const calcPointXRev: XCalcFunc = (x: number): number => {
    if (x <= zeroAgeX) return 0
    return Math.round(Math.sqrt((x - zeroAgeX) / maxAgeWidth) * maxAge)
  }

  /* 充実度 ⇒ Y座標 の変換関数 */
  const calcPointY: XCalcFunc = (score: number): number =>
    xAxisY - (score * (yChartHeight / 2)) / 100

  /* Y座標 ⇒ 充実度 の変換関数 */
  const calcPointYRev: XCalcFunc = (y: number): number =>
    Math.round(((xAxisY - y) * 100) / (yChartHeight / 2))

  /* グラフ上の点がクリックされ時に呼び出される。ドラッグによる年齢と充実度の変更用 */
  const handlePointerDown = (index: number, x: number, y: number) => {
    setDragState({
      index,
      x,
      y,
      age: myEvents[index].age,
      score: myEvents[index].score,
    })
  }

  /* グラフ上の点がクリックが終わった時に呼び出される。ドラッグによる年齢と充実度の変更用 */
  const handlePointerUp = (index: number, x: number, y: number) => {
    setDragState({ x: 0, y: 0, age: 0, score: 0, index: -1 })
  }

  /* グラフ上の点がクリックされドラッグされた時に呼び出される。ドラッグによる年齢と充実度の変更用 */
  const handlePointerMove = (index: number, x: number, y: number) => {
    if (index !== dragState.index) return
    const events = myEvents.map((event) => ({ ...event }))
    const newScore = coerceRange(
      calcPointYRev(calcPointY(dragState.score) + y - dragState.y),
      -100,
      100,
    )
    const newAge =
      index < maxEvents - 1
        ? coerceRange(
            calcPointXRev(calcPointX(dragState.age) + x - dragState.x),
            index < 1 ? 1 : events[index - 1].age + 1,
            events[index + 1].age - 1,
          )
        : coerceRange(
            Math.round(dragState.age + (x - dragState.x) / 20),
            myEvents[index - 1].age + 1,
            50,
          )
    events[index].age = newAge
    events[index].score = newScore
    changeEvents(events)
  }

  /* ドラッグできるグラフ上の点 */
  const pointCircles: JSX.Element[] = myEvents.map((event, index) => {
    return (
      <circle
        key={`ChartCircle:${index}`}
        cx={calcPointX(event.age)}
        cy={calcPointY(event.score)}
        r={10}
        fill='#1066cc'
        {...(readonly
          ? {}
          : {
              onPointerDown: (e) => {
                handlePointerDown(index, e.clientX, e.clientY)
                e.currentTarget.setPointerCapture(e.pointerId)
              },
              onPointerUp: (e) => {
                handlePointerUp(index, e.clientX, e.clientY)
              },
              onPointerMove: (e) => {
                handlePointerMove(index, e.clientX, e.clientY)
              },
            })}
      ></circle>
    )
  })

  /* イベントの説明とグラフの点までの線 */
  const eventBoxes: JSX.Element[] = myEvents.map((v, index) => {
    const boxX = Math.floor(index / 2) * 345 + 0
    const boxY = (index % 2) * 545 + 5
    const boxWith = 310
    const boxHeight = 150
    const pointX = calcPointX(v.age)
    const pointY = calcPointY(v.score)

    const onTitleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
      const events = myEvents.map((event) => ({ ...event }))
      events[index].title = e.target.value
      changeEvents(events)
    }

    const onTextChange: React.ChangeEventHandler<HTMLTextAreaElement> = (e) => {
      const events = myEvents.map((event) => ({ ...event }))
      events[index].text = e.target.value
      changeEvents(events)
    }

    const boxLineStartX =
      pointX <= boxX + 40 ? boxX + 40 : pointX >= boxX + boxWith - 40 ? boxX + boxWith - 40 : pointX
    const boxLineStartY = pointY <= boxY ? boxY + 20 : boxY + boxHeight - 20

    return (
      <React.Fragment key={`Event:${index}`}>
        <line
          x1={boxLineStartX}
          y1={boxLineStartY}
          x2={pointX}
          y2={pointY}
          stroke='#F7F3C3'
          strokeWidth='2'
        />
        <foreignObject
          x={boxX}
          y={boxY}
          width={boxWith}
          height={boxHeight}
          requiredExtensions='http://www.w3.org/1999/xhtml'
        >
          <div
            style={{
              padding: '8px',
              lineHeight: '20px',
              fontSize: '20px',
              borderStyle: 'solid',
              borderColor: '#F7F3C3',
              borderWidth: '2px',
              backgroundColor: '#F7F3C3',
              borderRadius: '4px',
            }}
          >
            <div
              style={{
                color: '#3D2C11',
                lineHeight: '26px',
                fontSize: '24px',
                marginBottom: '4px',
              }}
            >
              <strong>{v.age}歳</strong>{' '}
              {readonly === true ? (
                <span
                  style={{
                    width: '160px',
                    display: 'inline',
                    border: 'none',
                    color: '#3D2C11',
                    lineHeight: '20px',
                    fontSize: '20px',
                  }}
                >
                  {v.title}
                </span>
              ) : (
                <input
                  type='text'
                  style={{
                    width: '160px',
                    display: 'inline',
                    border: 'none',
                    color: '#3D2C11',
                    lineHeight: '20px',
                    backgroundColor: '#F7F3C3',
                    fontSize: '20px',
                  }}
                  value={v.title}
                  onChange={onTitleChange}
                />
              )}
            </div>
            <div>
              {readonly === true ? (
                <div
                  style={{
                    border: 'none',
                    color: '#896427',
                    height: `${boxHeight - 50}px`,
                  }}
                >
                  {v.text}
                </div>
              ) : (
                <textarea
                  style={{
                    border: 'none',
                    color: '#896427',
                    width: '100%',
                    backgroundColor: '#F7F3C3',
                    height: `${boxHeight - 60}px`,
                  }}
                  value={v.text}
                  onChange={onTextChange}
                ></textarea>
              )}
            </div>
          </div>
        </foreignObject>
      </React.Fragment>
    )
  })

  /* グラフ上の点の一覧。線グラフ用 */
  const points: Point[] = [{ x: calcPointX(0), y: calcPointY(0) }].concat(
    myEvents.map((event) => ({
      x: calcPointX(event.age),
      y: calcPointY(event.score),
    })),
  )

  return (
    <div className='myhistory-chart'>
      <svg xmlns='http://www.w3.org/2000/svg' width={width || 1000} viewBox='0 0 1000 800'>
        <XAxis x={xAxisX} y={xAxisY} width={xAxisWidth} maxAge={maxAge} calcFunc={calcPointX} />
        <YAxis x={xAxisX - 20} y={xAxisY} height={yAxisHeight} />
        {eventBoxes}
        <ChartLine points={points} />
        {pointCircles}
      </svg>
    </div>
  )
}

export default MyHistoryChart
