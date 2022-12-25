import { ajax } from "rxjs/ajax";

const obs$ = ajax(`http://localhost:3000/people/1`);
obs$.subscribe((result) => console.log(result.response));
