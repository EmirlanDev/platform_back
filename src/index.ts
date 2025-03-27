import buildServer from "./app";

const server = buildServer();

const start = () => {
  const PORT = process.env.PORT || 3000;

  try {
    server.listen(
      {
        port: PORT,
        host: "0.0.0.0",
      },
      () => {
        console.log(`${new Date()}`);
        console.log(`Server run in: http://localhost:${PORT}`);
        console.log(
          `Swagger docs available at http://localhost:${PORT}/api-docs`
        );
      }
    );
  } catch (error) {
    console.log(`Server crash: ${error}`);
    process.exit(1);
  }
};

start();
