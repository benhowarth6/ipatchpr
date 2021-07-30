// components/edit-form.js

import { useState, useEffect } from 'react';
import Router from 'next/router';
import { gql } from 'graphql-request';
import { useForm } from 'react-hook-form';
import utilStyles from '../styles/utils.module.css';
import { graphQLClient } from '../utils/graphql-client';

const EditForm = ({ defaultValues, id }) => {
  const [errorMessage, setErrorMessage] = useState('');

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      ...defaultValues,
    },
  });

  const onSubmit = handleSubmit(async ({ part, device, colour, customer, contactnumber, daterequested, daterequired, paid, ordered }) => {
    if (errorMessage) setErrorMessage('');

    const query = gql`
      mutation UpdateATodo($id: ID! $part: String!, $device: String!, $colour: String!, $customer: String!, $contactnumber: String!, $daterequested: Date!, $daterequired: Date!, $paid: Boolean!, $ordered: Boolean!) {
        updateTodo(id: $id, data: { part: $part, device: $device, colour: $colour, customer: $customer, contactnumber: $contactnumber, daterequested: $daterequested, daterequired: $daterequired, paid: $paid, ordered: $ordered  }) {
            part
            device
            colour
            customer
            contactnumber
            daterequested
            daterequired
            paid
            ordered
        }
      }
    `;

    const variables = {
      id,
      part,
      device,
      colour,
      customer,
      contactnumber,
      daterequested,
      daterequired,
      paid,
      ordered,
    };

    try {
      await graphQLClient.request(query, variables);
      Router.push('/');
    } catch (error) {
      console.error(error);
      setErrorMessage(error.message);
    }
  });

  useEffect(() => {
    reset(defaultValues); // asynchronously reset your form values
  }, [reset, defaultValues]);

  return (
    <>
      <form onSubmit={onSubmit} className="space-y-8 divide-y divide-gray-200">
      <div className="pt-8">
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">Part Information</h3>
            <p className="mt-1 text-sm text-gray-500">Enter the details for the device and the required part(s).</p>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label htmlFor="device" className="block text-sm font-medium text-gray-700">
                Device
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="device"
                  id="device"
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  {...register('device', { required: 'device type is required' })}
                />
                {errors.part && (
                <span role="alert" className={utilStyles.error}>
              {errors.device.message}
            </span>
          )}
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="colour" className="block text-sm font-medium text-gray-700">
                Colour
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="colour"
                  id="colour"
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  {...register('colour')}
                />
                {errors.part && (
                <span role="alert" className={utilStyles.error}>
              {errors.colour.message}
              </span>
                )}
              </div>
            </div>

            <div className="sm:col-span-4">
              <label htmlFor="part" className="block text-sm font-medium text-gray-700">
                Part Required
              </label>
              <div className="mt-1">
                <input
                  id="part"
                  name="part"
                  type="text"
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  {...register('part', { required: 'Part request is required' })}
                />
                {errors.part && (
                <span role="alert" className={utilStyles.error}>
              {errors.part.message}
              </span>
                )}
              </div>
            </div>

          </div>
        </div>

        <div className="pt-8">
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">Customer Information</h3>
            <p className="mt-1 text-sm text-gray-500">Enter the customers details and contact information.</p>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Customer Name
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  {...register('customer', { required: 'Customer name is required' })}
                />
                {errors.part && (
                <span role="alert" className={utilStyles.error}>
              {errors.customer.message}
              </span>
                )}
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">
                Contact Number
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="last_name"
                  id="last_name"
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  {...register('contactnumber', { required: 'Customer contact number is required' })}
                />
                {errors.part && (
                <span role="alert" className={utilStyles.error}>
              {errors.contactnumber.message}
              </span>
                )}
              </div>
            </div>

          </div>
        </div>

        <div className="pt-8">
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">Request Details</h3>
            <p className="mt-1 text-sm text-gray-500">
              If the customer has pre-paid for a part, mark that below. Completed orders should also be marked.
            </p>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Request Date
              </label>
              <div className="mt-1">
                <input
                  type="date"
                  name="date_request"
                  id="date_request"
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  {...register('daterequested', { required: 'Date Requested is required' })}
                />
                {errors.part && (
                <span role="alert" className={utilStyles.error}>
              {errors.daterequested.message}
              </span>
                )}
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">
                Required Date
              </label>
              <div className="mt-1">
                <input
                  type="date"
                  name="date_required"
                  id="date_required"
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  {...register('daterequired', { required: 'Part required date is required' })}
                />
                {errors.part && (
                <span role="alert" className={utilStyles.error}>
              {errors.redquireddate.message}
              </span>
                )}
              </div>
            </div>

          </div>
          <div className="mt-6">
            <fieldset>
              <legend className="text-base font-medium text-gray-900">Status</legend>
              <div className="mt-4 space-y-4">
                <div className="relative flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="paid"
                      name="paid"
                      type="checkbox" {...register('paid')}
                      className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                    />
                    {errors.paid && (
            <span role="alert" className={utilStyles.error}>
              {errors.paid.message}
            </span>
          )}
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="paid" className="font-medium text-gray-700">
                      Paid
                    </label>
                    <p className="text-gray-500">Has the customer pre-paid for this part?</p>
                  </div>
                </div>
                <div className="relative flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="ordered"
                      name="ordered"
                      type="checkbox" {...register('ordered')}
                      className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="ordered" className="font-medium text-gray-700">
                      Ordered
                    </label>
                    <p className="text-gray-500">Has this part been ordered?</p>
                  </div>
                </div>
                  </div>
                    </fieldset>
                    </div>
                    </div>
                    <div className="pt-5">
        <div className="flex justify-end">
          <button
            type="button"
            className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Save
          </button>
        </div>
      </div>

        </form>

      {errorMessage && (
        <p role="alert" className={utilStyles.errorMessage}>
          {errorMessage}
        </p>
      )}
    </>
  );
};

export default EditForm;