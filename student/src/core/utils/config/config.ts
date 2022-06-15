export default () => {
  return {
    database: {
      db_uri: process.env.DB_URI,
    },
    microservice: {
      rbmq_url: process.env.RMQ_URL,
    },
  };
};
