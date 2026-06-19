'use client'

import { useMemo } from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { useTranslations } from 'next-intl'
import type { TrackPoint } from '@/lib/api/types'

export function TrackChart({ points }: { points: TrackPoint[] }) {
  const t = useTranslations('viewer')

  const options = useMemo<Highcharts.Options>(
    () => ({
      title: { text: undefined },
      credits: { enabled: false },
      accessibility: { description: t('subtitle') },
      xAxis: {
        title: { text: t('altitude') },
        reversed: true,
        labels: { format: '{value} m' },
      },
      yAxis: [
        { title: { text: `${t('speed')} (km/h)` } },
        { title: { text: t('glide') }, opposite: true },
      ],
      tooltip: { shared: true, valueDecimals: 1 },
      series: [
        {
          type: 'line',
          name: t('horizontalSpeed'),
          color: '#0284c7',
          data: points.map((p) => [p.altitude, p.horizontalSpeed]),
          tooltip: { valueSuffix: ' km/h' },
        },
        {
          type: 'line',
          name: t('verticalSpeed'),
          color: '#dc2626',
          data: points.map((p) => [p.altitude, p.verticalSpeed]),
          tooltip: { valueSuffix: ' km/h' },
        },
        {
          type: 'line',
          name: t('glide'),
          color: '#16a34a',
          yAxis: 1,
          data: points.map((p) => [p.altitude, p.glideRatio]),
        },
      ],
      responsive: {
        rules: [
          {
            condition: { maxWidth: 600 },
            chartOptions: { chart: { height: 300 }, legend: { itemDistance: 8 } },
          },
        ],
      },
    }),
    [points, t]
  )

  return (
    <figure
      role="region"
      aria-label={`${t('speed')}, ${t('glide')}, ${t('altitude')}`}
      className="m-0"
    >
      <HighchartsReact highcharts={Highcharts} options={options} />
    </figure>
  )
}
