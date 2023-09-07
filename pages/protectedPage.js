export async function getServerSideProps(context) {
  const token = context.req.headers["authorization"];

  if (!token) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
