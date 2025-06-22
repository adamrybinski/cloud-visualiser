import pl from "tau-prolog";
import application from "./app.pl";

export default {
  async fetch(request) {
    const session = pl.create();
    session.consult(application);

    const url = new URL(request.url);
    const method = request.method.toLowerCase();
    const path = url.pathname;
    const accept = request.headers.get('accept') || '';

    return new Promise(resolve => {
      session.query(`route('${method}', '${path}', '${accept}', Action, Data).`);
      session.answer(answer => {
        if (!answer) return resolve(new Response('Not found', { status: 404 }));

        const action = answer.lookup('Action').toString();
        const data = answer.lookup('Data').toString();

        if (action === 'html') {
          resolve(new Response(data, { headers: { 'Content-Type': 'text/html' } }));
        } else if (action === 'json') {
          resolve(new Response(data, { headers: { 'Content-Type': 'application/json' } }));
        } else {
          resolve(new Response('Not found', { status: 404 }));
        }
      });
    });
  }
};
