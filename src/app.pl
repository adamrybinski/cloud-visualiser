handle_request(Method, Path, Result) :-
    atom_concat('Handled ', Method, Temp),
    atom_concat(Temp, ' request to ', Temp2),
    atom_concat(Temp2, Path, Result).