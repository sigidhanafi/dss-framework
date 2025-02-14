'use client';

import SettingCriteria from '@/components/setting-criteria';
import Stepper from '@/components/stepper';
import { useParams, useRouter } from 'next/navigation';
import React, { useState } from 'react';

export default function SelectCriteria() {
  const { id: topicId } = useParams();
  const criteria = [
    {
      name: 'Pengalaman',
      desc: 'Lama bekerja dalam bidang terkait',
      type: 'Benefit',
      weight: 'Tinggi',
      subcriteria: [
        {
          name: '> 5 Tahun',
          desc: 'Pengalaman lebih dari 5 tahun',
          type: 'Benefit',
          weight: 'Tinggi',
          subcriteria: [
            {
              name: 'Sub Sub Criteria',
              desc: 'Sub Sub Sub',
              type: 'Benefit',
              weight: 'Tinggi',
            },
          ],
        },
        {
          name: '3-5 Tahun',
          desc: 'Pengalaman antara 3 hingga 5 tahun',
          type: 'Benefit',
          weight: 'Sedang',
        },
        {
          name: '< 3 Tahun',
          desc: 'Pengalaman kurang dari 3 tahun',
          type: 'Benefit',
          weight: 'Rendah',
        },
      ],
    },
    {
      name: 'Universitas',
      desc: 'Asal universitas',
      type: 'Benefit',
      weight: 'Tinggi',
      subcriteria: [],
    },
    {
      name: 'IPK',
      desc: 'Indeks Prestasi Kumulatif akademik',
      type: 'Benefit',
      weight: 'Sedang',
      subcriteria: [
        {
          name: '> 3.5',
          desc: 'IPK lebih dari 3.5',
          type: 'Benefit',
          weight: 'Tinggi',
        },
        {
          name: '3.0 - 3.5',
          desc: 'IPK antara 3.0 dan 3.5',
          type: 'Benefit',
          weight: 'Sedang',
        },
        {
          name: '< 3.0',
          desc: 'IPK kurang dari 3.0',
          type: 'Benefit',
          weight: 'Rendah',
        },
      ],
    },
  ];

  const step = 1;

  return (
    <>
      {/* Header / Title */}
      <div className='flex flex-col items-center justify-center min-h-20 mt-20'>
        <h1 className='text-3xl font-bold'>Topic: Memilih Kandidat Beasiswa</h1>
        <p>Memilih kandidat penerima beasiswa LPDP 2025 jalur prestasi</p>
      </div>

      <Stepper step={1} />

      <SettingCriteria
        title={'Setting Criteria'}
        criteria={criteria}
        action={'process'}
        topicId={topicId}
      />
    </>
  );
}
