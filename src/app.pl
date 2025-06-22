route('get', '/', Accept, html, '<html><body><h1>Hello, Tau Prolog!</h1></body></html>') :-
    sub_atom(Accept, _, _, _, 'text/html').

route('get', '/', Accept, json, '{"status":"ok"}') :-
    sub_atom(Accept, _, _, _, 'application/json').

route('get', '/api/info', _, json, '{"info":"Prolog-powered API"}').

route('post', '/api/echo', _, json, '{"echo":"This is a POST endpoint"}').

route(_, _, _, html, '<html><body><h1>404 Not Found</h1></body></html>').
