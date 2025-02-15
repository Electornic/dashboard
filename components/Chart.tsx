import React from 'react';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

// Chart.js에 필요한 컴포넌트 등록
ChartJS.register(
  CategoryScale, // x축 (범주형 데이터)
  LinearScale, // y축 (숫자 값)
  PointElement, // 데이터 포인트
  LineElement, // 선(Line) 요소
  Title, // 제목 플러그인
  Tooltip, // 툴팁 플러그인
  Legend, // 범례(Legend)
);

const Chart: React.FC = () => {
  // 데이터 (x축과 y축 값)
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'], // x축 범주 (category)
    datasets: [
      {
        label: 'Earnings',
        data: [4000, 5000, 6000, 7500, 9000, 11000], // y축 값
        borderColor: 'rgba(75, 192, 192, 1)', // 선 색상
        backgroundColor: 'rgba(75, 192, 192, 0.2)', // 배경 색상
        fill: true, // 선 아래 채우기
      },
    ],
  };

  // 옵션 (차트 설정)
  const options = {
    responsive: true, // 반응형 차트
    plugins: {
      legend: {
        display: true,
        position: 'top' as const, // 범례 위치
      },
      title: {
        display: true,
        text: 'Earnings Overview', // 차트 제목
      },
    },
    scales: {
      x: {
        type: 'category', // x축 스케일 (category 등록됨)
      },
      y: {
        type: 'linear', // y축 스케일
        beginAtZero: true, // 값이 0부터 시작
      },
    },
  };

  return (
    <div className="bg-white shadow rounded p-4">
      <h3 className="text-gray-600 mb-4">Earnings Overview</h3>
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/* @ts-expect-error */}
      <Line data={data} options={options} /> {/* Line 차트 컴포넌트 */}
    </div>
  );
};

export default Chart;
