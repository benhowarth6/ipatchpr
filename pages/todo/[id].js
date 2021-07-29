// pages/todo/[id].js

import { useRouter } from 'next/router';
import useSWR from 'swr';
import { gql } from 'graphql-request';
import Layout from '../../components/layout';
import EditForm from '../../components/edit-form';
import { graphQLClient } from '../../utils/graphql-client';

const Todo = () => {
  const router = useRouter();
  const { id } = router.query;

  const fetcher = async (query) => await graphQLClient.request(query, { id });

  const query = gql`
    query FindATodoByID($id: ID!) {
      findTodoByID(id: $id) {
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

  const { data, error } = useSWR([query, id], fetcher);

  if (error) return <div>failed to load</div>;

  return (
    <Layout>
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">View/Edit Part Request</h1>
        </div>
      </header>
    
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">

      {data ? (
        <EditForm defaultValues={data.findTodoByID} id={id} />
      ) : (
        <div>loading...</div>
      )}
      </div>
    </Layout>
  );
};

export default Todo;