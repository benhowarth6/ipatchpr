import useSWR from 'swr';
import Link from "next/link"
import { gql } from 'graphql-request';
import Layout from '../components/layout';
import { graphQLClient } from '../utils/graphql-client';
import { CalendarIcon, LocationMarkerIcon, PhoneIcon, UsersIcon } from '@heroicons/react/solid'

const fetcher = async (query) => await graphQLClient.request(query);

const Home = () => {
  const { data, error } = useSWR(
    gql`
      {
        allTodos {
          data {
            _id
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
      }
    `,
    fetcher
  );

  if (error) return <div>failed to load</div>;

  return (
    <Layout>

       <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
        {data ? (
      <ul className="divide-y divide-gray-200">
        {data.allTodos.data.map((todo) => (
          <li key={todo._id}>
            <Link href={`/todo/${todo._id}`}>
            <a className="block hover:bg-gray-50">
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex text-sm">
                  <p className="text-sm font-medium text-blue-600 truncate">{todo.part}</p>
                  <p className="ml-1 flex-shrink-0 font-normal text-gray-500">for a {todo.device}</p>
                  </div>
                  <div className="ml-2 flex-shrink-0 flex">
                    {todo.paid
                    ? <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Paid</p>
                    : <p></p>
                    }
                    {todo.ordered
                    ? <p className="px-2 ml-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-200 text-blue-800">Ordered</p>
                    : <p className="px-2 ml-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-200 text-yellow-800">Pending</p>
                    }
                  </div>
                </div>
                <div className="mt-2 sm:flex sm:justify-between">
                  <div className="sm:flex">
                    <p className="flex items-center text-sm text-gray-500">
                      <UsersIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                      {todo.customer}
                    </p>
                    <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                      <PhoneIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                      {todo.contactnumber}
                    </p>
                  </div>
                  <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                    <CalendarIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                    <p>
                      Due for <time dateTime={todo.daterequired}>{todo.daterequired}</time>
                    </p>
                  </div>
                </div>
              </div>
            </a>
            </Link>
          </li>
        ))}
      </ul>
      ) : (
        <div>loading...</div>
      )}
    </div>

        </div>
      </main>

    </Layout>
  );
};

export default Home;