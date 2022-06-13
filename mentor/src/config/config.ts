export default () => {
  return {
    database: {
      db_url: process.env.DB_URL,
    },
    microservice: {
      rmq_url: process.env.RMQ_URL,
    },
  }
}
