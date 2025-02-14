'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect, useMemo, useState } from 'react';

export default function AlternativeValue({
  alternatives,
  criteriaAlternativeValue,
  dssCriteriaAlternatives,
  updateParamToParent,
  action,
}) {
  const router = useRouter();

  const [paramCalculation, setParamCalculation] = useState([]);

  const getValue = (dssCriteriaAlternatives, alternativeId, criteriaId) => {
    const match = dssCriteriaAlternatives.find(
      (item) =>
        item.alternative.alternativeId === alternativeId &&
        item.criteria.criteriaId === criteriaId
    );

    return match ? match.value : null; // Kembalikan null jika tidak ditemukan
  };

  const updateAlternativeCriteriaValue = async ({
    criteriaId,
    alternativeId,
    value,
  }) => {
    const updatedParams = paramCalculation.map((item) => {
      if (
        item.criteriaId === criteriaId &&
        item.alternativeId === alternativeId
      ) {
        return { ...item, value: Number(value) };
      }
      return item;
    });

    setParamCalculation(updatedParams);
  };

  const flattenParams = (criterias) => {
    let params = [];

    criterias.forEach((criteria) => {
      alternatives.forEach((alternative) => {
        const param = {
          criteriaId: criteria.criteriaId,
          alternativeId: alternative.alternative.alternativeId,
          value: 0,
        };
        params.push(param);
      });

      if (criteria.subCriteria && criteria.subCriteria.length > 0) {
        params = params.concat(flattenParams(criteria.subCriteria));
      }
    });

    return params;
  };

  useEffect(() => {
    const params = flattenParams(criteriaAlternativeValue);
    setParamCalculation(params);
  }, [criteriaAlternativeValue]);

  useEffect(() => {
    updateParamToParent(paramCalculation);
  }, [paramCalculation]);

  const renderCriteria = (
    criteriaAlternativeValue,
    level = 0,
    alternatives
  ) => {
    return criteriaAlternativeValue.map((crit, index) => {
      const spacerWidthClasses = [
        'w-0',
        'w-1/5',
        'w-2/5',
        'w-3/5',
        'w-4/5',
        'w-full',
      ];

      return (
        <React.Fragment key={index + level}>
          <tr key={index + level} className='bg-white text-gray-700'>
            <td className='border border-gray-300 flex-grow py-2'>
              <div className='flex flex-row items-center'>
                <div
                  className={`flex bg-gray-300 h-6 ${spacerWidthClasses[level]}`}
                ></div>
                <p className='px-4'>{crit.name}</p>
              </div>
            </td>
            {crit.alternatives.map((alternative) => {
              return (
                <td
                  key={crit.name + alternative.alternative.name}
                  className='border border-gray-300 px-4 py-2 w-40 text-center'
                >
                  {action == 'view' && (
                    <>
                      {getValue(
                        dssCriteriaAlternatives,
                        alternative.alternative.alternativeId,
                        crit.criteriaId
                      )}
                    </>
                  )}
                  {action != 'view' &&
                    crit.subCriteria &&
                    crit.subCriteria.length <= 0 && (
                      <input
                        name='name'
                        className='p-2 w-full text-center'
                        placeholder='Enter value'
                        onChange={(e) => {
                          updateAlternativeCriteriaValue({
                            criteriaId: crit.criteriaId,
                            alternativeId:
                              alternative.alternative.alternativeId,
                            value: e.target.value,
                          });
                        }}
                        autoComplete='off'
                        type='number'
                      />
                    )}
                </td>
              );
            })}
          </tr>
          {crit.subCriteria &&
            crit.subCriteria.length > 0 &&
            renderCriteria(crit.subCriteria, level + 1, alternatives)}
        </React.Fragment>
      );
    });
  };

  return (
    <>
      {/* Topic Selection with Criteria Table */}
      <div className='py-8'>
        <div className='w-3/5 mx-auto'>
          <h2 className='text-xl font-semibold mb-4'>Alternatives</h2>
          <div className='overflow-x-auto'>
            <table className='w-full border-collapse border border-gray-300'>
              <thead>
                <tr className='bg-gray-200'>
                  <th className='border border-gray-300 px-4 py-2'>Criteria</th>
                  {alternatives.map((item) => {
                    return (
                      <th
                        key={item.alternative.name}
                        className='border border-gray-300 px-4 py-2'
                      >
                        {item.alternative.name}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {renderCriteria(criteriaAlternativeValue, 0, alternatives)}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
