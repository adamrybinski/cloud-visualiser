import pl from "tau-prolog";
import appCode from "./app.pl";

const session = pl.create();
session.consult(appCode);

export default {
  async fetch(request) {
    const url = new URL(request.url);
    const pathname = url.pathname;

    session.query("run_query(X).", (success, result) => {
      if (success) {
        console.log("Query result:", result);
      } else {
        console.error("Query failed.");
      }
    });

    return new Response(
      `Cloud Tau Prolog Server is running, and the query has been executed with result: ${JSON.stringify(
        session.get_answer()
      )}`,
      {
        headers: {
          "Content-Type": "text/plain",
        },
      }
    );
  },
};
