export default () => {
  return {
    database: {
      db_url: process.env.DB_URL,
    },
    microservice: {
      rbmq_url: process.env.RBMQ_URL,
      queue: process.env.QUEUE,
    },
  };
};
