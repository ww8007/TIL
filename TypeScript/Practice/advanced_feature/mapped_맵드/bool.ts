type T1 = { [K in 'prop1' | 'prop2']: boolean }; // -1-
// {prop1: boolean; prop2: boolean;} // -2-
