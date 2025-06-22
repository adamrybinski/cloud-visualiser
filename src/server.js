import pl from "tau-prolog";
import appCode from "app.pl";

const session = pl.create();
session.consult(appCode);

export default {
  async fetch(request) {
    const url = new URL(request.url);
    const method = request.method;
    const pathname = url.pathname;
    
    return new Promise((resolve) => {
      const query = `handle_request('${method}', '${pathname}', Result).`;
      
      session.query(query, {
        success: () => {
          session.answer((answer) => {
            if (answer === false) {
              resolve(new Response("Query failed", { 
                headers: { "Content-Type": "text/plain" } 
              }));
            } else {
              const formatted = session.format_answer(answer);
              const result = formatted.includes('Result = ') 
                ? formatted.split('Result = ')[1] 
                : "Request processed";
              
              resolve(new Response(result, { 
                headers: { "Content-Type": "text/plain" } 
              }));
            }
          });
        },
        error: (err) => {
          resolve(new Response(`Error: ${err}`, { 
            headers: { "Content-Type": "text/plain" } 
          }));
        }
      });
    });
  },
};
