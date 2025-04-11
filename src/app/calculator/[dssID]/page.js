'use client';

import AlternativeValue from '@/components/alternative-value';
import Modal from '@/components/modal';
import SettingAlternative from '@/components/setting-alternative';
import SettingCriteria from '@/components/setting-criteria';
import Stepper from '@/components/stepper';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

export default function CalculatorPage() {
  const router = useRouter();
  const { dssID } = useParams();

  const [topic, setTopic] = useState(null);
  const [alternatives, setAlternatives] = useState([]);
  const [dssAlternativeIds, setDssAlternativeIds] = useState([]);
  const [criterias, setCriterias] = useState([]);
  const [dssCriteriaIds, setDssCriteriaIds] = useState([]);
  const [dssAlternatives, setDssAlternatives] = useState([]);
  const [dssCriterias, setDssCriterias] = useState([]);
  const [dssCriteriaAlternatives, setDssCriteriaAlternatives] = useState([]);
  const [criteriaParams, setCriteriaParams] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  const flattenCriteriaIds = (criterias) => {
    let ids = [];

    criterias.forEach((criteria) => {
      ids.push(criteria.criteriaId);
      if (criteria.subCriteria && criteria.subCriteria.length > 0) {
        ids = ids.concat(flattenCriteriaIds(criteria.subCriteria));
      }
    });

    return ids;
  };

  const constructCriteriaAndAlternativeData = (criterias, alternatives) => {
    return criterias.map((criteria) => {
      // If subCriteria exists, modify it recursively
      if (criteria.subCriteria && criteria.subCriteria.length > 0) {
        criteria.subCriteria = constructCriteriaAndAlternativeData(
          criteria.subCriteria,
          alternatives
        );
      }

      // Add new data to the subCriteria array
      if (criteria.subCriteria) {
        criteria = { ...criteria, alternatives: alternatives };
      }

      return criteria;
    });
  };

  const fetchDetailDss = async () => {
    const response = await fetch('/api/dss/' + dssID, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    const responseJson = await response.json();
    if (responseJson.status == 200) {
      const data = responseJson.data;

      setDssAlternativeIds(
        data.dssAlternatives.map((item) => item.alternative.alternativeId)
      );

      const dssCriteriaId = flattenCriteriaIds(data.dssCriterias);
      setDssCriteriaIds(dssCriteriaId);

      setDssAlternatives(data.dssAlternatives);

      // setSelectedMethod('SAW');

      const dssCriterias = constructCriteriaAndAlternativeData(
        data.dssCriterias,
        data.dssAlternatives
      );
      setDssCriterias(dssCriterias);

      setDssCriteriaAlternatives(data.dssCriteriaAlternatives);

      setTopic({
        name: data.topic.name,
        topicId: data.topic.topicId,
        description: data.topic.description,
      });
    } else {
      // handle error
    }
  };

  const fetchAlternativeByTopic = async () => {
    if (topic == null) {
      return;
    }

    const response = await fetch(
      '/api/topics/' + topic.topicId + '/alternatives',
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      }
    );

    const responseJson = await response.json();
    if (responseJson.status == 200) {
      const data = responseJson.data;

      setAlternatives(data);
    } else {
      // handle error
    }
  };

  const fetchCriteriaByTopic = async () => {
    if (topic == null) {
      return;
    }

    const response = await fetch(
      '/api/topics/' + topic.topicId + '/criterias',
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      }
    );

    const responseJson = await response.json();
    if (responseJson.status == 200) {
      const criterias = responseJson.data;

      setCriterias(criterias);
    } else {
      // handle error
    }
  };

  const handleCalculate = async () => {
    const paramWithFalseValue = criteriaParams.filter(
      (param) => param.hasChild != true && param.value == 0
    );

    if (paramWithFalseValue.length > 0) {
      setErrorMessage(
        'Alternative criteria is required. Please fill it out before submitting the form.'
      );
      return;
    }

    // if (selectedMethod == null) {
    //   setErrorMessage('Please chose the method before submitting the form.');
    //   return;
    // }

    const params = {
      method: 'SAW',
      criterias: criteriaParams.map(({ hasChild, ...rest }) => rest),
    };

    const response = await fetch('/api/dss/' + dssID, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });

    const responseJson = await response.json();

    if (responseJson.status == 200) {
      fetchDetailDss();
    } else {
      // show notif error
    }
  };

  const refetchTrigger = () => {
    fetchCriteriaByTopic();
    fetchAlternativeByTopic();
    fetchDetailDss();
  };

  useEffect(() => {
    fetchDetailDss();
  }, []);

  useEffect(() => {
    fetchCriteriaByTopic();
    fetchAlternativeByTopic();
  }, [topic]);

  return (
    <>
      {/* Header / Title */}
      <div className='flex flex-col items-center justify-center min-h-20 mt-20 mx-4'>
        <h1 className='text-3xl font-bold'>
          Review Alternatives: {topic && topic.name}
        </h1>
        <p>{topic && topic.description}</p>
      </div>

      {/* Topic Selection with Criteria Table */}
      {criterias && topic && (
        <SettingCriteria
          title={'Criterias'}
          criteria={criterias}
          dssCriterias={dssCriteriaIds}
          topicId={topic.topicId}
          dssID={dssID}
          action={'setting'}
          refetchTrigger={refetchTrigger}
        />
      )}

      {alternatives && topic && (
        <SettingAlternative
          title={'Alternatives'}
          alternatives={alternatives}
          dssAlternatives={dssAlternativeIds}
          action={'setting'}
          topicId={topic.topicId}
          refetchTrigger={refetchTrigger}
        />
      )}

      <AlternativeValue
        alternatives={dssAlternatives}
        criteriaAlternativeValue={dssCriterias}
        dssCriteriaAlternatives={dssCriteriaAlternatives}
        dssID={dssID}
        updateParamToParent={(params) => {
          setCriteriaParams(params);
        }}
      />

      <div className='w-11/12 md:w-4/5 lg:w-3/5 mx-auto'>
        <div className='flex justify-end space-x-4 my-4'>
          <button
            className='bg-blue-400 text-white px-4 py-2 rounded'
            onClick={() => {
              handleCalculate();
            }}
          >
            Calculate
          </button>
        </div>
      </div>

      <div className='py-8 pb-32'>
        <div className='w-11/12 md:w-4/5 lg:w-3/5 mx-auto'>
          <h2 className='text-xl font-semibold mb-4'>Alternative Rank</h2>
          <table className='w-full border-collapse border border-gray-300'>
            <thead>
              <tr className='bg-gray-100'>
                <th className='border border-gray-300 p-2'>Alternative</th>
                <th className='border border-gray-300 p-2'>Score</th>
                <th className='border border-gray-300 p-2'>Rank</th>
              </tr>
            </thead>
            <tbody>
              {dssAlternatives
                .sort((a, b) => a.rankValue - b.rankValue)
                .map((item, index) => (
                  <tr key={index} className='text-center'>
                    <td className='border border-gray-300 p-2'>
                      {item.alternative.name}
                    </td>
                    <td className='border border-gray-300 p-2'>
                      {item.sValue && item.sValue.toFixed(3)}
                    </td>
                    <td className='border border-gray-300 p-2'>
                      {item.rankValue}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {errorMessage && (
        <Modal
          title={'Error'}
          onCancel={() => {
            setErrorMessage(null);
          }}
        >
          <div className='space-y-4'>
            <div>
              <label className='block text-md text-gray-700'>
                {errorMessage}
              </label>
            </div>

            {/* Submit Button */}
            <button
              onClick={() => {
                setErrorMessage(null);
              }}
              className='flex bg-blue-400 text-white px-4 py-2 rounded hover:bg-blue-500'
            >
              Check Form
            </button>
          </div>
        </Modal>
      )}
    </>
  );
}
